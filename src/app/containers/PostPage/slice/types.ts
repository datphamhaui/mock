/*
 *
 * PostPage State
 *
 */
export interface PostPageState {
  article: Article | undefined;
  slugSucceed: string;
  loading: boolean;
  success: boolean;
  failures: boolean;
}
