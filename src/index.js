/**
 * @file addon-widgets registry
 * @author zttonly
*/

import GenQrcode from './components/gen-qrcode/gen-qrcode';
import CompressImage from './components/compress-image/compress-image';


/* global ClientAddonApi */
if (window.ClientAddonApi) {
    ClientAddonApi.defineComponent('san.widgets.components.gen-qrcode', GenQrcode);
    ClientAddonApi.defineComponent('san.widgets.components.compress-image', CompressImage);
}
