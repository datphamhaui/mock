/*
 *
 * ProfilePage
 *
 */
import { useEffect, useContext, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';

import PublicRoutesContext from 'utils/PublicRoutesContext';
import PaginationComponent from 'app/components/PaginationComponent';
import Loading from 'app/components/Loading';
import Article from 'app/components/Article';
import Banner from './components/Banner';
import Tab from './components/Tab';
import { selectProfilePage } from './slice/selectors';
import { actions } from './slice';
import styles from './styles.module.css';

const limit = 5;

export default function ProfilePage() {
  //======================== Hook ========================
  const { profile, articlesCount, articles, loading } = useSelector(selectProfilePage);
  const publicRedirect = useContext(PublicRoutesContext);
  const { username } = useParams<{ username: string }>();
  const dispatch = useDispatch();
  const location = useLocation();
  //======================== State ========================
  const [page, setPage] = useState(1);
  //======================== Effect ========================
  useEffect(() => {
    dispatch(actions.getProfile(username));
  }, [dispatch, username]);

  useEffect(() => {
    if (location.pathname.includes('/favorites')) {
      dispatch(actions.get({ favorited: username, limit: 5, offset: (page - 1) * 5 }));
    } else {
      dispatch(actions.get({ author: username, limit: 5, offset: (page - 1) * 5 }));
    }
  }, [dispatch, location.pathname, page, username]);
  //======================== Render ========================
  return (
    <div>
      <Helmet>
        <title>{username}</title>
      </Helmet>
      {!loading ? (
        <>
          <Banner
            user={profile}
            follow={username => publicRedirect(() => dispatch(actions.follow(username)))}
            unFollow={username => publicRedirect(() => dispatch(actions.unFollow(username)))}
          />
          <Container className="mt-4">
            <Row>
              <Col md={12} className={styles.article}>
                <Tab />
                <Article
                  articles={articles}
                  favorite={slug => publicRedirect(() => dispatch(actions.favorite(slug)))}
                  unFavorite={slug => publicRedirect(() => dispatch(actions.unFavorite(slug)))}
                  follow={slug => publicRedirect(() => dispatch(actions.follow(slug)))}
                />
                {articlesCount > limit && <PaginationComponent page={page} count={Math.ceil(articlesCount / limit)} handleChangePage={setPage} />}
              </Col>
            </Row>
          </Container>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}
