import React, { useState, useRef, useEffect } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { Highlight, themes } from 'prism-react-renderer';
import { useColorMode } from '@docusaurus/theme-common';
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
  const [htmlCode, setHtmlCode] = useState(initialCode);
  const [cssCode, setCssCode] = useState(initialCSS || '');
  const [previewHeight, setPreviewHeight] = useState('200px');
  const htmlTextareaRef = useRef<HTMLTextAreaElement>(null);
  const cssTextareaRef = useRef<HTMLTextAreaElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
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
      
      console.log('計算した高さ:', height, '最終高さ:', finalHeight);
      setPreviewHeight(finalHeight + 'px');
    } catch (error) {
      console.log('高さ調整エラー:', error);
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

  // textareaとハイライト要素のスクロール同期
  const handleHtmlScroll = () => {
    const highlightElement = document.querySelector(`.${styles.htmlHighlightLayer}`);
    if (htmlTextareaRef.current && highlightElement) {
      (highlightElement as HTMLElement).scrollTop = htmlTextareaRef.current.scrollTop;
      (highlightElement as HTMLElement).scrollLeft = htmlTextareaRef.current.scrollLeft;
    }
  };

  const handleCssScroll = () => {
    const highlightElement = document.querySelector(`.${styles.cssHighlightLayer}`);
    if (cssTextareaRef.current && highlightElement) {
      (highlightElement as HTMLElement).scrollTop = cssTextareaRef.current.scrollTop;
      (highlightElement as HTMLElement).scrollLeft = cssTextareaRef.current.scrollLeft;
    }
  };

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

  const handleHtmlCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setHtmlCode(e.target.value);
  };

  const handleCssCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCssCode(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>, setter: React.Dispatch<React.SetStateAction<string>>) => {
    // Tabキーでインデント操作
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const value = textarea.value;
      
      if (e.shiftKey) {
        // Shift+Tab: インデントを減らす
        const beforeCursor = value.substring(0, start);
        const afterCursor = value.substring(end);
        const currentLineStart = beforeCursor.lastIndexOf('\n') + 1;
        const currentLine = value.substring(currentLineStart, value.indexOf('\n', start) === -1 ? value.length : value.indexOf('\n', start));
        
        let newLine = currentLine;
        let removedChars = 0;
        
        // 行の先頭から2つのスペースまたは1つのタブを削除
        if (currentLine.startsWith('  ')) {
          newLine = currentLine.substring(2);
          removedChars = 2;
        } else if (currentLine.startsWith('\t')) {
          newLine = currentLine.substring(1);
          removedChars = 1;
        } else if (currentLine.startsWith(' ')) {
          newLine = currentLine.substring(1);
          removedChars = 1;
        }
        
        if (removedChars > 0) {
          const newValue = value.substring(0, currentLineStart) + newLine + value.substring(currentLineStart + currentLine.length);
          setter(newValue);
          
          // カーソル位置を調整
          setTimeout(() => {
            const newStart = Math.max(currentLineStart, start - removedChars);
            const newEnd = Math.max(currentLineStart, end - removedChars);
            textarea.selectionStart = newStart;
            textarea.selectionEnd = newEnd;
          }, 0);
        }
      } else {
        // Tab: インデントを追加
        const newValue = value.substring(0, start) + '  ' + value.substring(end);
        setter(newValue);
        
        // カーソル位置を調整
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = start + 2;
        }, 0);
      }
    }
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
            <div className={styles.codeEditorWrapper}>
              <Highlight
                code={htmlCode || ''}
                language="markup"
                theme={colorMode === 'dark' ? themes.vsDark : themes.github}
              >
                {({ className, style, tokens, getLineProps, getTokenProps }) => {
                  return (
                    <pre
                      className={`${styles.highlightLayer} ${styles.htmlHighlightLayer} ${className}`}
                      style={{ 
                        ...style,
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        maxWidth: '100%',
                        minHeight: minHeight,
                        padding: '1rem',
                        margin: 0,
                        border: 'none',
                        fontFamily: 'var(--ifm-font-family-monospace)',
                        fontSize: '0.875rem',
                        lineHeight: '1.5',
                        whiteSpace: 'pre',
                        wordWrap: 'normal',
                        overflow: 'auto',
                        pointerEvents: 'none',
                        zIndex: 1,
                        boxSizing: 'border-box'
                      }}
                    >
                      {tokens.map((line, i) => (
                        <div key={i} {...getLineProps({ line })}>
                          {line.map((token, key) => (
                            <span key={key} {...getTokenProps({ token })} />
                          ))}
                        </div>
                      ))}
                    </pre>
                  );
                }}
              </Highlight>
              <textarea
                ref={htmlTextareaRef}
                value={htmlCode}
                onChange={handleHtmlCodeChange}
                onKeyDown={(e) => handleKeyDown(e, setHtmlCode)}
                onScroll={handleHtmlScroll}
                className={styles.editor}
                placeholder="HTMLコードを入力してください..."
                spellCheck={false}
                style={{ '--min-height': minHeight } as React.CSSProperties}
              />
            </div>
          </div>
        </div>

        {/* CSSエディタセクション（CSSが定義されている場合のみ表示） */}
        {showCSSEditor && (
          <div className={styles.editorSection}>
            <div className={styles.sectionHeader}>CSS</div>
            <div className={styles.editorContainer}>
              <div className={styles.codeEditorWrapper}>
                <Highlight
                  code={cssCode || ''}
                  language="css"
                  theme={colorMode === 'dark' ? themes.vsDark : themes.github}
                >
                  {({ className, style, tokens, getLineProps, getTokenProps }) => {
                    return (
                      <pre
                        className={`${styles.highlightLayer} ${styles.cssHighlightLayer} ${className}`}
                        style={{ 
                          ...style,
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          maxWidth: '100%',
                          minHeight: minHeight,
                          padding: '1rem',
                          margin: 0,
                          border: 'none',
                          fontFamily: 'var(--ifm-font-family-monospace)',
                          fontSize: '0.875rem',
                          lineHeight: '1.5',
                          whiteSpace: 'pre',
                          wordWrap: 'normal',
                          overflow: 'auto',
                          pointerEvents: 'none',
                          zIndex: 1,
                          boxSizing: 'border-box'
                        }}
                      >
                        {tokens.map((line, i) => (
                          <div key={i} {...getLineProps({ line })}>
                            {line.map((token, key) => (
                              <span key={key} {...getTokenProps({ token })} />
                            ))}
                          </div>
                        ))}
                      </pre>
                    );
                  }}
                </Highlight>
                <textarea
                  ref={cssTextareaRef}
                  value={cssCode}
                  onChange={handleCssCodeChange}
                  onKeyDown={(e) => handleKeyDown(e, setCssCode)}
                  onScroll={handleCssScroll}
                  className={styles.editor}
                  placeholder="CSSコードを入力してください..."
                  spellCheck={false}
                  style={{ '--min-height': minHeight } as React.CSSProperties}
                />
              </div>
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