import { useState } from 'react';
import styles from './submissions.module.css';
import type { WorkComment } from './work-data-mappers';

type WorkCommentsProps = {
  comments: WorkComment[];
  isDisabled: boolean;
  onSubmit: (name: string, message: string) => Promise<void>;
};

const MAX_COMMENT_LENGTH = 300;
const MAX_NAME_LENGTH = 40;

export default function WorkComments({
  comments,
  isDisabled,
  onSubmit,
}: WorkCommentsProps) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isDisabled || isSubmitting) {
      return;
    }

    const trimmedMessage = message.trim();
    const trimmedName = name.trim();

    if (!trimmedMessage) {
      setFormError('コメントを入力してください。');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(trimmedName, trimmedMessage);
      setMessage('');
      setName('');
      setFormError(null);
      setIsOpen(false);
    } catch (error) {
      if (error instanceof Error) {
        setFormError(error.message);
      } else {
        setFormError('コメントの送信に失敗しました。');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.commentsSection}>
      <h4 className={styles.sectionTitle}>みんなのコメント</h4>
      <div className={styles.contentBlock}>
        {comments.length === 0 ? (
          <p className={styles.placeholder}>コメントはまだありません。</p>
        ) : (
          <ul className={styles.commentList} data-testid="comment-list">
            {comments.map((comment) => (
              <li key={comment.id} className={styles.commentItem}>
              <div className={styles.commentMeta}>
                <span className={styles.commentAuthor}>
                  <span data-testid="comment-author">
                    {comment.authorName}
                  </span>
                </span>
              </div>
                <p className={styles.commentBody} data-testid="comment-body">
                  {comment.message}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={styles.sectionHeader}>
        <div className={styles.sectionHeaderSpacer} />
        <div className={styles.actionRow}>
          {!isOpen ? (
            <button
              type="button"
              className={styles.actionButton}
              onClick={() => setIsOpen(true)}
              disabled={isDisabled}
              data-testid="comment-open"
            >
              追加
            </button>
          ) : (
            <button
              type="button"
              className={styles.actionButton}
              onClick={() => setIsOpen(false)}
              disabled={isSubmitting}
            >
              閉じる
            </button>
          )}
        </div>
      </div>

      {isOpen ? (
        <div className={styles.editorPanel}>
          <form className={styles.commentForm} onSubmit={handleSubmit}>
            <label className={styles.commentLabel}>
              名前（任意）
              <input
                type="text"
                value={name}
                onChange={(event) =>
                  setName(event.target.value.slice(0, MAX_NAME_LENGTH))
                }
                className={styles.commentInput}
                placeholder="例: たろう"
                maxLength={MAX_NAME_LENGTH}
                disabled={isDisabled || isSubmitting}
                data-testid="comment-name"
              />
            </label>
            <label className={styles.commentLabel}>
              コメント
              <textarea
                value={message}
                onChange={(event) =>
                  setMessage(event.target.value.slice(0, MAX_COMMENT_LENGTH))
                }
                className={styles.commentTextarea}
                placeholder="良かったところや感想を書いてください"
                maxLength={MAX_COMMENT_LENGTH}
                required
                disabled={isDisabled || isSubmitting}
                data-testid="comment-message"
              />
            </label>
            {formError && <p className={styles.formError}>{formError}</p>}
            {isDisabled && (
              <p className={styles.formError}>
                コメント機能がまだ設定されていません。
              </p>
            )}
            <div className={styles.inlineActions}>
              <button
                type="submit"
                className={styles.commentButton}
                data-testid="comment-submit"
              >
                {isSubmitting ? '送信中...' : 'コメントを送信'}
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </section>
  );
}
