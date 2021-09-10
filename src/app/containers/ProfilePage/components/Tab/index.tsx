/**
 *
 * Tab
 *
 */
import { useContext } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

import AuthStorageContext from 'utils/AuthStorageContext';
import styles from './styles.module.css';

interface Props {}

export default function Tab(props: Props) {
  //======================== Hook ========================
  const AuthStorage = useContext(AuthStorageContext);
  const { pathname } = useLocation();
  const { url } = useRouteMatch();
  const auth = AuthStorage.get();
  const history = useHistory();
  //======================== Callback ========================
  const handleActiveFavorite = () => {
    history.push(`${url}/favorites`);
  };

  const handleActiveMyArticle = () => {
    history.push(`${url}`);
  };
  //======================== Render ========================
  return (
    <div className="d-flex justify-content-between align-items-center">
      <Nav className={styles.wrapper}>
        <Nav.Item>
          <Nav.Link className={!pathname.includes('/favorites') ? styles.active : styles.unactive} onClick={handleActiveMyArticle}>
            My Articles
          </Nav.Link>
        </Nav.Item>
        {auth && (
          <Nav.Item>
            <Nav.Link className={pathname.includes('/favorites') ? styles.active : styles.unactive} onClick={handleActiveFavorite}>
              Favorited Articles
            </Nav.Link>
          </Nav.Item>
        )}
      </Nav>
    </div>
  );
}
