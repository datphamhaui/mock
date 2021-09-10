/*
 *
 * Asynchronously loads the component for AuthStorage
 *
 */
import { lazyLoad } from 'utils/loadable';

export default lazyLoad(() => import('./index'));
