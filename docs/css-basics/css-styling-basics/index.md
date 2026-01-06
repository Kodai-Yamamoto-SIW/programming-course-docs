---
sidebar_position: 3
---

import { CodePreview } from '@kodai-yamamoto-siw/code-preview';

# スタイリング

## CSSスタイリング

### 今回使用するCSS機能

- `<link>`タグ：外部CSSファイルの読み込み
- CSSコメント：`/* */`でコメントを記述
- `background-color`プロパティ：背景色の設定
- `color`プロパティ：文字色の設定
- 子孫セレクタ：スペース区切りで特定の要素内にある要素を指定

### 前提

[リンクとHTML文法チェック](../../html-basics/images-links/index.md)で完成したマークアップに対してスタイリングしていきましょう。
HTMLファイルには、ピクニックのお知らせのマークアップが完成している状態から始めます。

---

## 1. CSSファイルの準備

### 📄 CSSファイルを作成

HTMLファイルと同じフォルダに`style.css`という名前の新しいファイルを作成します。

**フォルダ構成例**:
```
作業フォルダ/
├── index.html
├── style.css
└── images/
    ├── picnic.jpg
    └── park_map.jpg
```

**説明**: `<link>`タグの`href`属性にCSSファイルのパスを指定して外部CSSファイルを読み込む

**適用箇所**:
```html
<head>
    <meta charset="UTF-8">
    <title>ピクニックのお知らせ</title>
    <link rel="stylesheet" href="style.css">
</head>
```

**重要なポイント**:
- `href="style.css"`：CSSファイルのパスを指定

---

## 2. CSSコメントを学習・追加

### 💬 CSSコメントとは

**説明**: CSSファイル内にメモや説明を書くための記法。ブラウザでは無視される。

**書き方**:
```css
/* これはCSSコメントです */

/* 
複数行の
コメントも
書けます
*/
```

### 手順: CSSファイルにコメントを追加

**適用箇所（style.css）**:
```css
/* 基本設定 */
body {
    
}

/* ヘッダー */
header {
    
}

/* メインコンテンツ */
main {
    
}

/* リンク */
a {
    
}

/* フッター */
footer {
    
}
```

---

## 3. `background-color`プロパティを学習・適用

### 🎨 background-colorプロパティとは

**説明**: 要素の背景色を設定するプロパティです。セレクタで指定した要素に背景色を適用できます。

**基本的な書き方**:
```css
セレクタ {
    background-color: 色の値;
}
```

**色の指定方法**:
- カラーネーム：`red`, `blue`, `green`, `white`, `black` など
- 16進数カラーコード：`#ff0000`（赤）, `#0000ff`（青）など
- RGB値：`rgb(255, 0, 0)`（赤）, `rgb(0, 0, 255)`（青）など

<CodePreview 
  initialHTML={`<h1>見出しの背景色</h1>
<p>段落の背景色</p>
<div>div要素の背景色</div>`}
  initialCSS={`h1 {
    background-color: red;        /* カラーネーム */
}
p {
    background-color: #0000ff;    /* 16進数カラーコード */
}
div {
    background-color: rgb(0, 255, 0); /* RGB値 */
}`}
/>

### 手順: 背景色を段階的に追加

**適用箇所①（body全体の背景色）**:
```css
/* 基本設定 */
body {
    background-color: #f0fff0; /* 薄い緑色 */
}
```

**適用箇所②（ヘッダーの背景色）**:
```css
/* ヘッダー */
header {
    background-color: #ffffff; /* 白色 */
}
```

**適用箇所③（各セクションの背景色）**:
```css
/* メインコンテンツ */
section {
    background-color: #ffffff; /* 白色 */
}
```

**適用箇所④（フッターの背景色）**:
```css
/* フッター */
footer {
    background-color: #2e8b57; /* 深い緑色 */
}
```

---

## 4. 子孫セレクタを学習

### 👨‍👩‍👧‍👦 子孫セレクタとは

**説明**: セレクタをスペース区切りで書くことで、「特定の要素の中にある要素」を指定できます。

**基本的な書き方**:
```css
親要素 子要素 {
    プロパティ: 値;
}
```

### 子孫セレクタの例

<CodePreview 
  initialHTML={`<header>
    <h1>サイトタイトル</h1>
</header>
<main>
    <h1>記事タイトル</h1>
    <section>
        <h2>セクション見出し</h2>
        <p>段落テキスト</p>
    </section>
</main>`}
  initialCSS={`/* headerの中にあるh1だけを赤色にする */
header h1 {
    color: red;
}

/* sectionの中にあるh2だけを青色にする */
section h2 {
    color: blue;
}

/* sectionの中にあるpだけを緑色にする */
section p {
    color: green;
}`}
/>

**結果**:
- 「サイトタイトル」→ 赤色（`header h1`が適用）
- 「記事タイトル」→ 通常の色（どのセレクタにも該当しない）
- 「セクション見出し」→ 青色（`section h2`が適用）
- 「段落テキスト」→ 緑色（`section p`が適用）

---

## 5. `color`プロパティを学習・適用

### 🖍️ colorプロパティとは

**説明**: 要素の文字色を設定するプロパティです。セレクタで指定した要素の文字色を変更できます。

**基本的な書き方**:
```css
セレクタ {
    color: 色の値;
}
```

### 手順: 文字色を段階的に追加

**適用箇所①（body全体の文字色）**:
```css
/* 基本設定 */
body {
    color: rgb(51, 51, 51); /* 濃いグレー */
    background-color: #f0fff0;
}
```

**適用箇所②（ヘッダーの見出し文字色）**:
```css
/* ヘッダー */
header h1 {
    color: #2e8b57; /* 深い緑色 */
}

header nav li a {
    color: #2e8b57; /* 深い緑色 */
}
```

**適用箇所③（メインコンテンツの見出し文字色）**:
```css
/* メインコンテンツ */
section h2 {
    color: #2e8b57; /* 深い緑色 */
}

section h3 {
    color: #2e8b57; /* 深い緑色 */
}
```

**ポイント**: ここで**子孫セレクタ**を使用しています。`header h1`は「`header`要素の中にある`h1`要素」、`header nav li a`は「`header`要素の中の`nav`要素の中の`li`要素の中の`a`要素」という意味です。

**適用箇所④（リンクの文字色）**:
```css
/* リンク */
a {
    color: #2e8b57; /* 深い緑色 */
}
```

**適用箇所⑤（フッターの文字色）**:
```css
/* フッター */
footer {
    background-color: #2e8b57;
    color: white; /* 白色 */
}
```

---

## 完成時のCSSファイル

### 📝 style.css

```css
/* 基本設定 */
body {
    color: rgb(51, 51, 51);
    background-color: #f0fff0;
}

/* ヘッダー */
header {
    background-color: #ffffff;
}

header h1 {
    color: #2e8b57;
}

header nav li a {
    color: #2e8b57;
}

/* メインコンテンツ */
section {
    background-color: #ffffff;
}

section h2 {
    color: #2e8b57;
}

section h3 {
    color: #2e8b57;
}

/* リンク */
a {
    color: #2e8b57;
}

/* フッター */
footer {
    background-color: #2e8b57;
    color: white;
}
```



## 📋 学習のポイント

### 今回学んだこと

1. **外部CSSファイル**: HTMLとCSSを分離して管理する方法
2. **`<link>`タグ**: 外部CSSファイルを読み込む方法
3. **CSSコメント**: `/* */`を使ってコメントを記述する方法
4. **子孫セレクタ**: スペース区切りで特定の要素内にある要素を指定する方法
5. **`background-color`プロパティ**: 要素の背景色を設定する方法
6. **`color`プロパティ**: 要素の文字色を設定する方法

### 色の指定方法の復習

- **カラーネーム**: `red`, `blue`, `white`, `black`
- **16進数**: `#ff0000`, `#ffffff`, `#2e8b57`
- **RGB値**: `rgb(255, 0, 0)`, `rgb(51, 51, 51)`

---

## 📥 完成形のダウンロード

授業終了時点での完成形ファイルをダウンロードできます：

<a
  href={require("./files/css-styling-basics-complete.zip")}
  download="css-styling-basics-complete.zip"
>
  css-styling-basics-complete.zip
</a>

---

👋 おつかれさまでした！ 
