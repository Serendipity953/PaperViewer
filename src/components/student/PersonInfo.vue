<template>
  <div>
    <el-descriptions class="margin-top" title="毕业生信息" :column="3" :size="size">
      <template slot="extra">
        <el-button type="primary" size="small" @click="dialogFormVisible = true">修改信息</el-button>
      </template>
      <el-descriptions-item label="学号">{{ PersonInfo.identityNumber }}</el-descriptions-item>
      <el-descriptions-item label="学院">{{ PersonInfo.college }}</el-descriptions-item>
      <el-descriptions-item label="班级">{{ PersonInfo.class }}</el-descriptions-item>
      <el-descriptions-item label="学制">{{ PersonInfo.length }}年制</el-descriptions-item>
      <el-descriptions-item label="毕业时间">{{ Term.graduateTime }}</el-descriptions-item>
      <el-descriptions-item label="学位类型">{{ Term.degreeType }}</el-descriptions-item>
      <el-descriptions-item label="学籍状态">{{ Term.status }}</el-descriptions-item>
      <el-descriptions-item label="导师姓名">{{ PersonInfo.supervisorName }}</el-descriptions-item>
      <el-descriptions-item label="确认个人信息">
        <el-tag size="small">{{ Term.isConfirmed }}</el-tag>
      </el-descriptions-item>
    </el-descriptions>

    <el-dialog title="修改毕业生信息" :visible.sync="dialogFormVisible">
      <el-form :model="form" status-icon ref="Info">
        <el-form-item label="学院" :label-width="formLabelWidth">
          <el-input v-model="form.college" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="班级" :label-width="formLabelWidth">
          <el-input v-model="form.class" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学制" :label-width="formLabelWidth">
          <el-input v-model="form.length" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="毕业时间" :label-width="formLabelWidth">
          <el-input v-model="form.graduateTime" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学位类型" :label-width="formLabelWidth">
          <el-select v-model="form.degreeType" placeholder="请选择学位类型">
            <el-option label="学硕" value=1></el-option>
            <el-option label="专硕" value=1></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="确认个人信息" label-width=140px>
          <el-select v-model="form.isConfirmed" placeholder="请选择是否完成信息确认">
            <el-option label="确认" value=1></el-option>
            <el-option label="暂不确认" value=1></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="Update">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { GetPersonInfo,UpdatePersonInfo,timestampToDate } from '../../api/api.js'

export default {
  data() {
    return {
      size: '',
      PersonInfo: {},
      Term:{},
      dialogFormVisible: false,
      form: {
        college: '',
        class: '',
        length: null,
        graduateTime: null,
        degreeType: null,
        isConfirmed: null,
      },
      formLabelWidth: '140px'
    };
  },
  created() {
    this.getpersoninfo()
  },
  methods: {
    getpersoninfo() {
      GetPersonInfo().then(res => {
        //console.log(res)
        if (res.data.code === 0) {
          this.PersonInfo = res.data.result
          this.form=this.PersonInfo
          this.form.degreeType=null
          this.form.isConfirmed=null
          this.Term.graduateTime=timestampToDate (this.PersonInfo.graduateTime)
          this.Term.degreeType=(this.PersonInfo.degreeType==0)?"专硕":"学硕"
          this.Term.isConfirmed=(this.PersonInfo.isConfirmed==0)?"否":"已确认"
          this.Term.status=(this.PersonInfo.status==0)?"在读":"注销"
        }
        else {
          alert('请求学生列表失败')
        }
      })
    },

    Update(){
      this.form.degreeType=this.form.degreeType*1
      this.form.isConfirmed=this.form.isConfirmed*1
      console.log(this.form)
      
      UpdatePersonInfo(this.form).then(res => {
        if(res.data.code === 0){
          alert('修改信息成功');
          this.dialogFormVisible = false
          this.$router.go(0)
        }
        else{
          alert('修改信息失败');
          this.dialogFormVisible = false
        }
                    })
    }
    
  }
}
</script>