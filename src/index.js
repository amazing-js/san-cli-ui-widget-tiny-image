/**
 * @file addon-widgets registry
 * @author zttonly
*/

import GenQrcode from './components/gen-qrcode/gen-qrcode';
import TinyImage from './components/tiny-image/tiny-image';
import locales from './locales.json';

/* global ClientAddonApi */
if (window.ClientAddonApi) {
    ClientAddonApi.addLocales(locales);
    ClientAddonApi.defineComponent('san.widgets.components.gen-qrcode', GenQrcode);
    ClientAddonApi.defineComponent('san.widgets.components.tiny-image', TinyImage);
}
