/**
 *
 * Asynchronously loads the component for Provider
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
