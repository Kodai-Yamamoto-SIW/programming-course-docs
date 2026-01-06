---
sidebar_position: 5
---

import { CodePreview } from '@kodai-yamamoto-siw/code-preview';

# 画像・リンク

## HTMLマークアップ

### 今回使用するタグ・機能

- `<a>`タグ（リンク作成）
- `href`属性：URLまたはパスを指定
- `id`属性：アンカーリンクのターゲット指定
- HTML文法チェック（W3Cバリデータ）

### マークアップの手順

#### 1. 外部サイトへのリンク

**説明**: `<a>`タグの`href`属性に絶対URLを指定すると外部サイトへのリンクになる。`target="_blank"`属性を指定すると、新しいタブ（または新しいウィンドウ）でリンクを開くことができる。

<CodePreview 
  initialHTML={`<!-- 修正前 -->
<p>JR東日本の路線をご利用ください。</p>

<!-- 修正後 -->
<p><a href="https://www.jreast.co.jp/" target="_blank">JR東日本</a>の路線をご利用ください。</p>`}
/>

#### 2. 内部サイトへのリンク

**説明**: 相対パスを指定すると内部サイトへのリンクになる。  

<CodePreview 
  initialHTML={`<p><a href="about.html">会社概要</a></p>
<p><a href="contact/index.html">お問い合わせ</a></p>`}
/>

#### 3. ページ内へのアンカーリンクと `id` 属性

**説明**: リンク先の要素に`id`属性を設定し、`href="#id名"`でページ内リンクを作成する。

**適用箇所**:
```html
<!-- 修正前 -->
<section>
    <img src="images/picnic.jpg" alt="ピクニックのイメージ画像">
    ...
</section>

<section>
    <h2>内容</h2>
    ...
</section>

<section>
    <h2>注意事項</h2>
    ...
</section>

<section>
    <h2>アクセス</h2>
    ...
</section>

<section>
    <h2>お問い合わせ</h2>
    ...
</section>

<section>
    <h2>周辺情報</h2>
    ...
</section>

<!-- 修正後 -->
<section id="about">
    <img src="images/picnic.jpg" alt="ピクニックのイメージ画像">
    ...
</section>

<section id="content">
    <h2>内容</h2>
    ...
</section>

<section id="attention">
    <h2>注意事項</h2>
    ...
</section>

<section id="access">
    <h2>アクセス</h2>
    ...
</section>

<section id="contact">
    <h2>お問い合わせ</h2>
    ...
</section>

<section id="info">
    <h2>周辺情報</h2>
    ...
</section>
```

<CodePreview 
  initialHTML={`<!-- 修正前 -->
<ul>
    <li>概要</li>
    <li>内容</li>
    <li>注意事項</li>
    <li>アクセス</li>
    <li>お問い合わせ</li>
    <li>周辺情報</li>
</ul>

<!-- 修正後 -->
<ul>
    <li><a href="#about">概要</a></li>
    <li><a href="#content">内容</a></li>
    <li><a href="#attention">注意事項</a></li>
    <li><a href="#access">アクセス</a></li>
    <li><a href="#contact">お問い合わせ</a></li>
    <li><a href="#info">周辺情報</a></li>
</ul>`}
/>

#### 4. HTML文法チェック

**説明**: W3Cバリデータを使って自分のHTMLを検証し、エラーや警告を確認する。  

**手順**:
1. ブラウザで「html validate」で検索
2. 「File Upload」または「Direct Input」で自分のHTMLを入力
3. 「Check」ボタンをクリックしてエラーを確認  

---

## 📥 完成形のダウンロード

授業終了時点での完成形ファイルをダウンロードできます：

<a
  href={require("./files/images-links-complete.zip")}
  download="images-links-complete.zip"
>
  images-links-complete.zip
</a>

---

👋 おつかれさまでした！
