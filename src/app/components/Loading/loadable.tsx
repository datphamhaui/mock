/*
 *
 * Asynchronously loads the component for Loading
 *
 */
import { lazyLoad } from 'utils/loadable';

export default lazyLoad(() => import('./index'));
