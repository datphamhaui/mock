/*
 *
 * Asynchronously loads the component for Pagination
 *
 */
import { lazyLoad } from 'utils/loadable';

export default lazyLoad(() => import('./index'));
