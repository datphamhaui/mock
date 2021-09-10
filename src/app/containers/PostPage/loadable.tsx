/*
 *
 * Asynchronously loads the component for PostPage
 *
 */
import { lazyLoad } from 'utils/loadable';

export default lazyLoad(() => import('./index'));
