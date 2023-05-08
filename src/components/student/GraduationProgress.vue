<template>
    <div>
        <el-row :gutter="20">
            <span>材料提交进度</span>
            <el-divider></el-divider>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="4">
                <span>初稿上传</span>
                <div class="grid-content bg-purple">
                    <el-progress type="circle" :percentage="percentfd" status="success"></el-progress>
                </div>
                <div v-show="this.percentfd==100" style="margin: 20px 0;"> <el-link :href="this.gradulProcess.firstDraft" target="_blank" type="success">下载初稿</el-link> </div>
            </el-col>
            <el-col :span="4">
                <span>科研材料上传</span>
                <div class="grid-content bg-purple">
                    <el-progress type="circle" :percentage="percentrm" status="success"></el-progress>
                </div>
                <div v-show="this.percentrm==100" style="margin: 20px 0;"> <el-link :href="this.gradulProcess.researchEvaluationMaterial" target="_blank" type="success">下载科研材料证明</el-link> </div>
            </el-col>
            <el-col :span="4">
                <span>预审表上传</span>
                <div class="grid-content bg-purple">

                    <el-progress type="circle" :percentage="percentpf" status="success"></el-progress>
                </div>
                <div v-show="this.percentpf==100" style="margin: 20px 0;"> <el-link :href="this.gradulProcess.preliminaryReviewForm" target="_blank" type="success">下载预审表</el-link> </div>
            </el-col>
            <el-col :span="4">
                <span>初稿导师已确认</span>
                <div class="grid-content bg-purple">

                    <el-progress type="circle" :percentage="percentcffd" status="success"></el-progress>
                </div>
            </el-col>
            <el-col :span="4">
                <span>科研材料导师已确认</span>
                <div class="grid-content bg-purple">

                    <el-progress type="circle" :percentage="percentcfrm" status="success"></el-progress>
                </div>
            </el-col>
            <el-col :span="4">
                <span>预审表导师已确认</span>
                <div class="grid-content bg-purple">

                    <el-progress type="circle" :percentage="percentcfpf" status="success"></el-progress>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <span>申请学位</span>
            <el-divider></el-divider>
            <span>现在申请硕士学位：</span>
            <el-button type="danger" @click="Applydgree">申请学位</el-button>
        </el-row>
    </div>
</template>

<script>
import { GetGraduationProgress, ApplyDgree } from '../../api/api.js'
export default {
    data() {
        return {
            // 上传文件的列表
            percentfd: 0,
            percentrm: 0,
            percentpf: 0,
            percentcffd: 0,
            percentcfrm: 0,
            percentcfpf: 0,
            stus: "success",
            gradulProcess: {}
        }
    },
    mounted() {

    },
    created() {

        this.Process()

    },
    methods: {
        Process() {
            GetGraduationProgress().then(res => {
                this.gradulProcess = res.data.result
                //console.log(this.gradulProcess)
                //console.log(res)
                if (this.gradulProcess.firstDraft != "") {
                    this.percentfd = 100
                }
                if (this.gradulProcess.preliminaryReviewForm != "") {
                    this.percentpf = 100
                }
                if (this.gradulProcess.researchEvaluationMaterial != "") {
                    this.percentrm = 100
                }
                if (this.gradulProcess.isFirstDraftConfirmed != "") {
                    this.percentcffd = 100
                }
                if (this.gradulProcess.isPreliminaryReviewFormConfirmed != "") {
                    this.percentcfpf = 100
                }
                if (this.gradulProcess.isResearchEvaluationMaterialConfirmed != "") {
                    this.percentcfrm = 100
                }
            })
        },
        Applydgree() {
            ApplyDgree().then(res => {
                console.log(res)

            })
        }
    }


}

</script>