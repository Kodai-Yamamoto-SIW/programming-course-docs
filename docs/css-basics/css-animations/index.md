---
sidebar_position: 8
---

import { CodePreview } from '@metyatech/code-preview';
import Exercise, { Solution } from '@metyatech/exercise/client';

# CSSアニメーション

## CSSアニメーションとは

CSSアニメーションは、要素の状態変化を滑らかに表現する機能です。  
疑似クラス（`:hover`など）と組み合わせてユーザーの操作に反応する動きを作ります。

---

## transitionプロパティ

**`transition`** は、CSS プロパティの値の変化を滑らかにアニメーション化するプロパティです。

### 基本的な構文

```css
transition: プロパティ名 時間;
```

**例**:
```css
.button {
    background-color: blue;
    transition: background-color 0.3s;
}

.button:hover {
    background-color: red;
}
```

---

## ボタンのアニメーション

ボタンにマウスを乗せた時の色や位置の変化をアニメーション化します。

<CodePreview 
  initialHTML={`<h2>ボタンアニメーションの例</h2>
<button class="btn1">マウスを乗せてみてください</button>`}
  initialCSS={`.btn1 {
    background-color: #3498db;
    color: white;
    padding: 12px 24px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    /* transitionを追加してアニメーション効果を適用 */
    transition: background-color 0.3s, transform 0.2s;
}

.btn1:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
}

.btn1:active {
    transform: translateY(0px);
}`}
/>

<Exercise title="演習1">

以下のHTMLを使って、基本的なボタンアニメーションを作ってみましょう。

**HTML**:
```html
<button class="btn2">クリックしてね</button>
```

**要件**:
- 通常時：背景色`#27ae60`、文字色`white`、パディング`10px 20px`、枠線なし、角の丸み`5px`、カーソルをポインター表示
- ホバー時：背景色`#229954`
- アニメーション：背景色の変化を0.25秒で滑らかに

<Solution>
<CodePreview 
  initialHTML={`<button class="btn2">クリックしてね</button>`}
  initialCSS={`.btn2 {
    background-color: #27ae60;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.25s;
}

.btn2:hover {
    background-color: #229954;
}`}
/>
</Solution>

</Exercise>

<Exercise title="演習2">

以下のHTMLを使って、上下に動くボタンを作ってみましょう。

**HTML**:
```html
<button class="btn3">上下に動くボタン</button>
```

**要件**:
- 通常時：背景色`#e74c3c`、文字色`white`、パディング`15px 25px`、枠線なし、角の丸み`5px`、カーソルをポインター表示
- ホバー時：3px上に移動、背景色`#c0392b`
- アクティブ時：元の位置に戻る
- アニメーション：位置と色の変化を0.2秒で

<Solution>
<CodePreview 
  initialHTML={`<button class="btn3">上下に動くボタン</button>`}
  initialCSS={`.btn3 {
    background-color: #e74c3c;
    color: white;
    padding: 15px 25px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.2s, transform 0.2s;
}

.btn3:hover {
    background-color: #c0392b;
    transform: translateY(-3px);
}

.btn3:active {
    transform: translateY(0px);
}`}
/>
</Solution>

</Exercise>

---

## まとめ

**transitionプロパティ**を使って、疑似クラス（`:hover`、`:active`など）と組み合わせることで、滑らかなアニメーション効果を作ることができます。

基本構文：`transition: プロパティ名 時間;`
