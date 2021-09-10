/*
 *
 * HomePage
 *
 */
import React, { useEffect, useState, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import PublicRoutesContext from 'utils/PublicRoutesContext';
import { actions } from './slice';
import { selectHomePage } from './slice/selectors';
import PaginationComponent from 'app/components/PaginationComponent';
import Loading from 'app/components/Loading';
import Article from 'app/components/Article';
import Tab from './components/Tab';
import TagList from './components/TagList';
import AuthStorageContext from 'utils/AuthStorageContext';

interface Props {}
interface Config {
  query: string;
  params: {
    offset: number;
    limit: number;
    tag?: string;
  };
}

const limit = 5;

export default function HomePage(props: Props) {
  //======================== Hook ========================
  const { articles, tags, articlesCount, loading } = useSelector(selectHomePage);
  const publicRedirect = useContext(PublicRoutesContext);
  const AuthStorage = useContext(AuthStorageContext);
  const dispatch = useDispatch();
  const auth = AuthStorage.get();
  //======================== State ========================
  const [tab, setTab] = useState(auth ? 1 : 2);
  const [page, setPage] = useState(1);
  const [tag, setTag] = useState('');
  //======================== Effect ========================
  useEffect(() => {
    const config: Config = {
      query: 'feed',
      params: {
        offset: (page - 1) * limit,
        limit,
      },
    };
    if (tab === 2 || tag) {
      config.query = '';
    }
    if (tag) {
      config.params.tag = tag;
    }
    dispatch(actions.getArticle(config));
  }, [dispatch, page, tag, tab]);

  useEffect(() => {
    dispatch(actions.getTag());
  }, [dispatch]);
  //======================== Callback ========================
  const handleChangeTab = (tab: number) => {
    setTab(tab);
    setTag('');
    setPage(1);
  };

  const handleChangeTag = (tag: string) => {
    setTag(tag);
    setPage(1);
  };
  //======================== Render ========================
  return (
    <Container>
      {!loading ? (
        <Row>
          <Tab tab={tab} setTab={handleChangeTab} tag={tag} auth={auth} />
          <Col md={9}>
            <Article
              articles={articles}
              favorite={slug => {
                publicRedirect(() => dispatch(actions.favorite(slug)));
              }}
              unFavorite={slug => {
                publicRedirect(() => dispatch(actions.unFavorite(slug)));
              }}
              follow={slug => {
                publicRedirect(() => dispatch(actions.follow(slug)));
              }}
            />
            {articlesCount > limit && <PaginationComponent page={page} count={Math.ceil(articlesCount / limit)} handleChangePage={setPage} />}
          </Col>
          <Col md={3}>
            <TagList tags={tags} setTag={handleChangeTag} />
          </Col>
        </Row>
      ) : (
        <Loading />
      )}
    </Container>
  );
}
