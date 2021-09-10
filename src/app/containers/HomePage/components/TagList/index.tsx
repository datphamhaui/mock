/**
 *
 * TagList
 *
 */
import styles from './styles.module.css';

interface Props {
  tags: string[];
  setTag: Function;
}

export default function TagList({ tags, setTag }: Props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <p>Popular Tags</p>
      </div>
      <div className={styles.content}>
        {tags.map(item => (
          <span key={item} className={styles.tag} onClick={() => setTag(item)}>
            #{item}
          </span>
        ))}
      </div>
    </div>
  );
}
