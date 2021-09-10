/*
 *
 * ProfilePage State
 *
 */
export interface ProfilePageState {
  articles: Article[];
  articlesCount: number;
  profile: Profile;
  loading: boolean;
  success: boolean;
  failures: boolean;
}
