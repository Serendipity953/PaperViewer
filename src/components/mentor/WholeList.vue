<template>
    <div>
        <el-table :data="Term" border style="width: 100%">
            <el-table-column fixed prop="identityNumber" label="学号" width="150">
            </el-table-column>
            <el-table-column fixed prop="name" label="姓名" width="150">
            </el-table-column>
            <el-table-column prop="class" label="班级" width="150">
            </el-table-column>
            <el-table-column prop="length" label="学制" width="150">
            </el-table-column>
            <el-table-column prop="graduateTime" label="毕业日期" width="150">
            </el-table-column>
            <el-table-column prop="degreeType" label="学位类型" width="150">
            </el-table-column>
            <el-table-column prop="firstDraftURL" label="初稿" width="150">
            </el-table-column>
            <el-table-column prop="isFirstDraftConfirmed" label="初稿确认" width="150">
            </el-table-column>
            <el-table-column prop="preliminaryReviewFormURL" label="预审表" width="150">
            </el-table-column>
            <el-table-column prop="isPreliminaryReviewFormConfirmed" label="预审表确认" width="150">
            </el-table-column>
            <el-table-column prop="researchEvaluationMaterialURL" label="科研材料" width="150">
            </el-table-column>
            <el-table-column prop="isResearchEvaluationMaterialConfirmed" label="科研材料确认" width="150">
            </el-table-column>
            <el-table-column prop="blindScore" label="盲审成绩" width="150">
            </el-table-column>
            <el-table-column prop="defenseScore" label="答辩成绩" width="150">
            </el-table-column>
            <el-table-column prop="applyDegree" label="申请学位" width="150">
            </el-table-column>
            <el-table-column prop="degreeConfirmed" label="学位确认" width="150">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <el-button @click="Bind(scope.row)" type="text" size="small">绑定</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination layout="prev, pager, next" :total="50">
        </el-pagination>
    </div>
</template>

<script>
import { MessageBox } from 'element-ui';
import { GetAllStudents,StudentBind } from '../../api/api.js';
export default {
    data() {
        return {
            currentstudent: "",
            tableData: [],
            Term: [{}],
            dialogVisible: false,
            form: { confirm: [], comment: "" },
            studentComment: new Array(),
            supervisorComment: new Array(),
        }
    },
    created() {
        this.loading();
    },
    methods: {
        Bind(row){
            var parm={bind:true,studentID:row.identityNumber}
            StudentBind(parm).then(res=>{
                if(res.data.code==0){
                    console.log("该学生绑定")
                    MessageBox("你已经成功绑定该学生")
                }
            })
        },
        loading() {
            //console.log("yes")
            var parm = { page: 0, size: 10, identityNumber: "" }
            GetAllStudents(parm).then(res => {
                //console.log(res)
                if (res.data.code === 0) {
                    this.tableData = res.data.result.stus
                    this.Term = this.tableData
                    for (var i = 0; i < this.tableData.length; i++) {
                        //console.log(this.Term[i])
                        //this.Term[i].graduateTime = timestampToDate(this.Term[i].graduateTime)
                        this.Term[i].degreeType = (this.Term[i].degreeType == 0) ? "专硕" : "学硕"
                        this.Term[i].status = (this.Term[i].status == 0) ? "在读" : "注销"
                        this.Term[i].isFirstDraftConfirmed = (this.Term[i].isFirstDraftConfirmed == false) ? "否" : "已确认"
                        this.Term[i].isPreliminaryReviewFormConfirmed = (this.Term[i].isPreliminaryReviewFormConfirmed == false) ? "否" : "已确认"
                        this.Term[i].isResearchEvaluationMaterialConfirmed = (this.Term[i].isResearchEvaluationMaterialConfirmed == false) ? "否" : "已确认"
                        this.Term[i].applyDegree = (this.Term[i].applyDegree == false) ? "未申请" : "已申请"
                        this.Term[i].degreeConfirmed = (this.Term[i].degreeConfirmed == false) ? "未确认" : "已确认"
                    }


                }
                else {
                    alert('请求学生列表失败')
                }
            })
        }
    },

}
</script>
<style lang="scss"></style>