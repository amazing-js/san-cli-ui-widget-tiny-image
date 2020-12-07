/**
 * @file widgets tiny image
 * @author zttonly
 */

module.exports = api => {
    if (process.env.SAN_CLI_UI_DEV) {
        api.registerAddon({
            id: 'san.widgets.client-addon.dev1',
            url: 'http://localhost:8891/index.js'
        });
    }
    else {
        api.registerAddon({
            id: 'san.widgets.tiny-image.client-addon',
            path: 'san-cli-ui-widget-tiny-image/dist'
        });
    }

    // tiny-image
    api.registerWidget({
        id: 'san.widgets.tiny-image',
        title: 'san-cli-ui-widget-tiny-image.title',
        description: 'san-cli-ui-widget-tiny-image.description',
        icon: 'file-image',
        component: 'san.widgets.components.tiny-image',
        minWidth: 2,
        minHeight: 2,
        maxWidth: 2,
        maxHeight: 2,
        maxCount: 1,
        // 增加压缩选项配置
        defaultConfig: () => ({
            quality: 0.8
        }),
        async onConfigOpen() {
            return {
                prompts: [
                    {
                        name: 'quality',
                        type: 'input',
                        message: 'san-cli-ui-widget-tiny-image.prompts.quality',
                        validate: input => !!input
                    }
                ]
            };
        }
    });

};
