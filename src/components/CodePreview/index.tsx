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
  const htmlEditorRef = useRef<HTMLDivElement>(null);
  const cssEditorRef = useRef<HTMLDivElement>(null);
  const htmlCursorPosition = useRef<{ start: number; end: number } | null>(null);
  const cssCursorPosition = useRef<{ start: number; end: number } | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);


  const { colorMode } = useColorMode();

  // useBaseUrlは常に呼び出す必要がある
  const baseUrl = useBaseUrl('/');

  // CSSエディタを表示するかどうかを判定
  const showCSSEditor = initialCSS !== undefined;

  // カーソル位置を取得する関数
  const getCursorPosition = (element: HTMLElement): { start: number; end: number } => {
    try {
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0 || !element) {
        return { start: 0, end: 0 };
      }

      const range = selection.getRangeAt(0);
      
      // 選択範囲がエディタ要素内にあるかチェック
      if (!element.contains(range.commonAncestorContainer)) {
        return { start: 0, end: 0 };
      }

      const preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(element);
      preCaretRange.setEnd(range.startContainer, range.startOffset);
      const start = preCaretRange.toString().length;

      const preCaretRangeEnd = range.cloneRange();
      preCaretRangeEnd.selectNodeContents(element);
      preCaretRangeEnd.setEnd(range.endContainer, range.endOffset);
      const end = preCaretRangeEnd.toString().length;

      return { start, end };
    } catch (error) {
      // エラー時は無言でデフォルト値を返す
      return { start: 0, end: 0 };
    }
  };

  // カーソル位置を設定する関数
  const setCursorPosition = (element: HTMLElement, position: { start: number; end: number }) => {
    try {
      const selection = window.getSelection();
      if (!selection || !element) return;

      const range = document.createRange();
      let currentOffset = 0;
      let startNode: Node | null = null;
      let endNode: Node | null = null;
      let startOffset = 0;
      let endOffset = 0;

      const walker = document.createTreeWalker(
        element,
        NodeFilter.SHOW_TEXT,
        null
      );

      let node: Node | null;
      while ((node = walker.nextNode())) {
        const nodeLength = node.textContent?.length || 0;
        
        if (!startNode && currentOffset + nodeLength >= position.start) {
          startNode = node;
          startOffset = Math.min(position.start - currentOffset, nodeLength);
        }
        
        if (!endNode && currentOffset + nodeLength >= position.end) {
          endNode = node;
          endOffset = Math.min(position.end - currentOffset, nodeLength);
          break;
        }
        
        currentOffset += nodeLength;
      }

      if (startNode && endNode) {
        range.setStart(startNode, Math.max(0, startOffset));
        range.setEnd(endNode, Math.max(0, endOffset));
        selection.removeAllRanges();
        selection.addRange(range);
      }
    } catch (error) {
      // エラー時は無言で終了
    }
  };





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

  // 初期値を設定
  useEffect(() => {
    const htmlEditor = htmlEditorRef.current;
    if (htmlEditor) {
      const processedHtmlCode = ensureTrailingNewline(htmlCode);
      
      // contentEditableに適した方法で設定
      ensureTrailingNewlineInEditor(htmlEditor, processedHtmlCode);
      
      // 状態も更新（初期値の場合のみ）
      if (htmlCode !== processedHtmlCode) {
        setHtmlCode(processedHtmlCode);
      }
    }
  }, []);

  useEffect(() => {
    const cssEditor = cssEditorRef.current;
    if (cssEditor && showCSSEditor) {
      const processedCssCode = ensureTrailingNewline(cssCode);
      
      // contentEditableに適した方法で設定
      ensureTrailingNewlineInEditor(cssEditor, processedCssCode);
      
      // 状態も更新（初期値の場合のみ）
      if (cssCode !== processedCssCode) {
        setCssCode(processedCssCode);
      }
    }
  }, [showCSSEditor]);





  // エディターとハイライト要素のスクロール同期
  const handleHtmlScroll = () => {
    const editor = htmlEditorRef.current;
    if (!editor) return;
    
    // 直接親要素内のハイライト要素を探す
    const wrapper = editor.parentElement;
    const highlightElement = wrapper?.querySelector('pre');
    

    
    if (highlightElement) {
      const scrollTop = editor.scrollTop;
      const scrollLeft = editor.scrollLeft;
      
      // ハイライト要素をtransformで移動させる
      (highlightElement as HTMLElement).style.transform = `translate(-${scrollLeft}px, -${scrollTop}px)`;
    }
  };

  const handleCssScroll = () => {
    const editor = cssEditorRef.current;
    if (!editor) return;
    
    // 直接親要素内のハイライト要素を探す
    const wrapper = editor.parentElement;
    const highlightElement = wrapper?.querySelector('pre');
    

    
    if (highlightElement) {
      const scrollTop = editor.scrollTop;
      const scrollLeft = editor.scrollLeft;
      
      // ハイライト要素をtransformで移動させる
      (highlightElement as HTMLElement).style.transform = `translate(-${scrollLeft}px, -${scrollTop}px)`;
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

  const isUpdatingHtml = useRef(false);
  const isUpdatingCss = useRef(false);

  // 最後に改行を追加する関数（状態用）
  const ensureTrailingNewline = (code: string): string => {
    if (code.trim() === '') return code; // 完全に空欄の場合はそのまま
    if (!code.endsWith('\n')) {
      return code + '\n';
    }
    return code;
  };

  // contentEditableに改行を追加する関数
  const ensureTrailingNewlineInEditor = (element: HTMLDivElement, code: string) => {
    if (code.trim() === '') {
      element.innerHTML = '';
      return;
    }

    // 既に末尾に改行がある場合はそのまま
    if (code.endsWith('\n')) {
      // コードをHTMLエスケープして設定
      const escapedCode = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      const lines = escapedCode.split('\n');
      
      // 最後の行が空の場合（つまり\nで終わっている場合）
      if (lines[lines.length - 1] === '') {
        lines.pop(); // 最後の空要素を削除
        const htmlContent = lines.map(line => line === '' ? '<div><br></div>' : `<div>${line}</div>`).join('');
        element.innerHTML = htmlContent + '<div><br></div>'; // 末尾改行用のdivを追加
      } else {
        const htmlContent = lines.map(line => line === '' ? '<div><br></div>' : `<div>${line}</div>`).join('');
        element.innerHTML = htmlContent;
      }
    } else {
      // 改行がない場合は追加
      const escapedCode = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      const lines = escapedCode.split('\n');
      const htmlContent = lines.map(line => line === '' ? '<div><br></div>' : `<div>${line}</div>`).join('');
      element.innerHTML = htmlContent + '<div><br></div>'; // 末尾改行用のdivを追加
    }
  };

  const handleHtmlInput = (e: React.FormEvent<HTMLDivElement>) => {
    if (isUpdatingHtml.current) return; // 再帰的な更新を防ぐ
    
    const element = e.currentTarget;
    let newValue = element.innerText || ''; // innerTextは改行を\nで返す
    const originalValue = newValue;
    
    // 最後に改行を追加
    newValue = ensureTrailingNewline(newValue);
    
    // カーソル位置を保存
    htmlCursorPosition.current = getCursorPosition(element);
    
    // 改行が追加された場合、DOM要素も更新
    if (originalValue !== newValue) {
      ensureTrailingNewlineInEditor(element, newValue);
      // カーソル位置を改行追加前の位置に戻す
      if (htmlCursorPosition.current) {
        setTimeout(() => {
          if (htmlCursorPosition.current) {
            setCursorPosition(element, htmlCursorPosition.current);
          }
        }, 0);
      }
    }
    
    // フラグを設定して再レンダリングを一時的に抑制
    isUpdatingHtml.current = true;
    setHtmlCode(newValue);
    
    // 次のレンダリングサイクル後にフラグをリセット
    setTimeout(() => {
      isUpdatingHtml.current = false;
    }, 0);
  };

  const handleCssInput = (e: React.FormEvent<HTMLDivElement>) => {
    if (isUpdatingCss.current) return; // 再帰的な更新を防ぐ
    
    const element = e.currentTarget;
    let newValue = element.innerText || ''; // innerTextは改行を\nで返す
    const originalValue = newValue;
    
    // 最後に改行を追加
    newValue = ensureTrailingNewline(newValue);
    
    // カーソル位置を保存
    cssCursorPosition.current = getCursorPosition(element);
    
    // 改行が追加された場合、DOM要素も更新
    if (originalValue !== newValue) {
      ensureTrailingNewlineInEditor(element, newValue);
      // カーソル位置を改行追加前の位置に戻す
      if (cssCursorPosition.current) {
        setTimeout(() => {
          if (cssCursorPosition.current) {
            setCursorPosition(element, cssCursorPosition.current);
          }
        }, 0);
      }
    }
    
    // フラグを設定して再レンダリングを一時的に抑制
    isUpdatingCss.current = true;
    setCssCode(newValue);
    
    // 次のレンダリングサイクル後にフラグをリセット
    setTimeout(() => {
      isUpdatingCss.current = false;
    }, 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // Tabキーでインデント操作
    if (e.key === 'Tab') {
      e.preventDefault();
      
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return;
      
      const range = selection.getRangeAt(0);
      
      if (e.shiftKey) {
        // Shift+Tab: インデントを減らす（簡単な実装）
        const textNode = document.createTextNode('');
        range.insertNode(textNode);
      } else {
        // Tab: 2つのスペースを挿入
        const textNode = document.createTextNode('  ');
        range.deleteContents();
        range.insertNode(textNode);
        
        // カーソルを挿入したテキストの後に移動
        range.setStartAfter(textNode);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
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
                        width: 'max-content',
                        minWidth: '100%',
                        height: '100%',
                        minHeight: minHeight,
                        padding: '1rem 1rem 1rem 1rem',
                        margin: 0,
                        border: 'none',
                        borderRadius: '0',
                        boxShadow: 'none',
                        fontFamily: 'var(--ifm-font-family-monospace)',
                        fontSize: '0.875rem',
                        lineHeight: '1.5',
                        whiteSpace: 'pre',
                        wordWrap: 'normal',
                        overflow: 'visible',
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
              <div
                ref={htmlEditorRef}
                contentEditable
                onInput={handleHtmlInput}
                onKeyDown={handleKeyDown}
                onScroll={handleHtmlScroll}
                className={styles.editor}
                spellCheck={false}
                style={{ '--min-height': minHeight, whiteSpace: 'pre', wordWrap: 'normal' } as React.CSSProperties}
                suppressContentEditableWarning={true}
                data-placeholder="HTMLコードを入力してください..."
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
                          width: 'max-content',
                          minWidth: '100%',
                          height: '100%',
                          minHeight: minHeight,
                          padding: '1rem 1rem 1rem 1rem',
                          margin: 0,
                          border: 'none',
                          borderRadius: '0',
                          boxShadow: 'none',
                          fontFamily: 'var(--ifm-font-family-monospace)',
                          fontSize: '0.875rem',
                          lineHeight: '1.5',
                          whiteSpace: 'pre',
                          wordWrap: 'normal',
                          overflow: 'visible',
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
              <div
                  ref={cssEditorRef}
                  contentEditable
                  onInput={handleCssInput}
                  onKeyDown={handleKeyDown}
                  onScroll={handleCssScroll}
                  className={styles.editor}
                  spellCheck={false}
                  style={{ '--min-height': minHeight, whiteSpace: 'pre', wordWrap: 'normal' } as React.CSSProperties}
                  suppressContentEditableWarning={true}
                  data-placeholder="CSSコードを入力してください..."
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