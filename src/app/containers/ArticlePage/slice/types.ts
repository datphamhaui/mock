/*
 *
 * ArticlePage State
 *
 */
export interface ArticlePageState {
  article: Article;
  comments: Comment[];
  loading: boolean;
  success: boolean;
  failures: boolean;
  removeSuccess: boolean;
}
