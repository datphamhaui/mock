/*
 *
 * Input
 *
 */
import moment from 'moment';
import { useContext } from 'react';
import { useHistory } from 'react-router';

import AuthStorageContext from 'utils/AuthStorageContext';
import styles from './styles.module.css';

interface Props {
  article: Article;
  follow: Function;
  unFollow: Function;
}

export default function Banner({ article, follow, unFollow }: Props) {
  //======================== Hook ========================
  const AuthStorage = useContext(AuthStorageContext);
  const auth = AuthStorage.get();
  const history = useHistory();
  //======================== Render ========================
  return (
    <>
      <h6>{article.tagList?.map(item => `#${item} `)}</h6>
      <h1>{article.title}</h1>
      <p>{article.description}</p>
      <div className={styles.user}>
        <img src={article.author?.image} alt="avatar" className={styles.image} onClick={() => history.push(`/profile/${article.author?.username}`)} />
        <div className={styles.userInfo}>
          <div className="d-flex">
            <h6 className="m-0 pointer" onClick={() => history.push(`/profile/${article.author?.username}`)}>
              {article.author?.username}
            </h6>
            {auth?.username !== article.author?.username && (
              <span onClick={() => (article.author?.following ? unFollow() : follow())}>{article.author?.following ? 'Following' : 'Follow'}</span>
            )}
          </div>

          <p>{moment(article.createdAt).format('MMM Do YY')}</p>
        </div>
      </div>
    </>
  );
}
