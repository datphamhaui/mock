/**
 *
 * Tab
 *
 */
import { Nav } from 'react-bootstrap';
import styles from './styles.module.css';

interface Props {
  tab: number;
  setTab: Function;
  tag?: string;
  auth: AuthStorage | undefined;
}

export default function Tab({ tab, setTab, tag, auth }: Props) {
  return (
    <Nav className={styles.wrapper}>
      {auth && (
        <Nav.Item>
          <Nav.Link className={tab === 1 && !tag ? styles.active : styles.unactive} onClick={() => setTab(1)}>
            Your Feed
          </Nav.Link>
        </Nav.Item>
      )}
      <Nav.Item>
        <Nav.Link className={tab === 2 && !tag ? styles.active : styles.unactive} onClick={() => setTab(2)}>
          Global Feed
        </Nav.Link>
      </Nav.Item>
      {tag && (
        <Nav.Item>
          <Nav.Link className={styles.active} onClick={() => setTab(2)}>
            #{tag}
          </Nav.Link>
        </Nav.Item>
      )}
    </Nav>
  );
}
