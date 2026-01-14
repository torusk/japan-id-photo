# standard-id-japan

このリポジトリは Create React App ベースの証明写真作成アプリケーションです。

## 概要

- フロントエンド: React（Create React App）
- 多言語対応: `i18next` / `react-i18next` を使用
- 画像処理: `konva` / `react-konva` と `canvas` を併用
- ダウンロード: `file-saver` を使用して生成画像を保存

このアプリはブラウザ内で画像を処理します。サーバにユーザーの画像を送信しません。

## 対応言語

- 日本語 (`ja`)
- 英語 (`en`)
- 簡体中国語 (`zh-CN`)
- 繁体中国語 (`zh-TW`)
- 韓国語 (`ko`)

翻訳ファイルは `src/locales/` にあります。

## 主要なファイル構成

- `public/` - 静的アセット（`index.html`, favicon, `videos/` など）
- `src/` - アプリ本体
  - `App.js` - アプリ全体の制御（テンプレート、ビルド、ダウンロード等）
  - `i18n.js` - i18next の初期化設定
  - `components/` - 画面コンポーネント（`TemplateStep.js`, `UploadStep.js`, `CropStep.js`, `ResultStep.js`, `VideoIntro.js`, `StickyHeader.js` など）
  - `locales/` - 各言語の JSON（`ja.json`, `en.json`, `ko.json`, `zh-CN.json`, `zh-TW.json`）

## ローカルでの開発

```bash
# 作業ディレクトリへ移動
cd /path/to/id-photo-app

# 依存をインストール
npm install

# 開発サーバーを起動
npm start
```

ブラウザで `http://localhost:3000` を開きます。

テスト:

```bash
npm test
```

本番ビルド:

```bash
npm run build
```

`build/` ディレクトリ内のファイルをサーバの公開ディレクトリに配置して公開します（詳しくは `DEPLOYMENT.md` を参照）。

## 多言語対応（i18n）のポイント

- 文言は `src/locales/<lang>.json` に定義されています。
- 新しい文言キーを追加するときは、全言語ファイルに同名キーを追加してください（未翻訳の言語は英語や日本語をフォールバックにする運用ができます）。
- UI 内での利用例: `t('buttons.upload')` のように `useTranslation` の `t` を用います。

## デプロイ（要点）

- 一度 `npm run build` を実行して生成される `build/` の中身だけをサーバーに置けば、Node を常時起動する必要はありません（静的ホスティング）。
- React のクライアントサイドルーティングを使う場合、サーバ側で `index.html` へフォールバックする設定が必要です（Nginx の `try_files` 等）。
- 環境別やサーバ別の詳細手順は `DEPLOYMENT.md` を参照してください。

## 翻訳の追加手順（簡易）

1. `src/locales/<lang>.json` を編集して新しいキーを追加
2. 開発サーバーで表示を確認（`npm start`）
3. PR を作成してレビュー

## 依存ライブラリ（抜粋）

- `react`, `react-dom`
- `react-i18next`, `i18next`, `i18next-browser-languagedetector`
- `konva`, `react-konva`
- `file-saver`

## 備考

- 本番公開に必要なのは `build/` の中身のみです。ソースコード全体をサーバに置く必要はありません。
- `DEPLOYMENT.md` を参照して、あなたのホスティング環境に合わせた手順を実行してください。

---

作業ログ: UI の一部（`VideoIntro.js` の段落移動、`StickyHeader.js` のステップ文字列の i18n 化、各ロケールへの `intro_title`/`intro_description` の追加）を行いました。
