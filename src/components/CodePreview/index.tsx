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
  const [editorHeight, setEditorHeight] = useState(minHeight);
  const [previewHeight, setPreviewHeight] = useState(minHeight);
  
  // 各セクションの幅を管理するstate
  const [sectionWidths, setSectionWidths] = useState<{
    html: number;
    css: number;
  }>({ html: 50, css: 50 });
  
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // エディタの参照を保持
  const htmlEditorRef = useRef<any>(null);
  const cssEditorRef = useRef<any>(null);

  const { colorMode } = useColorMode();

  // useBaseUrlは常に呼び出す必要がある
  const baseUrl = useBaseUrl('/');

  // CSSエディタを表示するかどうかを判定
  const showCSSEditor = initialCSS !== undefined;

  // エディタの実際のコンテンツ幅を取得する関数
  const getEditorScrollWidth = (editorRef: React.RefObject<any>): number => {
    if (!editorRef.current) return 200;
    
    try {
      const editor = editorRef.current;
      const domNode = editor.getDomNode();
      if (!domNode) return 200;
      
      // monaco-mouse-cursor-text内の.view-lineを取得
      const cursorTextElement = domNode.querySelector('.monaco-mouse-cursor-text') as HTMLElement;
      if (cursorTextElement) {
        const viewLines = cursorTextElement.querySelectorAll('.view-line');
        let maxSpanWidth = 0;
        
        // 各行の最初のspan要素の幅を調べて最大値を取得
        for (let i = 0; i < viewLines.length; i++) {
          const viewLine = viewLines[i] as HTMLElement;
          const span = viewLine.querySelector('span');
          
          if (span) {
            const spanStyle = window.getComputedStyle(span);
            const spanWidth = parseFloat(spanStyle.width) || 0;
            maxSpanWidth = Math.max(maxSpanWidth, spanWidth);
          }
        }
        
        if (maxSpanWidth > 0) {
          // 最大行幅 + Monaco内部左パディング + 余裕分右パディング
          return maxSpanWidth + 10 + 25;
        }
      }
      
      return 200; // 取得できない場合は最小幅
    } catch (error) {
      return 200; // エラー時は最小幅
    }
  };

  // エディタセクションの最適な幅を計算する関数（プレビューは下段に配置）
  const calculateOptimalWidths = (): { html: number; css: number } => {
    const container = containerRef.current;
    if (!container) {
      return showCSSEditor 
        ? { html: 50, css: 50 }
        : { html: 100, css: 0 };
    }

    if (!showCSSEditor) {
      // CSSエディタがない場合はHTMLエディタが全幅を使用
      return { 
        html: 100, 
        css: 0 
      };
    }

    // コンテナの実際の幅を取得
    const containerWidth = container.offsetWidth || 800; // フォールバック値
    
    // CSSエディタがある場合は、実際の必要幅に基づいて配分
    const minEditorWidth = 200;
    const htmlNeededWidth = Math.max(getEditorScrollWidth(htmlEditorRef), minEditorWidth);
    const cssNeededWidth = Math.max(getEditorScrollWidth(cssEditorRef), minEditorWidth);
    
    const totalNeededWidth = htmlNeededWidth + cssNeededWidth;
    
    console.log("containerWidth", containerWidth);
    console.log("htmlNeededWidth", htmlNeededWidth);
    console.log("cssNeededWidth", cssNeededWidth);
    console.log("totalNeededWidth", totalNeededWidth);

    // コンテナ幅を超える場合は、最小幅を保証しながら配分
    if (totalNeededWidth > containerWidth) {
      // 最小幅を保証しつつ、残りの幅を配分
      const remainingWidth = containerWidth - (minEditorWidth * 2);
      
      if (remainingWidth <= 0) {
        // コンテナが最小幅×2より小さい場合は50%ずつ
        return { html: 50, css: 50 };
      }
      
      // 残りの幅を必要幅の比率で配分
      const htmlRatio = htmlNeededWidth / totalNeededWidth;
      const cssRatio = cssNeededWidth / totalNeededWidth;
      
      const htmlWidth = minEditorWidth + (remainingWidth * htmlRatio);
      const cssWidth = minEditorWidth + (remainingWidth * cssRatio);
      
      return {
        html: (htmlWidth / containerWidth) * 100,
        css: (cssWidth / containerWidth) * 100
      };
    } else {
      // コンテナ幅内に収まる場合は、実際の必要幅で配分
      const htmlRatio = htmlNeededWidth / totalNeededWidth;
      const cssRatio = cssNeededWidth / totalNeededWidth;
      
      return {
        html: htmlRatio * 100,
        css: cssRatio * 100
      };
    }
  };

  // 幅を再計算して更新する関数
  const updateSectionWidths = () => {
    const newWidths = calculateOptimalWidths();
    setSectionWidths(newWidths);
  };

  // エディタの高さを計算する関数
  const calculateEditorHeight = () => {
    // エディタの最適な高さを計算（行数ベース）
    const calculateEditorHeightByCode = (code: string): number => {
      if (!code) return parseInt(minHeight);
      const lines = code.split('\n').length;
      const lineHeight = 19; // Monaco editorの行の高さ
      const padding = 22; // 上下のパディング
      return Math.max(lines * lineHeight + padding, parseInt(minHeight));
    };

    const htmlEditorHeight = calculateEditorHeightByCode(htmlCode);
    const cssEditorHeight = showCSSEditor ? calculateEditorHeightByCode(cssCode) : 0;

    // エディタの最大高さを設定
    const maxEditorHeight = Math.max(htmlEditorHeight, cssEditorHeight);
    
    // 最小高さを保証
    const finalEditorHeight = Math.max(maxEditorHeight, parseInt(minHeight));
    
    // 最大高さを600pxに制限
    const limitedEditorHeight = Math.min(finalEditorHeight, 600);

    setEditorHeight(limitedEditorHeight + 'px');
  };

  // プレビューの高さを計算する関数
  const calculatePreviewHeight = () => {
    const iframe = iframeRef.current;
    let previewHeight = parseInt(minHeight);

    // プレビューの高さを取得
    if (iframe) {
      try {
        const iframeDoc = iframe.contentDocument;
        if (iframeDoc) {
          const calculatedHeight = Math.max(
            iframeDoc.body?.scrollHeight || 0,
            iframeDoc.body?.offsetHeight || 0,
            iframeDoc.documentElement?.clientHeight || 0,
            iframeDoc.documentElement?.scrollHeight || 0,
            iframeDoc.documentElement?.offsetHeight || 0
          );
          previewHeight = Math.max(previewHeight, calculatedHeight);
        }
      } catch (error) {
        // エラー時は無言で終了
      }
    }

    // 最小高さを保証
    const finalPreviewHeight = Math.max(previewHeight, parseInt(minHeight));
    
    // 最大高さを800pxに制限
    const limitedPreviewHeight = Math.min(finalPreviewHeight, 800);

    setPreviewHeight(limitedPreviewHeight + 'px');
  };

  // エディタ高さの更新関数
  const updateEditorHeight = () => {
    setTimeout(() => {
      calculateEditorHeight();
    }, 100);
  };

  // プレビュー高さの更新関数
  const updatePreviewHeight = () => {
    setTimeout(() => {
      calculatePreviewHeight();
    }, 100);
  };

  // リサイズ時の処理
  useEffect(() => {
    const handleResize = () => {
      console.log("リサイズ時の幅調整");
      updateSectionWidths();
      updateEditorHeight();
      updatePreviewHeight();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 初回レンダリング時の高さ調整
  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe) {
      // iframeの読み込み完了後に高さと幅を調整
      const handleLoad = () => {
        updatePreviewHeight();
        // 少し遅延させて再度実行（画像などの読み込み待ち）
        setTimeout(updatePreviewHeight, 100);
        setTimeout(updatePreviewHeight, 500);
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
    updateEditorHeight();
    updatePreviewHeight();
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
    
    // エディタマウント後に初回幅調整
    setTimeout(() => {
      console.log("HTMLエディタマウント後の初回幅調整");
      updateSectionWidths();
    }, 100);
    
    // エディタのコンテンツ変更を監視して幅を調整
    editor.onDidChangeModelContent(() => {
      setTimeout(() => {
        console.log("HTMLエディタのコンテンツ変更");
        updateSectionWidths();
      }, 50);
    });
  };

  // CSSエディタのマウントハンドラ
  const handleCssEditorDidMount = (editor: any) => {
    cssEditorRef.current = editor;
    
    // エディタマウント後に初回幅調整
    setTimeout(() => {
      console.log("CSSエディタマウント後の初回幅調整");
      updateSectionWidths();
    }, 100);
    
    // エディタのコンテンツ変更を監視して幅を調整
    editor.onDidChangeModelContent(() => {
      setTimeout(() => {
        console.log("CSSエディタのコンテンツ変更");
        updateSectionWidths();
      }, 50);
    });
  };

  return (
    <div className={styles.codePreviewContainer}>
      {title && (
        <div className={styles.header}>
          <h4 className={styles.title}>{title}</h4>
        </div>
      )}
      
      <div className={styles.splitLayout} ref={containerRef}>
        {/* エディタセクション（上段） */}
        <div className={styles.editorsRow}>
          {/* HTMLエディタセクション */}
          <div 
            className={styles.editorSection}
            style={{ width: `${sectionWidths.html}%` }}
          >
            <div className={styles.sectionHeader}>HTML</div>
            <div className={styles.editorContainer}>
              <Editor
                height={editorHeight}
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
                  scrollBeyondLastLine: false,
                }}
              />
            </div>
          </div>

          {/* CSSエディタセクション（CSSが定義されている場合のみ表示） */}
          {showCSSEditor && (
            <div 
              className={styles.editorSection}
              style={{ width: `${sectionWidths.css}%` }}
            >
              <div className={styles.sectionHeader}>CSS</div>
              <div className={styles.editorContainer}>
                <Editor
                  height={editorHeight}
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
                     scrollBeyondLastLine: false,
                   }}
                />
              </div>
            </div>
          )}
        </div>
        
        {/* プレビューセクション（下段） */}
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