/* eslint-disable jsx-a11y/anchor-is-valid */
/**
 *
 * Article
 *
 */
import moment from 'moment';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import AuthStorageContext from 'utils/AuthStorageContext';
import noAvatar from 'assets/images/no-avatar.jpg';
import unlike from 'assets/images/unlike.svg';
import like from 'assets/images/like.svg';
import styles from './styles.module.css';

interface Props {
  articles: Article[];
  favorite: Function;
  unFavorite: Function;
  follow: Function;
}

export default function Article({ articles, favorite, unFavorite, follow }: Props) {
  //======================== Hook ========================
  const AuthStorage = useContext(AuthStorageContext);
  const auth = AuthStorage.get();
  const history = useHistory();
  //======================== Callback ========================
  function handleFavourite(item) {
    if (item.favorited) {
      unFavorite(item.slug);
    } else {
      favorite(item.slug);
    }
  }
  //======================== Render ========================
  return (
    <div className={styles.wrapper}>
      {articles.length !== 0 &&
        articles.map(item => (
          <div key={item.slug} className={styles.article}>
            <div className={styles.header}>
              <div className={styles.info}>
                <img
                  src={item.author?.image || noAvatar}
                  alt="avatar"
                  className={styles.avatar}
                  onClick={() => history.push(`/profile/${item.author.username}`)}
                />
                <p onClick={() => history.push(`/profile/${item.author.username}`)}>{item.author.username}</p>
                {!item.author.following && auth?.username !== item.author.username && (
                  <span onClick={() => follow(item.author.username)}>Following</span>
                )}
              </div>
              <img src={item.favorited ? like : unlike} alt="like" onClick={() => handleFavourite(item)} />
            </div>
            <div onClick={() => history.push(`/article/${item.slug}`)} className={styles.content}>
              <h1>{item.title}</h1>
              <p>{item.description}</p>
              <div className="d-flex justify-content-between">
                <div>
                  {item.tagList.map(item => (
                    <span key={item}>#{item} &nbsp;</span>
                  ))}
                </div>
                <span>
                  {moment(item.createdAt).format('MMM Do YY')} | {item.favoritesCount} favorite{item.favoritesCount > 1 ? 's' : ''}
                </span>
              </div>
            </div>
          </div>
        ))}
      {articles.length === 0 && <h4 className={styles.noArticle}>No articles are here... yet.</h4>}
    </div>
  );
}
