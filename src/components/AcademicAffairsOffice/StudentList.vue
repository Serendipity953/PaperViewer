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
                    <el-button @click="handleClick(scope.row)" type="text" size="small">成绩</el-button>
                    <el-button @click="Confirm(scope.row)" type="text" size="small">学位确认</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination layout="prev, pager, next" :total="50" @prev-click="prevfun" @next-click="nextfun"
            @current-change="currentchange">
        </el-pagination>

        <el-dialog title="成绩管理" :visible.sync="dialogVisible" width="60%" center>
            <div>
                <el-form ref="form" :model="form" label-width="120px">
                    <el-form-item label="盲审成绩">
                        <div v-if="this.currentstudent.blindScore == -1">
                            <div>
                                <el-input placeholder="请输入该生盲审成绩" :disabled="false" type="textarea" autosize
                                    v-model="form.blindScore"></el-input>
                            </div>
                            <div>
                                <el-button class="scorebutton" type="primary" icon="el-icon-check" circle
                                    @click="check1"></el-button>
                            </div>
                        </div>
                        <div v-else>
                            <el-input :placeholder="this.currentstudent.blindScore" :disabled="true" type="textarea"
                                autosize></el-input>
                        </div>
                    </el-form-item>
                    <el-form-item label="答辩成绩">
                        <div v-if="this.currentstudent.defenseScore == -1">
                            <el-input placeholder="请输入该生答辩成绩" :disabled="false" type="textarea" autosize
                                v-model="form.defenseScore"></el-input>
                            <el-button class="scorebutton" type="primary" icon="el-icon-check" circle
                                @click="check2"></el-button>
                        </div>
                        <div v-else>
                            <el-input :placeholder=this.currentstudent.defenseScore :disabled="true" type="textarea"
                                autosize></el-input>
                        </div>



                    </el-form-item>


                </el-form>
            </div>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false, currentstudent = {}">返回</el-button>

            </span>
        </el-dialog>
    </div>
</template>

<script>
import { MessageBox } from 'element-ui';
import { GetAllStudents, DegreeConfirm, UploaDefenseScore, UploaBlindScore } from '../../api/api.js';
export default {
    data() {
        return {
            currentstudent: {},
            tableData: [],
            Term: [{}],
            dialogVisible: false,
            form: { blindScore: 0, defenseScore: 0 },
            studentComment: new Array(),
            supervisorComment: new Array(),
        }
    },
    created() {
        this.loading(0);
    },
    methods: {
        Confirm(row) {
            if (row.applyDegree == '已申请') {
                var parm = { degreeConfirmed: true, identityNumber: row.identityNumber }
                console.log(parm)
                DegreeConfirm(parm).then(res => {
                    if (res.data.code == 0) {
                        console.log("该学生学位已确认")
                        MessageBox("你已经成功确认该生学位申请")
                    }
                })
            }
            else {
                this.$message({
                    type: 'error',
                    message: '确认失败，该学生暂未申请学位！'
                });
            }

        },
        handleClick(row) {
            this.dialogVisible = true;
            this.currentstudent = row
            this.form.blindScore = row.blindScore
            this.form.defenseScore = row.defenseScore
        },
        check1() {
            var blind = { score: this.form.blindScore * 1, identityNumber: this.currentstudent.identityNumber }
            UploaBlindScore(blind).then(res => {
                if (res.data.code == 0) {
                    console.log("盲审成绩已上传")
                    MessageBox({ message: "盲审成绩上传成功", type: 'success' })
                    this.$router.go(0)
                }
            })
        },
        check2() {
            var defense = { score: this.form.blindScore * 1, identityNumber: this.currentstudent.identityNumber }
            UploaDefenseScore(defense).then(res => {
                if (res.data.code == 0) {
                    console.log("答辩成绩已上传")
                    MessageBox({ message: "答辩成绩上传成功", type: 'success' })
                    this.$router.go(0)
                }
            })

        },
        prevfun(value) {
            //value拿到的当前的页码，点击上一页触发该函数
            this.loading(value)
        },
        nextfun(value) {
            //value拿到页码，点击下一页触发该函数
            this.loading(value)
        },
        currentchange(value) {
            //页码发生变化会触发，这个用来触发点击页码时触发的。
            this.loading(value)
        },
        loading(curpage) {
            //console.log("yes")
            var parm = { page: curpage, size: 5, identityNumber: "" }
            GetAllStudents(parm).then(res => {
                console.log(res)
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
<style lang="scss">
.scorebutton {
    margin: 0 auto;
}
</style>