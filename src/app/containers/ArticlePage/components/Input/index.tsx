/*
 *
 * Input
 *
 */
import { useState, useContext, useEffect } from 'react';
import autosize from 'autosize';

import AuthStorageContext from 'utils/AuthStorageContext';
import unlike from 'assets/images/unlike.svg';
import like from 'assets/images/like.svg';
import smile from 'assets/images/smile.svg';
import styles from './styles.module.css';
import { useHistory } from 'react-router';
import Emoji from 'app/components/Emoji';

interface Props {
  article: Article;
  commentCount: number;
  favorite: Function;
  unFavorite: Function;
  onSubmit: Function;
  remove: Function;
}

export default function Input({ article, commentCount, favorite, unFavorite, onSubmit, remove }: Props) {
  //======================== Hook ========================
  const AuthStorage = useContext(AuthStorageContext);
  const auth = AuthStorage.get();
  const history = useHistory();
  //======================== State ========================
  const [value, setValue] = useState('');
  const [hide, setHide] = useState(true);
  const [open, setOpen] = useState(false);
  //======================== Effect ========================
  useEffect(() => {
    autosize(document.querySelectorAll('textarea'));
  }, []);
  //======================== Callback ========================
  function handleSubmit(e) {
    e.preventDefault();
    if (value) {
      onSubmit(value);
      setValue('');
    }
  }
  //======================== Render ========================
  return (
    <div className={styles.root}>
      <div>
        <div className={styles.reaction}>
          <img
            src={article.favorited ? like : unlike}
            alt="like"
            className={styles.like}
            onClick={() => {
              article.favorited ? unFavorite() : favorite();
            }}
          />
          {article.author?.username === auth?.username && (
            <i className={`fas fa-ellipsis-v ${styles.remove}`} onClick={() => setHide(!hide)}>
              {!hide && (
                <div className={styles.dropdown}>
                  <i className={`fas fa-pen ${styles.remove}`} onClick={() => history.push(`/editor/${article.slug}`)} />
                  <i
                    className={`fas fa-trash ${styles.remove}`}
                    onClick={() => {
                      if (window.confirm('Do you want to delele this article')) {
                        remove();
                      }
                    }}
                  />
                </div>
              )}
            </i>
          )}
        </div>
        <div className={styles.likeCounter}>
          {article.favoritesCount} favorite{article.favoritesCount > 1 ? 's' : ''} and {commentCount} comment{commentCount > 1 ? 's' : ''}
        </div>
      </div>
      <div className="position-relative">
        {open && (
          <div className={styles.box}>
            <Emoji onClose={() => setOpen(false)} onClick={e => setValue(value + e)} />
          </div>
        )}
      </div>
      <form className={styles.typeWrapper} onSubmit={handleSubmit}>
        <img src={smile} alt="emoji" className={styles.emoji} onClick={() => setOpen(true)} />
        <textarea
          className={styles.area}
          placeholder="Add a comment..."
          onChange={e => setValue(e.target.value)}
          value={value}
          onKeyDown={e => {
            if (e.key === 'Enter') handleSubmit(e);
          }}
        />
        <button className={styles.post} type="submit">
          Post
        </button>
      </form>
    </div>
  );
}
