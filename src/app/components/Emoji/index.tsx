/**
 *
 * Emoji
 *
 */
import { useRef } from 'react';
import useOutsideClick from 'utils/useOutsideClick';
import emoji from 'constants/emoji';
import styles from './styles.module.css';

interface Props {
  onClose: Function;
  onClick: Function;
}

export default function Emoji({ onClose, onClick }: Props) {
  //======================== Hook ========================
  const ref = useRef(document.createElement('div'));
  //======================== Effect ========================
  useOutsideClick(ref, () => onClose());
  //======================== Render ========================
  return (
    <div ref={ref} className={styles.root}>
      {emoji.map(item => (
        <div className={styles.wrapper}>
          <span className={styles.text}>{item.title}</span>
          <div className={styles.iconWrapper}>
            {item.item.map(icon => (
              <div className={styles.icon} onClick={() => onClick(icon)}>
                {icon}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
