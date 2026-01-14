Chrome / Safari 用サイトアイコン設定ガイド（React想定）

目的：Chrome や Safari のタブ／ブックマーク（お気に入り）／ホーム追加で表示されるサイトアイコン（favicon 等）を正しく出すための最小手順と拡張。
前提：Create React App などで、public/ 直下の静的ファイルがそのまま配信される構成。

⸻

1) 置く場所と必要ファイル

最小構成（必須）

public/
 ├─ favicon.ico              ← 16px/32px/48px を同梱推奨
 ├─ favicon-16x16.png
 └─ favicon-32x32.png

あると良い（任意）

public/
 ├─ apple-touch-icon.png     ← iOS ホーム追加用（推奨: 180×180）
 ├─ manifest.json            ← PWA 対応する時に設定（推奨: 192×192 / 512×512）
 └─ safari-pinned-tab.svg    ← Safari のピン留めタブ用（任意）

メモ
	•	128×128 PNG はブックマーク／タブ用途では通常使われません。iOS / PWA 用に流用したい場合のみ活用。
	•	icons/ などのサブフォルダに置く場合は 自動検出されないため、後述の <link> で 明示が必要。確実性重視なら public/ 直下が無難。

⸻

2) public/index.html の <head> に書く内容（コピペ可）

<!-- 基本のファビコン（ICO） -->
<link rel="icon" href="%PUBLIC_URL%/favicon.ico" sizes="any">

<!-- PNG ファビコン（Chrome等が参照することあり） -->
<link rel="icon" type="image/png" sizes="32x32" href="%PUBLIC_URL%/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="%PUBLIC_URL%/favicon-16x16.png">

<!-- iOS ホーム追加（任意。可能なら 180x180 を用意） -->
<link rel="apple-touch-icon" href="%PUBLIC_URL%/apple-touch-icon.png">

<!-- PWA（任意） -->
<link rel="manifest" href="%PUBLIC_URL%/manifest.json">

サブフォルダに置く場合の例（public/icons/）

<link rel="icon" href="%PUBLIC_URL%/icons/favicon.ico">
<link rel="icon" type="image/png" sizes="32x32" href="%PUBLIC_URL%/icons/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="%PUBLIC_URL%/icons/favicon-16x16.png">
<link rel="apple-touch-icon" href="%PUBLIC_URL%/icons/apple-touch-icon.png">

App.js や画面側のコード修正は 不要。public/ と <head> の設定のみでOK。

⸻

3) ICO ファイルの作り方（ImageMagick）

推奨（ImageMagick v7 以降）

magick favicon-16x16.png favicon-32x32.png favicon-48x48.png favicon.ico

旧コマンド（非推奨の警告は出るが動く）

convert favicon-16x16.png favicon-32x32.png favicon-48x48.png favicon.ico

確認

ls -l favicon.ico

macOS で ImageMagick を入れる

brew install imagemagick


⸻

4) PWA 用 manifest.json の例（任意）

{
  "name": "ID Photo App",
  "short_name": "ID Photo",
  "display": "standalone",
  "start_url": ".",
  "icons": [
    { "src": "favicon-16x16.png", "sizes": "16x16", "type": "image/png" },
    { "src": "favicon-32x32.png", "sizes": "32x32", "type": "image/png" },
    { "src": "icon-192x192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "icon-512x512.png", "sizes": "512x512", "type": "image/png" }
  ]
}

実運用では 192×192 と 512×512 の2サイズを用意するのが一般的。
128×128 は任意（必須ではない）。

⸻

5) 反映されない時のチェックリスト
	•	キャッシュ：シークレットウィンドウで確認／favicon.ico?v=2 のようにクエリを付ける
	•	設置場所：public/ 直下か？ サブフォルダに置いたなら <link> で明示したか？
	•	サイズ：favicon.ico に 16/32/48 を同梱したか（小サイズでも滲みにくい）
	•	Safari（iOS）：apple-touch-icon.png を用意したか（180×180 推奨）

⸻

6) 最小構成まとめ

配置

public/
 ├─ favicon.ico
 ├─ favicon-16x16.png
 ├─ favicon-32x32.png
 └─ index.html

index.html の <head>

<link rel="icon" href="%PUBLIC_URL%/favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="32x32" href="%PUBLIC_URL%/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="%PUBLIC_URL%/favicon-16x16.png">

これで Chrome / Safari のブックマーク・タブ に確実に表示されます。
iOS ホーム追加や PWA までやる場合は、apple-touch-icon.png と manifest.json を追加してください。