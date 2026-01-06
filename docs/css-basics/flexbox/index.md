---
sidebar_position: 7
---

import Exercise, { Solution } from '@kodai-yamamoto-siw/exercise/client';
import { CodePreview } from '@kodai-yamamoto-siw/code-preview';

# Flexbox（フレックスボックス）

CSSの**Flexbox**（フレキシブルボックスレイアウト）は、要素を柔軟に並べるための強力なレイアウト手法です。横並びや縦並びを簡単に実現でき、要素間の余白の調整や位置揃えも直感的に行えます。

本ページでは、Flexboxの基本となる4つのプロパティを学びます。

- `display: flex`（フレックスコンテナの作成）
- `justify-content`（主軸方向の配置）
- `gap`（要素間の余白）
- `flex-wrap`（折り返し）

---

## 今日の学習はこんなところで使うよ

Flexboxは、現代のWebサイトで最もよく使われるレイアウト手法の1つです。ナビゲーションメニュー、カードグリッド、フッターなど、多くの場面で活躍します。

以下は、ショッピングサイトのヘッダーと商品一覧の例です。

<CodePreview 
  htmlVisible={false}
  cssVisible={false}
  consoleVisible={false}
  previewVisible={true}
  initialHTML={`<header class="head">
    <div class="rogo">🛒 SHOP</div>
    <nav class="navi">
      <a href="#">ホーム</a>
      <a href="#">商品</a>
      <a href="#">お問い合わせ</a>
    </nav>
    <div class="menu">
      <span>カート</span>
      <span>ログイン</span>
    </div>
  </header>
  
  <main class="nakami">
    <h2>おすすめ商品</h2>
    <div class="shohin">
      <div class="card">
        <div class="photo"></div>
        <h3>商品A</h3>
        <p>¥1,980</p>
      </div>
      <div class="card">
        <div class="photo"></div>
        <h3>商品B</h3>
        <p>¥2,480</p>
      </div>
      <div class="card">
        <div class="photo"></div>
        <h3>商品C</h3>
        <p>¥1,280</p>
      </div>
      <div class="card">
        <div class="photo"></div>
        <h3>商品D</h3>
        <p>¥3,200</p>
      </div>
      <div class="card">
        <div class="photo"></div>
        <h3>商品E</h3>
        <p>¥1,580</p>
      </div>
    </div>
  </main>`}
  initialCSS={`body {
    margin: 0;
    font-family: sans-serif;
  }
  
  /* ヘッダー: Flexboxで左・中央・右に配置 */
  .head {
    background: #1976d2;
    color: #fff;
    padding: 16px 24px;
    display: flex;
    justify-content: space-between;
    gap: 16px;
  }
  
  .rogo {
    font-size: 20px;
    font-weight: bold;
  }
  
  /* ナビゲーション: Flexboxで横並び */
  .navi {
    display: flex;
    gap: 20px;
  }
  
  .navi a {
    color: #fff;
    text-decoration: none;
  }
  
  /* メニュー: Flexboxで横並び */
  .menu {
    display: flex;
    gap: 16px;
  }
  
  .nakami {
    padding: 24px;
  }
  
  .nakami h2 {
    margin: 0 0 20px;
  }
  
  /* 商品一覧: Flexboxでカードを横並び、折り返し */
  .shohin {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
  }
  
  .card {
    width: 180px;
    background: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 12px;
    box-shadow: 0 2px 4px rgba(0,0,0,.1);
  }
  
  .photo {
    height: 140px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 4px;
    margin-bottom: 8px;
  }
  
  .card h3 {
    margin: 0 0 8px;
    font-size: 16px;
  }
  
  .card p {
    margin: 0;
    font-weight: bold;
    color: #1976d2;
  }`}
/>

---

## display: flex（フレックスコンテナ）

### 📦 display: flex とは

**説明**: 親要素に `display: flex;` を指定すると、その要素は**フレックスコンテナ**となり、直下の子要素（**フレックスアイテム**）が横並びになります。

**基本的な書き方**:
```css
親要素のセレクタ {
    display: flex;
}
```

### 基本的な動作例

<CodePreview 
  initialHTML={`<div class="oya">
    <div class="hako">A</div>
    <div class="hako">B</div>
    <div class="hako">C</div>
  </div>`}
  initialCSS={`/* フレックスコンテナ */
  .oya {
    display: flex;
    border: 2px dashed #999;
    padding: 8px;
  }
  
  /* フレックスアイテム */
  .hako {
    width: 80px;
    height: 80px;
    background: #2196f3;
    color: #fff;
    border: 2px solid #1976d2;
  }`}
/>

親の `.oya` に `display: flex;` を指定すると、子要素の `.hako` が横並びになります。

:::info display: flex の強力な効果

通常、`display: block` の要素は前後に改行が入り縦に並びます。しかし、親要素に `display: flex` を指定すると、たとえ子要素が `display: block` であっても横並びになります。つまり、**親の `display: flex` の方が強く効く**ため、子要素の配置方法が変わります。これにより、ナビゲーションメニューやカードの横並びレイアウトが簡単に作れます。

:::

<Exercise title="演習1（横並びのボタン）">

3つのボタンが横に並ぶようにCSSを書いてください。下のプレビューのような見た目になるようにしてください。

<CodePreview 
  sourceId="flex-ex1"
  cssVisible={false}
  initialHTML={`<div class="btngroup">
    <div class="btn">保存</div>
    <div class="btn">キャンセル</div>
    <div class="btn">削除</div>
  </div>`}
  initialCSS={`.btngroup {
    display: flex;
  }
  
  .btn {
    border: 2px solid #1565c0;
  }`}
/>

<Solution>

<CodePreview sourceId="flex-ex1" htmlVisible={true} cssVisible={true} />

**解説**:
- `.btngroup` に `display: flex;` を指定することで、直下の `.btn` 要素（`div`）が横並びになります。
- `div` は通常 `display: block` なので縦に並びますが、親に `display: flex` を指定することで横並びになります。

</Solution>

</Exercise>

---

## gap（要素間の余白）

### 📏 gap とは

**説明**: `gap` プロパティは、フレックスアイテム同士の間隔を一括で指定できます。

**基本的な書き方**:
```css
親要素のセレクタ {
    display: flex;
    gap: 値;
}
```

### 基本的な動作例

<CodePreview 
  initialHTML={`<h4>gap なし</h4>
  <div class="oya nashi">
    <div class="hako">A</div>
    <div class="hako">B</div>
    <div class="hako">C</div>
  </div>
  
  <h4>gap: 16px</h4>
  <div class="oya ari">
    <div class="hako">A</div>
    <div class="hako">B</div>
    <div class="hako">C</div>
  </div>`}
  initialCSS={`.oya {
    display: flex;
    border: 2px dashed #999;
    padding: 8px;
    margin-bottom: 16px;
  }
  
  /* gap なし */
  .nashi {
    gap: 0;
  }
  
  /* gap あり */
  .ari {
    gap: 16px;
  }
  
  .hako {
    width: 80px;
    height: 80px;
    background: #4caf50;
    color: #fff;
  }`}
/>

`gap: 16px;` を指定すると、要素間に16pxの余白が自動的に入ります。

<Exercise title="演習2（余白のあるカード）">

3つのカードが横に並び、カード間に余白が入るようにCSSを書いてください。下のプレビューのような見た目になるようにしてください。

<CodePreview 
  sourceId="flex-ex2"
  cssVisible={false}
  initialHTML={`<div class="cardlist">
    <div class="card">カードA</div>
    <div class="card">カードB</div>
    <div class="card">カードC</div>
  </div>`}
  initialCSS={`.cardlist {
    display: flex;
    gap: 12px;
  }
  
  .card {
    width: 120px;
    height: 100px;
    border: 1px solid #ddd;
  }`}
/>

<Solution>

<CodePreview sourceId="flex-ex2" htmlVisible={true} cssVisible={true} />

**解説**:
- `display: flex;` で横並びにし、`gap: 12px;` で要素間の余白を指定します。
- `gap` を使うことで、各カードに個別に `margin` を指定する必要がなくなります。

</Solution>

</Exercise>

<Exercise title="演習2-発展（ナビゲーションメニュー）">

ナビゲーションメニューのリンクが横に並び、リンク間に余白が入るようにCSSを書いてください。下のプレビューのような見た目になるようにしてください。

<CodePreview 
  sourceId="flex-ex2-adv"
  cssVisible={false}
  initialHTML={`<nav class="navi">
    <a href="#">ホーム</a>
    <a href="#">商品</a>
    <a href="#">会社情報</a>
    <a href="#">お問い合わせ</a>
  </nav>`}
  initialCSS={`.navi {
    display: flex;
    gap: 20px;
  }`}
/>

<Solution>

<CodePreview sourceId="flex-ex2-adv" htmlVisible={true} cssVisible={true} />

**解説**:
- ナビゲーションメニューは、Flexboxを使った横並びレイアウトの典型的な例です。
- `gap` を使うことで、リンク間の余白を統一できます。

</Solution>

</Exercise>

---

## justify-content（主軸方向の配置）

### 🎯 justify-content とは

**説明**: `justify-content` プロパティは、フレックスアイテムを主軸（横並びの場合は横方向）に沿ってどのように配置するかを指定します。

**主な値**:
- `flex-start`（初期値）：先頭に寄せる（左寄せ）
- `flex-end`：末尾に寄せる（右寄せ）
- `center`：中央に寄せる
- `space-between`：両端に配置し、間を均等に空ける
- `space-around`：両端にも余白を作り、全体的に均等に空ける
- `space-evenly`：すべての余白を均等に空ける

**基本的な書き方**:
```css
親要素のセレクタ {
    display: flex;
    justify-content: 値;
}
```

### 動作例

<CodePreview 
  initialHTML={`<h4>flex-start（初期値）</h4>
  <div class="oya rei1">
    <div class="hako">A</div>
    <div class="hako">B</div>
    <div class="hako">C</div>
  </div>
  
  <h4>center</h4>
  <div class="oya rei2">
    <div class="hako">A</div>
    <div class="hako">B</div>
    <div class="hako">C</div>
  </div>
  
  <h4>flex-end</h4>
  <div class="oya rei3">
    <div class="hako">A</div>
    <div class="hako">B</div>
    <div class="hako">C</div>
  </div>
  
  <h4>space-between</h4>
  <div class="oya rei4">
    <div class="hako">A</div>
    <div class="hako">B</div>
    <div class="hako">C</div>
  </div>
  
  <h4>space-around</h4>
  <div class="oya rei5">
    <div class="hako">A</div>
    <div class="hako">B</div>
    <div class="hako">C</div>
  </div>
  
  <h4>space-evenly</h4>
  <div class="oya rei6">
    <div class="hako">A</div>
    <div class="hako">B</div>
    <div class="hako">C</div>
  </div>`}
  initialCSS={`.oya {
    display: flex;
    border: 2px dashed #999;
    padding: 8px;
    margin-bottom: 16px;
  }
  
  .rei1 {
    justify-content: flex-start;
  }
  
  .rei2 {
    justify-content: center;
  }
  
  .rei3 {
    justify-content: flex-end;
  }
  
  .rei4 {
    justify-content: space-between;
  }
  
  .rei5 {
    justify-content: space-around;
  }
  
  .rei6 {
    justify-content: space-evenly;
  }
  
  .hako {
    width: 60px;
    height: 60px;
    background: #ff9800;
    color: #fff;
  }`}
/>

それぞれの `justify-content` の値によって、要素の配置が変わることを確認してください。

<Exercise title="演習3（中央寄せのボタングループ）">

2つのボタンが中央に配置され、ボタン間に余白が入るようにCSSを書いてください。下のプレビューのような見た目になるようにしてください。

<CodePreview 
  sourceId="flex-ex3"
  cssVisible={false}
  initialHTML={`<div class="btns">
    <button>戻る</button>
    <button>次へ</button>
  </div>`}
  initialCSS={`.btns {
    display: flex;
    justify-content: center;
    gap: 12px;
  }
  
  button {
    border: 2px solid #388e3c;
  }`}
/>

<Solution>

<CodePreview sourceId="flex-ex3" htmlVisible={true} cssVisible={true} />

**解説**:
- `justify-content: center;` で要素を中央に配置します。
- `gap` で要素間の余白も指定しています。

</Solution>

</Exercise>

<Exercise title="演習3-発展1（ヘッダーの左右配置）">

ヘッダー内で、ロゴを左端に、ナビゲーションメニューを右端に配置してください。ナビゲーションメニューのリンクは横に並び、リンク間に余白が入るようにしてください。下のプレビューのような見た目になるようにしてください。

<CodePreview 
  sourceId="flex-ex3-adv"
  cssVisible={false}
  initialHTML={`<header class="head">
    <div class="rogo">🏠 ロゴ</div>
    <nav class="navi">
      <a href="#">メニュー1</a>
      <a href="#">メニュー2</a>
      <a href="#">メニュー3</a>
    </nav>
  </header>`}
  initialCSS={`.head {
    display: flex;
    justify-content: space-between;
  }
  
  .navi {
    display: flex;
    gap: 16px;
  }`}
/>

<Solution>

<CodePreview sourceId="flex-ex3-adv" htmlVisible={true} cssVisible={true} />

**解説**:
- `justify-content: space-between;` で、最初の要素（ロゴ）を左端、最後の要素（ナビゲーション）を右端に配置します。
- ヘッダーレイアウトの典型的なパターンです。

</Solution>

</Exercise>

<Exercise title="演習3-発展2（均等配置のアイコンメニュー）">

4つのアイコンが横に並び、すべての余白（左端・アイコン間・右端）が均等になるようにCSSを書いてください。下のプレビューのような見た目になるようにしてください。

<CodePreview 
  sourceId="flex-ex3-adv2"
  cssVisible={false}
  initialHTML={`<div class="iconlist">
    <div class="icon">🏠</div>
    <div class="icon">🔍</div>
    <div class="icon">❤️</div>
    <div class="icon">👤</div>
  </div>`}
  initialCSS={`.iconlist {
    display: flex;
    justify-content: space-evenly;
  }`}
/>

<Solution>

<CodePreview sourceId="flex-ex3-adv2" htmlVisible={true} cssVisible={true} />

**解説**:
- `justify-content: space-evenly;` で、すべての余白を均等に配置します。
- モバイルアプリのような下部ナビゲーションバーでよく使われるパターンです。

</Solution>

</Exercise>

---

## flex-wrap（折り返し）

### 🔄 flex-wrap とは

**説明**: `flex-wrap` プロパティは、フレックスアイテムが親要素の幅に収まらない場合に、折り返すかどうかを指定します。

**主な値**:
- `nowrap`（初期値）：折り返さない（1行に収める）
- `wrap`：折り返す（複数行になる）

**基本的な書き方**:
```css
親要素のセレクタ {
    display: flex;
    flex-wrap: 値;
}
```

### 動作例

<CodePreview 
  initialHTML={`<h4>flex-wrap: nowrap（初期値）</h4>
  <div class="oya nashi">
    <div class="hako">1</div>
    <div class="hako">2</div>
    <div class="hako">3</div>
    <div class="hako">4</div>
    <div class="hako">5</div>
    <div class="hako">6</div>
  </div>
  
  <h4>flex-wrap: wrap</h4>
  <div class="oya ari">
    <div class="hako">1</div>
    <div class="hako">2</div>
    <div class="hako">3</div>
    <div class="hako">4</div>
    <div class="hako">5</div>
    <div class="hako">6</div>
  </div>`}
  initialCSS={`.oya {
    display: flex;
    gap: 8px;
    border: 2px dashed #999;
    padding: 8px;
    margin-bottom: 16px;
  }
  
  .nashi {
    flex-wrap: nowrap;
  }
  
  .ari {
    flex-wrap: wrap;
  }
  
  .hako {
    width: 100px;
    height: 60px;
    background: #9c27b0;
    color: #fff;
  }`}
/>

`flex-wrap: nowrap;` では要素が1行に収まるように縮小されますが、`flex-wrap: wrap;` では折り返して複数行になります。

<Exercise title="演習4（折り返しのあるカードグリッド）">

商品カードが横に並び、親要素の幅に収まらない場合は次の行に折り返されるようにCSSを書いてください。カード間には余白を入れてください。下のプレビューのような見た目になるようにしてください。

<CodePreview 
  sourceId="flex-ex4"
  cssVisible={false}
  initialHTML={`<div class="shohin">
    <div class="card">商品1</div>
    <div class="card">商品2</div>
    <div class="card">商品3</div>
    <div class="card">商品4</div>
    <div class="card">商品5</div>
    <div class="card">商品6</div>
  </div>`}
  initialCSS={`.shohin {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }
  
  .card {
    width: 140px;
    height: 100px;
    border: 1px solid #90caf9;
  }`}
/>

<Solution>

<CodePreview sourceId="flex-ex4" htmlVisible={true} cssVisible={true} />

**解説**:
- `flex-wrap: wrap;` で要素が折り返されます。
- 商品一覧やギャラリーなど、レスポンシブなグリッドレイアウトに最適です。

</Solution>

</Exercise>

<Exercise title="演習4-発展1（タグクラウド）">

タグが中央に配置され、横に並び、親要素の幅に収まらない場合は次の行に折り返されるようにCSSを書いてください。タグ間には余白を入れてください。下のプレビューのような見た目になるようにしてください。

<CodePreview 
  sourceId="flex-ex4-adv"
  cssVisible={false}
  initialHTML={`<div class="taglist">
    <span class="tag">HTML</span>
    <span class="tag">CSS</span>
    <span class="tag">JavaScript</span>
    <span class="tag">React</span>
    <span class="tag">Vue</span>
    <span class="tag">TypeScript</span>
    <span class="tag">Node.js</span>
    <span class="tag">Python</span>
  </div>`}
  initialCSS={`.taglist {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .tag {
    border: 1px solid #2196f3;
  }`}
/>

<Solution>

<CodePreview sourceId="flex-ex4-adv" htmlVisible={true} cssVisible={true} />

**解説**:
- `flex-wrap: wrap;` で折り返し、`justify-content: center;` で中央寄せにします。
- タグクラウドやラベル一覧など、動的なコンテンツの表示に便利です。

</Solution>

</Exercise>

<Exercise title="演習4-発展2（レスポンシブな画像ギャラリー）">

画像が横に並び、親要素の幅に収まらない場合は次の行に折り返されるようにCSSを書いてください。画像間には余白を入れてください。下のプレビューのような見た目になるようにしてください。

<CodePreview 
  sourceId="flex-ex4-adv2"
  cssVisible={false}
  initialHTML={`<div class="gazou">
    <div class="photo">📷</div>
    <div class="photo">📷</div>
    <div class="photo">📷</div>
    <div class="photo">📷</div>
    <div class="photo">📷</div>
    <div class="photo">📷</div>
    <div class="photo">📷</div>
    <div class="photo">📷</div>
  </div>`}
  initialCSS={`.gazou {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
  }
  
  .photo {
    width: 120px;
    height: 120px;
    border: 1px solid #999;
  }`}
/>

<Solution>

<CodePreview sourceId="flex-ex4-adv2" htmlVisible={true} cssVisible={true} />

**解説**:
- `display: flex;` と `flex-wrap: wrap;` を組み合わせることで、画像ギャラリーのようなレスポンシブなグリッドレイアウトが作れます。
- `gap` で画像間の余白を統一します。

</Solution>

</Exercise>

<Exercise title="演習4-発展3（カードレイアウトの完成形）">

カードが中央に配置され、横に並び、親要素の幅に収まらない場合は次の行に折り返されるようにCSSを書いてください。カード間には余白を入れてください。下のプレビューのような見た目になるようにしてください。

<CodePreview 
  sourceId="flex-ex4-adv3"
  cssVisible={false}
  initialHTML={`<div class="cardoya">
    <div class="card">
      <h3>カード1</h3>
      <p>短い説明文。</p>
    </div>
    <div class="card">
      <h3>カード2</h3>
      <p>少し長めの説明文が入ります。</p>
    </div>
    <div class="card">
      <h3>カード3</h3>
      <p>さらに長い説明文。複数行にわたる場合もあります。</p>
    </div>
    <div class="card">
      <h3>カード4</h3>
      <p>4枚目のカード。</p>
    </div>
  </div>`}
  initialCSS={`.cardoya {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .card {
    width: 240px;
    border: 1px solid #e0e0e0;
  }`}
/>

<Solution>

<CodePreview sourceId="flex-ex4-adv3" htmlVisible={true} cssVisible={true} />

**解説**:
- `display: flex;` で横並び、`flex-wrap: wrap;` で折り返し、`gap: 20px;` で余白、`justify-content: center;` で中央寄せを実現します。
- これらのプロパティを組み合わせることで、実用的なカードレイアウトが簡単に作れます。

</Solution>

</Exercise>

---

## まとめ：Flexboxの基本

本ページで学習した4つのプロパティを組み合わせることで、様々なレイアウトを実現できます。

```css
/* 基本パターン */
.oya {
    display: flex;           /* フレックスコンテナにする */
    gap: 16px;              /* 要素間の余白 */
    justify-content: center; /* 主軸方向の配置 */
    flex-wrap: wrap;        /* 折り返し */
}
```

### よくある使い方

- **ナビゲーションメニュー**: `display: flex` + `gap`
- **ヘッダーレイアウト**: `justify-content: space-between`
- **カードグリッド**: `flex-wrap: wrap` + `gap`
- **ボタングループ**: `justify-content: center` + `gap`

Flexboxは、現代のWebレイアウトで最も重要な技術の1つです。これらの基本をマスターすることで、多くのレイアウトパターンを実現できるようになります。

## 練習: デザインに合わせて作る

最後に、練習として次のデザイン通りのサイトを作ってみましょう。

デザインへのリンク: https://www.figma.com/design/hvae4QKzBkGi79L6AAIsKF/Website-of-architects---free-website--Community-?node-id=0-1&t=VwT0ZkKsl6b6cwEm-1

### 著作権元
<p style={{"font-size":"0.8em"}}><a href="https://www.figma.com/community/file/891374608655348853" target="_blank" rel="noopener noreferrer">上述のデザインの元デザイン</a></p>
