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
        title: 'dashboard.widgets.gen-qrcode.title',
        description: 'dashboard.widgets.gen-qrcode.description',
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
                        message: 'dashboard.widgets.gen-qrcode.prompts.from',
                        placeholder: 'dashboard.widgets.run-task.prompts.needless',
                        validate: input => !!input
                    },
                    {
                        name: 'page',
                        type: 'input',
                        message: 'dashboard.widgets.gen-qrcode.prompts.page',
                        placeholder: 'dashboard.widgets.run-task.prompts.needless',
                        validate: input => !!input
                    },
                    {
                        name: 'type',
                        type: 'input',
                        message: 'dashboard.widgets.gen-qrcode.prompts.type',
                        placeholder: 'dashboard.widgets.run-task.prompts.needless',
                        validate: input => !!input
                    },
                    {
                        name: 'extra',
                        type: 'input',
                        message: 'dashboard.widgets.gen-qrcode.prompts.extra',
                        placeholder: 'dashboard.widgets.run-task.prompts.needless',
                        validate: input => !!input
                    }
                ]
            };
        }
    });

    // Compress-image 暂时隐藏
    api.registerWidget({
        id: 'san.widgets.compress-image',
        title: 'dashboard.widgets.compress-image.title',
        description: 'dashboard.widgets.compress-image.description',
        icon: 'file-image',
        component: 'san.widgets.components.compress-image',
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


    api.onAction('san.widgets.actions.compress-image', async params => {
        let result = [];
        return result;
    });
};
