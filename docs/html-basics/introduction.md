---
sidebar_position: 1
---

# HTMLの基本を知ろう！

## HTML/CSS

### 🔧 HTMLはWebページの「骨組み」、CSSは「見た目」

HTMLはWebページの文章と、構造を作るための言語です。
CSSはWebページの見た目を整えるための言語です。

### ✅ HTMLの基本要素

- `<!DOCTYPE html>`: HTMLであることを宣言
- `<html>`: HTML文書の開始
- `<head>`: Webページのヘッダー情報（ページのタイトル、CSSなど）
  - `<title>はじめてのHTML</title>`: Webページのタイトル（ブラウザのタブに表示される）
- `<body>`: Webページに表示される内容

```html
<!DOCTYPE html>
<html>
  <head>
    <title>はじめてのHTML</title>
  </head>
  <body>
  </body>
</html>
```

### 📝 HTMLで文字を表示する

- `<body>` に直接文字を書くと、Webページに文字が表示されます。
- 単に文字をずらずら書くだけでは、改行を入れても表示上、改行されません。

```html
<body>
  はじめてのHTML
  はじめてのWebページです。
</body>
```

- HTMLはタグを使って文書の各部分に意味を与える（**マークアップ** する）言語です。
- `<h1>` ～ `<h6>` は見出しを表すタグです。`<h1>` が一番大きな見出し、`<h6>` が一番小さな見出しです。
- `<p>` は段落を表すタグです。

```html
<body>
  <h1>はじめてのHTML</h1>
  <p>はじめてのWebページです。</p>
</body>
```

### 🎨 CSSで色を変える

- `<style>` タグを `<head>` 内に記述し、CSSを書くことができます。
- `color` プロパティで文字の色を指定できます。

```html
<head>
  <style>
    h1 {
      color: red; /* h1タグの文字色を赤色にする */
    }
  </style>
</head>
```

### 演習1
- 自分の名前を `<h1>` で表示しよう
- 自己紹介（出身地、趣味など）を `<p>` に書こう
- `<style>` を使って見出しを好きな色にしよう

<details>
<summary>解答を表示</summary>

```html
<!DOCTYPE html>
<html>

<head>
    <title>解答 演習1</title>
    <style>
        h1 {
            color: blue;
        }
    </style>
</head>

<body>
    <h1>山本航大</h1>
    <p>愛知県田原市出身です。趣味はゲームとプログラミングです。</p>
</body>

</html>
```

</details>

---

👋 おつかれさまでした！ 