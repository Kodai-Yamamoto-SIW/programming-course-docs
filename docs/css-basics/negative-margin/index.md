---
sidebar_position: 5
---

import Exercise, { Solution } from '@kodai-yamamoto-siw/exercise/client';
import { CodePreview } from '@kodai-yamamoto-siw/code-preview';

# 負のマージン（negative margin）

CSSの`margin`プロパティには、正の値だけでなく**負の値**も指定できます。負のマージンを使うことで、通常の配置では実現できない、要素の重ね合わせや隙間の削除などの高度なレイアウトテクニックを実現できます。

## 今日の学習はこんなところで使うよ

オンラインストアなどで、よく見かける商品カードのレイアウトで負のマージンが使われています。例えば、複数の商品画像をわずかに重ねて並べて「スライドショー」のように見せたり、見出しテキストを背景画像の上にわずかに重ねて配置したりする場面で活用されています。

<CodePreview 
  htmlVisible={false}
  cssVisible={false}
  consoleVisible={false}
  previewVisible={true}
  initialHTML={`<div class="product-showcase">
    <h2 class="showcase-title">おすすめ商品</h2>
    <div class="products">
      <div class="product">
        <div class="product-badge">NEW</div>
        <div class="product-image">商品A</div>
        <p>¥1,980</p>
      </div>
      <div class="product">
        <div class="product-image">商品B</div>
        <p>¥2,480</p>
      </div>
      <div class="product">
        <div class="product-image">商品C</div>
        <p>¥1,280</p>
      </div>
    </div>
  </div>`}
  initialCSS={`body {
    margin: 0;
    font-family: sans-serif;
    padding: 20px;
  }

  .product-showcase {
    max-width: 600px;
    margin: 0 auto;
  }

  .showcase-title {
    position: relative;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 60px 20px 40px;
    margin: 0 -10px;
    border-radius: 8px;
    text-align: center;
  }

  .products {
    display: flex;
    gap: 16px;
    margin-top: -30px;
  }

  .product {
    flex: 1;
    position: relative;
    text-align: center;
  }

  .product-badge {
    position: absolute;
    top: -8px;
    right: -8px;
    background: #ff5722;
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: bold;
    z-index: 1;
  }

  .product-image {
    height: 160px;
    background: #f0f0f0;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666;
  }

  .product p {
    margin: 8px 0 0;
    font-weight: bold;
    color: #333;
  }`}
/>

---

## 負のマージンとは？

### 📏 通常のマージンと負のマージン

**通常のマージン**（正の値）：
- 要素と要素の間を広げる
- 要素が離れて配置される

**負のマージン**（負の値）：
- 要素と要素の間を縮める
- 要素が近づいたり、重なったりする

### 負のマージンの書き方

負のマージンは、`-`（マイナス）を付けて値を指定します：

```css
セレクタ {
    margin: -値;
}
```

<CodePreview 
  initialHTML={`<div class="normal">通常のマージン（20px）</div>
  <div class="negative">負のマージン（-20px）</div>
  <div class="last">最後の要素</div>`}
  initialCSS={`body {
    margin: 0;
    padding: 20px;
  }

  .normal {
    padding: 20px;
    margin: 20px;
    background: #ffdddd;
  }

  .negative {
    padding: 20px;
    margin: -20px;
    background: #ddddff;
  }

  .last {
    padding: 20px;
    background: #ddffdd;
  }`}
/>

上の例で、真ん中の青いボックスは`margin: -20px;`が指定されており、上下左右に負のマージンが適用されています。その結果、上下の要素と重なって表示されています。

---

<Exercise title="演習1（見出しとカードを少し重ねる）">
  下のプレビューのように、A, Bを適当な色をつけた正方形にし、BをAの上から半分、左から半分の位置に重ねてください。

<CodePreview
  sourceId="ex1"
  cssVisible={false}
  initialHTML={`<div class="A">A</div>
  <div class="B">B</div>
  <p>ダミーテキスト。そこは十一月ことにその意味らについて事の以上がよしますう。同時に今日を卒業者もついにその病気たいたまでをいうてみるうをは安心思わでんから、いろいろには待っありででた。個人に生きましのはけっしてほかにけっしてありですです。同時に嘉納さんを採用人ずいぶん中止が煮えだ例外このただ誰か品評がというご尊重たたなですて。</p>`}
  initialCSS={`.A, .B {
    text-align: center;
    color: #fff;
    width: 100px;
    height: 100px;
  }
  .A {
    background-color: blue;
  }

  .B {
    background-color: green;

    margin-left: 50px;
    margin-top: -50px;
  }`}
/>

<Solution>

<CodePreview sourceId="ex1"/>

</Solution>
</Exercise>

## 練習: デザインに合わせて作る

最後に、練習として次のデザイン通りのサイトを作ってみましょう。

デザインへのリンク: https://www.figma.com/design/ZtkyqMyQO6EkAJ6DmhZ9vl/Acenda---Homepage-of-a-booking-website--Community-?node-id=45-4946&t=uBJaRUPPOSD1ylj1-1

### 著作権元
<p style={{"font-size":"0.8em"}}><a href="https://www.figma.com/community/file/1342444917555057152" target="_blank" rel="noopener noreferrer">上述のデザインの元デザイン</a></p>
