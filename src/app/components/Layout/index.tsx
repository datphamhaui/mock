/**
 *
 * Layout
 *
 */
import { useState, useContext, useRef } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import AuthStorageContext from 'utils/AuthStorageContext';
import useOutsideClick from 'utils/useOutsideClick';
import noAvatar from 'assets/images/no-avatar.jpg';
import styles from './styles.module.css';
interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  //======================== Hook ========================
  const ref = useRef(document.createElement('div'));
  const AuthStorage = useContext(AuthStorageContext);
  const [drop, setDrop] = useState(false);
  const history = useHistory();
  const auth = AuthStorage.get();
  //======================== Effect ========================
  useOutsideClick(ref, () => {
    setDrop(false);
  });
  //======================== Render ========================
  return (
    <>
      <div className={styles.root}>
        <Container className="d-flex justify-content-between my-1">
          <Navbar.Brand className={styles.logo} onClick={() => history.push('/')}>
            conduit
          </Navbar.Brand>
          <Nav className="ml-auto position-relative">
            <Nav.Link className={styles.navItem} onClick={() => history.push('/')}>
              <i className="fas fa-home" />
            </Nav.Link>
            {!auth ? (
              <>
                <Nav.Link className={styles.navItem} onClick={() => history.push('/register')}>
                  Sign up
                </Nav.Link>
                <Nav.Link className={styles.navItem} onClick={() => history.push('/login')}>
                  Log in
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link className={styles.navItem} onClick={() => history.push('/create-articles')}>
                  <i className="fas fa-plus-square" />
                </Nav.Link>

                <div onClick={() => setDrop(!drop)} ref={ref}>
                  <Nav.Link className={styles.navItem}>
                    <img src={auth.image || noAvatar} alt="avatar" />
                  </Nav.Link>

                  {drop && (
                    <div className={styles.dropdown}>
                      <Nav.Link className={styles.navItem} onClick={() => history.push(`/profile/${auth.username}`)}>
                        <i className="fas fa-user" /> Profile ({auth.username})
                      </Nav.Link>
                      <Nav.Link className={styles.navItem} onClick={() => history.push('/settings')}>
                        <i className="fas fa-cog" /> Settings
                      </Nav.Link>
                      <Nav.Link
                        className={styles.navItem}
                        onClick={() => {
                          localStorage.clear();
                          history.push('/login');
                        }}
                      >
                        <i className="fas fa-sign-out-alt" /> Logout
                      </Nav.Link>
                    </div>
                  )}
                </div>
              </>
            )}
          </Nav>
        </Container>
      </div>
      <div className={styles.content}>{children}</div>
    </>
  );
}
