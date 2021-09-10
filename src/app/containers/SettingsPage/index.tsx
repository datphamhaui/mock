/*
 *
 * SettingsPage
 *
 */
import React, { useEffect, useContext, useState } from 'react';
import { ErrorMessage, FastField, Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import * as Yup from 'yup';

import AuthStorageContext from 'utils/AuthStorageContext';
import { actions } from './slice';
import { selectSettingsPage } from './slice/selectors';
import Editor from 'app/components/Editor';

interface Props {}

const validationSchema = Yup.object({
  username: Yup.string().required('Required'),
  email: Yup.string().required('Required'),
  bio: Yup.string().required('Required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters'),
});

export default function SettingsPage(props: Props) {
  //======================== Hook ========================
  const AuthStorage = useContext(AuthStorageContext);
  const { data, loading } = useSelector(selectSettingsPage);
  const dispatch = useDispatch();
  const auth = AuthStorage.get();
  //======================== State ========================
  const [error, setError] = useState(auth?.image ? false : true);
  const initialValue = {
    image: auth?.image || '',
    username: auth?.username || '',
    email: auth?.email || '',
    bio: auth?.bio || '',
    password: '',
  };
  //======================== Effect ========================
  useEffect(() => {
    if (data) {
      AuthStorage.set(data, `/profile/${data.username}`);
    }
    return () => {
      dispatch(actions.reset());
    };
  }, [AuthStorage, data, dispatch]);
  //======================== Render ========================
  return (
    <Container>
      <Helmet>
        <title>Settings</title>
      </Helmet>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h1 className="text-center">Your Settings</h1>
          <Formik
            initialValues={initialValue}
            validationSchema={validationSchema}
            onSubmit={values => {
              dispatch(actions.put(values));
            }}
          >
            {({ values }) => (
              <Form>
                <div className="form-group mb-4">
                  <Field className="form-control" name="image" placeholder="URL of profile picture" />
                  {!error && (
                    <div className="d-flex justify-content-center mt-3">
                      <img src={values.image} alt="avatar" style={{ width: '200px' }} onError={() => setError(true)} />
                    </div>
                  )}
                  <ErrorMessage name="image" />
                </div>
                <div className="form-group mb-4">
                  <Field className="form-control form-control-lg" name="username" placeholder="Your Name" />
                  <ErrorMessage name="username" />
                </div>
                <div className="form-group mb-4">
                  <FastField name="bio" className="form-control" component={Editor} />
                  <ErrorMessage name="bio" />
                </div>
                <div className="form-group mb-4">
                  <Field className="form-control form-control-lg" name="email" placeholder="Email" readOnly />
                </div>
                <div className="form-group mb-4">
                  <Field className="form-control form-control-lg" name="password" type="password" placeholder="New Password" />
                  <ErrorMessage name="password" />
                </div>
                <Button variant="primary" type="submit" className="w-100" disabled={loading}>
                  {loading ? 'Updating' : 'Update Settings'}
                </Button>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
}
