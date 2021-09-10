/*
 *
 * Asynchronously loads the component for LoginPage
 *
 */
import { lazyLoad } from 'utils/loadable';

export default lazyLoad(() => import('./index'));
