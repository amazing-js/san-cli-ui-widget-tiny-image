/**
 * @file tiny-image 压缩图片组件
 * @author zttonly
 */

import './tiny-image.less';

export default {
    template: /* html */`
        <div class="tiny-image">
            <s-alert s-if="error" message="{{errorTip}}" type="error"/>
            <div class="san-upload"
                tabIndex="0"
                on-click="handleClick"
                on-keydown="handleKeyDown"
                on-drop="handleFileDrop"
                on-dragover="handleFileDrop"
            >
                <input
                    type="file"
                    s-ref="fileInput"
                    style="display: none;"
                    accept="image/png,image/jpeg,image/gif"
                    directory="{{directory ? 'directory' : null}}"
                    webkitdirectory="{{directory ? 'webkitdirectory' : null}}"
                    multiple="multiple"
                    on-change="handleChange"
                />
                <s-icon type="{{loading ? 'loading' : 'download'}}" style="font-size: 32px"/>
                <div class="san-upload-text">
                    <p>{{$t('san-cli-plugin-tools.tiny-image.upload')}}</p>
                    <p class="small">{{$t('san-cli-plugin-tools.tiny-image.limit')}}</p>
                </div>
            </div>
        </div>
    `,
    computed: {
    },
    initData() {
        return {
            fileList: [],
            error: '',
            errorTip: '',
            loading: false,
            beforeUpload: null,
            customRequest: null
        };
    },
    attached() {
    },
    async compress() {
        // 细节待补充
        try {
            const {results, errors} = await this.$callPluginAction('san.widgets.actions.compress-image', {
                fileList: this.data.get('filterList')
            });
        }
        catch (e) {
        }
    },
    upload(e) {
        console.log(e, this.ref('inputup'));
    },
    handleChange(e) {
        const files = e.target.files;
        this.uploadFiles(files, e);
        this.reset();
    },
    handleClick(e) {
        const openFileDialogOnClick = this.data.get('openFileDialogOnClick');
        if (openFileDialogOnClick) {
            const el = this.ref('fileInput');
            el && el.click();
        }
    },
    handleKeyDown(e) {
        const openFileDialogOnClick = this.data.get('openFileDialogOnClick');
        if (openFileDialogOnClick) {
            if (e.key === 'Enter') {
                const el = this.ref('fileInput');
                el && el.click();
            }
        }
    },
    handleFileDrop(e) {
        e.preventDefault();

        if (e.type === 'dragover') {
            return;
        }

        // if (this.data.get('directory')) {
        //     traverseFileTree(
        //         e.dataTransfer.items,
        //         this.uploadFiles,
        //         innerFile => attrAccept(innerFile, this.data.get('accept')),
        //         e
        //     );
        // }
        // else {
        //     const files = Array.prototype.slice.call(e.dataTransfer.files).filter(
        //         file => attrAccept(file, this.data.get('accept'))
        //     );
        //     this.uploadFiles(files, e);
        // }
    }
};
