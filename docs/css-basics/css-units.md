---
sidebar_position: 2
---

import Exercise, { Solution } from '@site/src/components/Exercise';
import CodePreview from '@site/src/components/CodePreview';

# 単位

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

<CodePreview 
  initialCode={`<h1>24pxの見出し</h1>
<h2>20pxの小見出し</h2>
<p>16pxの段落テキスト</p>
<small>12pxの小さなテキスト</small>`}
  initialCSS={`h1 {
    font-size: 24px; /* 24ピクセルのフォントサイズ */
}

h2 {
    font-size: 20px; /* 20ピクセルのフォントサイズ */
}

p {
    font-size: 16px; /* 16ピクセルのフォントサイズ */
}

small {
    font-size: 12px; /* 12ピクセルのフォントサイズ */
}`}
/>

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
- このため、フォントサイズは文字の上下にある余白も含めたサイズを指定していることに注意

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

### 💡 emの相対的な性質を理解しよう

<CodePreview 
  initialCode={`<h1>大きな見出し（24px）<span>子要素は1em</span></h1>

<h2>普通の見出し（16px）<span>子要素は1em</span></h2>`}
  initialCSS={`/* emは親要素のフォントサイズに依存する */
h1 {
    font-size: 24px; /* 見出しを24pxに設定 */
}

h2 {
    font-size: 16px; /* 見出しを16pxに設定 */
}

span {
    font-size: 1em; /* 親要素のフォントサイズの1倍 */
}`}
/>

---

## 単位：rem

### 🌱 remとは

**rem（root em）** は、ルート要素（`<html>`）のフォントサイズに対する倍数です。

### remの特徴

- **1rem = htmlのフォントサイズ**
- 親要素のフォントサイズに影響されない
- 計算が分かりやすい

### remの絶対的な性質を理解しよう

<CodePreview 
  initialCode={`<h1>大きな見出し（24px）<span>子要素は1rem</span></h1>

<h2>小さな見出し（12px）<span>子要素は1rem</span></h2>`}
  initialCSS={`/* remは常にhtml要素のフォントサイズ（16px）に依存 */
h1 {
    font-size: 24px; /* 見出しを24pxに設定 */
}

h2 {
    font-size: 12px; /* 見出しを12pxに設定 */
}

span {
    font-size: 1rem; /* html（16px）の1倍 = 16px（親に影響されない） */
}`}
/>

---

## 単位：vw・vh（ビューポート）

### 🖥️ ビューポート単位

**vw（viewport width）** と **vh（viewport height）** は、画面（ビューポート）のサイズに対する割合を表します。

- **1vw = ビューポート幅の1%**
- **1vh = ビューポート高さの1%**

![ビューポート単位の説明](@site/static/files/viewport-units-explanation.png)

### vw・vhの使用例

<CodePreview 
  initialCode={`<header>ヘッダー（画面幅100%、高さ10%）</header>
<main>メインコンテンツ（画面幅80%、高さ60%）</main>
<footer>フッター（画面幅100%、高さ15%）</footer>`}
  initialCSS={`header {
    width: 100vw;  /* 画面幅の100% */
    height: 10vh;  /* 画面高さの10% */
    background-color: blue;
}

main {
    width: 80vw;  /* 画面幅の80% */
    height: 60vh; /* 画面高さの60% */
    background-color: lightgray;
}

footer {
    width: 100vw;  /* 画面幅の100% */
    height: 15vh;  /* 画面高さの15% */
    background-color: darkgray;
}`}
/>

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

<CodePreview 
  initialCode={`<!DOCTYPE html>
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
</html>`}
  initialCSS={`h1 {
    font-size: 32px;        /* 32px */
    width: 100vw;           /* 画面幅の100% */
    background-color: blue; /* 青色の背景 */
}

h2 {
    font-size: 1.5em; /* 親要素のフォントサイズ（body：16px）の1.5倍 = 24px */
}

p {
    font-size: 0.9rem; /* html要素のフォントサイズ（16px）の0.9倍 = 14.4px */
}

small {
    font-size: 0.8em; /* 親要素のフォントサイズ（p：14.4px）の0.8倍 = 11.52px */
}`}
/>

</Solution>

</Exercise>

---

👋 おつかれさまでした！ 