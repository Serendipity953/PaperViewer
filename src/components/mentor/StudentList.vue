<template>
    <div>
        <div>
            <el-divider>已绑定学生信息</el-divider>
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
                    <template slot-scope="scope">
                        <div>
                            <i class="el-icon-download" style="margin: 20px auto;"></i>
                            <el-link type="primary" :href="scope.row.firstDraftURL"
                                v-if="scope.row.firstDraftURL != ''">初稿下载</el-link>
                            <el-link type="danger" :href="scope.row.firstDraftURL" v-else>暂未上传</el-link>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="isFirstDraftConfirmed" label="初稿确认" width="150">
                </el-table-column>
                <el-table-column prop="preliminaryReviewFormURL" label="预审表" width="150">
                    <template slot-scope="scope">
                        <div>
                            <i class="el-icon-download" style="margin: 20px auto;"></i>
                            <el-link type="primary" :href="scope.row.preliminaryReviewFormURL"
                                v-if="scope.row.preliminaryReviewFormURL != ''">预审表下载</el-link>
                            <el-link type="danger" :href="scope.row.preliminaryReviewFormURL" v-else>暂未上传</el-link>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="isPreliminaryReviewFormConfirmed" label="预审表确认" width="150">
                </el-table-column>
                <el-table-column prop="researchEvaluationMaterialURL" label="科研材料" width="150">
                    <template slot-scope="scope">
                        <div>
                            <i class="el-icon-download" style="margin: 20px auto;"></i>
                            <el-link type="primary" :href="scope.row.researchEvaluationMaterialURL"
                                v-if="scope.row.researchEvaluationMaterialURL != ''">预审表下载</el-link>
                            <el-link type="danger" :href="scope.row.researchEvaluationMaterialURL" v-else>暂未上传</el-link>
                        </div>
                    </template>
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
                        <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
                        <el-button @click="releaseBind(scope.row)" type="text" size="small">解绑</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div style="margin-bottom: 50px;"></div>
            <el-pagination layout="prev, pager, next" :total=totalpage :page-size=pagesize @prev-click="prevfun"
                @next-click="nextfun" @current-change="currentchange">
            </el-pagination>

            <el-dialog title="初稿评价及文件确认" :visible.sync="dialogVisible" width="60%" center>
                <div>
                    <el-form ref="form" :model="form" label-width="120px">
                        <el-form-item label="学生初稿自评">
                            <el-input placeholder="学生暂未自评" :disabled="true" type="textarea"
                                :autosize="{ minRows: 4, maxRows: 8 }"
                                v-if="this.studentComment[this.currentstudent] == ''"></el-input>
                            <el-input :placeholder=this.form.comment.studentComment :disabled="true" type="textarea"
                                :autosize="{ minRows: 4, maxRows: 8 }" v-else></el-input>
                        </el-form-item>
                        <el-form-item label="导师评价">
                            <el-input placeholder="请完成对该学生初稿评价" :disabled="false" type="textarea"
                                :autosize="{ minRows: 4, maxRows: 8 }"
                                v-if="this.supervisorComment[this.currentstudent] == ''"
                                v-model="form.comment.supervisorComment"></el-input>
                            <el-input :placeholder=this.form.comment.supervisorComment :disabled="true" type="textarea"
                                :autosize="{ minRows: 4, maxRows: 8 }" v-else></el-input>
                        </el-form-item>

                        <el-form-item label="文件确认">
                            <el-checkbox-group v-model="form.confirm">
                                <el-checkbox label="论文初稿" name="type"></el-checkbox>
                                <el-checkbox label="预审表" name="type"></el-checkbox>
                                <el-checkbox label="科研材料" name="type"></el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>

                    </el-form>
                </div>
                
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary"  @click="check">保存</el-button>
                    <el-button @click="quitClick">返回</el-button>

                </span>
            </el-dialog>
        </div>
        <div style="margin-bottom: 50px;"></div>
        <div>
            <el-divider>绑定学生</el-divider>
            <div style="margin: 20px;"></div>
            <el-card class="bindcontainer">
                <el-form class="bindstus" label-width="50px" :model="wantedstudent">
                    <el-form-item label="学号">
                        <el-input v-model="wantedstudent.identityNumber"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名">
                        <el-input v-model="wantedstudent.name"></el-input>
                    </el-form-item>
                    <el-form-item label="学院">
                        <el-input v-model="wantedstudent.college"></el-input>
                    </el-form-item>
                    <el-button @click="Search" type="text" size="small">查找</el-button>
                    <el-button @click="Bind" type="text" size="small">绑定</el-button>
                </el-form>
            </el-card>
        </div>

    </div>
</template>

<script>
import { mentorGetStudents, MentorGetComment, MentorComment, MentorConfirm, StudentBind, GetAllStudents } from '../../api/api.js';
export default {
    data() {
        return {
            currentstudent: "",
            tableData: [],
            Term: [{}],
            dialogVisible: false,
            form: { confirm: ['', '', ''], comment: { studentComment: '', supervisorComment: '' } },
            studentComment: new Array(),
            supervisorComment: new Array(),
            wantedstudent: {
                identityNumber: '',
                name: '',
                college: '',
                supervisorID: '',
                value: false
            },
            totalpage: 0,
            pagesize: 2
        }
    },
    created() {
        this.gettotalpage();
        this.loading(0);
    },
    methods: {
        test() {
            console.log(this.form, this.currentstudent)
        },
        Search() {
            var parm = { page: 0, size: 1, identityNumber: this.wantedstudent.identityNumber }
            GetAllStudents(parm).then(res => {
                if (res.data.code == 0) {
                    console.log(res.data.result.stus[0])
                    this.wantedstudent.identityNumber = res.data.result.stus[0].identityNumber
                    this.wantedstudent.name = res.data.result.stus[0].name
                    this.wantedstudent.college = res.data.result.stus[0].college
                    this.wantedstudent.supervisorID = res.data.result.stus[0].supervisorID
                }
            })
        },
        Bind() {
            this.$confirm('是否确认绑定该学生?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                if (this.wantedstudent.supervisorID != '') {
                    this.$message({
                        type: 'error',
                        message: '绑定失败!该学生已经被绑定！'
                    });
                }
                else {
                    var parm = { bind: true, studentID: this.wantedstudent.identityNumber }
                    StudentBind(parm).then(res => {
                        if (res.data.code == 0) {
                            console.log("该学生已绑定完成")
                            this.$message({
                                type: 'success',
                                message: '绑定成功!'
                            });
                            this.$router.go(0)

                        }
                    })
                }

            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消绑定操作'
                });
            });
        },
        releaseBind(row) {
            this.$confirm('是否确认解绑该学生?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                var parm = { bind: false, studentID: row.identityNumber }
                StudentBind(parm).then(res => {
                    if (res.data.code == 0) {
                        console.log("该学生已解绑完成")
                        this.$message({
                            type: 'success',
                            message: '解绑成功!'
                        });
                        this.$router.go(0)

                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消解绑操作'
                });
            });
        },
        check() {
            console.log("this is from", this.form)
            if (this.supervisorComment[this.currentstudent] == '') {
                var comment = { supervisorComment: this.form.comment.supervisorComment, studentID: this.currentstudent }
                MentorComment(comment).then(res => {
                    if (res.data.code == 0) {
                        console.log("导师评价保存完毕")
                    }
                })
            }

            for (var i = 0; i < this.form.confirm.length; i++) {
                if (this.form.confirm[i] == "论文初稿") {
                    var confirm_0 = { confirmType: 0, studentID: this.currentstudent }
                    MentorConfirm(confirm_0).then(res => {
                        if (res.data.code == 0) {
                            console.log("论文初稿确认完毕")
                        }
                    })
                }

                else if (this.form.confirm[i] == "预审表") {
                    var confirm_1 = { confirmType: 1, studentID: this.currentstudent }
                    MentorConfirm(confirm_1).then(res => {
                        if (res.data.code == 0) {
                            console.log("预审表确认完毕")
                        }
                    })
                }
                else if (this.form.confirm[i] == "科研材料") {
                    var confirm_2 = { confirmType: 2, studentID: this.currentstudent }
                    MentorConfirm(confirm_2).then(res => {
                        if (res.data.code == 0) {
                            console.log("科研材料确认完毕")
                        }
                    })
                }
            }
            this.currentstudent = ""
            this.form = { confirm: [], comment: {} }
            this.dialogVisible = false
            //this.$router.go(0)
        },
        quitClick() {
            this.form = { confirm: [], comment: {} }
            this.dialogVisible = false
            this.currentstudent = ''
        },
        handleClick(row) {
            console.log(row);
            this.dialogVisible = true;
            this.currentstudent = row.identityNumber
            var parm = { identityNumber: row.identityNumber }
            MentorGetComment(parm).then(res => {
                if (res.data.code === 0) {
                    console.log(res)
                    if (res.data.result.identityNumber != row.identityNumber) {

                        alert("系统错误，申请数据与当前学生信息不一致")
                    }
                    this.supervisorComment[this.currentstudent] = res.data.result.supervisorComment
                    this.studentComment[this.currentstudent] = res.data.result.studentComment
                    //console.log(this.studentComment)
                }
            })
            var parm2 = { page: 0, size: 1, identityNumber: row.identityNumber }
            GetAllStudents(parm2).then(res => {
                if (res.data.code === 0) {
                    console.log(res.data.result.stus[0])
                    this.form.confirm[0] = (res.data.result.stus[0].isFirstDraftConfirmed == false) ? '' : "论文初稿"
                    this.form.confirm[1] = (res.data.result.stus[0].isPreliminaryReviewFormConfirmed == false) ? '' : "预审表"
                    this.form.confirm[2] = (res.data.result.stus[0].isResearchEvaluationMaterialConfirmed == false) ? '' : "科研材料"
                    console.log(this.form)
                }
            })



        },
        prevfun(value) {
            //value拿到的当前的页码，点击上一页触发该函数
            this.loading(value - 1)
        },
        nextfun(value) {
            //value拿到页码，点击下一页触发该函数
            this.loading(value - 1)
        },
        currentchange(value) {
            //页码发生变化会触发，这个用来触发点击页码时触发的。
            this.loading(value - 1)
        },
        gettotalpage() {
            var parm = { page: 0, size: 9999, identityNumber: "" }
            mentorGetStudents(parm).then(res => {
                this.totalpage = res.data.result.stus.length
            })
        },
        loading(curpage) {
            //console.log("yes")
            var parm = { page: curpage, size: this.pagesize, identityNumber: "" }
            mentorGetStudents(parm).then(res => {
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

<style lang="scss">
.bindcontainer{
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    .bindstus {
    width: 500px;
}
}
.el-dialog{

}
</style>