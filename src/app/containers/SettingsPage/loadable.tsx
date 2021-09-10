/*
 *
 * Asynchronously loads the component for SettingsPage
 *
 */
import { lazyLoad } from 'utils/loadable';

export default lazyLoad(() => import('./index'));
