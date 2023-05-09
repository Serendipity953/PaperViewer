<template>
    <el-row :gutter="30">
        <el-col :span="8">
            <el-card shadow="hover">
                <h1>初稿</h1>
                <el-divider>初稿上传</el-divider>
                <div class="grid-content bg-purple" v-if="!this.gradulProcess.firstDraft">
                    <div>
                        <el-upload class="upload-demo" drag action="#" :multiple="false" :show-file-list="true"
                            :auto-upload="false" ref="uploadRefFD" :http-request="uploadfirstDraft" :file-list="fileListFD"
                            :on-change="handleUploadChangeFD" :before-upload="beforeUploadFD">
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                            <template #tip>
                                <div class="el-upload__tip">
                                    注：上传格式为pdf或doc文件
                                </div>
                            </template>
                        </el-upload>
                        <div class="uplodbutton">
                            <el-button type="primary" @click="UploadFD">上传<i
                                    class="el-icon-upload el-icon--right"></i></el-button>
                        </div>

                    </div>
                </div>
                <el-tag type="warning" v-if="!this.gradulProcess.firstDraft">初稿未上传</el-tag>
                <el-tag type="success" v-else>初稿已上传</el-tag>
                <div style="margin: 40px 0;">
                </div>
                <el-divider>初稿评价</el-divider>
                <div class="supervisorComment">
                    <span><i class="el-icon-s-comment el-icon--left" style="margin: 20px 0;"></i>导师评价</span>
                    <el-input placeholder="导师暂未评价" :disabled="true" :autosize="{ minRows: 4, maxRows: 8 }" type="textarea"
                        v-if="!this.comment.supervisorComment">
                    </el-input>
                    <el-input :placeholder=this.comment.supervisorComment :disabled="true"
                        :autosize="{ minRows: 4, maxRows: 8 }" type="textarea" v-else></el-input>
                </div>
                <div class="studentComment">
                    <span><i class="el-icon-edit-outline el-icon--left" style="margin: 20px 0;"></i>学生自评</span>
                    <div v-if="!this.comment.studentComment">
                        <el-input placeholder="请完成自评" v-model="selfcomment" :autosize="{ minRows: 4, maxRows: 8 }"
                            type="textarea"></el-input>
                        <div style="margin: 40px 0;">
                        </div>
                        <el-button type="primary" icon="el-icon-edit" circle @click="cmtsubmit"></el-button>
                    </div>
                    <div v-else>
                        <el-input :placeholder=this.comment.studentComment :disabled="true"
                            :autosize="{ minRows: 4, maxRows: 8 }" type="textarea"></el-input>
                    </div>

                </div>


            </el-card>
        </el-col>

        <el-col :span="8">
            <el-card shadow="hover">
                <el-divider>科研材料</el-divider>
                <div class="grid-content bg-purple" v-if="!this.gradulProcess.researchEvaluationMaterial">
                    <div>
                        <el-upload class="upload-demo" drag action="#" :multiple="false" :show-file-list="true"
                            :auto-upload="false" ref="uploadRefRM" :http-request="uploadresearchMaterial"
                            :file-list="fileListRM" :on-change="handleUploadChangeRM" :before-upload="beforeUploadRM">
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                            <template #tip>
                                <div class="el-upload__tip">
                                    注：上传格式为pdf或doc文件
                                </div>
                            </template>
                        </el-upload>
                        <div class="uplodbutton">
                            <el-button type="primary" @click="UploadRM">上传<i
                                    class="el-icon-upload el-icon--right"></i></el-button>
                        </div>

                    </div>
                </div>
                <el-tag type="warning" v-if="!this.gradulProcess.researchEvaluationMaterial">科研材料未上传</el-tag>
                <el-tag type="success" v-else>科研材料已上传</el-tag>
            </el-card>

        </el-col>
        <el-col :span="8">
            <el-card shadow="hover">
                <el-divider>预审表</el-divider>
                <div class="grid-content bg-purple" v-if="!this.gradulProcess.preliminaryReviewForm">
                    <div>
                        <el-upload class="upload-demo" drag action="#" :multiple="false" :show-file-list="true"
                            :auto-upload="false" ref="uploadRefPF" :http-request="uploadreviewForm" :file-list="fileListPF"
                            :on-change="handleUploadChangePF" :before-upload="beforeUploadPF">
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                            <template #tip>
                                <div class="el-upload__tip">
                                    注：上传格式为pdf或doc文件
                                </div>
                            </template>
                        </el-upload>
                        <div class="uplodbutton">
                            <el-button type="primary" @click="UploadPF">上传<i
                                    class="el-icon-upload el-icon--right"></i></el-button>

                        </div>

                    </div>
                </div>
                <el-tag type="warning" v-if="!this.gradulProcess.preliminaryReviewForm">预审表未上传</el-tag>
                <el-tag type="success" v-else>预审表已上传</el-tag>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
//import QueryString from 'qs';
import { UploadReviewForm, UploadResearchMaterial, UploadFirstDraft, GetGraduationProgress, GetComment, SelfComment } from '../../api/api.js'
export default {
    data() {
        return {
            // 上传文件的列表
            fileListPF: [],
            fileListRM: [],
            fileListFD: [],
            //文件上传信息
            gradulProcess: {},
            comment: {},
            selfcomment: ""
        }
    },
    created() {

        this.Process()

    },
    methods: {
        Process() {
            GetGraduationProgress().then(res => {
                this.gradulProcess = res.data.result
                //console.log(this.gradulProcess)
                //console.log(this.gradulProcess)
            });
            GetComment().then(res => {
                this.comment = res.data.result
                //console.log(this.comment)

            })
        },
        cmtsubmit() {

            var parm = { studentComment: this.selfcomment }
            console.log(parm)
            SelfComment(parm).then(res => {
                if (res.data.code === 0) {
                    alert('修改自评成功');
                    this.$router.go(0)
                }
                else {
                    alert('修改自评失败');
                }

            })
        },
        beforeUploadPF(file) {
            const fileType = file.name.substring(file.name.lastIndexOf('.'))
            if (fileType.toLowerCase() != '.pdf' && fileType.toLowerCase() != '.doc') {
                this.$message.error('文件必须为.pdf或.doc类型')
                this.fileListPF = []
                return false
            }
        },
        beforeUploadRM(file) {
            const fileType = file.name.substring(file.name.lastIndexOf('.'))
            if (fileType.toLowerCase() != '.pdf' && fileType.toLowerCase() != '.doc') {
                this.$message.error('文件必须为.pdf或.doc类型')
                this.fileListRM = []
                return false
            }
        },
        beforeUploadFD(file) {
            const fileType = file.name.substring(file.name.lastIndexOf('.'))
            if (fileType.toLowerCase() != '.pdf' && fileType.toLowerCase() != '.doc') {
                this.$message.error('文件必须为.pdf或.doc类型')
                this.fileListFD = []
                return false
            }
        },
        // 覆盖element的默认上传文件
        uploadreviewForm(params) {
            const formData = new FormData();
            formData.append("source", this.fileListPF[0].raw);
            UploadReviewForm(formData).then(res => {
                console.log("res", res);
                params.onSuccess(); //成功icon
                this.$message({
                    message: "上传成功！",
                    type: "success"
                });
                this.$router.go(0)
            }).catch(r => {
                this.$message.error("上传失败！");
                throw Error(r);
            });
        },
        uploadresearchMaterial(params) {
            const formData = new FormData();
            formData.append("source", this.fileListRM[0].raw);
            UploadResearchMaterial(formData).then(res => {
                console.log("RMres", res);
                params.onSuccess(); //成功icon
                this.$message({
                    message: "上传成功！",
                    type: "success"
                });
                this.$router.go(0)
            }).catch(r => {
                this.$message.error("上传失败！");
                throw Error(r);
            });
        },
        uploadfirstDraft(params) {
            const formData = new FormData();
            formData.append("source", this.fileListFD[0].raw);
            UploadFirstDraft(formData).then(res => {
                console.log("res", res);
                params.onSuccess(); //成功icon
                this.$message({
                    message: "上传成功！",
                    type: "success"
                });
                this.$router.go(0)
            }).catch(r => {
                this.$message.error("上传失败！");
                throw Error(r);
            });
        },
        // 限制文件上传的个数只有一个，获取上传列表的最后一个
        handleUploadChangePF(file, fileList) {
            if (fileList.length > 0) {
                this.fileListPF = [fileList[fileList.length - 1]] // 这一步，是 展示最后一次选择的文件
            }
        },
        handleUploadChangeRM(file, fileList) {
            if (fileList.length > 0) {
                this.fileListRM = [fileList[fileList.length - 1]] // 这一步，是 展示最后一次选择的文件
            }
        },
        handleUploadChangeFD(file, fileList) {
            if (fileList.length > 0) {
                this.fileListFD = [fileList[fileList.length - 1]] // 这一步，是 展示最后一次选择的文件
            }
        },
        UploadPF() {
            if (this.fileListPF.length <= 0) {
                this.$message({
                    message: "请先选择文件！",
                    type: "error"
                });
            }
            this.$refs.uploadRefPF.submit(); //触发自定义上传

        },
        UploadRM() {
            if (this.fileListRM.length <= 0) {
                this.$message({
                    message: "请先选择文件！",
                    type: "error"
                });
            }
            this.$refs.uploadRefRM.submit(); //触发自定义上传

        },
        UploadFD() {
            if (this.fileListFD.length <= 0) {
                this.$message({
                    message: "请先选择文件！",
                    type: "error"
                });
            }
            this.$refs.uploadRefFD.submit(); //触发自定义上传

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

.el-row {
    margin-bottom: 20px;

    &:last-child {
        margin-bottom: 0;
    }
}

.el-col {
    border-radius: 4px;
}

.bg-purple-dark {
    background: #99a9bf;
}

.bg-purple {
    background: #f6f7f8;
}

.bg-purple-light {
    background: #e5e9f2;
}

.grid-content {
    border-radius: 4px;
    height: 300px;
    margin-bottom: 30px;
}

.row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
}

.el-card {
    height: 700px
}

.el-upload__tip {
    margin-top: 20px;
    margin-bottom: 20px;
}

.uplodbutton {
    margin-bottom: 20px;
}

.supervisorComment {
    height: 200px;
}

.studentComment {
    height: 200px;
}
</style>
