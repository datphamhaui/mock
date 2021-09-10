/*
 *
 * Asynchronously loads the component for SignupPage
 *
 */
import { lazyLoad } from 'utils/loadable';

export default lazyLoad(() => import('./index'));
