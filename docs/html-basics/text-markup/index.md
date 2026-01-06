---
sidebar_position: 4
---

import { CodePreview } from '@kodai-yamamoto-siw/code-preview';

# テキスト

## HTMLマークアップ

### 今回使用するタグ

- `<br>`：改行を挿入するタグ
- `<strong>`：重要なキーワードを強調するタグ
- `<small>`：補足説明などを小さい文字で表示するタグ
- `<img>`：画像を埋め込むタグ（`src`、`alt`属性）

### 演習用画像のダウンロード

演習で使用する画像ファイルをダウンロードしてください：

- <a href={require("./files/picnic.jpg")} download="picnic.jpg">picnic.jpgをダウンロード</a>
- <a href={require("./files/park_map.jpg")} download="park_map.jpg">park_map.jpgをダウンロード</a>

**重要**: ダウンロードした画像ファイルは、HTMLファイルと同じフォルダ内に`images`フォルダを作成し、その中に保存してください。

**フォルダ構成例**:
```
作業フォルダ/
├── index.html
└── images/
    ├── picnic.jpg
    └── park_map.jpg
```

### マークアップの手順

#### 1. `<br>`タグを学習・マークアップ

**説明**: `<br>`タグは改行を挿入するタグ  

<CodePreview 
  initialHTML={`<!-- 修正前 -->
<li>天候により中止になる場合があります。
    ※ 中止の場合は、当日朝9時までにご連絡いたします。</li>

<!-- 修正後 -->
<li>天候により中止になる場合があります。<br>
    ※ 中止の場合は、当日朝9時までにご連絡いたします。</li>`}
/>

#### 2. `<strong>`タグを学習・マークアップ

**説明**: `<strong>`タグは重要なキーワードを強調するタグ  

<CodePreview 
  initialHTML={`<!-- 修正前 -->
<li>天候により中止になる場合があります。<br>
    ※ 中止の場合は、当日朝9時までにご連絡いたします。</li>

<!-- 修正後 -->
<li>天候により<strong>中止</strong>になる場合があります。<br>
    ※ <strong>中止</strong>の場合は、<strong>当日朝9時</strong>までにご連絡いたします。</li>`}
/>

#### 3. `<small>`タグを学習・マークアップ

**説明**: `<small>`タグは補足説明を小さい文字で表示するタグ  

**適用箇所①**:

<CodePreview 
  initialHTML={`<!-- 修正前 -->
<li>天候により<strong>中止</strong>になる場合があります。<br>
    ※ <strong>中止</strong>の場合は、<strong>当日朝9時</strong>までにご連絡いたします。</li>

<!-- 修正後 -->
<li>天候により<strong>中止</strong>になる場合があります。<br>
    <small>※ <strong>中止</strong>の場合は、<strong>当日朝9時</strong>までにご連絡いたします。</small>
</li>`}
/>

**適用箇所②**:

<CodePreview 
  initialHTML={`<!-- 修正前 -->
<p>参加者の皆様には、事前にご案内申し上げております。</p>

<!-- 修正後 -->
<p><small>参加者の皆様には、事前にご案内申し上げております。</small></p>`}
/>

**適用箇所③**:

<CodePreview 
  initialHTML={`<!-- 修正前 -->
<p>© 2025 ピクニック実行委員会</p>

<!-- 修正後 -->
<p><small>© 2025 ピクニック実行委員会</small></p>`}
/>

#### 4. `<img>`タグを学習・マークアップ

**説明**: `<img>`タグは画像を埋め込むタグ  
- `src`属性：画像の URL を指定
- `alt`属性：画像の代替テキストを指定（画像が表示されない場合に表示されるテキスト）

**適用箇所① (ピクニック画像)**:

<CodePreview 
  images={{
    "images/picnic.jpg": require("./img/picnic.jpg"),
  }}
  initialHTML={`<!-- 修正前 -->
<section>
    [ピクニックのイメージ画像]
    <p>近郊の公園でピクニックを開催します！</p>
</section>

<!-- 修正後 -->
<section>
    <img src="images/picnic.jpg" alt="ピクニックのイメージ画像">
    <p>近郊の公園でピクニックを開催します！</p>
</section>`}
/>

**適用箇所② (地図画像)**:

<CodePreview 
  images={{
    "images/park_map.jpg": require("./img/park_map.jpg"),
  }}
  initialHTML={`<!-- 修正前 -->
[公園の地図画像]

<!-- 修正後 -->
<img src="images/park_map.jpg" alt="公園の地図画像">`}
/>

---

## 📥 完成形のダウンロード

授業終了時点での完成形ファイルをダウンロードできます：

<a
  href={require("./files/text-markup-complete.zip")}
  download="text-markup-complete.zip"
>
  text-markup-complete.zip
</a>

---

👋 おつかれさまでした！ 

