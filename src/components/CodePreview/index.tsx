import React, { useState, useRef, useEffect } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { useColorMode } from '@docusaurus/theme-common';
import Editor from '@monaco-editor/react';
import styles from './styles.module.css';

interface CodePreviewProps {
  initialCode?: string;
  initialCSS?: string;
  title?: string;
  minHeight?: string;
  imageBasePath?: string;
}

export default function CodePreview({ 
  initialCode = '', 
  initialCSS,
  title = '',
  minHeight = '200px',
  imageBasePath
}: CodePreviewProps): React.ReactElement {
  // 末尾に改行を追加する関数
  const ensureTrailingNewline = (code: string): string => {
    if (code && !code.endsWith('\n')) {
      return code + '\n';
    }
    return code;
  };

  const [htmlCode, setHtmlCode] = useState(ensureTrailingNewline(initialCode));
  const [cssCode, setCssCode] = useState(ensureTrailingNewline(initialCSS || ''));
  const [previewHeight, setPreviewHeight] = useState('200px');
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  // エディタの参照を保持
  const htmlEditorRef = useRef<any>(null);
  const cssEditorRef = useRef<any>(null);

  const { colorMode } = useColorMode();

  // useBaseUrlは常に呼び出す必要がある
  const baseUrl = useBaseUrl('/');

  // CSSエディタを表示するかどうかを判定
  const showCSSEditor = initialCSS !== undefined;

  // iframeの高さを内容に合わせて調整
  const adjustIframeHeight = () => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    try {
      const iframeDoc = iframe.contentDocument;
      if (!iframeDoc) return;

      // 高さを計算
      const height = Math.max(
        iframeDoc.body?.scrollHeight || 0,
        iframeDoc.body?.offsetHeight || 0,
        iframeDoc.documentElement?.clientHeight || 0,
        iframeDoc.documentElement?.scrollHeight || 0,
        iframeDoc.documentElement?.offsetHeight || 0
      );

      const minHeightPx = parseInt(minHeight);
      const finalHeight = Math.max(height, minHeightPx);
      
      setPreviewHeight(finalHeight + 'px');
    } catch (error) {
      // エラー時は無言で終了
    }
  };

  // 初回レンダリング時の高さ調整
  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe) {
      // iframeの読み込み完了後に高さを調整
      const handleLoad = () => {
        adjustIframeHeight();
        // 少し遅延させて再度実行（画像などの読み込み待ち）
        setTimeout(adjustIframeHeight, 100);
        setTimeout(adjustIframeHeight, 500);
      };

      iframe.addEventListener('load', handleLoad);
      
      // 既に読み込み済みの場合は即座に実行
      if (iframe.contentDocument && iframe.contentDocument.readyState === 'complete') {
        handleLoad();
      }
      
      return () => {
        iframe.removeEventListener('load', handleLoad);
      };
    }
  }, []); // 初回レンダリング時のみ実行

  // コード変更時の高さ調整
  useEffect(() => {
    // コードが変更された場合の高さ調整
    const iframe = iframeRef.current;
    if (iframe) {
      // srcDoc更新後に高さを調整
      const timer = setTimeout(() => {
        adjustIframeHeight();
        // 画像などの読み込み待ち
        setTimeout(adjustIframeHeight, 100);
        setTimeout(adjustIframeHeight, 500);
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [htmlCode, cssCode, minHeight]);

  // HTMLコードの末尾改行チェック
  useEffect(() => {
    if (htmlCode && !htmlCode.endsWith('\n')) {
      const newValue = htmlCode + '\n';
      setHtmlCode(newValue);
      
      // エディタの値も更新（カーソル位置を保持）
      if (htmlEditorRef.current) {
        const editor = htmlEditorRef.current;
        const position = editor.getPosition();
        editor.setValue(newValue);
        if (position) {
          editor.setPosition(position);
        }
      }
    }
  }, [htmlCode]);

  // CSSコードの末尾改行チェック
  useEffect(() => {
    if (cssCode && !cssCode.endsWith('\n')) {
      const newValue = cssCode + '\n';
      setCssCode(newValue);
      
      // エディタの値も更新（カーソル位置を保持）
      if (cssEditorRef.current) {
        const editor = cssEditorRef.current;
        const position = editor.getPosition();
        editor.setValue(newValue);
        if (position) {
          editor.setPosition(position);
        }
      }
    }
  }, [cssCode]);

  // 画像パスを変換する関数
  const processImagePaths = (htmlCode: string): string => {
    if (!imageBasePath) {
      return htmlCode;
    }

    // @site/static/ で始まる場合はbaseUrlと組み合わせて解決
    let resolvedBasePath: string;
    if (imageBasePath.startsWith('@site/static/')) {
      const pathWithoutPrefix = imageBasePath.replace('@site/static/', '');
      resolvedBasePath = useBaseUrl(pathWithoutPrefix);
    } else {
      resolvedBasePath = imageBasePath;
    }

    // ベースパスの末尾に/がない場合は追加
    if (!resolvedBasePath.endsWith('/')) {
      resolvedBasePath += '/';
    }

    // src属性の相対パスをベースパスからの相対パスとして変換
    // 絶対パス（/で始まる）やプロトコル付きURL（http:// https://）は変換しない
    return htmlCode.replace(/src="([^"]+)"/g, (match, src) => {
      // 絶対パスやプロトコル付きURLの場合は変換しない
      if (src.startsWith('/') || src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:')) {
        return match;
      }
      // 相対パスの場合はベースパスを追加
      return `src="${resolvedBasePath}${src}"`;
    });
  };

  // アンカーリンクを変換する関数
  const processAnchorLinks = (htmlCode: string): string => {
    // href="#id"のアンカーリンクをJavaScriptベースのスクロール処理に変換
    return htmlCode.replace(/href="#([^"]+)"/g, (match, id) => {
      return `href="javascript:void(0)" onclick="document.getElementById('${id}')?.scrollIntoView({behavior: 'smooth'})"`;
    });
  };

  // HTMLコードを処理する関数
  const processHtmlCode = (htmlCode: string): string => {
    let processed = processImagePaths(htmlCode);
    processed = processAnchorLinks(processed);
    return processed;
  };

  // HTML+CSSを結合したドキュメントを生成
  const generatePreviewDocument = (): string => {
    const processedHtml = processHtmlCode(htmlCode);
    
    // CSSエディタが表示されていて、かつCSSコードがある場合のみstyleタグで埋め込む
    const styleTag = (showCSSEditor && cssCode) ? `<style>\n${cssCode}\n</style>` : '';
    
    // 完全なHTMLドキュメントとして組み立て
    if (processedHtml.includes('<!DOCTYPE') || processedHtml.includes('<html')) {
      // 既に完全なHTMLドキュメントの場合、headタグ内にstyleを挿入
      if (styleTag) {
        return processedHtml.replace(/<\/head>/, `${styleTag}\n</head>`);
      }
      return processedHtml;
    } else {
      // HTMLフラグメントの場合、完全なドキュメントとして包む
      return `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>プレビュー</title>
  ${styleTag}
</head>
<body>
  ${processedHtml}
</body>
</html>`;
    }
  };

  // HTMLコード変更ハンドラ
  const handleHtmlChange = (value: string | undefined) => {
    setHtmlCode(value || '');
  };

  // CSSコード変更ハンドラ
  const handleCssChange = (value: string | undefined) => {
    setCssCode(value || '');
  };

  // HTMLエディタのマウントハンドラ
  const handleHtmlEditorDidMount = (editor: any) => {
    htmlEditorRef.current = editor;
  };

  // CSSエディタのマウントハンドラ
  const handleCssEditorDidMount = (editor: any) => {
    cssEditorRef.current = editor;
  };

  return (
    <div className={styles.codePreviewContainer}>
      {title && (
        <div className={styles.header}>
          <h4 className={styles.title}>{title}</h4>
        </div>
      )}
      
      <div className={styles.splitLayout}>
        {/* HTMLエディタセクション */}
        <div className={styles.editorSection}>
          <div className={styles.sectionHeader}>HTML</div>
          <div className={styles.editorContainer}>
            <Editor
              height={minHeight}
              defaultLanguage="html"
              value={htmlCode}
              onChange={handleHtmlChange}
              onMount={handleHtmlEditorDidMount}
              theme={colorMode === 'dark' ? 'vs-dark' : 'light'}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'off',
                folding: false,
                padding: { top: 5, bottom: 5 },
                roundedSelection: false,
                wordWrap: 'off',
                tabSize: 2,
                insertSpaces: true,
              }}
            />
          </div>
        </div>

        {/* CSSエディタセクション（CSSが定義されている場合のみ表示） */}
        {showCSSEditor && (
          <div className={styles.editorSection}>
            <div className={styles.sectionHeader}>CSS</div>
            <div className={styles.editorContainer}>
              <Editor
                height={minHeight}
                defaultLanguage="css"
                value={cssCode}
                onChange={handleCssChange}
                onMount={handleCssEditorDidMount}
                theme={colorMode === 'dark' ? 'vs-dark' : 'light'}
                options={{
                   minimap: { enabled: false },
                   fontSize: 14,
                   lineNumbers: 'off',
                   folding: false,
                   padding: { top: 5, bottom: 5 },
                   roundedSelection: false,
                   wordWrap: 'off',
                   tabSize: 2,
                   insertSpaces: true,
                 }}
              />
            </div>
          </div>
        )}
        
        {/* プレビューセクション */}
        <div className={styles.previewSection}>
          <div className={styles.sectionHeader}>プレビュー</div>
          <div 
            className={styles.previewContainer}
            style={{ '--min-height': minHeight } as React.CSSProperties}
          >
            <iframe
              ref={iframeRef}
              srcDoc={generatePreviewDocument()}
              className={styles.preview}
              title="HTML+CSS Preview"
              sandbox="allow-scripts allow-same-origin"
              style={{ 
                height: previewHeight,
                '--min-height': minHeight 
              } as React.CSSProperties}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 