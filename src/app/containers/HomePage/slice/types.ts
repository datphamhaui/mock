/*
 *
 * HomePage State
 *
 */
export interface HomePageState {
  articles: Article[];
  articlesCount: number;
  tags: string[];
  loading: boolean;
  success: boolean;
  failures: boolean;
}
