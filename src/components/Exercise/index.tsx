import React, { ReactNode, ReactElement, Children } from 'react';
import styles from './styles.module.css';

interface ExerciseProps {
  title: string;
  children: ReactNode;
  solutionTitle?: string;
}

// Solution子コンポーネント
export function Solution({ children }: { children: ReactNode }): ReactElement {
  return <>{children}</>;
}

export default function Exercise({ 
  title,
  children, 
  solutionTitle = "解答を表示" 
}: ExerciseProps): React.ReactElement {
  const childrenArray = Children.toArray(children);
  
  // Solutionコンポーネントを探す
  const solutionChild = childrenArray.find(
    (child) => React.isValidElement(child) && child.type === Solution
  );
  
  // Solution以外の子要素（問題部分）
  const problemChildren = childrenArray.filter(
    (child) => !(React.isValidElement(child) && child.type === Solution)
  );

  return (
    <div className={styles.exerciseSection}>
      <h3>{title}</h3>
      <div className={styles.exerciseContent}>
        {problemChildren}
      </div>
      {solutionChild && (
        <details className={styles.exerciseSolution}>
          <summary>{solutionTitle}</summary>
          <div className={styles.exerciseSolutionContent}>
            {React.isValidElement(solutionChild) && solutionChild.props ? 
              (solutionChild.props as { children: ReactNode }).children : null}
          </div>
        </details>
      )}
    </div>
  );
} 