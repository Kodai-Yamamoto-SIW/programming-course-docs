---
sidebar_position: 4
---

import CodePreview from '@site/src/components/CodePreview';
import Exercise from '@site/src/components/Exercise';

# ボックスモデル - サイズと余白の設定

## 今回学習する内容

- **クラスセレクタ**：特定のクラスを持つ要素を指定するセレクタ
- **width**：要素の幅を設定
- **height**：要素の高さを設定  
- **border**：要素の境界線（枠線）を設定
- **padding**：要素の内側の余白を設定
- **margin**：要素の外側の余白を設定
- **左右中央揃え**：margin の auto を使った中央配置

---

## 1. クラスセレクタを学習しよう

### 🏷️ クラスセレクタとは

**説明**: HTMLの要素に`class`属性を付けて、同じクラス名を持つ要素をまとめてスタイル指定できる仕組みです。

**書き方**:
```css
.クラス名 {
    プロパティ: 値;
}
```

**HTMLでの使い方**:
```html
<p class="クラス名">この段落にクラスが適用されます</p>
```

### クラスセレクタの基本例

<CodePreview 
  initialCode={`<h1>普通の見出し</h1>
<h1 class="special">特別な見出し</h1>
<h1>普通の見出し</h1>
<p class="special">特別な段落</p>
<p>普通の段落</p>`}
  initialCSS={`/* 全ての h1 要素 */
h1 {
    color: blue;
}

/* specialクラスを持つ要素 */
.special {
    background-color: yellow;
    color: red;
}`}
/>

**重要なポイント**:
- クラス名の前に `.`（ドット）を付ける
- 複数の要素に同じクラスを適用できる
- 1つの要素に複数のクラスを指定することも可能

<Exercise title="演習1">

以下のHTMLに対して、CSSを書いてください：

**HTML**:
```html
<h1>サイトタイトル</h1>
<p class="highlight">重要なお知らせ</p>
<p>通常の段落</p>
<p class="highlight">もう一つの重要な情報</p>
```

**要求**:
1. `highlight`クラスの要素に黄色の背景色を設定
2. `highlight`クラスの要素の文字色を赤に設定

**期待される表示**:
- サイトタイトルは通常の表示
- 「重要なお知らせ」と「もう一つの重要な情報」は黄色背景・赤文字
- 「通常の段落」は通常の表示

</Exercise>

<Exercise title="演習1-発展">

以下のHTMLに対して、CSSを書いてください：

**HTML**:
```html
<div class="container">
    <h1 class="title">サイトタイトル</h1>
    <p class="highlight">重要なお知らせ</p>
    <p class="normal">通常の段落</p>
    <p class="highlight warning">警告メッセージ</p>
</div>
```

**要求**:
1. `highlight`クラス：黄色の背景色、赤い文字色
2. `warning`クラス：境界線を2px solid orange で追加
3. `title`クラス：青い文字色
4. `normal`クラス：グレーの文字色

**ヒント**: 1つの要素に複数のクラス（`highlight warning`）が指定されている場合、両方のスタイルが適用されます。

</Exercise>

---

## 2. width（幅）を学習しよう

### 📏 widthプロパティとは

**説明**: 要素の幅（横の大きさ）を設定するプロパティです。デフォルトは`auto`（自動）です。

**基本的な書き方**:
```css
セレクタ {
    width: 値;
}
```

**指定できる値**:
- **ピクセル値**: `300px`, `500px` など
- **パーセント**: `50%`, `100%` など
- **auto**: 自動（デフォルト値）

### widthの動作例

<CodePreview 
  initialCode={`<div class="box1">幅100pxの箱</div>
<div class="box2">幅50%の箱</div>
<div class="box3">幅autoの箱（デフォルト）</div>`}
  initialCSS={`.box1 {
    width: 100px;
    background-color: lightblue;
}

.box2 {
    width: 50%;
    background-color: lightgreen;
}

.box3 {
    width: auto;
    background-color: lightyellow;
}`}
/>

:::important width: auto の重要な特性

`width: auto`（デフォルト値）は**親要素の幅いっぱいに広がります**。

ブロック要素（`div`、`p`、`h1`など）のデフォルトの`width`は`auto`なので、何も指定しなければ自動的に親要素の横幅いっぱいに広がります。

:::

**その他のポイント**:
- パーセントは親要素の幅に対する割合
- ピクセルは絶対的な値

<Exercise title="演習2">

以下のHTMLに対して、CSSを書いてください：

**HTML**:
```html
<div class="narrow">狭い箱</div>
<div class="medium">中くらいの箱</div>
<div class="wide">広い箱</div>
```

**要求**:
1. `narrow`クラス：幅200px
2. `medium`クラス：幅40%
3. `wide`クラス：幅80%

</Exercise>

<Exercise title="演習2-発展">

以下のHTMLに対して、CSSを書いてください：

**HTML**:
```html
<div class="container">
    <div class="narrow">狭い箱</div>
    <div class="medium">中くらいの箱</div>
    <div class="wide">広い箱</div>
</div>
```

**要求**:
1. `narrow`クラス：幅200px、背景色を薄い青に設定
2. `medium`クラス：幅40%、背景色を薄い緑に設定  
3. `wide`クラス：幅80%、背景色を薄い黄色に設定

</Exercise>

---

## 3. height（高さ）を学習しよう

### 📏 heightプロパティとは

**説明**: 要素の高さ（縦の大きさ）を設定するプロパティです。デフォルトは`auto`（自動）です。

**基本的な書き方**:
```css
セレクタ {
    height: 値;
}
```

**指定できる値**:
- **ピクセル値**: `100px`, `200px` など
- **パーセント**: `50%`, `100%` など（注意：親要素に高さが必要）
- **auto**: 自動（デフォルト値）

### heightの動作例

<CodePreview 
  initialCode={`<div class="tall">高さ150pxの箱</div>
<div class="short">高さ50pxの箱</div>
<div class="auto-height">高さautoの箱（中身に合わせて自動調整）</div>`}
  initialCSS={`.tall {
    height: 150px;
    width: 200px;
    background-color: lightcoral;
}

.short {
    height: 50px;
    width: 200px;
    background-color: lightblue;
}

.auto-height {
    height: auto;
    width: 200px;
    background-color: lightgreen;
}`}
/>

**重要なポイント**:
- `height: auto`は中身（テキストなど）に合わせて高さが決まる
- パーセントで指定する場合、親要素に明確な高さが必要
- 内容が指定した高さより大きい場合、はみ出ることがある

<Exercise title="演習3">

以下のHTMLに対して、CSSを書いてください：

**HTML**:
```html
<div class="square">正方形の箱</div>
<div class="rectangle">長方形の箱</div>
<div class="small-box">小さな箱</div>
```

**要求**:
1. `square`クラス：幅200px、高さ200px
2. `rectangle`クラス：幅300px、高さ100px
3. `small-box`クラス：幅100px、高さ80px

</Exercise>

<Exercise title="演習3-発展">

以下のHTMLに対して、CSSを書いてください：

**HTML**:
```html
<div class="square">正方形の箱</div>
<div class="rectangle">長方形の箱</div>
<div class="small-box">小さな箱</div>
```

**要求**:
1. `square`クラス：幅200px、高さ200px、背景色を薄い赤に設定
2. `rectangle`クラス：幅300px、高さ100px、背景色を薄い青に設定
3. `small-box`クラス：幅100px、高さ80px、背景色を薄い緑に設定

</Exercise>

---

## 4. border（境界線）を学習しよう

### 🖼️ borderプロパティとは

**説明**: 要素の周りに境界線（枠線）を表示するプロパティです。線の太さ、スタイル、色を指定できます。

**基本的な書き方**:
```css
セレクタ {
    border: 太さ スタイル 色;
}
```

**線のスタイル**:
- `solid`: 実線
- `dashed`: 破線
- `dotted`: 点線
- `double`: 二重線

### borderの動作例

<CodePreview 
  initialCode={`<div class="solid-border">実線の境界線</div>
<div class="dashed-border">破線の境界線</div>
<div class="thick-border">太い境界線</div>
<div class="colored-border">色付きの境界線</div>`}
  initialCSS={`.solid-border {
    border: 1px solid black;
    width: 200px;
    height: 50px;
    margin: 10px;
}

.dashed-border {
    border: 2px dashed blue;
    width: 200px;
    height: 50px;
    margin: 10px;
}

.thick-border {
    border: 5px solid red;
    width: 200px;
    height: 50px;
    margin: 10px;
}

.colored-border {
    border: 3px solid green;
    width: 200px;
    height: 50px;
    margin: 10px;
    background-color: lightyellow;
}`}
/>

**個別指定も可能**:
```css
.detailed-border {
    border-width: 2px;     /* 太さ */
    border-style: solid;   /* スタイル */
    border-color: blue;    /* 色 */
}
```

<Exercise title="演習4">

以下のHTMLに対して、CSSを書いてください：

**HTML**:
```html
<div class="frame1">額縁風の箱1</div>
<div class="frame2">額縁風の箱2</div>
<div class="frame3">額縁風の箱3</div>
```

**要求**:
1. `frame1`クラス：2px の黒い実線の境界線
2. `frame2`クラス：3px の青い破線の境界線
3. `frame3`クラス：5px の赤い実線の境界線

</Exercise>

<Exercise title="演習4-発展">

以下のHTMLに対して、CSSを書いてください：

**HTML**:
```html
<div class="card1">カード1</div>
<div class="card2">カード2</div>
<div class="card3">カード3</div>
```

**要求**:
1. `card1`クラス：幅250px、高さ100px、2px の黒い実線の境界線、背景色を薄い青
2. `card2`クラス：幅250px、高さ100px、3px の青い破線の境界線、背景色を薄い黄色
3. `card3`クラス：幅250px、高さ100px、5px の赤い実線の境界線、背景色を薄い緑

</Exercise>

---

## 5. padding（内側の余白）を学習しよう

### 📦 paddingプロパティとは

**説明**: 要素の境界線から内容（テキストなど）までの余白を設定するプロパティです。要素の内側の余白です。

**基本的な書き方**:
```css
/* 全方向に同じ余白 */
セレクタ {
    padding: 値;
}

/* 上下・左右で指定 */
セレクタ {
    padding: 上下 左右;
}

/* 上・左右・下で指定 */
セレクタ {
    padding: 上 左右 下;
}

/* 上・右・下・左で個別指定 */
セレクタ {
    padding: 上 右 下 左;
}
```

### paddingの動作例

<CodePreview 
  initialCode={`<div class="no-padding">余白なし</div>
<div class="small-padding">小さな余白</div>
<div class="large-padding">大きな余白</div>
<div class="custom-padding">カスタム余白</div>`}
  initialCSS={`.no-padding {
    padding: 0;
    border: 2px solid black;
    background-color: lightblue;
    width: 200px;
    margin: 10px;
}

.small-padding {
    padding: 10px;
    border: 2px solid black;
    background-color: lightgreen;
    width: 200px;
    margin: 10px;
}

.large-padding {
    padding: 30px;
    border: 2px solid black;
    background-color: lightyellow;
    width: 200px;
    margin: 10px;
}

.custom-padding {
    padding: 20px 40px;  /* 上下20px、左右40px */
    border: 2px solid black;
    background-color: lightcoral;
    width: 200px;
    margin: 10px;
}`}
/>

**個別指定も可能**:
```css
.individual-padding {
    padding-top: 10px;      /* 上 */
    padding-right: 20px;    /* 右 */
    padding-bottom: 15px;   /* 下 */
    padding-left: 25px;     /* 左 */
}
```

<Exercise title="演習5">

以下のHTMLに対して、CSSを書いてください：

**HTML**:
```html
<div class="box1">箱1</div>
<div class="box2">箱2</div>
<div class="box3">箱3</div>
```

**要求**:
1. `box1`クラス：padding 15px
2. `box2`クラス：padding 上下10px・左右30px
3. `box3`クラス：padding 上20px・右10px・下15px・左25px

</Exercise>

<Exercise title="演習5-発展">

以下のHTMLに対して、CSSを書いてください：

**HTML**:
```html
<div class="card1">カード1</div>
<div class="card2">カード2</div>
<div class="card3">カード3</div>
```

**要求**:
1. `card1`クラス：幅200px、高さ100px、padding 15px、境界線 1px solid gray、背景色 lightblue
2. `card2`クラス：幅200px、高さ100px、padding 上下10px・左右30px、境界線 2px solid blue、背景色 lightgreen  
3. `card3`クラス：幅200px、高さ100px、padding 上20px・右10px・下15px・左25px、境界線 1px solid red、背景色 lightyellow

</Exercise>

---

## 6. margin（外側の余白）を学習しよう

### 🌍 marginプロパティとは

**説明**: 要素の境界線から他の要素までの余白を設定するプロパティです。要素の外側の余白です。

**基本的な書き方**:
```css
/* 全方向に同じ余白 */
セレクタ {
    margin: 値;
}

/* 上下・左右で指定 */
セレクタ {
    margin: 上下 左右;
}

/* 上・右・下・左で個別指定 */
セレクタ {
    margin: 上 右 下 左;
}
```

### marginの動作例

<CodePreview 
  initialCode={`<div class="no-margin">余白なし</div>
<div class="small-margin">小さな余白</div>
<div class="large-margin">大きな余白</div>
<div class="custom-margin">カスタム余白</div>`}
  initialCSS={`.no-margin {
    margin: 0;
    padding: 10px;
    border: 2px solid black;
    background-color: lightblue;
    width: 200px;
}

.small-margin {
    margin: 10px;
    padding: 10px;
    border: 2px solid black;
    background-color: lightgreen;
    width: 200px;
}

.large-margin {
    margin: 30px;
    padding: 10px;
    border: 2px solid black;
    background-color: lightyellow;
    width: 200px;
}

.custom-margin {
    margin: 20px 40px;  /* 上下20px、左右40px */
    padding: 10px;
    border: 2px solid black;
    background-color: lightcoral;
    width: 200px;
}`}
/>

**個別指定も可能**:
```css
.individual-margin {
    margin-top: 10px;      /* 上 */
    margin-right: 20px;    /* 右 */
    margin-bottom: 15px;   /* 下 */
    margin-left: 25px;     /* 左 */
}
```

<Exercise title="演習6">

以下のHTMLに対して、CSSを書いてください：

**HTML**:
```html
<div class="section1">セクション1</div>
<div class="section2">セクション2</div>
<div class="section3">セクション3</div>
```

**要求**:
1. `section1`クラス：margin 20px
2. `section2`クラス：margin 上下30px・左右0
3. `section3`クラス：margin 上10px・右20px・下30px・左40px

</Exercise>

<Exercise title="演習6-発展">

以下のHTMLに対して、CSSを書いてください：

**HTML**:
```html
<div class="section1">セクション1</div>
<div class="section2">セクション2</div>
<div class="section3">セクション3</div>
```

**要求**:
1. `section1`クラス：幅300px、height 80px、margin 20px、padding 15px、境界線 1px solid black、背景色 lightblue
2. `section2`クラス：幅300px、height 80px、margin 上下30px・左右0、padding 15px、境界線 1px solid black、背景色 lightgreen
3. `section3`クラス：幅300px、height 80px、margin 上10px・右20px・下30px・左40px、padding 15px、境界線 1px solid black、背景色 lightyellow

</Exercise>

---

## 7. 左右中央揃えを学習しよう

### ⚖️ margin auto を使った中央揃え

**説明**: `margin`の左右に`auto`を指定すると、要素を左右中央に配置できます。

**基本的な書き方**:
```css
セレクタ {
    margin: 0 auto;        /* 上下0、左右auto */
    margin-left: auto;     /* 左だけauto */
    margin-right: auto;    /* 右だけauto */
}
```

**重要な条件**:
- 要素に明確な`width`が設定されている必要がある
- ブロック要素である必要がある

### 中央揃えの動作例

<CodePreview 
  initialCode={`<div class="left-align">左寄せ（デフォルト）</div>
<div class="center-align">中央揃え</div>
<div class="center-with-margin">中央揃え（margin指定）</div>`}
  initialCSS={`.left-align {
    width: 300px;
    height: 60px;
    background-color: lightblue;
    border: 1px solid black;
    padding: 10px;
    margin-bottom: 10px;
}

.center-align {
    width: 300px;
    height: 60px;
    background-color: lightgreen;
    border: 1px solid black;
    padding: 10px;
    margin: 0 auto;        /* 左右中央揃え */
    margin-bottom: 10px;
}

.center-with-margin {
    width: 250px;
    height: 60px;
    background-color: lightyellow;
    border: 1px solid black;
    padding: 10px;
    margin: 20px auto;     /* 上下20px、左右auto */
}`}
/>

<Exercise title="演習7">

以下のHTMLに対して、CSSを書いてください：

**HTML**:
```html
<div class="header-box">ヘッダー</div>
<div class="content-box">メインコンテンツ</div>
<div class="footer-box">フッター</div>
```

**要求**:
1. `header-box`クラス：幅400px、左右中央揃え
2. `content-box`クラス：幅600px、左右中央揃え
3. `footer-box`クラス：幅400px、左右中央揃え

</Exercise>

<Exercise title="演習7-発展">

以下のHTMLに対して、CSSを書いてください：

**HTML**:
```html
<div class="header-box">ヘッダー</div>
<div class="content-box">メインコンテンツ</div>
<div class="footer-box">フッター</div>
```

**要求**:
1. `header-box`クラス：幅400px、height 80px、padding 20px、境界線 2px solid navy、背景色 lightblue、左右中央揃え
2. `content-box`クラス：幅600px、height 200px、padding 30px、境界線 1px solid gray、背景色 white、左右中央揃え、上下margin 20px
3. `footer-box`クラス：幅400px、height 60px、padding 15px、境界線 2px solid navy、背景色 lightgray、左右中央揃え

</Exercise>

---

## 8. 総合演習

<Exercise title="演習7-発展">

以下のHTMLに対して、美しいカードレイアウトを作成してください：

**HTML**:
```html
<div class="container">
    <div class="card featured">
        <h2>特集記事</h2>
        <p>今月の特集記事です。</p>
    </div>
    <div class="card normal">
        <h2>通常記事1</h2>
        <p>通常の記事です。</p>
    </div>
    <div class="card normal">
        <h2>通常記事2</h2>
        <p>通常の記事です。</p>
    </div>
</div>
```

**要求**:
1. `container`クラス：最大幅800px、左右中央揃え、padding 20px
2. `card`クラス（共通）：幅100%、padding 20px、margin-bottom 20px、境界線 1px solid #ddd
3. `featured`クラス：背景色 #f0f8ff、境界線 3px solid #4169e1
4. `normal`クラス：背景色 #ffffff

**ボーナス要求**:
- `card`クラスにhover効果を追加（`:hover`疑似クラス）
- より美しい見た目になるように工夫してみてください

</Exercise>

---

## まとめ

この授業では以下の内容を学習しました：

### 学習したCSS機能

1. **クラスセレクタ** (`.class名`)
   - 特定のクラスを持つ要素をスタイル指定
   
2. **width プロパティ**
   - 要素の幅を設定（px、%、auto）
   
3. **height プロパティ**
   - 要素の高さを設定（px、%、auto）
   
4. **border プロパティ**
   - 要素の境界線を設定（太さ、スタイル、色）
   
5. **padding プロパティ**
   - 要素の内側の余白を設定
   
6. **margin プロパティ**
   - 要素の外側の余白を設定
   
7. **左右中央揃え**
   - `margin: 0 auto` を使った中央配置

### ボックスモデルの理解

要素は以下の構造になっています：

```
margin（外側の余白）
  ↓
border（境界線）
  ↓  
padding（内側の余白）
  ↓
content（内容）width × height
```

### 次回に向けて

次回は、テキストのスタイリング（`font-size`、`text-align`、`line-height`）について学習します。今回学んだボックスモデルと組み合わせて、より美しいレイアウトを作成していきましょう。 