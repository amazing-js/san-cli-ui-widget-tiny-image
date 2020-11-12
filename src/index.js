/**
 * @file addon-widgets registry
 * @author zttonly
*/

import TinyImage from './components/tiny-image';
import locales from './locales.json';

/* global ClientAddonApi */
if (window.ClientAddonApi) {
    ClientAddonApi.addLocales(locales);
    ClientAddonApi.defineComponent('san.widgets.components.tiny-image', TinyImage);
}
