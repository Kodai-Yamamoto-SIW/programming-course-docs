---
sidebar_position: 2
---

import Exercise, { Solution } from '@site/src/components/Exercise';

# CSSの単位を学ぼう！

## 単位とは

### 📏 CSSで使える様々な単位

CSSでは、フォントサイズ、余白、幅、高さなどを指定する際に様々な単位を使うことができます。
単位は大きく「**相対単位**」と「**絶対単位**」に分けられます。

### 相対単位
他の要素のサイズやブラウザの設定に基づいて計算される単位です：

- **px**: ピクセル（画面の点の数）
- **%**: パーセント（親要素に対する割合）
- **em**: 現在の要素のフォントサイズに対する倍数
- **ex**: 小文字の「x」の高さに対する倍数
- **rem**: ルート要素（`<html>`）のフォントサイズに対する倍数
- **vw**: ビューポート（画面）の幅に対する割合
- **vh**: ビューポート（画面）の高さに対する割合

### 絶対単位
物理的な大きさに基づく単位です：

- **pt**: ポイント（1pt = 1/72インチ）
- **pc**: パイカ（1pc = 12pt）
- **mm**: ミリメートル
- **cm**: センチメートル
- **in**: インチ

### 📚 今回の授業で詳しく学ぶ単位

今回の授業では、実際のWeb制作でよく使われる以下の単位を重点的に学習します：
- **px**、**em**、**rem**
- **vw**、**vh**

---

## ブラウザのデフォルトフォントサイズ

### 🔧 ブラウザの標準設定

多くのブラウザでは、デフォルトのフォントサイズが **16px** に設定されています。

```css
/* ブラウザのデフォルト設定（概ね） */
html {
    font-size: 16px;
}
```

このため、何も指定しない場合、文字のサイズは16pxで表示されます。

### 🛠️ ブラウザの設定でフォントサイズを変更

ブラウザの設定画面から、デフォルトのフォントサイズを変更することができます。

![ブラウザのフォントサイズ設定](@site/static/files/browser-default-font-size.png)

**Chromeでの設定方法**：
1. Chrome の設定を開く
2. 「デザイン」セクションを選択
3. 「フォントをカスタマイズ」をクリック
4. 「フォントサイズ」のスライダーで調整

この設定を変更すると、デフォルトのフォントサイズが変わります。

---

## 単位：px（ピクセル）

### 📱 ピクセルとは

**ピクセル（px）** は、画面の最小単位である「点」の数を表します。

```css
h1 {
    font-size: 24px; /* 24ピクセルのフォントサイズ */
}

p {
    font-size: 16px; /* 16ピクセルのフォントサイズ */
}
```

### 🔍 ピクセルを実際に見てみよう

以下の動画では、画面を拡大してピクセル（画素）がどのように見えるかを確認できます：

<iframe width="560" height="315" src="https://www.youtube.com/embed/WW0En8ClkkM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" allowfullscreen></iframe>

### 📐 font-sizeは実際に何の長さを指しているのか？

`font-size: 16px` と指定したとき、実際には**フォントデータ内のem square（エムスクエア）の高さ**を16pxに設定しています。

```css
p {
    font-size: 16px; /* フォントのem squareの高さを16pxに設定 */
}
```

**重要なポイント**：
- `font-size`で指定しているのは、文字そのものの高さではない
- フォントデータ内で定義されている「em square」という設計領域の高さ

![em squareとフォントサイズの関係](@site/static/files/em-square-font-size-animation.gif)

### pxの特徴

#### 📱 1pxのサイズはディスプレイによって異なる

**重要なポイント**: 1pxの実際の物理的なサイズは、使用しているディスプレイによって変わります。

- **高解像度ディスプレイ（4K、Retinaなど）**: 1pxがより小さい
- **低解像度ディスプレイ**: 1pxがより大きい
- **スマートフォン**: 非常に小さな1px

例えば：
- **iPhone（Retinaディスプレイ）**: 1px = 約0.076mm
- **一般的なPC用モニター**: 1px = 約0.25mm
- **大型テレビ**: 1px = 約0.5mm以上

このため、同じ`font-size: 16px`でも、デバイスによって実際の見た目の大きさは変わります。

---

## 単位：em

### 📖 emの概念

**em** は、要素のフォントサイズと同じ大きさを表す（但し、font-size で使用する場合は親要素のフォントサイズの大きさ）。

### emの重要なポイント

1. 例えば、フォントサイズが16pxの場合、1em = 16px
2. つまり、1em = 1文字分の大きさ　のイメージ

### 💡 使用例

以下のようなHTMLがあると想定します：

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>CSS単位の練習</title>
    <style>
        /* ここにCSSを書きます */
    </style>
</head>
<body>
    <h1>メインタイトル</h1>
    <h2>サブタイトル</h2>
    <p>段落のテキストです。<span>ここは強調部分</span>です。</p>
</body>
</html>
```

**emの使用例**：

```css
/* ブラウザのデフォルト（16px）の場合 */
p {
    font-size: 1em;    /* 16px と同じ */
    font-size: 1.5em;  /* 16*1.5 = 24px と同じ */
    font-size: 0.8em;  /* 16*0.8 = 12.8px と同じ */
}

span {
    font-size: 0.8em;  /* 親要素（p）のフォントサイズの0.8倍 */
}
```

---

## 単位：rem

### 🌱 remとは

**rem（root em）** は、ルート要素（`<html>`）のフォントサイズに対する倍数です。

### remの特徴

- **1rem = htmlのフォントサイズ**
- 親要素のフォントサイズに影響されない
- 計算が分かりやすい

```css
/* htmlのフォントサイズが16px（デフォルト）の場合 */
h1 {
    font-size: 2rem;    /* 32px */
}

h2 {
    font-size: 1.5rem;  /* 24px */
}

p {
    font-size: 1rem;    /* 16px */
}

small {
    font-size: 0.8rem;  /* 12.8px */
}
```

---

## 単位：vw・vh（ビューポート）

### 🖥️ ビューポート単位

**vw（viewport width）** と **vh（viewport height）** は、画面（ビューポート）のサイズに対する割合を表します。

- **1vw = ビューポート幅の1%**
- **1vh = ビューポート高さの1%**

![ビューポート単位の説明](@site/static/files/viewport-units-explanation.png)

### vw・vhの使用例

以下のHTMLで説明します：

```html
<body>
    <header>ヘッダー</header>
    <main>メインコンテンツ</main>
    <footer>フッター</footer>
</body>
```

```css
/* 画面幅いっぱいのヘッダー */
header {
    width: 100vw;        /* 画面幅の100% */
    height: 10vh;        /* 画面高さの10% */
    background-color: blue;
}

/* 画面中央の大きなボックス */
main {
    width: 80vw;         /* 画面幅の80% */
    height: 60vh;        /* 画面高さの60% */
    background-color: lightgray;
}

/* フッター */
footer {
    width: 100vw;        /* 画面幅の100% */
    height: 15vh;        /* 画面高さの15% */
    background-color: darkgray;
}
```

### vw・vhの特徴

- 画面サイズに対する割合で表示したい場合に便利

<Exercise title="演習1">

以下のHTMLファイルと外部CSSファイルを作成して、指定された見た目にしてください：

**要求**:
- `h1`のフォントサイズを32px、幅を画面幅の100%、背景色を青色（blue）に設定
- `h2`のフォントサイズを親要素のフォントサイズの1.5倍
- `p`のフォントサイズをhtml要素のフォントサイズの0.9倍
- `small`のフォントサイズを親要素のフォントサイズの0.8倍

**index.html**
```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>CSS単位演習</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>メインタイトル</h1>
    <h2>サブタイトル</h2>
    <p>本文のテキストです。<small>注釈テキスト</small></p>
</body>
</html>
```

**style.css（作成してください）**
- 上記の要求を満たすCSSを記述してください

<Solution>

**style.css**
```css
h1 {
    font-size: 32px;         /* 32px */
    width: 100vw;            /* 画面幅の100% */
    background-color: blue;  /* 青色の背景 */
}

h2 {
    font-size: 1.5em;   /* 親要素のフォントサイズ（body：16px）の1.5倍 = 24px */
}

p {
    font-size: 0.9rem;  /* html要素のフォントサイズ（16px）の0.9倍 = 14.4px */
}

small {
    font-size: 0.8em;   /* 親要素のフォントサイズ（p：14.4px）の0.8倍 = 11.52px */
}
```

</Solution>

</Exercise>

---

👋 おつかれさまでした！ 