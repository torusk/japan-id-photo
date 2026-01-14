# デプロイ手順書 (React アプリ)

このドキュメントは `standard-id-japan`（Create React App ベース）のビルド作成〜サーバへ配置、運用時の注意点を丁寧にまとめたものです。

**結論（先に要点）**
- 一度 `npm run build` して生成される `build/` フォルダの中身だけをサーバーの公開ディレクトリに置けば、常時自分で Node を起動しなくてもサイトを公開できます（静的ホスティング）。
- クライアントサイドルーティングを使う場合はサーバ側で `index.html` へフォールバックする設定が必要です（例: Nginx の `try_files`）。

---

## 1. ローカルでの準備とビルド
1. プロジェクトルートへ移動:

```bash
cd /Users/kazuki/Desktop/id-photo-app
```

2. 依存をインストール（初回または変更後）:

```bash
npm install
```

3. （任意）サブディレクトリに配置する場合は `package.json` に `homepage` を設定してください。例: サイトが `https://example.com/myapp/` の場合:

```json
{
  "homepage": "/myapp/"
}
```

設定後にビルドを実行してください。

4. ビルドを実行:

```bash
npm run build
```

生成物: `build/` ディレクトリ（`index.html`, `static/` 等）

---

## 2. サーバーへ配置（選択肢）
以下は一般的な配置方法です。あなたのホスティング環境（VPS / レンタルサーバ / ConoHa WING 等）に応じて選んでください。

### A. VPS (例: Ubuntu + Nginx) — 推奨（柔軟で高速）
1. サーバ側の公開ディレクトリ（例: `/var/www/your-site`）に `build/` の中身をアップロードします。

```bash
# rsync（差分アップロード・推奨）
rsync -avz --delete build/ user@your-server:/var/www/your-site/

# scp（簡易）
scp -r build/* user@your-server:/var/www/your-site/
```

2. Nginx の最小設定（クライアントサイドルーティング対応）:

```nginx
server {
  listen 80;
  server_name example.com;

  root /var/www/your-site;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }

  # 静的ファイルへ長期キャッシュを設定する場合は location 以下に追加
}
```

3. HTTPS: `certbot`（Let's Encrypt）で証明書を取得・自動更新してください。

### B. 共有レンタルサーバ（ConoHa WING 等）
- 多くの共有ホスティングは FTP/SFTP で公開ディレクトリ（`public_html` や `www`）へファイルを配置すれば動きます。
- 手順:
  1. FTP/SFTP クレデンシャルで接続
  2. `build/` の中身をドキュメントルートへアップロード
- 注意: 共有ホスティングでは `try_files` 相当の設定ができないことがあるため、`.htaccess`（Apache）やホスティング管理画面で「すべてのリクエストを index.html に渡す」設定を探してください。

#### Apache/.htaccess の例（mod_rewrite）
```
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### C. 簡易テスト（Node `serve`）
- サーバ側で Node が使える簡易ホスティングをしたい場合（テスト用）:

```bash
npm install -g serve
serve -s build -l 5000
```

この方法は常時稼働の本番用途には推奨しません（プロセス管理や SSL を別途用意する必要があります）。

### D. 静的ホスティングサービス（簡単）
- Netlify, Vercel, Firebase Hosting, GitHub Pages など。これらは `build/` を自動的に取り込みデプロイできます。設定はそれぞれのサービスの UI または Git 連携で実行します。

---

## 3. 本番運用の推奨設定・注意点
- HTML5 History API を使う場合はサーバ側で `index.html` へフォールバック（上記 `try_files` / `.htaccess`）を必ず設定する。
- HTTPS を有効化する（Let's Encrypt が無料で導入可能）。
- キャッシュ設定: ビルド成果物はファイル名にハッシュが入るため `Cache-Control: public, max-age=31536000, immutable` を付けて長期キャッシュしてよい。`index.html` は短めにする（例: `max-age=0, must-revalidate`）。
- MIME タイプ: サーバに画像やJS/CSSの正しいMIMEが設定されていることを確認。
- サブパス配備: `homepage` を `package.json` に設定してから `npm run build` する。

---

## 4. アップロード例コマンドまとめ
- rsync（差分で安全）:
```bash
rsync -avz --delete build/ user@your-server:/var/www/your-site/
```
- scp（シンプル）:
```bash
scp -r build/* user@your-server:/var/www/your-site/
```
- FTP（lftp 例）:
```bash
lftp -u username,password sftp://your-server -e "mirror -R build/ /path/to/site/; bye"
```

---

## 5. 自動デプロイ（CI）簡易例 — GitHub Actions（rsync を使う例）
- シークレットに `DEPLOY_HOST`, `DEPLOY_USER`, `DEPLOY_PATH`, `SSH_PRIVATE_KEY` を登録しておきます。

```yaml
# .github/workflows/deploy.yml
name: Build and Deploy
on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - name: Deploy via rsync
        uses: burnett01/rsync-deployments@v4
        with:
          switches: -avz --delete
          path: build/
          remote_host: ${{ secrets.DEPLOY_HOST }}
          remote_user: ${{ secrets.DEPLOY_USER }}
          remote_path: ${{ secrets.DEPLOY_PATH }}
          ssh_private_key: ${{ secrets.SSH_PRIVATE_KEY }}
```

---

## 6. よくあるトラブルと対処
- 404 が出る（直接 URL でアクセス）: サーバのフォールバック設定がないため。Nginx の `try_files` / Apache の `.htaccess` を設定。
- 画像や JS が古い: キャッシュが効きすぎ。`index.html` が古い場合はキャッシュをクリアする。
- 502 / 500 エラー: Nginx がバックエンドを期待している設定になっている可能性（静的配信用に設定し直す）。

---

## 7. ConoHa WING 等の共有レンタルサーバ向け補足
- ConoHa WING の場合、管理画面の「公開フォルダ（ドキュメントルート）」へ `build/` の中身をアップロードすれば動きます。
- FTP/SFTP でアップロード後、必要であればホスティングの『動的コンテンツ設定』や『.htaccess』でルーティングを index.html に渡す設定を確認してください。
- ConoHa の独自キャッシュや CDN が有効な場合はキャッシュ設定も確認してください。

---

## 8. 次のステップ（あなたが選べます）
- 私が `DEPLOYMENT.md` をさらに ConoHa WING 向けにカスタマイズした例を書きます（必要ならホスティングの管理画面の設定名を教えてください）。
- GitHub Actions ワークフローをプロジェクトに追加します（rsync/FTP どちらが良いか教えてください）。
- `nginx` のより詳細な設定（gzip, キャッシュ, セキュリティヘッダ）テンプレートを作ります。

---

保存場所: `DEPLOYMENT.md`（プロジェクト直下）

必要なら、このファイルにあなたのサーバ情報（公開パスや接続方式）を教えてください。具体的なコマンドとワークフローをその情報に合わせて作ります。
