---
sidebar_position: 4
---

import CodePreview from '@site/src/components/CodePreview';
import Exercise, { Solution } from '@site/src/components/Exercise';

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

## ボックスモデルとは？

### 🔍 Webページの要素はすべて「箱」でできている

Webページ上のすべての要素（文字、画像、ボタンなど）は、実は「箱（ボックス）」として構成されています。この箱の構造を**ボックスモデル**と呼びます。

:::info Chrome Developer Tools で確認してみよう

Google Chromeの開発者ツールを使うと、実際にボックスモデルを確認できます：

1. ブラウザで右クリック → 「検証」
2. 左側のHTML要素から調べたい要素をクリックして選択
3. 右側の「計算済み」（Computed）タブをクリック
4. タブ内にボックスモデルの図が表示される
5. 図の各領域にマウスを重ねると、実際のページ上でその部分がハイライトされる

:::

### 📦 ボックスモデルの構造

各要素は以下の4つの領域で構成されています：

1. **content（内容）**: テキストや画像などの実際の内容（width × height で指定）
2. **padding（内側の余白）**: 内容と境界線の間のスペース
3. **border（境界線）**: 要素の枠線
4. **margin（外側の余白）**: 他の要素との間のスペース

### ボックスモデル確認用サンプル

以下のサンプルをChromeのインスペクターで確認してみましょう：

<CodePreview 
  initialCode={`<div>
  このテキストがcontent（内容）です
</div>
<div>
  もう一つのボックス
</div>`}
  initialCSS={`div {
    width: 200px;
    height: 80px;
    padding: 20px;
    border: 3px solid blue;
    margin: 15px;
    background-color: lightblue;
}`}
/>

**確認手順**:
1. 上のプレビューで右クリック → 「検証」
2. 開発者ツールの左上にある要素選択ボタン（□に矢印のアイコン）をクリック
3. 左側のHTML要素から`<div>`要素をクリックして選択
4. 右側の「計算済み」（Computed）タブをクリック
5. タブ内にボックスモデルの図が表示される
6. 図の各領域（content, padding, border, margin）の数値を確認
7. 図の各領域にマウスを重ねると、プレビュー上でその部分がハイライトされる

### 🎯 今日の学習目標

今日はこれらの各部分を**CSS**で自由に設定する方法を学習していきます！

- **width/height**: 内容領域のサイズを指定
- **padding**: 内側の余白を調整
- **border**: 境界線のスタイルを設定
- **margin**: 外側の余白をコントロール

これらをマスターすることで、美しいレイアウトが作れるようになります。

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

<Solution>

<CodePreview 
  initialCode={`<h1>サイトタイトル</h1>
<p class="mark">重要なお知らせ</p>
<p>通常の段落</p>
<p class="mark">もう一つの重要な情報</p>`}
  initialCSS={`.mark {
    background-color: yellow;
    color: red;
}`}
/>

**解説**:
- `.mark`はクラスセレクタで、`class="mark"`が指定された要素にスタイルが適用される
- `background-color`プロパティで背景色を指定
- `color`プロパティで文字色を指定
- 同じクラスが指定された複数の要素に同じスタイルが適用される

</Solution>

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

<Solution>

<CodePreview 
  initialCode={`<h1>ニュースサイト</h1>
<h2 class="urgent">速報：台風が接近中</h2>
<p class="info">最新の気象情報をお届けします。</p>
<div class="urgent">緊急避難情報が発表されました。</div>
<p class="info">通常のニュース記事です。</p>`}
  initialCSS={`.urgent {
    background-color: red;
    color: white;
}

.info {
    background-color: lightblue;
}`}
/>

**解説**:
- 内容に応じて分かりやすいクラス名を付ける（`urgent`：緊急、`info`：情報）
- 異なるHTML要素（`h2`、`div`、`p`）でも同じクラス名を指定できる
- 同じクラス名の要素には同じスタイルが適用される
- クラス名は英語で、内容を表現する意味のある名前にするのが良い習慣

</Solution>

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
2. `warning`クラス：背景色をオレンジ色に追加
3. `title`クラス：青い文字色
4. `normal`クラス：グレーの文字色

**ヒント**: HTMLでは、スペース区切りで複数のクラスを指定することができます。

例えば `class="highlight warning"` の場合：
- `highlight`というクラス
- `warning`というクラス

この2つのクラスが指定されており、両方のスタイルが適用されます。つまり、黄色い背景色と赤い文字色（`highlight`クラス）に加えて、オレンジの背景色（`warning`クラス）も表示されます。ただし、背景色は後から指定されたものが優先されるため、最終的にはオレンジの背景色になります。

<Solution>

<CodePreview 
  initialCode={`<div class="container">
    <h1 class="title">サイトタイトル</h1>
    <p class="highlight">重要なお知らせ</p>
    <p class="normal">通常の段落</p>
    <p class="highlight warning">警告メッセージ</p>
</div>`}
  initialCSS={`.highlight {
    background-color: yellow;
    color: red;
}

.warning {
    background-color: orange;
}

.title {
    color: blue;
}

.normal {
    color: gray;
}`}
/>

**解説**:
- 複数クラス指定：`class="highlight warning"`では、`highlight`と`warning`の両方のスタイルが適用される
- `highlight`クラス：黄色背景と赤文字
- `warning`クラス：オレンジの背景色
- 「警告メッセージ」には両方が適用されるが、背景色は後から指定された`warning`のオレンジが優先される
- CSSでは同じプロパティが重複した場合、後から適用されたものが優先される（カスケーディングの原理）
- スペース区切りで複数のクラスを指定できるのはHTMLの重要な機能

</Solution>

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
1. `box1`クラス：幅200px、背景色を`lightblue`
2. `box2`クラス：幅40%、背景色を`lightgreen`
3. `box3`クラス：幅80%、背景色を`lightcoral`

<Solution>

<CodePreview 
  initialCode={`<div class="box1">狭い箱</div>
<div class="box2">中くらいの箱</div>
<div class="box3">広い箱</div>`}
  initialCSS={`.box1 {
    width: 200px;
    background-color: lightblue;
}

.box2 {
    width: 40%;
    background-color: lightgreen;
}

.box3 {
    width: 80%;
    background-color: lightcoral;
}`}
/>

**解説**:
- `width`プロパティで要素の幅を指定
- `200px`：絶対値（ピクセル単位）での指定
- `40%`、`80%`：親要素（この場合はプレビュー領域）に対する相対的な幅
- 背景色によって幅の違いが分かりやすくなる

</Solution>

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
4. `box4`クラス：幅50vw、背景色を薄いグレーに設定

**ヒント**:
- rem、em、vw など様々な単位を使って幅を指定してみましょう

<Solution>

<CodePreview 
  initialCode={`<div class="box">
    <div class="box1">狭い箱</div>
    <div class="box2">中くらいの箱</div>
    <div class="box3">広い箱</div>
    <div class="box4">画面幅の箱</div>
</div>`}
  initialCSS={`.box1 {
    width: 15rem;
    background-color: lightblue;
}

.box2 {
    width: 40%;
    background-color: lightgreen;
}

.box3 {
    width: 30em;
    background-color: lightpink;
}

.box4 {
    width: 50vw;
    background-color: lightgray;
}`}
/>

**解説**:
- `rem`：ルート要素（html）のフォントサイズを基準とした単位
- `em`：親要素のフォントサイズを基準とした単位
- `vw`：ビューポート（画面）の幅を基準とした単位（1vw = 画面幅の1%）
- `%`：親要素の幅を基準とした単位
- 様々な単位を使い分けることで、柔軟なレイアウトが可能

</Solution>

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
  initialCode={`<div class="takaku">高さ150pxの箱</div>
<div class="hikuku">高さ50pxの箱</div>
<div class="jidou">高さautoの箱（中身に合わせて自動調整）</div>`}
  initialCSS={`.takaku {
    height: 150px;
    width: 200px;
    background-color: lightcoral;
}

.hikuku {
    height: 50px;
    width: 200px;
    background-color: lightblue;
}

.jidou {
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
1. `box1`クラス：幅200px、高さ200px、背景色を`lightblue`
2. `box2`クラス：幅300px、高さ100px、背景色を`lightgreen`
3. `box3`クラス：幅100px、高さ80px、背景色を`lightpink`

<Solution>

<CodePreview 
  initialCode={`<div class="box1">正方形の箱</div>
<div class="box2">長方形の箱</div>
<div class="box3">小さな箱</div>`}
  initialCSS={`.box1 {
    width: 200px;
    height: 200px;
    background-color: lightblue;
}

.box2 {
    width: 300px;
    height: 100px;
    background-color: lightgreen;
}

.box3 {
    width: 100px;
    height: 80px;
    background-color: lightpink;
}`}
/>

**解説**:
- `width`と`height`を組み合わせて要素のサイズを制御
- `box1`：幅と高さが同じ（200px × 200px）なので正方形
- `box2`：幅が高さより大きい（300px × 100px）ので横長の長方形
- `box3`：小さなサイズ（100px × 80px）の長方形
- 背景色によって、設定したサイズが確認できる

</Solution>

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

<Solution>

<CodePreview 
  initialCode={`<div class="box1">ヒーローセクション</div>
<div class="box2">カードセクション</div>
<div class="box3">サイドバー</div>`}
  initialCSS={`.box1 {
    width: 50vw;
    height: 30vh;
    background-color: #FF6B35;
    color: white;
}

.box2 {
    width: 25rem;
    height: 15em;
    background-color: rgb(46, 125, 50);
    color: #FFFFFF;
}

.box3 {
    width: 200px;
    height: 80%;
    background-color: rgba(63, 81, 181, 0.8);
    color: white;
}`}
/>

**解説**:
- **単位の使い分け**：
  - `vw`、`vh`：ビューポート（画面）サイズに対する割合
  - `rem`、`em`：フォントサイズを基準とした単位
  - `px`：絶対値、`%`：親要素に対する割合
- **色指定方法**：
  - `#FF6B35`：16進数カラーコード
  - `rgb(46, 125, 50)`：RGB数値
  - `rgba(63, 81, 181, 0.8)`：透明度付きRGBA
  - `white`：カラーネーム
- 様々な単位と色指定を組み合わせることで豊かな表現が可能

</Solution>

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
  initialCode={`<div class="waku1">実線の境界線</div>
<div class="waku2">破線の境界線</div>
<div class="waku3">太い境界線</div>
<div class="waku4">色付きの境界線</div>`}
  initialCSS={`.waku1 {
    border: 1px solid black;
    width: 200px;
    height: 50px;
    margin: 10px;
}

.waku2 {
    border: 2px dashed blue;
    width: 200px;
    height: 50px;
    margin: 10px;
}

.waku3 {
    border: 5px solid red;
    width: 200px;
    height: 50px;
    margin: 10px;
}

.waku4 {
    border: 3px solid green;
    width: 200px;
    height: 50px;
    margin: 10px;
    background-color: lightpink;
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
1. `box1`クラス：2px の黒い実線の境界線、内側余白15px、背景色を`lightblue`
2. `box2`クラス：3px の青い破線の境界線、内側余白15px、背景色を`lightgreen`
3. `box3`クラス：5px の赤い実線の境界線、内側余白15px、背景色を`lightpink`

**ヒント**:
- borderは「太さ スタイル 色」の3つの要素をきちんと読み取りましょう

<Solution>

<CodePreview 
  initialCode={`<div class="box1">額縁風の箱1</div>
<div class="box2">額縁風の箱2</div>
<div class="box3">額縁風の箱3</div>`}
  initialCSS={`.box1 {
    border: 2px solid black;
    padding: 15px;
    background-color: lightblue;
}

.box2 {
    border: 3px dashed blue;
    padding: 15px;
    background-color: lightgreen;
}

.box3 {
    border: 5px solid red;
    padding: 15px;
    background-color: lightpink;
}`}
/>

</Solution>

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

<Solution>

<CodePreview 
  initialCode={`<div class="alert">緊急通知</div>
<div class="info">お知らせ</div>
<div class="success">完了メッセージ</div>`}
  initialCSS={`.alert {
    width: 20rem;
    height: 8vh;
    border: 4px solid #FF0000;
    background-color: rgba(255, 0, 0, 0.1);
}

.info {
    width: 300px;
    height: 6em;
    border: 2px dashed rgb(0, 123, 255);
    background-color: #E7F3FF;
}

.success {
    width: 25vw;
    height: 80px;
    border: 3px double green;
    background-color: rgb(90%, 100%, 90%);
}`}
/>

**解説**:
- **様々な単位の活用**：
  - `rem`、`vh`、`px`、`em`、`vw`を適材適所で使用
- **色指定方法の組み合わせ**：
  - 16進数（`#FF0000`、`#E7F3FF`）
  - RGB数値（`rgb(0, 123, 255)`）
  - RGBA（`rgba(255, 0, 0, 0.1)`）
  - RGBパーセント（`rgb(90%, 100%, 90%)`）
  - カラーネーム（`green`）
- **境界線スタイル**：`solid`、`dashed`、`double`を使い分け

</Solution>

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
  initialCode={`<div class="pad1">余白なし</div>
<div class="pad2">小さな余白</div>
<div class="pad3">大きな余白</div>
<div class="pad4">カスタム余白</div>`}
  initialCSS={`.pad1 {
    padding: 0;
    border: 2px solid black;
    background-color: lightblue;
    width: 200px;
    margin: 10px;
}

.pad2 {
    padding: 10px;
    border: 2px solid black;
    background-color: lightgreen;
    width: 200px;
    margin: 10px;
}

.pad3 {
    padding: 30px;
    border: 2px solid black;
    background-color: lightpink;
    width: 200px;
    margin: 10px;
}

.pad4 {
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
1. `box1`クラス：padding 上下左右15px、背景色を`lightblue`、境界線 1px solid gray
2. `box2`クラス：padding 上下10px・左右30px、背景色を`#90EE90`、境界線 1px solid gray
3. `box3`クラス：padding 上20px・右10px・下15px・左25px、背景色を`lightpink`、境界線 1px solid gray

<Solution>

<CodePreview 
  initialCode={`<div class="box1">箱1</div>
<div class="box2">箱2</div>
<div class="box3">箱3</div>`}
  initialCSS={`.box1 {
    padding: 15px;
    background-color: lightblue;
    border: 1px solid gray;
}

.box2 {
    padding: 10px 30px;
    background-color: #90EE90;
    border: 1px solid gray;
}

.box3 {
    padding: 20px 10px 15px 25px;
    background-color: lightpink;
    border: 1px solid gray;
}`}
/>

**解説**:
- **paddingの指定方法**：
  - `padding: 15px`：全方向に15px
  - `padding: 10px 30px`：上下10px、左右30px
  - `padding: 20px 10px 15px 25px`：上20px、右10px、下15px、左25px（時計回り）
- paddingは要素の内側の余白で、背景色の領域に含まれる
- paddingの値によってテキストと境界線の距離が変わる

</Solution>

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
3. `box3`クラス：幅200px、高さ100px、padding 上20px・右10px・下15px・左25px、境界線 1px solid red、背景色 lightpink

<Solution>

<CodePreview 
  initialCode={`<div class="box1">カード1</div>
<div class="box2">カード2</div>
<div class="box3">カード3</div>`}
  initialCSS={`.box1 {
    width: 200px;
    height: 100px;
    padding: 15px;
    border: 1px solid gray;
    background-color: lightblue;
}

.box2 {
    width: 200px;
    height: 100px;
    padding: 10px 30px;
    border: 2px solid blue;
    background-color: lightgreen;
}

.box3 {
    width: 200px;
    height: 100px;
    padding: 20px 10px 15px 25px;
    border: 1px solid red;
    background-color: lightpink;
}`}
/>

**解説**:
- `width`と`height`で基本サイズを設定
- `padding`で内側の余白を調整
- `border`で境界線の太さ、スタイル、色を指定
- `background-color`で背景色を設定
- **重要**：実際の要素のサイズは「width + padding + border」で計算される

</Solution>

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
  initialCode={`<div class="mar1">余白なし</div>
<div class="mar2">小さな余白</div>
<div class="mar3">大きな余白</div>
<div class="mar4">カスタム余白</div>`}
  initialCSS={`.mar1 {
    margin: 0;
    padding: 10px;
    border: 2px solid black;
    background-color: lightblue;
    width: 200px;
}

.mar2 {
    margin: 10px;
    padding: 10px;
    border: 2px solid black;
    background-color: lightgreen;
    width: 200px;
}

.mar3 {
    margin: 30px;
    padding: 10px;
    border: 2px solid black;
    background-color: lightpink;
    width: 200px;
}

.mar4 {
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
1. `box1`クラス：margin 上下左右20px、背景色を`lightcoral`、内側余白15px、境界線 1px solid black
2. `box2`クラス：margin 上下30px・左右0、背景色を`#FFE4B5`、内側余白15px、境界線 1px solid black
3. `box3`クラス：margin 上10px・右20px・下30px・左40px、背景色を`rgb(144, 238, 144)`、内側余白15px、境界線 1px solid black

<Solution>

<CodePreview 
  initialCode={`<div class="box1">セクション1</div>
<div class="box2">セクション2</div>
<div class="box3">セクション3</div>`}
  initialCSS={`.box1 {
    margin: 20px;
    background-color: lightcoral;
    padding: 15px;
    border: 1px solid black;
}

.box2 {
    margin: 30px 0;
    background-color: #FFE4B5;
    padding: 15px;
    border: 1px solid black;
}

.box3 {
    margin: 10px 20px 30px 40px;
    background-color: rgb(144, 238, 144);
    padding: 15px;
    border: 1px solid black;
}`}
/>

**解説**:
- **marginの指定方法**：
  - `margin: 20px`：全方向に20px
  - `margin: 30px 0`：上下30px、左右0px
  - `margin: 10px 20px 30px 40px`：上10px、右20px、下30px、左40px（時計回り）
- marginは要素の外側の余白で、他の要素との距離を制御
- marginの違いによって要素間の距離が変わることを確認

</Solution>

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
1. `section1`クラス：幅300px、height 80px、margin 上下左右20px、padding 上下左右15px、境界線 1px solid black、背景色 lightblue
2. `section2`クラス：幅300px、height 80px、margin 上下30px・左右0、padding 上下左右15px、境界線 1px solid black、背景色 lightgreen
3. `section3`クラス：幅300px、height 80px、margin 上10px・右20px・下30px・左40px、padding 上下左右15px、境界線 1px solid black、背景色 lightpink

<Solution>

<CodePreview 
  initialCode={`<div class="section1">セクション1</div>
<div class="section2">セクション2</div>
<div class="section3">セクション3</div>`}
  initialCSS={`.section1 {
    width: 300px;
    height: 80px;
    margin: 20px;
    padding: 15px;
    border: 1px solid black;
    background-color: lightblue;
}

.section2 {
    width: 300px;
    height: 80px;
    margin: 30px 0;
    padding: 15px;
    border: 1px solid black;
    background-color: lightgreen;
}

.section3 {
    width: 300px;
    height: 80px;
    margin: 10px 20px 30px 40px;
    padding: 15px;
    border: 1px solid black;
    background-color: lightpink;
}`}
/>

**解説**:
- **ボックスモデルの組み合わせ**：
  - `width`、`height`：基本サイズ
  - `padding`：内側の余白（背景色の領域に含まれる）
  - `border`：境界線
  - `margin`：外側の余白（他の要素との距離）

</Solution>

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
  initialCode={`<div class="hidari">左寄せ（デフォルト）</div>
<div class="center">中央揃え</div>
<div class="center2">中央揃え（上下margin付き）</div>`}
  initialCSS={`.hidari {
    width: 150px;
    height: 60px;
    background-color: lightblue;
    border: 1px solid black;
    padding: 10px;
}

.center {
    width: 150px;
    height: 60px;
    background-color: lightgreen;
    border: 1px solid black;
    padding: 10px;
    margin: 0 auto;        /* 左右中央揃え */
}

.center2 {
    width: 150px;
    height: 60px;
    background-color: lightpink;
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
1. `box1`クラス：幅300px、左右中央揃え、境界線 1px solid black、内側余白10px、背景色 lightblue
2. `box2`クラス：幅500px、左右中央揃え、境界線 1px solid black、内側余白10px、背景色 lightgreen

<Solution>

<CodePreview 
  initialCode={`<div class="box1">ヘッダー</div>
<div class="box2">メインコンテンツ</div>`}
  initialCSS={`.box1 {
    width: 300px;
    margin: 0 auto;
    border: 1px solid black;
    padding: 10px;
    background-color: lightblue;
}

.box2 {
    width: 500px;
    margin: 0 auto;
    border: 1px solid black;
    padding: 10px;
    background-color: lightgreen;
}`}
/>

**解説**:
- **左右中央揃えの仕組み**：`margin: 0 auto`を使用
  - `0`：上下のmarginは0
  - `auto`：左右のmarginを自動調整（等しい値になり、中央配置される）
- **必要な条件**：
  - 要素に明確な`width`が設定されている
  - ブロック要素である（divは標準でブロック要素）

</Solution>

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
1. `title`クラス：幅500px、height 80px、padding 25px、背景色 `#2C3E50`、文字色 white、左右中央揃え
2. `menu1`クラス：幅450px、padding 20px、margin 上下8px・左右auto、背景色 `#FFFFFF`、境界線 2px solid #E8E8E8
3. `menu2`クラス：幅450px、padding 20px、margin 上下8px・左右auto、背景色 `#F8F9FA`、境界線 2px solid #DEE2E6
4. `menu3`クラス：幅450px、padding 20px、margin 上下8px・左右auto、背景色 `#FFFFFF`、境界線 2px solid #E8E8E8
5. `special`クラス：幅480px、padding 25px、margin 上下15px・左右auto、背景色 `#FFF3CD`、境界線 3px solid #FFC107

**ポイント**:
- カフェのメニューボードのような見た目を目指しましょう！

<Solution>

<CodePreview 
  initialCode={`<div class="title">CAFE MENU</div>
<div class="menu1">ホットコーヒー ¥300</div>
<div class="menu2">アイスラテ ¥400</div>
<div class="menu3">チーズケーキ ¥500</div>
<div class="special">本日のスペシャル：限定パンケーキ ¥800</div>`}
  initialCSS={`.title {
    width: 500px;
    height: 80px;
    padding: 25px;
    background-color: #2C3E50;
    color: white;
    margin: 0 auto;
}

.menu1 {
    width: 450px;
    padding: 20px;
    margin: 8px auto;
    background-color: #FFFFFF;
    border: 2px solid #E8E8E8;
}

.menu2 {
    width: 450px;
    padding: 20px;
    margin: 8px auto;
    background-color: #F8F9FA;
    border: 2px solid #DEE2E6;
}

.menu3 {
    width: 450px;
    padding: 20px;
    margin: 8px auto;
    background-color: #FFFFFF;
    border: 2px solid #E8E8E8;
}

.special {
    width: 480px;
    padding: 25px;
    margin: 15px auto;
    background-color: #FFF3CD;
    border: 3px solid #FFC107;
}`}
/>

</Solution>

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
