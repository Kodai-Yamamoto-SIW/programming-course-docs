---
sidebar_position: 9
---

import { CodePreview } from '@metyatech/code-preview';
import Exercise, { Solution } from '@metyatech/exercise/client';

# CSSセレクタ（基礎）

セレクタは、どの要素にスタイルを当てるかを決めるための書き方です。

---

## セレクタとは？

セレクタは「どの要素に当てるか」を選ぶ仕組みです。
- 例：`p { color: red; }` は「すべての p に赤色を当てる」。
- `#ichiban { ... }` は「id が ichiban の1つだけに当てる」。
- `.aka { ... }` は「class が aka のもの全部に当てる」。

---

## タグ名セレクタ（タイプセレクタ）

HTMLのタグ名を書くだけで、そのタグすべてに当たります。

構文:

```css
タグ名 {
  プロパティ: 値;
}
```

<CodePreview 
  initialHTML={`<h2>見出しの色</h2>
  <p>これは 1つ目の段落です。</p>
  <p>これは 2つ目の段落です。</p>`}
  initialCSS={`h2 {
    color: #1565FF;
  }
  p {
    color: #E53935;
  }`}
/>

ポイント：特定のタグに一括で同じ見た目を当てたいときに便利です。

---

## クラスセレクタ（.）

`class` 属性に付けた名前を使います。複数の要素に同じ見た目を当てられます。

構文:

```css
.クラス名 {
  プロパティ: 値;
}
```

<CodePreview 
  initialHTML={`<p class="aka">赤い文字（aka）</p>
  <p>ふつうの文字</p>
  <p class="aka">これも赤い（aka）</p>`}
  initialCSS={`.aka {
    color: #E53935;
  }`}
/>

ポイント：同じ役割の見た目をまとめて当てたいときに使います。

---

## IDセレクタ（#）

:::caution
`id` 属性に付けた名前は、1ページに同じ `id` は**必ず1回だけしか**使えません。
:::

構文:

```css
#id名 {
  プロパティ: 値;
}
```

<CodePreview 
  initialHTML={`<p id="ichiban">ここだけ特別（id: ichiban）</p>
  <p>ふつうの段落</p>`}
  initialCSS={`#ichiban {
    color: #6200EA;
  }`}
/>

ポイント：ページ内で「一つだけ特別にしたい」ときに使います。

---

## 子孫セレクタ（半角スペース）

「あるまとまりの中に入っている要素（子・孫・ひ孫…）」すべてに当てます。

構文:

```css
親セレクタ 子セレクタ {
  プロパティ: 値;
}
```

<CodePreview 
  initialHTML={`<div class="oya">
    <p>親の中の段落A</p>
    <div>
      <p>孫の段落B</p>
    </div>
  </div>
  <p>これは外の段落</p>`}
  initialCSS={`.oya p {
    color: #00A152;
  }`}
/>

ポイント：`.oya p` は「class が oya の中にある p だけ」で、
直接の子だけでなく、孫（入れ子のさらに中）にも当たります。
（例：`.oya > p` なら「親の中の段落A」だけに当たる）

---

## 全称セレクタ（*）

すべての要素に当てます。全体の基本スタイルを軽く整えるときに使えます。

構文:

```css
* {
  プロパティ: 値;
}
```

<CodePreview 
  initialHTML={`<h3>全体の色を少し落ち着かせる</h3>
  <p>本文の色が少し濃い灰色に。</p>`}
  initialCSS={`* {
    color: #1E88E5;
  }`}
/>

:::danger
`*`（全称セレクタ）は、すべての要素に当たるので**使いすぎ注意**！
ページ全体の見た目が変わりすぎたり、意図しない場所まで影響することがあります。
本当に必要なときだけ使いましょう。
:::

---

## グループセレクタ（,）

「同じ見た目を複数のセレクタにまとめて当てる」書き方です。

構文:

```css
セレクタA, セレクタB {
  プロパティ: 値;
}
```

<CodePreview 
  initialHTML={`<h2>見出し2</h2>
  <h3>見出し3</h3>
  <p class="danraku">段落</p>`}
  initialCSS={`h2, h3, .danraku {
    color: #6200EA;
  }`}
/>

---

## よくある組み合わせ例

- メニューの中のリンクだけ

```css
.menu a {
  /* ここにスタイル */
}
```

- id honbun の中の段落だけ

```css
#honbun p {
  /* ここにスタイル */
}
```

- h1と「ookii」クラスをまとめて大きく

```css
h1, .ookii {
  font-size: 32px;
}
```

---

## 子セレクタ（>）

親の「直下の子」だけに当てます。

構文:

```css
親セレクタ > 子セレクタ {
  プロパティ: 値;
}
```

<CodePreview 
  initialHTML={`<div class="oya">
    <p>子A（直下）</p>
    <div class="naka">
      <p>孫B（入れ子）</p>
    </div>
  </div>`}
  initialCSS={`.oya > p {
    color: #00A152;
  }`}
/>

ポイント：`.oya > p` は「.oya のすぐ下にある p だけ」。入れ子のさらに中の p には当たりません。

---

## 擬似クラス（:hover など）

状態に応じて当て方を変えられます。

構文（例）:

```css
:hover { /* マウスを重ねたとき */ }
:first-child { /* 最初の子 */ }
:last-child { /* 最後の子 */ }
:not(セレクタ) { /* 指定したセレクタにあてはまらないもの */ }
```

<CodePreview 
  initialHTML={`<div class="menu">
    <a href="#">ホーム</a>
    <a href="#">お知らせ</a>
  </div>
  <a href="#">外のリンク</a>`}
  initialCSS={`/* .menu の中の hover中のa */
.menu a:hover {
    color: #00A152;
  }`}
/>

例：現在ページ以外だけ反応させる（:not）

<CodePreview 
  initialHTML={`<div class="menu">
    <a href="#" class="genzai">ホーム</a>
    <a href="#">お知らせ</a>
  </div>`}
  initialCSS={`/* .menu の中の a のうち、.genzai ではないものに hover したとき */
.menu a:not(.genzai):hover {
    color: #E91E63;
  }`}
/>

---

## 組み合わせ（クラス + :hover など）

複数の条件をつなげて、細かく指定できます。

構文（ポイント）：

- スペースを入れずに一続きで書くと、「同じ要素」に条件を重ねます（全部あてはまるものだけに当たる）。
- スペースを入れると、「中にある〜（子孫）」という範囲指定の意味になります。

```css
/* 同じ要素に条件を重ねる（スペースなし） */
h2.midashi:hover {
  /* h2 で、class が midashi で、マウスホバー中のもの */
}
.aka.ookii {
  /* class が aka と ookii の両方を持つ同じ要素 */
}

/* 範囲（子孫）指定の例（スペースあり） */
.honbun p {
  /* .honbun の中にある p すべて */
}
```

<CodePreview 
  initialHTML={`<p class="aka">マウスを重ねると色が変わる（aka）</p>
  <p>ふつうの段落</p>`}
  initialCSS={`.aka:hover {
    color: #E91E63;
  }`}
/>

例2：範囲 + :first-child（最初の1つだけ）

<CodePreview 
  initialHTML={`<div class="honbun">
    <p>最初の段落</p>
    <p>2つ目の段落</p>
  </div>`}
  initialCSS={`.honbun p:first-child {
    color: #1565FF;
  }`}
/>

例3：タグ + クラス + :hover（複数条件）

<CodePreview 
  initialHTML={`<h2 class="midashi">見出し（midashi）</h2>
  <h2>ふつうの見出し</h2>`}
  initialCSS={`h2.midashi:hover {
    color: #6200EA;
  }`}
/>

---

## 演習

はじめに：いろいろな出題形式でセレクタの理解を深めます。難易度は少しずつ上がります。迷ったら、上の講義を見直してください。

---

### 演習1：用語の確認（選択式）

<Exercise title="演習1">

次のうち、「すべての段落」に当たるものはどれ？

- A) `.p`
- B) `#p`
- C) `p`

<Solution>
答え：C（タグ名セレクタ）。`.p` はクラス、`#p` はidです。
</Solution>
</Exercise>

---

### 演習2：穴埋め（クラス）

<Exercise title="演習2">

HTML：
```html
<p class="aka">強調</p>
<p>ふつう</p>
```

クラス aka だけを赤にしたい。空欄_____を埋めてください。

CSS：
```css
_____ {
  color: #E53935;
}
```

<Solution>
答え：`.aka`
</Solution>
</Exercise>

---

### 演習3：グループセレクタ（選択式）

<Exercise title="演習3">

「h2 と h3 と .danraku を同じ色にする」正しい書き方はどれ？

- A) `h2 h3 .danraku { color: #6200EA; }`
- B) `h2, h3, .danraku { color: #6200EA; }`
- C) `h2 + h3 + .danraku { color: #6200EA; }`

<Solution>
答え：B（カンマで区切るのがグループ）。
</Solution>
</Exercise>

---

### 演習4：全称セレクタ（正誤）

<Exercise title="演習4">

次の文は正しい？間違い？（理由も一言）

1) `*` はページのすべての要素に当たる。
2) `*` はいつでもたくさん使ってOK。

<Solution>
答え：
- 1) 正しい
- 2) 間違い（使いすぎ注意。意図しない場所まで影響する）
</Solution>
</Exercise>

---

### 演習5：子孫と子（選択式）

<Exercise title="演習5">

`.oya p` と `.oya > p` の違いについて正しいのはどれ？

- A) どちらも同じ意味
- B) `.oya p` は中にある p すべて、`.oya > p` は直下の p だけ
- C) `.oya > p` の方が色が濃くなる

<Solution>
答え：B（スペース=子孫、`>`=直下）。
</Solution>
</Exercise>

---

### 演習6：手を動かす（子孫）

<Exercise title="演習6">

HTML：
```html
<div class="oya">
  <p>A（親の中）</p>
  <div>
    <p>B（孫の中）</p>
  </div>
</div>
<p>C（外）</p>
```

やること：上のHTMLで、.oya の中にある p すべてを `#00A152` にしてください。外の p は変えない。

<Solution>
<CodePreview 
  initialHTML={`<div class="oya">
    <p>A（親の中）</p>
    <div>
      <p>B（孫の中）</p>
    </div>
  </div>
  <p>C（外）</p>`}
  initialCSS={`.oya p {
    color: #00A152;
  }`}
/>
</Solution>
</Exercise>

---

### 演習7：手を動かす（子）

<Exercise title="演習7">

HTML：
```html
<div class="oya">
  <p>子A（直下）</p>
  <div>
    <p>孫B（入れ子）</p>
  </div>
  <p>子C（直下）</p>
</div>
```

やること：上のHTMLで、直下の p だけ `#00A152` にしてください（孫は変えない）。

<Solution>
<CodePreview 
  initialHTML={`<div class="oya">
    <p>子A（直下）</p>
    <div>
      <p>孫B（入れ子）</p>
    </div>
    <p>子C（直下）</p>
  </div>`}
  initialCSS={`.oya > p {
    color: #00A152;
  }`}
/>
</Solution>
</Exercise>

---

### 演習8：範囲の中のリンクだけ（hover）

<Exercise title="演習8">

HTML：
```html
<div class="menu">
  <a href="#">ホーム</a>
  <a href="#">お知らせ</a>
</div>
<a href="#">外のリンク</a>
```

やること：上のHTMLで、.menu の中の a にマウスを重ねたときの色を `#E91E63` にしてください。外の a の色は変えないでください。

<Solution>
<CodePreview 
  initialHTML={`<div class="menu">
    <a href="#">ホーム</a>
    <a href="#">お知らせ</a>
  </div>
  <a href="#">外のリンク</a>`}
  initialCSS={`.menu a:hover {
    color: #E91E63;
  }`}
/>
</Solution>
</Exercise>

---

### 演習9：hover の考え方（記述）

<Exercise title="演習9">

`.menu a:hover` はどんなときに当たりますか？短い言葉で説明してください。

<Solution>
答え例：`.menu の中の a に、マウスを重ねているときだけ`。
</Solution>
</Exercise>

---

### 演習10：手を動かす（hover）

<Exercise title="演習10">

HTML：
```html
<p class="aka">重ねると色が変わる</p>
<p>ふつう</p>
```

やること：aka クラスにマウスを重ねたときだけ `#E91E63` にしてください。

<Solution>
<CodePreview 
  initialHTML={`<p class="aka">重ねると色が変わる</p>
  <p>ふつう</p>`}
  initialCSS={`.aka:hover {
    color: #E91E63;
  }`}
/>
</Solution>
</Exercise>

---

### 演習11：先頭と最後（手を動かす）

<Exercise title="演習11">

HTML：
```html
<ul class="ichiran">
  <li>りんご</li>
  <li>みかん</li>
  <li>バナナ</li>
</ul>
```

やること：最初の li を `#1565FF`、最後の li を `#E91E63` にしてください。

<Solution>
<CodePreview 
  initialHTML={`<ul class="ichiran">
    <li>りんご</li>
    <li>みかん</li>
    <li>バナナ</li>
  </ul>`}
  initialCSS={`.ichiran li:first-child {
    color: #1565FF;
  }
  .ichiran li:last-child {
    color: #E91E63;
  }`}
/>
</Solution>
</Exercise>

---

### 演習12：除外（手を動かす）

<Exercise title="演習12">

HTML：
```html
<div class="honbun">
  <p>本文A</p>
  <p class="aka">本文B（aka）</p>
  <p>本文C</p>
</div>
```

やること：.honbun の中で、aka ではない p だけ `#00A152` にしてください。

<Solution>
<CodePreview 
  initialHTML={`<div class="honbun">
    <p>本文A</p>
    <p class="aka">本文B（aka）</p>
    <p>本文C</p>
  </div>`}
  initialCSS={`.honbun p:not(.aka) {
    color: #00A152;
  }`}
/>
</Solution>
</Exercise>

---

### 演習13：組み合わせの見分け（選択式）

<Exercise title="演習13">

次のうち、「同じ要素に条件を重ねる」書き方はどれ？

- A) `.honbun p`
- B) `h2.midashi`
- C) `.menu a`

<Solution>
答え：B（AとCは子孫の書き方）。
</Solution>
</Exercise>

---

### 演習14：特異性（選択式）

<Exercise title="演習14">

メモ：CSS には「優先順位（特異性）」という考え方があります。同じ場所に当たる指定がぶつかったとき、強いほうが勝ちます。

この問題は、その強い順（左がいちばん強い）を選ぶ問題です。次のうち正しいのはどれ？

- A) id > クラス > タグ
- B) クラス > id > タグ
- C) タグ > クラス > id

<Solution>
答え：A（左から強い順: id → クラス → タグ）。

解説：
- id は「ページ内で1つに当てる特別な指定」なので最優先になります。
- クラスは「役割のまとまり」に当てる指定で、タグ名より強いです。
- タグ名（h2, p など）は最も弱い指定です。
- なお、強さが同点なら「あとに書いたほう」が勝ちます（書いた順）。
</Solution>
</Exercise>

---

### 演習15：どの色になる？（読み取り）

<Exercise title="演習15">

HTML：
```html
<p class="aka" id="tokubetsu">テキスト</p>
```

CSS：
```css
p { color: red; }
.aka { color: blue; }
#tokubetsu { color: purple; }
```

どの色で表示されますか？（赤/青/紫から1つ）

<Solution>
答え：紫（purple）。id が最も強い。
</Solution>
</Exercise>

---

### 演習16：穴埋め（組み合わせ）

<Exercise title="演習16">

「h2 で、クラス midashi を持ち、マウスを重ねたとき」に当てたい。空欄_____を埋めてください。

```css
_____ {
  color: #6200EA;
}
```

<Solution>
答え：`h2.midashi:hover`
</Solution>
</Exercise>

---

### 演習17：デバッグ（修正）

<Exercise title="演習17">

「.honbun の中の p すべて」に当てたいのに、直下の p にしか当たりません。どこを直せばよい？

現在：`.honbun > p { color: #1565FF; }`

<Solution>
`>` をスペースに直す。

修正後：`.honbun p { color: #1565FF; }`
</Solution>
</Exercise>

---

### 演習18：総合（実装）

<Exercise title="演習18">

HTML：
```html
<h2 class="midashi">タイトル</h2>
<div class="oya">
  <p>本文A</p>
  <div>
    <p>本文B（孫）</p>
  </div>
</div>
<div class="menu">
  <a href="#">リンク1</a>
  <a href="#" class="genzai">リンク2（現在）</a>
</div>
<p id="tokubetsu">特別</p>
```

やること：
- ページ全体の文字色を `#1565FF`
- 見出し（h2）は `#6200EA`
- .oya の中の p はすべて `#00A152`
- .menu の中の a にマウスを重ねたときだけ `#E91E63`（ただし .genzai は変えない）
- id="tokubetsu" は `#E91E63`

<Solution>
<CodePreview 
  initialHTML={`<h2 class=\"midashi\">タイトル</h2>
  <div class=\"oya\">
    <p>本文A</p>
    <div>
      <p>本文B（孫）</p>
    </div>
  </div>
  <div class=\"menu\">
    <a href=\"#\">リンク1</a>
    <a href=\"#\" class=\"genzai\">リンク2（現在）</a>
  </div>
  <p id=\"tokubetsu\">特別</p>`}
  initialCSS={`* {
    color: #1565FF;
  }
  h2 {
    color: #6200EA;
  }
  .oya p {
    color: #00A152;
  }
  .menu a:not(.genzai):hover {
    color: #E91E63;
  }
  #tokubetsu {
    color: #E91E63;
  }`}
/>
</Solution>
</Exercise>
