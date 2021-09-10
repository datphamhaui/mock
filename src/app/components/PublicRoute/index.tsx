/**
 *
 * PublicRoute
 *
 */

import { useContext } from 'react';
import { Route, useHistory } from 'react-router-dom';

import AuthStorageContext from 'utils/AuthStorageContext';
import PublicRoutesContext from 'utils/PublicRoutesContext';
import Layout from 'app/components/Layout';

export default function PublicRoute({ component: InnerComponent, ...rest }) {
  //======================== Hook ========================
  const AuthStorage = useContext(AuthStorageContext);
  const auth = AuthStorage.get();
  const history = useHistory();
  //======================== Callback ========================
  const publicRedirect = (callback: Function) => {
    if (auth) {
      callback();
    } else {
      history.push('/login');
    }
  };
  //======================== Render ========================
  return (
    <Route
      {...rest}
      render={props => (
        <PublicRoutesContext.Provider value={publicRedirect}>
          <Layout>
            <InnerComponent {...props} />
          </Layout>
        </PublicRoutesContext.Provider>
      )}
    />
  );
}
