# Vue3 計算機アプリ（TypeScript）

これは Vue 3 + TypeScript + Pinia + Vite を使用して開発した電卓アプリです。  
Windows 11 の標準計算機の動作を模倣し、キーボード操作や複数回演算にも対応しています。

デモサイト：  
 [https://chaizhiyuan2501.github.io/typescript_calculator/](https://chaizhiyuan2501.github.io/typescript_calculator/)

---

## 主な機能

- ✅ 四則演算（+、−、×、÷）
- ✅ 連続演算対応（例：9 × 9 × 9 =）
- ✅ キーボード入力対応（数字・演算子・Enter・Backspace）
- ✅ 入力履歴の表示（`9 × 9 =` のように表示）
- ✅ 単項演算（√, x², 1/x, %）
- ✅ CE / C / ← ボタン実装
- ✅ レスポンシブ対応済み
- ✅ GitHub Pages によるデプロイ対応

---



## 使用技術

| 分類         | 内容                       |
|--------------|----------------------------|
| フロントエンド | Vue 3, TypeScript, Vite     |
| 状態管理     | Pinia                      |
| UI ライブラリ | Vuetify（ボタンやレイアウト） |
| デプロイ     | GitHub Pages + gh-pages    |

---

## ディレクトリ構成

```bash
typescript_calculator/
├── calculator_project/       # Vue 3 計算機アプリ本体
│   ├── src/
│   ├── public/
│   ├── vite.config.ts
│   └── package.json
├── .gitignore
└── README.md


## 開発用コマンド
# 開発サーバー起動
cd calculator_project
npm install
npm run dev

# ビルド
npm run build

# GitHub Pages にデプロイ
npm run deploy

作者
名前：Chai Zhiyuan
X： https://x.com/source006
GitHub: @chaizhiyuan2501
