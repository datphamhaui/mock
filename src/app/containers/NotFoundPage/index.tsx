/*
 *
 * NotFoundPage
 *
 */
import { useHistory } from 'react-router-dom';
import { Button, Col, Container, Row } from 'react-bootstrap';

import styles from './styles.module.css';

export default function NotFoundPage() {
  //======================== Hook ========================
  const history = useHistory();
  //======================== Render ========================
  return (
    <div className={styles.root}>
      <Container>
        <Row>
          <Col md={12}>
            <div className={styles.wrapper}>
              <h1>404 Not Found</h1>
              <p>Sorry, an error has occured, Requested page not found!</p>
              <div className={styles.actions}>
                <Button variant="primary" size="lg" onClick={() => history.push('/')}>
                  Take Me Home
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
