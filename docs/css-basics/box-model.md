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
<h1 class="mark">特別な見出し</h1>
<h1>普通の見出し</h1>
<p class="mark">特別な段落</p>
<p>普通の段落</p>`}
  initialCSS={`/* 全ての h1 要素 */
h1 {
    color: blue;
}

/* markクラスを持つ要素 */
.mark {
    background-color: yellow;
    color: red;
}`}
/>

**重要なポイント**:
- クラス名の前に `.`（ドット）を付ける
- 複数の要素に同じクラスを適用できる

<Exercise title="演習1(1)">

以下のHTMLに対して、CSSを書いてください：

**HTML**:
```html
<h1>サイトタイトル</h1>
<p class="mark">重要なお知らせ</p>
<p>通常の段落</p>
<p class="mark">もう一つの重要な情報</p>
```

**要求**:
1. `mark`クラスの要素に黄色の背景色を設定
2. `mark`クラスの要素の文字色を赤に設定

**期待される表示**:
- サイトタイトルは通常の表示
- 「重要なお知らせ」と「もう一つの重要な情報」は黄色背景・赤文字
- 「通常の段落」は通常の表示

</Exercise>

<Exercise title="演習1(2)">

以下のHTMLに対して、適切なクラス名を付けてCSSを書いてください：

**HTML**:
```html
<h1>ニュースサイト</h1>
<h2>速報：台風が接近中</h2>
<p>最新の気象情報をお届けします。</p>
<div>緊急避難情報が発表されました。</div>
<p>通常のニュース記事です。</p>
```

**要求**:
1. 「速報：台風が接近中」と「緊急避難情報が発表されました。」に同じクラス名を付けて、背景色を赤、文字色を白に設定
2. 「最新の気象情報をお届けします。」と「通常のニュース記事です。」に同じクラス名を付けて、背景色を薄い青に設定

**ヒント**:
- クラス名は内容を表す分かりやすい名前をつけましょう（例：`urgent`、`info`など）

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

**ヒント**: HTMLでは、スペース区切りで複数のクラスを指定することができます。

例えば `class="highlight warning"` の場合：
- `highlight`というクラス
- `warning`というクラス

この2つのクラスが指定されており、両方のスタイルが適用されます。つまり、黄色い背景色と赤い文字色（`highlight`クラス）に加えて、オレンジの境界線（`warning`クラス）も表示されます。

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
    background-color: lightcoral;
}`}
/>

:::info width: auto の重要な特性

`width: auto`（デフォルト値）は**親要素の幅いっぱいに広がります**。

デフォルトの`width`は`auto`なので、ブロック要素（`div`、`p`、`h1`など）は、何も指定しなければ自動的に親要素の横幅いっぱいに広がります。

:::

**その他のポイント**:
- パーセントは親要素の幅に対する割合
- ピクセルは絶対的な値

<Exercise title="演習2">

以下のHTMLに対して、CSSを書いてください：

**HTML**:
```html
<div class="box1">狭い箱</div>
<div class="box2">中くらいの箱</div>
<div class="box3">広い箱</div>
```

**要求**:
1. `box1`クラス：幅200px
2. `box2`クラス：幅40%
3. `box3`クラス：幅80%

</Exercise>

<Exercise title="演習2-発展">

以下のHTMLに対して、CSSを書いてください：

**HTML**:
```html
<div class="box">
    <div class="box1">狭い箱</div>
    <div class="box2">中くらいの箱</div>
    <div class="box3">広い箱</div>
    <div class="box4">画面幅の箱</div>
</div>
```

**要求**:
1. `box1`クラス：幅15rem、背景色を薄い青に設定
2. `box2`クラス：幅40%、背景色を薄い緑に設定  
3. `box3`クラス：幅30em、背景色を薄い黄色に設定
4. `box4`クラス：幅50vw、背景色を薄いピンクに設定

**ヒント**:
- rem、em、vw など様々な単位を使って幅を指定してみましょう

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

:::tip heightプロパティのポイント

- `height: auto`は中身（テキストなど）に合わせて高さが決まる
- パーセントで指定する場合、親要素に明確な高さが必要
- 内容が指定した高さより大きい場合、はみ出ることがある

:::

<Exercise title="演習3">

以下のHTMLに対して、CSSを書いてください：

**HTML**:
```html
<div class="box1">正方形の箱</div>
<div class="box2">長方形の箱</div>
<div class="box3">小さな箱</div>
```

**要求**:
1. `box1`クラス：幅200px、高さ200px
2. `box2`クラス：幅300px、高さ100px
3. `box3`クラス：幅100px、高さ80px

</Exercise>

<Exercise title="演習3-発展">

以下のHTMLに対して、CSSを書いてください：

**HTML**:
```html
<div class="box1">ヒーローセクション</div>
<div class="box2">カードセクション</div>
<div class="box3">サイドバー</div>
```

**要求**:
1. `box1`クラス：幅50vw、高さ30vh、背景色を16進数カラーコード`#FF6B35`、文字色を白
2. `box2`クラス：幅25rem、高さ15em、背景色をRGB値`rgb(46, 125, 50)`、文字色を16進数`#FFFFFF`
3. `box3`クラス：幅200px、高さ80%、背景色をRGBA値`rgba(63, 81, 181, 0.8)`、文字色をカラーネーム`white`

**ヒント**:
- 様々な単位（vw、vh、rem、em、px、%）と色指定方法（16進数、RGB、RGBA、カラーネーム）を使い分けてみましょう

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



<Exercise title="演習4">

以下のHTMLに対して、CSSを書いてください：

**HTML**:
```html
<div class="box1">額縁風の箱1</div>
<div class="box2">額縁風の箱2</div>
<div class="box3">額縁風の箱3</div>
```

**要求**:
1. `box1`クラス：2px の黒い実線の境界線
2. `box2`クラス：3px の青い破線の境界線
3. `box3`クラス：5px の赤い実線の境界線

**ヒント**:
- borderは「太さ スタイル 色」の3つの要素をきちんと読み取りましょう

</Exercise>

<Exercise title="演習4-発展">

以下のHTMLに対して、CSSを書いてください：

**HTML**:
```html
<div class="alert">緊急通知</div>
<div class="info">お知らせ</div>
<div class="success">完了メッセージ</div>
```

**要求**:
1. `alert`クラス：幅20rem、高さ8vh、4px の16進数カラーコード`#FF0000`の実線境界線、背景色をRGBA`rgba(255, 0, 0, 0.1)`
2. `info`クラス：幅300px、高さ6em、2px のRGB値`rgb(0, 123, 255)`の破線境界線、背景色を16進数`#E7F3FF`
3. `success`クラス：幅25vw、高さ80px、3px のカラーネーム`green`の二重線境界線、背景色をRGBパーセント`rgb(90%, 100%, 90%)`

**ヒント**:
- 境界線の色と背景色で統一感のあるデザインにしましょう
- 様々な単位と色指定方法を使い分けてみましょう

</Exercise>

---

## 5. padding（内側の余白）を学習しよう

### 📦 paddingプロパティとは

**説明**: 要素の境界線から内容（テキストなど）までの余白を設定するプロパティです。要素の内側の余白です。

**基本的な書き方**:

paddingは、スペース区切りで値を書くことで、様々な指定方法ができます：

```css
/* 1つの値：全方向に同じ余白 */
セレクタ {
    padding: 値;  /* 上下左右すべて同じ値 */
}

/* 4つの値：上・右・下・左で個別指定 */
セレクタ {
    padding: 上 右 下 左;  /* 上から順に時計回り */
}

/* 2つの値：上下・左右で指定 */
セレクタ {
    padding: 上下 左右;  /* 1つ目が上下、2つ目が左右 */
}

/* 3つの値：上・左右・下で指定 */
セレクタ {
    padding: 上 左右 下;  /* 1つ目が上、2つ目が左右、3つ目が下 */
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



<Exercise title="演習5">

以下のHTMLに対して、CSSを書いてください：

**HTML**:
```html
<div class="box1">箱1</div>
<div class="box2">箱2</div>
<div class="box3">箱3</div>
```

**要求**:
1. `box1`クラス：padding 上下左右15px、背景色を`lightblue`
2. `box2`クラス：padding 上下10px・左右30px、背景色を`#90EE90`
3. `box3`クラス：padding 上20px・右10px・下15px・左25px、背景色を`rgb(255, 255, 180)`

</Exercise>

<Exercise title="演習5-発展">

以下のHTMLに対して、CSSを書いてください：

**HTML**:
```html
<div class="box1">カード1</div>
<div class="box2">カード2</div>
<div class="box3">カード3</div>
```

**要求**:
1. `box1`クラス：幅200px、高さ100px、padding 上下左右15px、境界線 1px solid gray、背景色 lightblue
2. `box2`クラス：幅200px、高さ100px、padding 上下10px・左右30px、境界線 2px solid blue、背景色 lightgreen  
3. `box3`クラス：幅200px、高さ100px、padding 上20px・右10px・下15px・左25px、境界線 1px solid red、背景色 lightyellow

</Exercise>

---

## 6. margin（外側の余白）を学習しよう

### 🌍 marginプロパティとは

**説明**: 要素の境界線から他の要素までの余白を設定するプロパティです。要素の外側の余白です。

**基本的な書き方**:

marginは、スペース区切りで値を書くことで、様々な指定方法ができます：

```css
/* 1つの値：全方向に同じ余白 */
セレクタ {
    margin: 値;  /* 上下左右すべて同じ値 */
}

/* 4つの値：上・右・下・左で個別指定 */
セレクタ {
    margin: 上 右 下 左;  /* 上から順に時計回り */
}

/* 2つの値：上下・左右で指定 */
セレクタ {
    margin: 上下 左右;  /* 1つ目が上下、2つ目が左右 */
}

/* 3つの値：上・左右・下で指定 */
セレクタ {
    margin: 上 左右 下;  /* 1つ目が上、2つ目が左右、3つ目が下 */
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



<Exercise title="演習6">

以下のHTMLに対して、CSSを書いてください：

**HTML**:
```html
<div class="box1">セクション1</div>
<div class="box2">セクション2</div>
<div class="box3">セクション3</div>
```

**要求**:
1. `box1`クラス：margin 上下左右20px、背景色を`lightcoral`
2. `box2`クラス：margin 上下30px・左右0、背景色を`#FFE4B5`
3. `box3`クラス：margin 上10px・右20px・下30px・左40px、背景色を`rgb(144, 238, 144)`

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
1. `box1`クラス：幅300px、height 80px、margin 上下左右20px、padding 上下左右15px、境界線 1px solid black、背景色 lightblue
2. `box2`クラス：幅300px、height 80px、margin 上下30px・左右0、padding 上下左右15px、境界線 1px solid black、背景色 lightgreen
3. `box3`クラス：幅300px、height 80px、margin 上10px・右20px・下30px・左40px、padding 上下左右15px、境界線 1px solid black、背景色 lightyellow

</Exercise>

---

## 7. 左右中央揃えを学習しよう

### ⚖️ margin auto を使った中央揃え

**説明**: `margin`の左右に`auto`を指定すると、要素を左右中央に配置できます。

**基本的な書き方**:
```css
セレクタ {
    margin: 0 auto;        /* 上下0、左右auto */
}
```

:::important 重要な仕組み

`margin: 0 auto` のように左右に `auto` を指定すると、左右の余白が自動的に等しくなり、その結果、要素自体が親要素の中央に配置されます。

:::

:::caution 必要な条件

- 要素に明確な`width`が設定されている必要がある
- ブロック要素である必要がある

:::

### 中央揃えの動作例

<CodePreview 
  initialCode={`<div class="left-align">左寄せ（デフォルト）</div>
<div class="center-align">中央揃え</div>
<div class="center-with-margin">中央揃え（上下margin付き）</div>`}
  initialCSS={`.left-align {
    width: 150px;
    height: 60px;
    background-color: lightblue;
    border: 1px solid black;
    padding: 10px;
}

.center-align {
    width: 150px;
    height: 60px;
    background-color: lightgreen;
    border: 1px solid black;
    padding: 10px;
    margin: 0 auto;        /* 左右中央揃え */
}

.center-with-margin {
    width: 150px;
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
<div class="box1">ヘッダー</div>
<div class="box2">メインコンテンツ</div>
```

**要求**:
1. `box1`クラス：幅300px、左右中央揃え、境界線 1px solid black
2. `box2`クラス：幅500px、左右中央揃え、境界線 1px solid black

</Exercise>

<Exercise title="演習7-発展">

以下のHTMLに対して、「カフェのメニューボード」のようなレイアウトを作成してください：

**HTML**:
```html
<div class="title">CAFE MENU</div>
<div class="menu1">ホットコーヒー ¥300</div>
<div class="menu2">アイスラテ ¥400</div>
<div class="menu3">チーズケーキ ¥500</div>
<div class="special">本日のスペシャル：限定パンケーキ ¥800</div>
```

**要求**:
1. `title`クラス：幅600px、height 60px、padding 20px、背景色 `#8B4513`、文字色 white、左右中央揃え
2. `menu1`クラス：幅400px、padding 15px、margin 上下10px・左右auto、背景色 `#F5F5DC`、境界線 1px solid brown
3. `menu2`クラス：幅400px、padding 15px、margin 上下10px・左右auto、背景色 `#F0F8FF`、境界線 1px solid blue  
4. `menu3`クラス：幅400px、padding 15px、margin 上下10px・左右auto、背景色 `#FFF8DC`、境界線 1px solid orange
5. `special`クラス：幅500px、padding 20px、margin 上下20px・左右auto、背景色 `#FFD700`、境界線 3px solid red

**ポイント**:
- カフェのメニューボードのような見た目を目指しましょう！

</Exercise>

---

## 8. 総合演習

<Exercise title="総合演習">

以下のHTMLに対して、美しいカードレイアウトを作成してください：

**HTML**:
```html
<div class="box">
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
1. `box`クラス：最大幅800px、左右中央揃え、padding 20px
2. `card`クラス（共通）：幅100%、padding 20px、margin-bottom 20px、境界線 1px solid #ddd
3. `featured`クラス：背景色 #f0f8ff、境界線 3px solid #4169e1
4. `normal`クラス：背景色 #ffffff

**ボーナス要求**:
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

:::note ボックスモデルの構造

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

:::
