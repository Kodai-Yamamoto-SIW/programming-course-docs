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
        
        // 各行のspan要素の幅を調べて最大値を取得
        for (let i = 0; i < Math.min(viewLines.length, 50); i++) { // 最初の50行をチェック
          const viewLine = viewLines[i] as HTMLElement;
          const spans = viewLine.querySelectorAll('span');
          
          // 各span要素の累積幅を計算
          let lineWidth = 0;
          for (let j = 0; j < spans.length; j++) {
            const span = spans[j];
            const spanStyle = window.getComputedStyle(span);
            const spanWidth = parseFloat(spanStyle.width) || 0;
            lineWidth += spanWidth;
          }
          
          maxSpanWidth = Math.max(maxSpanWidth, lineWidth);
        }
        
        if (maxSpanWidth > 0) {
          // 最大行幅 + Monaco内部左パディング + 余裕分右パディング
          return maxSpanWidth + 10 + 20;
        }
      }
      
      return 200; // 取得できない場合は最小幅
    } catch (error) {
      return 200; // エラー時は最小幅
    }
  };

  // エディタセクションの最適な幅を計算する関数（プレビューは残り幅を使用）
  const calculateOptimalWidths = (): { html: number; css: number } => {
    const container = containerRef.current;
    if (!container) {
      return showCSSEditor 
        ? { html: 50, css: 50 }
        : { html: 100, css: 0 };
    }

    const containerWidth = container.offsetWidth;
    const minEditorWidth = 200;
    const previewMinWidth = 300;
    
    // 各エディタの実際の必要幅を取得
    const htmlNeededWidth = Math.max(getEditorScrollWidth(htmlEditorRef), minEditorWidth);
    const cssNeededWidth = showCSSEditor ? Math.max(getEditorScrollWidth(cssEditorRef), minEditorWidth) : 0;
    
    const totalEditorNeededWidth = htmlNeededWidth + cssNeededWidth;
    const availableWidth = containerWidth - previewMinWidth; // プレビューの最小幅を確保
    
    console.log("totalEditorNeededWidth", totalEditorNeededWidth);
    console.log("availableWidth", availableWidth);
    console.log("containerWidth", containerWidth);
    console.log("htmlNeededWidth", htmlNeededWidth);
    console.log("cssNeededWidth", cssNeededWidth);

    if (!showCSSEditor) {
      // CSSエディタがない場合
      const htmlWidth = Math.min(htmlNeededWidth, availableWidth);
      return { 
        html: (htmlWidth / containerWidth) * 100, 
        css: 0 
      };
    }

    // CSSエディタがある場合
    if (totalEditorNeededWidth <= availableWidth) {
      // エディタの必要幅がすべて収まる場合、コンテンツ幅ぴったりに
      return {
        html: (htmlNeededWidth / containerWidth) * 100,
        css: (cssNeededWidth / containerWidth) * 100
      };
    } else {
      // エディタの必要幅が多い場合は比例配分
      const htmlRatio = htmlNeededWidth / totalEditorNeededWidth;
      const cssRatio = cssNeededWidth / totalEditorNeededWidth;
      
      const htmlWidth = availableWidth * htmlRatio;
      const cssWidth = availableWidth * cssRatio;
      
      return {
        html: (htmlWidth / containerWidth) * 100,
        css: (cssWidth / containerWidth) * 100
      };
    }
  };

  // 幅を再計算して更新する関数
  const updateSectionWidths = () => {
    const newWidths = calculateOptimalWidths();
    setSectionWidths(newWidths);
  };

  // リサイズ時の処理
  useEffect(() => {
    const handleResize = () => {
      console.log("リサイズ時の幅調整");
      updateSectionWidths();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      // iframeの読み込み完了後に高さと幅を調整
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
        {/* HTMLエディタセクション */}
        <div 
          className={styles.editorSection}
          style={{ width: `${sectionWidths.html}%` }}
        >
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
          <div 
            className={styles.editorSection}
            style={{ width: `${sectionWidths.css}%` }}
          >
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
        <div 
          className={styles.previewSection}
        >
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