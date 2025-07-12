---
sidebar_position: 5
---

import CodePreview from '@site/src/components/CodePreview';
import Exercise, { Solution } from '@site/src/components/Exercise';

# テキスト装飾

## 今回学習する内容

- **font-size**：文字のサイズを設定
- **text-align**：テキストの水平方向の配置を設定
- **line-height**：行間（行の高さ）を設定

---

## 1. font-size（フォントサイズ）を学習しよう

### 📏 font-sizeプロパティとは

**説明**: 文字のサイズを設定するプロパティです。

**基本的な書き方**:
```css
セレクタ {
    font-size: 値;
}
```

**指定できる値**:
- **ピクセル値**: `14px`, `18px`, `24px` など
- **em値**: `1em`, `1.5em`, `2em` など
- **rem値**: `1rem`, `1.2rem`, `1.5rem` など
- **パーセント**: `120%`, `150%` など

### font-sizeの動作例

<CodePreview 
  initialCode={`<p class="title">大見出し（24px）</p>
<p class="subtitle">小見出し（20px）</p>
<p class="text">普通の段落（16px）</p>
<p class="small">小さなテキスト（12px）</p>`}
  initialCSS={`.title {
    font-size: 24px;
}

.subtitle {
    font-size: 20px;
}

.text {
    font-size: 16px;
}

.small {
    font-size: 12px;
}`}
/>

---

## 2. text-align（テキスト配置）を学習しよう

### 📐 text-alignプロパティとは

**説明**: テキストの水平方向の配置を設定するプロパティです。

**基本的な書き方**:
```css
セレクタ {
    text-align: 値;
}
```

**指定できる値**:
- **left**: 左揃え
- **center**: 中央揃え
- **right**: 右揃え

### text-alignの動作例

<CodePreview 
  initialCode={`<div class="hidari">左揃えのテキスト</div>
<div class="naka">中央揃えのテキスト</div>
<div class="migi">右揃えのテキスト</div>`}
  initialCSS={`.hidari {
    text-align: left;
    background-color: #add8e6;
}

.naka {
    text-align: center;
    background-color: #90ee90;
}

.migi {
    text-align: right;
    background-color: #ffc0cb;
}`}
/>

<Exercise title="演習1">

以下のHTMLに対して、CSSを書いてください：

**HTML**:
```html
<h1 class="title">タイトル</h1>
<p class="text">短いテキスト</p>
<p class="text">長いテキストが入った場合の配置を確認してください</p>
```

**要求**:
1. `title`クラス：テキスト右揃え、フォントサイズ20px、背景色を`lightblue`
2. `text`クラス：幅250px、テキスト中央揃え、フォントサイズ16px、背景色を`lightgreen`

<Solution>

<CodePreview 
  initialCode={`<h1 class="title">タイトル</h1>
<p class="text">テキスト</p>`}
  initialCSS={`.title {
    text-align: right;
    font-size: 20px;
    background-color: lightblue;
}

.text {
    width: 250px;
    text-align: center;
    font-size: 16px;
    background-color: lightgreen;
}`}
/>

**解説**:
- **text-alignの理解**：要素内でのテキストの左右方向の配置を制御

</Solution>

</Exercise>

<Exercise title="演習1-発展">

以下のHTMLに対して、CSSを書いてください：

**HTML**:
```html
<div class="card">
    <h1 class="name">山田太郎</h1>
    <p class="info">年齢：25歳</p>
    <p class="info">職業：エンジニア</p>
    <p class="info">趣味：読書</p>
    <p class="contact">連絡先：yamada@example.com</p>
</div>
```

**要求**:
1. `name`クラス：テキスト中央揃え、フォントサイズ24px、背景色を`lightblue`
2. `info`クラス：テキスト左揃え、フォントサイズ16px、背景色を`lightgreen`
3. `contact`クラス：テキスト右揃え、フォントサイズ14px、背景色を`lightyellow`

<Solution>

<CodePreview 
  initialCode={`<div class="card">
    <h1 class="name">山田太郎</h1>
    <p class="info">年齢：25歳</p>
    <p class="info">職業：エンジニア</p>
    <p class="info">趣味：読書</p>
    <p class="contact">連絡先：yamada@example.com</p>
</div>`}
  initialCSS={`.name {
    text-align: center;
    font-size: 24px;
    background-color: lightblue;
}

.info {
    text-align: left;
    font-size: 16px;
    background-color: lightgreen;
}

.contact {
    text-align: right;
    font-size: 14px;
    background-color: lightyellow;
}`}
/>

</Solution>

</Exercise>

---

## 3. line-height（行間）を学習しよう

### 📏 line-heightプロパティとは

**説明**: テキストの行間（行の高さ）を設定するプロパティです。ある行の文字の上端から、次の行の文字の上端までの間隔を表します。

**基本的な書き方**:
```css
セレクタ {
    line-height: 値;
}
```

**指定できる値**:
- **数値**: `1.5`, `2`, `1.2` など（フォントサイズに対する倍数）
- **ピクセル値**: `24px`, `30px` など

:::note 単位なし数値の特殊性

**line-heightは珍しいプロパティです！**

通常、CSSで長さを表す場合は必ず単位（px、em、remなど）が必要ですが、line-heightは単位なしの数値で指定できます。

```css
/* 他のプロパティは単位が必要 */
font-size: 16px;
margin: 10px;

/* line-heightは単位なしの指定もOK */
line-height: 1.5;  /* フォントサイズの1.5倍 */
```

これは「フォントサイズに対する相対的な行間」という特殊な概念を表現するためです。

:::

### line-heightの動作例

<CodePreview 
  initialCode={`<div class="narrow">
行間が狭いテキスト（line-height: 0.5）<br>
複数行になったときの<br>
読みやすさを確認してください。
</div>

<div class="normal">
普通の行間のテキスト（line-height: 1）<br>
複数行になったときの<br>
読みやすさを確認してください。
</div>

<div class="wide">
行間が広いテキスト（line-height: 1.5）<br>
複数行になったときの<br>
読みやすさを確認してください。
</div>`}
  initialCSS={`div {
    margin: 10px 0;
}

.narrow {
    line-height: 0.5;
    background-color: #add8e6;
}

.normal {
    line-height: 1;
    background-color: #90ee90;
}

.wide {
    line-height: 1.5;
    background-color: #ffc0cb;
}`}
/>

<Exercise title="演習2">

以下のHTMLに対して、CSSを書いてください：

**HTML**:
```html
<p class="a">フォントサイズ16px、行間1.5（単位なし）のテキストです。この文章は複数行にわたって表示され、行間の違いを確認できるようになっています。単位なしのline-heightは、フォントサイズに対する相対値として機能します。CSSでは通常、長さを表す値には必ず単位（px、em、remなど）が必要ですが、line-heightは単位なしの数値で指定することができます。これは「フォントサイズに対する相対的な行間」という特殊な概念を表現するためです。例えば、フォントサイズが16pxでline-heightが1.5の場合、実際の行間は16px × 1.5 = 24pxになります。</p>
<p class="b">フォントサイズ16px、行間24px（単位あり）のテキストです。この文章は複数行にわたって表示され、行間の違いを確認できるようになっています。単位ありのline-heightは、固定の行間として機能します。ピクセル値で指定した場合、フォントサイズが変わっても行間は固定されたままです。これは「絶対的な行間」を表現する方法です。例えば、line-heightが24pxの場合、フォントサイズが16pxでも32pxでも、行間は常に24pxのままです。このように、同じ見た目になる場合でも、指定方法によって意味が異なります。</p>
```

**要求**:
1. `a`クラス：フォントサイズ16px、行間1.5（単位なし）、背景色#add8e6
2. `b`クラス：フォントサイズ16px、行間24px（単位あり）、背景色#90ee90

<Solution>

<CodePreview 
  initialCode={`<p class="a">フォントサイズ16px、行間1.5（単位なし）のテキストです。この文章は複数行にわたって表示され、行間の違いを確認できるようになっています。単位なしのline-heightは、フォントサイズに対する相対値として機能します。CSSでは通常、長さを表す値には必ず単位（px、em、remなど）が必要ですが、line-heightは単位なしの数値で指定することができます。これは「フォントサイズに対する相対的な行間」という特殊な概念を表現するためです。例えば、フォントサイズが16pxでline-heightが1.5の場合、実際の行間は16px × 1.5 = 24pxになります。</p>
<p class="b">フォントサイズ16px、行間24px（単位あり）のテキストです。この文章は複数行にわたって表示され、行間の違いを確認できるようになっています。単位ありのline-heightは、固定の行間として機能します。ピクセル値で指定した場合、フォントサイズが変わっても行間は固定されたままです。これは「絶対的な行間」を表現する方法です。例えば、line-heightが24pxの場合、フォントサイズが16pxでも32pxでも、行間は常に24pxのままです。このように、同じ見た目になる場合でも、指定方法によって意味が異なります。</p>`}
  initialCSS={`.a {
    font-size: 16px;
    line-height: 1.5;
    background-color: #add8e6;
}

.b {
    font-size: 16px;
    line-height: 24px;
    background-color: #90ee90;
}`}
/>

**解説**:
- **line-heightの単位の違い**：
  - 単位なし数値（1.5）：フォントサイズの1.5倍の行間（16px × 1.5 = 24px）
  - ピクセル値（24px）：固定の行間
- **計算結果**：どちらも同じ24pxの行間になるため、見た目は同じになります
- **学習の狙い**：line-heightの単位なし数値の特殊性を理解する

</Solution>

</Exercise>

<Exercise title="演習2-発展">

単位なしのline-heightは、フォントサイズの倍数になるという話でした。ということは、単位としてemを使ったものと常に同じになるんでしょうか？

通常は次のように同じになります：

<CodePreview 
  initialCode={`<p class="a">フォントサイズ16px、行間1.5（単位なし）のテキストです。この文章は複数行にわたって表示され、行間の違いを確認できるようになっています。</p>
<p class="b">フォントサイズ16px、行間1.5emのテキストです。この文章は複数行にわたって表示され、行間の違いを確認できるようになっています。</p>`}
  initialCSS={`.a {
    font-size: 16px;
    line-height: 1.5;
}
.b {
    font-size: 16px;
    line-height: 1.5em;
}`}
/>

実は、単位なしとemを使った場合では、設定される行間が異なる場合があります。line-heightを継承した場合に、それが発生します。

以下の2つのパターンAとパータンBのHTMLとCSSの組み合わせを比較して、子要素に設定される行間の違いを確認してください：

**パターンA**:

<CodePreview 
  initialCode={`<div class="oya">
    <p class="ko">親要素がline-height: 2（単位なし）の場合のテキストです。この文章は複数行にわたって表示され、行間の違いを確認できるようになっています。単位なしのline-heightは、継承された要素（.ko）のフォントサイズに対する相対値として機能します。子要素のフォントサイズが34pxの場合、実際の行間は34px × 2 = 68pxになります。このように、継承された要素のフォントサイズに応じて行間が変化するのが単位なし指定の特徴です。</p>
</div>`}
  initialCSS={`.oya {
    line-height: 2;
}
.ko {
    font-size: 34px;
}`}
/>

**パターンB**:

<CodePreview 
  initialCode={`<div class="oya">
    <p class="ko">親要素がline-height: 2emの場合のテキストです。この文章は複数行にわたって表示され、行間の違いを確認できるようになっています。em単位のline-heightは、継承元の要素（.oya）のフォントサイズに対する相対値として機能します。親要素のフォントサイズが16pxの場合、親要素の行間は16px × 2 = 32pxになります。子要素にはそのまま32pxの行間で継承されるため、子要素のフォントサイズが34pxでも行間は32pxのままです。このように、継承元の要素のフォントサイズに基づいて行間が決まるのがem単位指定の特徴です。</p>
</div>`}
  initialCSS={`.oya {
    line-height: 2em;
}
.ko {
    font-size: 34px;
}`}
/>

**TO DO**:
1. パターンAとパターンBで、子要素のテキストの行間は同じですか？
2. 文章を読んで、行間の違いが発生する理由を確認してください

<Solution>



**解説**:
- **パターンA（単位なし）**：
  - 親要素のline-height: 2は、継承された要素（.ko）のフォントサイズ（34px）に対する相対値
  - 子要素の行間 = 34px × 2 = 68px
- **パターンB（em単位）**：
  - 親要素のline-height: 2emは、継承元の要素（.oya）のフォントサイズ（16px）に対する相対値
  - 親要素の行間 = 16px × 2 = 32px
  - 子要素は親の行間をそのまま継承し、子要素の行間は32pxになる
- **結果**：パターンAの方が広い行間（68px vs 32px）になります
- **学習の狙い**：line-heightの単位の違いが子要素に与える影響を理解する

:::tip 実践的なアドバイス
総括すると、単位なしのline-heightを使うのがベストプラクティスです。
理由は以下の通りです：

1. **予測しやすい動作**：継承された要素のフォントサイズに応じて行間が自動調整される  
2. **レスポンシブ対応**：フォントサイズが変わっても適切な行間比が保たれる  
3. **保守性**：子要素のフォントサイズを変更しても、行間比が崩れない  

→ そのため、line-heightを指定する際は、通常、特別な事情が無ければ、単位なしの数値（例：`line-height: 1.5`）を使いましょう。
:::

</Solution>

</Exercise>

---

## まとめ

この授業では以下の内容を学習しました：

### 学習したCSS機能

1. **font-size プロパティ**
   - 文字のサイズを設定（px、em、rem、%）
   
2. **text-align プロパティ**
   - テキストの水平方向の配置を設定
   - left（左揃え）、center（中央揃え）、right（右揃え）
   
3. **line-height プロパティ**
   - 行間（行の高さ）を設定
   - 数値、px等で指定可能

これらの基本をマスターすることで、美しく読みやすいWebページが作成できるようになります！ 