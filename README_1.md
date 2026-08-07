# AICO Portfolio

AICO（AI×ANIME×AICO）のポートフォリオサイト。静的HTML1枚のみで動作するので、GitHub Pagesにそのまま公開できます。

## ファイル構成

```
aico-portfolio/
├── index.html
└── README.md
```

すべての動画をYouTube埋め込みに統一したため、`index.html` 単体で完結します。動画ファイル自体をアップロードする必要はありません。

## 公開手順（GitHub Pages）

1. GitHubで新しいリポジトリを作成する
   - リポジトリ名: `aico_ai_animation`
   - Public / Privateどちらでも可（Pagesで公開するならPublic推奨）

2. このフォルダの中身（`index.html`）をリポジトリ直下にアップロードする
   - GitHubの「Add file → Upload files」からドラッグ＆ドロップでOK
   - もしくはターミナルで:
     ```bash
     git init
     git add index.html README.md
     git commit -m "Initial portfolio"
     git branch -M main
     git remote add origin https://github.com/【あなたのアカウント名】/aico_ai_animation.git
     git push -u origin main
     ```

3. リポジトリの `Settings → Pages` を開く
   - Source: `Deploy from a branch`
   - Branch: `main` / `/(root)`
   - Save

4. 数分待つと、以下のURLで公開されます:
   ```
   https://【あなたのアカウント名】.github.io/aico_ai_animation/
   ```

## 独自ドメインにしたい場合

`aico-ai-animation.com` のような完全に独自のURLにしたい場合は、
- ドメインを取得（お名前.com、Google Domains、Cloudflareなど）
- リポジトリ直下に `CNAME` というファイルを作成し、中に取得したドメイン名を1行だけ書く
- ドメイン管理画面でDNSのCNAMEレコードを `【あなたのアカウント名】.github.io` に向ける

## カスタマイズしたい箇所

- `index.html` 内の `#works-grid` 内、各 `<article class="work-card">` が作品カードです。テキストを差し替えるだけで内容を更新できます。
- サムネイル画像を入れたい場合は、`.work-still` の `background:linear-gradient(...)` を `background:url('images/xxx.jpg') center/cover;` に変更してください（画像ファイルは `images/` フォルダを作って格納）。
- 色は `:root` 内の `--accent`（差し色の赤）、`--gold`（金）で一括管理しています。
