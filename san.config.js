/**
 * @file san config
 * @author zttonly <zttonly@gmail.com>
 *
 */
const clientAddonConfig = require('san-cli-ui/san.addon.config');

module.exports = {
    ...clientAddonConfig({
        id: 'san.webpack.client-addon.widget.tiny-image',
        port: 8891
    })
};
