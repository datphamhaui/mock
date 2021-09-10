/*
 *
 * SettingsPage State
 *
 */
export interface SettingsPageState {
  data: AuthStorage | undefined;
  loading: boolean;
  success: boolean;
  failures: boolean;
}
