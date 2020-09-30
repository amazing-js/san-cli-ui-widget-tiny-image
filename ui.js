/**
 * @file widgets-tools
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
            id: 'san.widgets.client-addon',
            path: 'san-cli-plugin-tools/dist'
        });
    }

    api.registerWidget({
        id: 'san.widgets.gen-qrcode',
        title: 'san-cli-plugin-tools.gen-qrcode.title',
        description: 'san-cli-plugin-tools.gen-qrcode.description',
        icon: 'qrcode',
        component: 'san.widgets.components.gen-qrcode',
        minWidth: 2,
        minHeight: 3,
        maxWidth: 2,
        maxHeight: 3,
        maxCount: 1,
        async onConfigOpen() {
            return {
                prompts: [
                    {
                        name: 'from',
                        type: 'input',
                        message: 'san-cli-plugin-tools.gen-qrcode.prompts.from',
                        placeholder: 'san-cli-plugin-tools.gen-qrcode.prompts.needless',
                        validate: input => !!input
                    },
                    {
                        name: 'page',
                        type: 'input',
                        message: 'san-cli-plugin-tools.gen-qrcode.prompts.page',
                        placeholder: 'san-cli-plugin-tools.gen-qrcode.prompts.needless',
                        validate: input => !!input
                    },
                    {
                        name: 'type',
                        type: 'input',
                        message: 'san-cli-plugin-tools.gen-qrcode.prompts.type',
                        placeholder: 'san-cli-plugin-tools.gen-qrcode.prompts.needless',
                        validate: input => !!input
                    },
                    {
                        name: 'extra',
                        type: 'input',
                        message: 'san-cli-plugin-tools.gen-qrcode.prompts.extra',
                        placeholder: 'san-cli-plugin-tools.gen-qrcode.prompts.needless',
                        validate: input => !!input
                    }
                ]
            };
        }
    });

    // tiny-image
    api.registerWidget({
        id: 'san.widgets.tiny-image',
        title: 'san-cli-plugin-tools.tiny-image.title',
        description: 'san-cli-plugin-tools.tiny-image.description',
        icon: 'file-image',
        component: 'san.widgets.components.tiny-image',
        minWidth: 2,
        minHeight: 2,
        maxWidth: 2,
        maxHeight: 2,
        maxCount: 1
        // 增加压缩选项配置
        // defaultConfig: () => ({
        //     quality: ''
        // }),
        // async onConfigOpen() {
        //     return {
        //         prompts: [
        //             {
        //                 name: 'quality',
        //                 type: 'input',
        //                 message: 'dashboard.widgets.compress-image.prompts.quality',
        //                 validate: input => !!input
        //             }
        //         ]
        //     };
        // }
    });

};
