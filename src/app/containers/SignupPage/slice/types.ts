/*
 *
 * SignupPage State
 *
 */
export interface SignupPageState {
  data: AuthStorage | undefined;
  loading: boolean;
  success: boolean;
  failures: boolean;
}
