## 教材サイトのメタデータ/サイドバー

- ページのタイトルは各ページの frontmatter（`title`）で定義し、`_meta.ts` では上書きしない。
- ページを持たないフォルダ（`index.mdx` がないグルーピング用途）の表示名は、`_meta.ts` で指定する。
- サイドバーの初期折りたたみは `theme.config.tsx` の `sidebar` 設定（`defaultMenuCollapseLevel` / `autoCollapse`）で制御し、例外が必要な場合のみ `theme.collapsed` を使う。
