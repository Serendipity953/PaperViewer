<template>
    <div>
        <el-upload class="upload-demo" drag action="#" :multiple="false" :show-file-list="true" :auto-upload="false" ref="uploadRef"
            :http-request="uploadHttpRequest" :file-list="fileList" :on-change="handleUploadChange"
            :before-upload="beforeUpload">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <template #tip>
                <div class="el-upload__tip">
                    注：上传格式为pdf或doc文件
                </div>
            </template>
        </el-upload>
        <el-button type="primary" @click="Upload">上传<i class="el-icon-upload el-icon--right"></i></el-button>
    </div>
</template>

<script>
import { UploadResearchMaterial } from '../../api/api.js'
export default {
    data() {
        return {
            // 上传文件的列表
            fileList: [],
        }
    },
    methods: {
        beforeUpload(file) {
            const fileType = file.name.substring(file.name.lastIndexOf('.'))
            if (fileType.toLowerCase() != '.pdf' && fileType.toLowerCase() != '.doc') {
                this.$message.error('文件必须为.pdf或.doc类型')
                this.fileList = []
                return false
            }
        },
        // 覆盖element的默认上传文件
        uploadHttpRequest(params) {
            const formData = new FormData();
            formData.append("source", this.fileList[0].raw);
            UploadResearchMaterial(formData).then(res => {
                console.log("res", res);
                params.onSuccess(); //成功icon
                this.$message({
                    message: "上传成功！",
                    type: "success"
                });
            }).catch(r => {
                this.$message.error("上传失败！");
                throw Error(r);
            });
        },
        // 限制文件上传的个数只有一个，获取上传列表的最后一个
        handleUploadChange(file, fileList) {
            if (fileList.length > 0) {
                this.fileList = [fileList[fileList.length - 1]] // 这一步，是 展示最后一次选择的文件
            }
        },
        Upload() {
            if (this.fileList.length <= 0) {
                this.$message({
                    message: "请先选择文件！",
                    type: "error"
                });
            }
            this.$refs.uploadRef.submit(); //触发自定义上传

        }
    }


}

</script>


<style lang="scss" scoped>
.el-list-enter-active,
.el-list-leave-active {
    -webkit-transition: all 1s;
    -o-transition: all 1s;
    transition: all 1s;
}
</style>
