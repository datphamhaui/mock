/**
 *
 * Tab
 *
 */
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';

import AuthStorageContext from 'utils/AuthStorageContext';
import noAvatar from 'assets/images/no-avatar.jpg';
import styles from './styles.module.css';
interface Props {
  user: Profile;
  follow: Function;
  unFollow: Function;
}

export default function Banner({ user, follow, unFollow }: Props) {
  //======================== Hook ========================
  const AuthStorage = useContext(AuthStorageContext);
  const auth = AuthStorage.get();
  const history = useHistory();
  //======================== Callback ========================
  const handleFollowUser = () => {
    if (user.following) {
      unFollow(user.username);
    } else {
      follow(user.username);
    }
  };
  //======================== Render ========================
  return (
    <div className={styles.banner}>
      <div className={styles.left}>
        <h2 className={styles.heading}>
          <img className={styles.image} src={user.image || noAvatar} alt="jsx-a11y/alt-text" />
        </h2>
      </div>
      <div>
        <div className="d-flex align-items-center">
          <h4 className={styles.name}>{user.username}</h4>
          {auth?.username === user.username && (
            <div onClick={() => history.push('/settings')} className={styles.button}>
              Edit Profile
            </div>
          )}
          {auth?.username !== user.username && (
            <div onClick={handleFollowUser} className={styles.button}>
              <span>{user.following ? 'Unfollow' : 'Follow'}</span>
            </div>
          )}
        </div>
        <div className={`mt-3 d-flex ${styles.count}`}>
          <div>
            <span>{user.postCount} </span>Post{user.postCount > 1 ? 's' : ''}
          </div>
          <div className="mx-3">
            <span>{user.followerCount} </span>Follower{user.followerCount > 1 ? 's' : ''}
          </div>
          <div>
            <span>{user.followingCount} </span>Following{user.followingCount > 1 ? 's' : ''}
          </div>
        </div>
        <div className="mt-2">
          <p>{ReactHtmlParser(user.bio)}</p>
        </div>
      </div>
    </div>
  );
}
