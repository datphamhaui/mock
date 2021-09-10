import moment from 'moment';
import { useHistory } from 'react-router';
import { useState, useContext } from 'react';
import { Col, Row } from 'react-bootstrap';

import PaginationComponent from 'app/components/PaginationComponent';
import styles from './styles.module.css';
import AuthStorageContext from 'utils/AuthStorageContext';
interface Props {
  article: Article;
  comments: Comment[];
  removeComment: Function;
}

const limit = 10;

export default function Comment({ article, comments, removeComment }: Props) {
  //======================== Hook ========================
  const AuthStorage = useContext(AuthStorageContext);
  const auth = AuthStorage.get();
  const history = useHistory();
  //======================== State ========================
  const [page, setPage] = useState(1);
  let slicedComment = comments;
  slicedComment = comments?.slice((page - 1) * limit, page * limit);
  //======================== Render ========================
  return (
    <>
      {comments &&
        slicedComment.map(item => (
          <Row className="mb-4">
            <Col md={2} className={styles.user}>
              <img src={item.author?.image} alt="avatar" onClick={() => history.push(`/profile/${item.author?.username}`)} />
              <div className={styles.userInfo}>
                <p onClick={() => history.push(`/profile/${item.author?.username}`)}>{item.author?.username}</p>
                <p>{moment(item.createdAt).format('MMM Do YY')}</p>
              </div>
            </Col>
            <Col md={10} className={styles.content}>
              <div>{item.body}</div>
              {(article.author?.username === auth?.username || item.author?.username === auth?.username) && (
                <i
                  className="fas fa-trash"
                  onClick={() => {
                    if (window.confirm('Do you want to delele this comment?')) {
                      removeComment(item.id);
                    }
                  }}
                />
              )}
            </Col>
          </Row>
        ))}
      {comments?.length === 0 && <h4 className="text-center">Write your first comment</h4>}
      {comments?.length > limit && (
        <div className={styles.pagigation}>
          <PaginationComponent page={page} count={Math.ceil(comments?.length / limit)} handleChangePage={setPage} />
        </div>
      )}
    </>
  );
}
