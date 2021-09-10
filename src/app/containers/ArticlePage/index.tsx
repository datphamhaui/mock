/*
 *
 * ArticlePage
 *
 */
import { useEffect, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import { useParams, useHistory } from 'react-router-dom';

import PublicRoutesContext from 'utils/PublicRoutesContext';
import AuthStorageContext from 'utils/AuthStorageContext';
import Loading from 'app/components/Loading';
import { selectArticlePage } from './slice/selectors';
import { actions } from './slice';
import Comment from './components/Comment';
import Banner from './components/Banner';
import Input from './components/Input';
import styles from './styles.module.css';
interface Props {}

export default function ArticlePage(props: Props) {
  //======================== Hook ========================
  const { article, comments, removeSuccess, loading } = useSelector(selectArticlePage);
  const publicRedirect = useContext(PublicRoutesContext);
  const AuthStorage = useContext(AuthStorageContext);
  const { slug } = useParams<{ slug: string }>();
  const auth = AuthStorage.get();
  const dispatch = useDispatch();
  const history = useHistory();
  //======================== Effect ========================
  useEffect(() => {
    dispatch(actions.get(slug));
    dispatch(actions.getComment(slug));
  }, [dispatch, slug]);

  useEffect(() => {
    if (removeSuccess) {
      history.push(`/profile/${auth?.username}`);
    }
    return () => {
      dispatch(actions.reset());
    };
  }, [auth?.username, dispatch, history, removeSuccess]);
  //======================== Render ========================
  return (
    <Container>
      {!loading ? (
        <>
          <div className={styles.banner}>
            <Banner
              article={article}
              unFollow={() => publicRedirect(() => dispatch(actions.unFollow(article.author.username)))}
              follow={() => publicRedirect(() => dispatch(actions.follow(article.author.username)))}
            />
          </div>
          <div className={styles.content}>{ReactHtmlParser(article.body)}</div>
          <div className={styles.content}>
            <Row>
              <Col md={8}>
                <Comment comments={comments} article={article} removeComment={id => dispatch(actions.removeComment({ slug: article.slug, id }))} />
              </Col>
              <Col md={4}>
                <Input
                  article={article}
                  commentCount={comments?.length}
                  favorite={() => publicRedirect(() => dispatch(actions.favorite(article.slug)))}
                  unFavorite={() => publicRedirect(() => dispatch(actions.unFavorite(article.slug)))}
                  onSubmit={comment => publicRedirect(() => dispatch(actions.comment({ slug: article.slug, comment })))}
                  remove={() => dispatch(actions.remove(article.slug))}
                />
              </Col>
            </Row>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </Container>
  );
}
