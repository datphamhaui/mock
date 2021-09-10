/*
 *
 * PostPage
 *
 */
import { useEffect, useRef } from 'react';
import { FastField, Field, FieldArray, Form, Formik } from 'formik';
import { Button, Container, Row, Col, Badge, InputGroup, FormControl } from 'react-bootstrap';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import * as Yup from 'yup';
import Editor from 'app/components/Editor';
import { selectPostPage } from './slice/selectors';
import { actions } from './slice';

interface Props {}

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  body: Yup.string().required('Body is required'),
  tagList: Yup.array().min(1, 'Tag must be at least 1 items'),
});

export default function PostPage(props: Props) {
  //======================== Hook ========================
  const { article, slugSucceed, loading } = useSelector(selectPostPage);
  const { slug } = useParams<{ slug: string }>();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const path = pathname.split('/')[1];
  //======================== Effect ========================
  const ref = useRef(document.createElement('input'));
  useEffect(() => {
    if (slug && path === 'editor') {
      dispatch(actions.get(slug));
    }
  }, [dispatch, path, slug]);

  useEffect(() => {
    if (slugSucceed) {
      history.push(`/article/${slugSucceed}`);
    }
    return () => {
      dispatch(actions.reset());
    };
  }, [dispatch, history, slugSucceed]);
  //======================== Render ========================
  return (
    <Container>
      <Helmet>
        <title>{path === 'editor' ? 'Edit' : 'Create'} Aritcle</title>
      </Helmet>
      <Row>
        <Col md={12}>
          <Formik
            enableReinitialize
            initialValues={{
              title: article?.title || '',
              description: article?.description || '',
              body: article?.body || '',
              tagList: article?.tagList || [],
            }}
            validationSchema={validationSchema}
            onSubmit={values => {
              slug ? dispatch(actions.update({ ...article, ...values })) : dispatch(actions.create(values));
            }}
          >
            {({ errors, touched, values, setFieldValue }) => (
              <Form
                className="form-group"
                onKeyDown={keyEvent => {
                  if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
                    keyEvent.preventDefault();
                  }
                }}
              >
                <div className="form-group mb-4">
                  <Field name="title" className="form-control form-control-lg" placeholder="Article Title" />
                  {errors.title && touched.title && <div className="text-danger mt-2 text-bold">{errors.title}</div>}
                </div>
                <div className="form-group mb-4">
                  <Field name="description" className="form-control" placeholder="What's this article about?" />
                  {errors.description && touched.description && <div className="text-danger mt-2 text-bold">{errors.description}</div>}
                </div>
                <div className="form-group mb-4">
                  <FastField name="body" className="form-control" component={Editor} />
                  {errors.body && touched.body && <div className="text-danger mt-2 text-bold">{errors.body}</div>}
                </div>
                <div className="form-group mb-4">
                  <FieldArray name="tagList">
                    {({ push, remove, form }) => {
                      return (
                        <>
                          <InputGroup className="mb-3">
                            <FormControl
                              ref={ref}
                              placeholder="Add a tag"
                              onKeyDown={e => {
                                if (e.key === 'Enter') {
                                  push(ref.current.value);
                                  ref.current.value = '';
                                }
                              }}
                            />
                          </InputGroup>
                          <div className="d-flex gap-2 flex-wrap">
                            {form.values.tagList?.map((tag, index) => (
                              <h5 key={index}>
                                <Badge bg="secondary">
                                  {tag} <i className="fas fa-times-circle pointer" onClick={() => remove(index)} />
                                </Badge>
                              </h5>
                            ))}
                          </div>
                        </>
                      );
                    }}
                  </FieldArray>
                  {errors.tagList && <div className="text-danger text-bold">{errors.tagList}</div>}
                </div>
                <Button variant="primary" type="submit" className="w-100" disabled={loading}>
                  {loading ? 'Publishing' : 'Publish'} Article
                </Button>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
}
