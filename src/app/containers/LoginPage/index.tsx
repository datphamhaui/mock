/*
 *
 * LoginPage
 *
 */
import { useContext, useEffect, useState } from 'react';
import * as yup from 'yup';
import { Field, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import AuthStorageContext from 'utils/AuthStorageContext';
import Layout from 'app/components/Layout';
import { selectLoginPage } from './slice/selectors';
import styles from './styles.module.css';
import { actions } from './slice';

interface Props {}

const validationSchema = yup.object({
  email: yup.string().email('Email must be valid').required('Email is required'),
  password: yup.string().required('Password is required'),
});

export default function LoginPage(props: Props) {
  //======================== Hook ========================
  const { data, loading } = useSelector(selectLoginPage);
  const AuthStorage = useContext(AuthStorageContext);
  const dispatch = useDispatch();
  const history = useHistory();
  //======================== State ========================
  const [hide, setHide] = useState(false);
  //======================== Effect ========================
  useEffect(() => {
    if (data) {
      AuthStorage.set(data, '/');
    }
    return () => {
      dispatch(actions.reset());
    };
  }, [history, data, dispatch, AuthStorage]);
  //======================== Render ========================
  return (
    <Layout>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Container className="mt-4">
        <Row>
          <Col xs={12} md={{ span: 6, offset: 3 }}>
            <h1 className="text-center">Log In</h1>
            <h6 className={styles.account} onClick={() => history.push('/login')}>
              Need an account?
            </h6>
            <Formik
              initialValues={{
                email: 'test@test.com',
                password: 'test',
              }}
              validationSchema={validationSchema}
              onSubmit={values => {
                dispatch(actions.login(values));
              }}
            >
              {props => (
                <Form onSubmit={props.handleSubmit}>
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Field
                      as={Form.Control}
                      className={styles.input}
                      placeholder="Email"
                      name="email"
                      isInvalid={props.touched.email && !!props.errors.email}
                      disabled={loading}
                    />
                    <Form.Control.Feedback type="invalid">{props.errors.email}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formPassword">
                    <Field
                      as={Form.Control}
                      className={styles.input}
                      placeholder="Password"
                      type={!hide ? 'password' : 'text'}
                      name="password"
                      isInvalid={props.touched.password && !!props.errors.password}
                      disabled={loading}
                    />
                    <div className={styles.hide}>
                      {hide ? (
                        <i className="fas fa-eye-slash" onClick={() => setHide(!hide)} />
                      ) : (
                        <i className="fas fa-eye" onClick={() => setHide(!hide)} />
                      )}
                      <p onClick={() => setHide(!hide)}>{hide ? 'Hide' : 'Show'} password</p>
                    </div>
                    <Form.Control.Feedback type="invalid">{props.errors.password}</Form.Control.Feedback>
                  </Form.Group>
                  <div className="d-flex justify-content-center">
                    <Button variant="primary" type="submit" disabled={loading} className={styles.button}>
                      Log In
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}
