---
sidebar_position: 8
---

import Exercise, { Solution } from '@metyatech/exercise/client';
import { CodePreview } from '@metyatech/code-preview';

# Flexbox（align-items / flex / flex-direction）

Flexbox の基本（`display: flex` / `gap` / `justify-content` / `flex-wrap`）を使うと、横並びレイアウトの土台は作れます。
このページでは、より細かく Flexbox のレイアウトを調整するため、さらに 3 つのプロパティを学びます。

- `align-items`（縦方向のそろえ方）
- `flex`（アイテムごとの伸び縮み）
- `flex-direction`（横並び・縦並びの切り替え）

---

## 今日の学習はこんなところで使うよ

- ボタンを上下中央にそろえたヘッダー
- カードの幅を自動でそろえる商品一覧
- スマホでは縦並び、PC では横並びに切り替わるレイアウト

どれも実際の Web サイトでよく見るパターンです。

---

## align-items（縦方向のそろえ方）

### align-items とは

**説明**: `align-items` は、フレックスアイテムを **交差軸（縦方向）** にどうそろえるかを決めます。

主な値:
- `stretch`（初期値）：高さをそろえて伸ばす
- `flex-start`：上にそろえる
- `center`：中央にそろえる
- `flex-end`：下にそろえる

**基本の書き方**:
```css
.oya {
  display: flex;
  align-items: center;
}
```

### 動作イメージ

<CodePreview
  initialHTML={`<h4>align-items: stretch（初期値）</h4>
  <div class="oya s1">
    <div class="hako tall">A<br>高さ高め</div>
    <div class="hako">B</div>
    <div class="hako">C</div>
  </div>

  <h4>align-items: center</h4>
  <div class="oya s2">
    <div class="hako tall">A<br>高さ高め</div>
    <div class="hako">B</div>
    <div class="hako">C</div>
  </div>`}
  initialCSS={`.oya {
    display: flex;
    border: 2px dashed #999;
    padding: 8px;
    margin-bottom: 8px;
  }

  .s1 {
    align-items: stretch;
  }

  .s2 {
    align-items: center;
  }

  .hako {
    width: 90px;
    background: #29b6f6;
    color: #fff;
    padding: 8px;
  }

  .tall {
    height: 90px;
  }`}
/>

`align-items` の値を変えると、縦方向のそろえ方だけが変わることに注目してください（上の 2 つの例を見比べてみましょう）。

<Exercise title="演習1（縦中央にそろえたヘッダー）">

ヘッダー内のロゴとメニューが**上下中央**にそろうようにCSSを書いてください。

要件:
- `.head` をフレックスコンテナにする
- `.head` 内の要素を縦方向に中央にそろえる
- `.logo` のフォントサイズを `24px` にする

<CodePreview
  sourceId="flex-adv-ex1"
  cssVisible={false}
  initialHTML={`<header class="head">
    <div class="logo">🏠 サイト名</div>
    <nav class="menu">
      <a href="#">メニュー1</a>
      <a href="#">メニュー2</a>
    </nav>
  </header>`}
  initialCSS={`.head {
    display: flex;
    align-items: center;
    gap: 20px;
    background: #1976d2;
    color: #fff;
    padding: 12px 16px;
  }

  .logo {
    font-size: 24px;
    font-weight: bold;
  }

  .menu {
    display: flex;
    gap: 12px;
  }

  .menu a {
    color: #fff;
    text-decoration: none;
  }`}
/>

ヒント: `align-items` で縦方向のそろえ方を指定します。

<Solution>

<CodePreview sourceId="flex-adv-ex1" htmlVisible={true} cssVisible={true} />

**解説**:
- `.head` に `display: flex;` を指定して横並びにします。
- `align-items: center;` でロゴとメニューを上下中央にそろえます。
- 高さが異なる要素でも、縦方向の中央にそろえることができます。

</Solution>

</Exercise>

<Exercise title="演習1-発展（高さが違うカードのそろえ方）">

高さの違うカード 3 枚を横並びにし、**下そろえ**にしてください。

要件:
- `.cardlist` をフレックスコンテナにする
- カードは横並び
- 縦方向のそろえ方を「下そろえ」にする
- `.tall` だけ `height: 140px;` を指定して大きめの高さにする

<CodePreview
  sourceId="flex-adv-ex1-adv"
  cssVisible={false}
  initialHTML={`<div class="cardlist">
    <div class="card tall">
      <h3>カード1</h3>
      <p>少し長めの説明。</p>
    </div>
    <div class="card">
      <h3>カード2</h3>
      <p>短い説明。</p>
    </div>
    <div class="card">
      <h3>カード3</h3>
      <p>説明。</p>
    </div>
  </div>`}
  initialCSS={`.cardlist {
    display: flex;
    align-items: flex-end;
    gap: 12px;
  }

  .card {
    width: 150px;
    border: 1px solid #ccc;
    padding: 8px;
    background: #fffde7;
  }

  .tall {
    height: 140px;
  }`}
/>

ヒント: 親要素に `align-items` を指定して、下そろえになる値を選びます。

<Solution>

<CodePreview sourceId="flex-adv-ex1-adv" htmlVisible={true} cssVisible={true} />

**解説**:
- `.cardlist` に `display: flex;` を指定して横並びにします。
- `align-items: flex-end;` で、カードの下辺をそろえます。
- `stretch`（初期値）では高さがそろって伸びますが、`flex-end` では下辺だけがそろい、各カードの高さは保たれます。

</Solution>

</Exercise>

---

## flex（伸び縮みのルール）

### flex とは

**説明**: `flex` プロパティは、アイテムごとの**幅の伸び縮み**を指定します。

**基本の書き方**:
```css
.item {
  flex: 数値;
}
```

よく使う値:
- `flex: 1;`（同じ割合で広がる）
- `flex: 2;`（`1` の 2 倍の割合で広がる）

数値が大きいほど、他の要素と比べて広いスペースを取ります（比率）。

### 基本イメージ

<CodePreview
  initialHTML={`<div class="demo">
    <div class="box a">A</div>
    <div class="box b">B</div>
    <div class="box c">C</div>
  </div>`}
  initialCSS={`.demo {
    display: flex;
    border: 2px dashed #999;
    padding: 8px;
  }

  .box {
    height: 60px;
    color: #fff;
    text-align: center;
  }

  .a {
    background: #ef5350;
    flex: 1;
  }

  .b {
    background: #42a5f5;
    flex: 2; /* flex: 1 の要素の 2 倍の幅になる、ということ */
  }

  .c {
    background: #66bb6a;
    flex: 1;
  }`}
/>

B が A・C の 2 倍の幅になっていることを確認してください。

<Exercise title="演習2（幅が 2:1 のレイアウト）">

左のメインコンテンツを右のサイドバーの**2 倍の幅**にしてください。

要件:
- `.layout` をフレックスコンテナにする
- `.main` と `.side` を横並びにする
- `.main` の幅を `.side` の 2 倍にする

<CodePreview
  sourceId="flex-adv-ex2"
  cssVisible={false}
  initialHTML={`<div class="layout">
    <div class="main">メインコンテンツ</div>
    <div class="side">サイドバー</div>
  </div>`}
  initialCSS={`.layout {
    display: flex;
    gap: 16px;
  }

  .main {
    flex: 2;
    background: #e3f2fd;
    padding: 8px;
  }

  .side {
    flex: 1;
    background: #fff3e0;
    padding: 8px;
  }`}
/>

ヒント: `.main` と `.side` に、それぞれ違う `flex` の値を指定します。

<Solution>

<CodePreview sourceId="flex-adv-ex2" htmlVisible={true} cssVisible={true} />

**解説**:
- `.layout` に `display: flex;` を指定して横並びにします。
- `.main { flex: 2; }`、`.side { flex: 1; }` とすることで、2:1 の幅になります。
- `flex` の値の比率で、要素の幅が決まります。

</Solution>

</Exercise>

<Exercise title="演習2-発展1（ボタンの自動伸縮）">

3 つのボタンを横並びにし、**横幅いっぱいに伸ばして**、ボタンの幅を同じにしてください。

要件:
- `.btns2` をフレックスコンテナにする
- ボタン 3 つを横並びにする
- ボタンの幅をすべて同じにし、行全体を埋める
- ボタン間には少し余白を入れる

<CodePreview
  sourceId="flex-adv-ex2-adv1"
  cssVisible={false}
  initialHTML={`<div class="btns2">
    <button>OK</button>
    <button>キャンセル</button>
    <button>適用</button>
  </div>`}
  initialCSS={`.btns2 {
    display: flex;
    gap: 12px;
  }

  button {
    flex: 1;
    padding: 8px 0;
  }`}
/>

ヒント: ボタンに `flex` を指定し、`gap` でボタン間の余白を作ります。

<Solution>

<CodePreview sourceId="flex-adv-ex2-adv1" htmlVisible={true} cssVisible={true} />

**解説**:
- `.btns2` に `display: flex;` と `gap: 12px;` を指定します。
- `button { flex: 1; }` とすることで、3 つのボタンが同じ幅で横に広がり、親要素の幅いっぱいに伸びます。

</Solution>

</Exercise>

<Exercise title="演習2-発展2（強調カードを少し広くする）">

3 枚のカードのうち、**真ん中のカードだけ少し広く**してください。

要件:
- `.cards2` をフレックスコンテナにする
- 3 枚のカードを横並びにする
- 真ん中のカードを両端より少し広くする

<CodePreview
  sourceId="flex-adv-ex2-adv2"
  cssVisible={false}
  initialHTML={`<div class="cards2">
    <div class="card">プランA</div>
    <div class="card main">おすすめプラン</div>
    <div class="card">プランC</div>
  </div>`}
  initialCSS={`.cards2 {
    display: flex;
    gap: 12px;
  }

  .card {
    flex: 1;
    border: 1px solid #ccc;
    padding: 12px;
    text-align: center;
  }

  .main {
    flex: 1.5;
    background: #fff8e1;
  }`}
/>

ヒント: 両端のカードと真ん中のカードで、`flex` の値を変えます。

<Solution>

<CodePreview sourceId="flex-adv-ex2-adv2" htmlVisible={true} cssVisible={true} />

**解説**:
- `.card { flex: 1; }` で基本の幅を設定します。
- `.main { flex: 1.5; }` で、真ん中のカードだけ 1.5 倍の幅にします。
- これにより、おすすめプランを強調できます。

</Solution>

</Exercise>

---

## flex-direction（横並び・縦並びの切り替え）

### flex-direction とは

**説明**: `flex-direction` は、フレックスアイテムの並ぶ **向き（主軸）** を決めます。

主な値:
- `row`（初期値）：左から右へ横並び
- `row-reverse`：右から左へ横並び
- `column`：上から下へ縦並び
- `column-reverse`：下から上へ縦並び

**基本の書き方**:
```css
.oya {
  display: flex;
  flex-direction: column;
}
```

### 動作イメージ

<CodePreview
  initialHTML={`<h4>flex-direction: row（初期値）</h4>
  <div class="dir yoko">
    <div class="item">1</div>
    <div class="item">2</div>
    <div class="item">3</div>
  </div>

  <h4>flex-direction: row-reverse</h4>
  <div class="dir gyaku-yoko">
    <div class="item">1</div>
    <div class="item">2</div>
    <div class="item">3</div>
  </div>

  <h4>flex-direction: column</h4>
  <div class="dir tate">
    <div class="item">1</div>
    <div class="item">2</div>
    <div class="item">3</div>
  </div>

  <h4>flex-direction: column-reverse</h4>
  <div class="dir gyaku-tate">
    <div class="item">1</div>
    <div class="item">2</div>
    <div class="item">3</div>
  </div>`}
  initialCSS={`.dir {
    display: flex;
    gap: 8px;
    border: 2px dashed #999;
    padding: 8px;
    margin-bottom: 8px;
  }

  .yoko {
    flex-direction: row;
  }

  .gyaku-yoko {
    flex-direction: row-reverse;
  }

  .tate {
    flex-direction: column;
  }

  .gyaku-tate {
    flex-direction: column-reverse;
  }

  .item {
    width: 60px;
    height: 40px;
    background: #ab47bc;
    color: #fff;
    text-align: center;
  }`}
/>

それぞれの `flex-direction` の値によって、要素の並び順と向きが変わることを確認してください。`row-reverse` は右から左へ、`column-reverse` は下から上へ並びます。

<Exercise title="演習3（縦並びのメニューボックス）">

スマホ用メニューのように、リンクを**縦並び**にしてください。

要件:
- `.menu` をフレックスコンテナにする
- リンク 3 つを縦方向に並べる
- リンク同士の間に余白を入れる

<CodePreview
  sourceId="flex-adv-ex3"
  cssVisible={false}
  initialHTML={`<nav class="menu">
    <a href="#">ホーム</a>
    <a href="#">商品一覧</a>
    <a href="#">お問い合わせ</a>
  </nav>`}
  initialCSS={`.menu {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  a {
    display: block;
    padding: 8px;
    border: 1px solid #ccc;
    text-decoration: none;
  }`}
/>

ヒント: `flex-direction` に縦方向の値を指定します。余白は `gap` を使うと簡単です。

<Solution>

<CodePreview sourceId="flex-adv-ex3" htmlVisible={true} cssVisible={true} />

**解説**:
- `.menu` に `display: flex;` を指定してフレックスコンテナにします。
- `flex-direction: column;` で、横並びの初期値（row）を縦並びに変更します。
- `gap` でリンク同士の間隔を統一できます。

</Solution>

</Exercise>

<Exercise title="演習3-発展1（横並びと縦並びのカード配置）">

カードを**横並び**と**縦並び**の2パターンで作ってください。

要件:
- `.cards3` をフレックスコンテナにする
- `.pc` クラスがついている方は横並びにする
- `.sp` クラスがついている方は縦並びにする

<CodePreview
  sourceId="flex-adv-ex3-adv1"
  cssVisible={false}
  initialHTML={`<h4>PC レイアウト（横並び）</h4>
  <div class="cards3 pc">
    <div class="card">カード1</div>
    <div class="card">カード2</div>
    <div class="card">カード3</div>
  </div>

  <h4>スマホレイアウト（縦並び）</h4>
  <div class="cards3 sp">
    <div class="card">カード1</div>
    <div class="card">カード2</div>
    <div class="card">カード3</div>
  </div>`}
  initialCSS={`.cards3 {
    display: flex;
    gap: 12px;
    margin-bottom: 12px;
  }

  .card {
    flex: 1;
    border: 1px solid #ccc;
    padding: 8px;
    margin: 0;
  }

  .pc {
    flex-direction: row;
  }

  .sp {
    flex-direction: column;
  }`}
/>

ヒント: `.pc` と `.sp` で `flex-direction` の値を変えます。

<Solution>

<CodePreview sourceId="flex-adv-ex3-adv1" htmlVisible={true} cssVisible={true} />

**解説**:
- `.cards3` に `display: flex;` を指定します。
- `.pc` では `flex-direction: row;`（横並び）、`.sp` では `flex-direction: column;`（縦並び）として、レイアウトの向きを切り替えます。
- 実際のレスポンシブ対応では、メディアクエリを使って画面幅に応じて自動的に切り替えます（詳細は別ページで学習します）。

</Solution>

</Exercise>

<Exercise title="演習3-発展2（flex-direction と align-items の組み合わせ）">

アイコンとテキストをまとめた「メニュー項目」を 3 つ作り、**縦並び**かつ、アイコンとテキストを**横並び上下中央揃え**にしてください。

要件:
- `.nav` をフレックスコンテナにし、項目を縦に並べる
- `.item` の中で、アイコンとテキストを横並びにし、上下中央にそろえる

<CodePreview
  sourceId="flex-adv-ex3-adv2"
  cssVisible={false}
  initialHTML={`<div class="nav">
    <div class="item">
      <span class="icon">🏠</span>
      <span class="label">ホーム</span>
    </div>
    <div class="item">
      <span class="icon">⭐</span>
      <span class="label">お気に入り</span>
    </div>
    <div class="item">
      <span class="icon">⚙️</span>
      <span class="label">設定</span>
    </div>
  </div>`}
  initialCSS={`.nav {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .item {
    display: flex;
    align-items: center;
    gap: 8px;
    border: 1px solid #ccc;
    padding: 8px;
  }`}
/>

ヒント:
- `.nav` では `flex-direction` を縦にします。
- `.item` の中でも Flexbox を使い、アイコンとテキストを**横並び上下中央揃え**にします。

<Solution>

<CodePreview sourceId="flex-adv-ex3-adv2" htmlVisible={true} cssVisible={true} />

**解説**:
- `.nav` に `display: flex; flex-direction: column;` を指定して、メニュー項目を縦に並べます。
- `.item` の中でも `display: flex; align-items: center;` を使い、アイコンとテキストを横並びかつ上下中央にそろえます。
- Flexbox は入れ子にすることで、複雑なレイアウトを実現できます。

</Solution>

</Exercise>

---

## まとめ

このページでは、Flexbox の次の 3 つを学びました。

- `align-items`：縦方向のそろえ方（上 / 中央 / 下 / 伸ばす）
- `flex`：アイテムごとの伸び縮みの割合
- `flex-direction`：横並び・縦並びの切り替え

これらを、前ページで学んだ `justify-content` / `gap` / `flex-wrap` と組み合わせることで、多くのレイアウトが作れます。
実際のレイアウトを作りながら、少しずつ使い方に慣れていきましょう。
