/*
 *
 * Asynchronously loads the component for ProfilePage
 *
 */
import { lazyLoad } from 'utils/loadable';

export default lazyLoad(() => import('./index'));
