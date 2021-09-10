/**
 *
 * PrivateRoute
 *
 */

import { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import AuthStorageContext from 'utils/AuthStorageContext';
import Layout from 'app/components/Layout';

export default function PrivateRoute({ component: InnerComponent, location, ...rest }) {
  //======================== Hook ========================
  const AuthStorage = useContext(AuthStorageContext);
  //======================== Render ========================
  return (
    <Route
      {...rest}
      render={props => {
        if (AuthStorage.get()) {
          return (
            <Layout>
              <InnerComponent {...props} />
            </Layout>
          );
        }
        return <Redirect to={{ pathname: '/login', state: { from: location } }} />;
      }}
    />
  );
}
