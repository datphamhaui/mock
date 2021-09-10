import { HomePageState } from 'app/containers/HomePage/slice/types';
import { LoginPageState } from 'app/containers/LoginPage/slice/types';
import { SignupPageState } from 'app/containers/SignupPage/slice/types';
import { ArticlePageState } from 'app/containers/ArticlePage/slice/types';
import { ProfilePageState } from 'app/containers/ProfilePage/slice/types';
import { PostPageState } from 'app/containers/PostPage/slice/types';
import { SettingsPageState } from 'app/containers/SettingsPage/slice/types';
// GENERATE NEW CONTAINER STATE ABOVE, DO NOT DELETE IT

interface RootState {
  homePage?: HomePageState;
  loginPage?: LoginPageState;
  signupPage?: SignupPageState;
  articlePage?: ArticlePageState;
  profilePage?: ProfilePageState;
  postPage?: PostPageState;
  settingsPage?: SettingsPageState;
  // GENERATE NEW REDUCER KEY ABOVE, DO NOT DELETE IT
}
