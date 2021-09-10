/*
 *
 * Asynchronously loads the component for ArticlePage
 *
 */
import { lazyLoad } from 'utils/loadable';

export default lazyLoad(() => import('./index'));
