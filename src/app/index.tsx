import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'assets/styles/style.scss';

import PrivateRoute from 'app/components/PrivateRoute/loadable';
import PublicRoute from 'app/components/PublicRoute/loadable';
import AuthStorage from 'app/components/AuthStorage/loadable';
import NotFoundPage from 'app/containers/NotFoundPage/loadable';
import HomePage from 'app/containers/HomePage/loadable';
import LoginPage from 'app/containers/LoginPage/loadable';
import SignupPage from 'app/containers/SignupPage/loadable';
import ArticlePage from 'app/containers/ArticlePage/loadable';
import ProfilePage from 'app/containers/ProfilePage/loadable';
import PostPage from 'app/containers/PostPage/loadable';
import SettingsPage from 'app/containers/SettingsPage/loadable';

export function App() {
  return (
    <BrowserRouter>
      <AuthStorage>
        <Helmet titleTemplate="%s | conduit" defaultTitle="conduit">
          <meta name="description" content="React application" />
        </Helmet>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={SignupPage} />
          <PublicRoute exact path="/" component={HomePage} />
          <PublicRoute path="/profile/:username" component={ProfilePage} />
          <PublicRoute path="/article/:slug" component={ArticlePage} />
          <PrivateRoute path="/create-articles" component={PostPage} />
          <PrivateRoute path="/editor/:slug" component={PostPage} />
          <PrivateRoute path="/settings" component={SettingsPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </AuthStorage>
    </BrowserRouter>
  );
}
