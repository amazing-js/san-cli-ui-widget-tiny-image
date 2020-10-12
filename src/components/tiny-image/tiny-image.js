/**
 * @file tiny-image 压缩图片组件
 * @author zttonly
 */

import './tiny-image.less';

export default {
    template: /* html */`
        <div class="tiny-image">
            <div class="upload"
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
                <div class="upload-text">
                    <p>{{$t('san-cli-plugin-tools.tiny-image.upload')}}</p>
                    <p class="small">{{$t('san-cli-plugin-tools.tiny-image.limit')}}</p>
                </div>
            </div>
            <div class="result">
                <s-alert s-if="error" message="{{errorTip}}" type="error"/>
                <div s-elif="fileList.length <= 0" class="empty">
                    <s-icon type="file" style="font-size: 32px"/>
                    <p>{{$t('san-cli-plugin-tools.tiny-image.empty')}}</p>
                </div>
                <div s-else class="item" s-for="item in fileList">
                    <div class="main">
                        <span class="name">{{item.name}} </span>
                        <a href="{{item.link}}" download="{{item.name}}">
                            dowload
                        </a>
                    </div>
                    <div class="des">
                        <span class="size">{{item.before}}KB -> {{item.after}}KB</span>
                        {{item.release}}
                    </div>
                </div>
            </div>
        </div>
    `,
    computed: {
        quality() {
            let quality = this.data.get('data.config.quality');
            return quality > 0 && quality <= 1 ? quality : 0.8;
        }
    },
    initData() {
        return {
            directory: false,
            fileList: [],
            error: '',
            errorTip: '',
            loading: false
        };
    },
    attached() {
        this.addAction();
        // 防止locales更新过慢，主动set
        this.dispatch('Widget:title', this.$t(this.data.get('data.definition.title')));
    },
    addAction() {
        this.dispatch('Widget:addHeaderAction', {
            id: 'reload',
            icon: 'reload',
            disabled: this.data.get('loading'),
            onCalled: () => this.clearFlieList()
        });
    },
    clearFlieList() {
        this.data.set('fileList', []);
        this.reset();
    },
    reset() {
        const fileInput = this.ref('fileInput');
        fileInput.value = null;
        this.data.set('loading', false);
        this.data.set('error', false);
        this.data.set('errorTip', '');
    },
    showErrorTip(tip) {
        this.data.set('loading', false);
        this.data.set('error', true);
        this.data.set('errorTip', tip);
    },
    // 压缩图片
    tiny(file, success, error) {
        // 细节待补充
        if (file.size > 1024 * 1024 * 5) {
            this.showErrorTip('图片大小不能超过 5MB!');
            return false;
        }
        this.data.set('loading', true);
        const name = file.name; // 文件名
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = e => {
            const src = e.target.result;

            const img = new Image();
            img.src = src;
            img.onload = e => {
                const w = img.width;
                const h = img.height;
                const quality = this.data.get('quality'); // 默认图片质量为0.92
                // 生成canvas
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                // 创建属性节点
                const anw = document.createAttribute('width');
                anw.nodeValue = w;
                const anh = document.createAttribute('height');
                anh.nodeValue = h;
                canvas.setAttributeNode(anw);
                canvas.setAttributeNode(anh);

                // 铺底色 PNG转JPEG时透明区域会变黑色
                ctx.fillStyle = '#fff';
                ctx.fillRect(0, 0, w, h);

                ctx.drawImage(img, 0, 0, w, h);
                // quality值越小，所绘制出的图像越模糊
                const base64 = canvas.toDataURL('image/jpeg', quality); // 图片格式jpeg或webp可以选0-1质量区间

                this.data.set('loading', false);
                const originSize = (src.length / 1024).toFixed(2);
                const curSize = (base64.length / 1024).toFixed(2);
                this.data.push('fileList', {
                    before: originSize,
                    after: curSize,
                    release: ((curSize - originSize) / originSize * 100).toFixed(2) + '%',
                    link: base64,
                    name
                });
            };
            img.onerror = e => {
                this.showErrorTip('压缩错误，请重试');
            };
        };
        reader.onerror = e => {
            this.showErrorTip('压缩错误，请重试！');
        };
    },
    handleChange(e) {
        const files = e.target.files;
        Array.prototype.slice.call(files).forEach(file => this.tiny(file));
    },
    handleClick(e) {
        const el = this.ref('fileInput');
        el && el.click();
        this.reset();
    },
    handleKeyDown(e) {
        if (e.key === 'Enter') {
            const el = this.ref('fileInput');
            el && el.click();
        }
    },
    handleFileDrop(e) {
        e.preventDefault();

        if (e.type === 'dragover') {
            return;
        }
        Array.prototype.slice.call(e.dataTransfer.files).filter(
            file => this.tiny(file)
        );
    }
};
