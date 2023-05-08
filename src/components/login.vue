<template>
    <div class="login">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>毕业论文管理系统登录</span>
            </div>
            <el-form status-icon label-width="80px" :model="user" ref="form" :rules="rules">
                <el-form-item label="用户名" prop="identityNumber">
                    <el-input v-model="user.identityNumber"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="user.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="login('form')">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>


<script>
import md5 from 'js-md5';
import {setToken}from '../utils/setToken.js'
import  {login} from '../api/api.js' 
import  {getUserInfo} from '../api/api.js' 
export default {
    data() {
        var ValidateIdentity = (rule, value, callback) => {
            if (value == '') {
                callback(new Error("请输入账号"));
            }
            else if (!Number.isInteger(value) && value.toString().length != 18) {
                callback(new Error("请输入18位数字账户"));
            }
            else {
                callback();
            }
        };
        var ValidatePassword = (rule, value, callback) => {
            let reg = /^[A-Za-z0-9]+$/;
            if (value == '') {
                callback(new Error("请输入密码"));
            }
            else if (!reg.test(value)) {
                console.log('密码格式错误')
                callback(new Error("请输入字母及数字组成的密码"));
            }
            else {
                callback();
            }
        };
        return {
            user: {
                identityNumber: '',
                password: ''
            },
            rules: {
                identityNumber: [{ validator: ValidateIdentity, trigger: 'blur' }],
                password: [{ validator: ValidatePassword, trigger: 'blur' }]
            }
        };

    },
    methods: {
        login(form) {
            this.$refs[form].validate((valid) => {
                if (valid) {
                    this.user.password=md5(this.user.password)
                    login(this.user).then(res => {
                        if (res.data.code === 0) {
                            this.$message({ message: "登录成功", type: 'success' })
                            getUserInfo().then(res=>{
                                //console.log(res)
                                setToken('userrole',res.data.result.role)
                                setToken('userInfo',res.data.result)
                                if(res.data.result.role==0){
                                    this.$router.push('/Homestudent');
                                }
                                else if(res.data.result.role==1){
                                    this.$router.push('/Homementor');
                                }
                                else if (res.data.result.role==2){
                                    this.$router.push('/Homeoffice');
                                }
                                
                                
                            })
                            
                        }
                        else {
                            alert('账号或密码错误')
                        }
                    })

                }
                else {
                    alert('账号密码格式错误');
                }
            })
        }
    }
}

</script>

<style lang="scss">
.login{
    width:100%;
    height:100%;
    position:absolute;
    background: url('../assets/login.jpg') center no-repeat;
    .el-card{
        background: #fffbfb57;
    }
    .box-card{
        width:500px;
        margin:200px auto;
        color:floralwhite;
        .el-form-item__label{
            color: #fff;
            font-size: 20px;
        }
        .el-card__header{
            font-size:36px;
        }
        .el-button{
            width:70%;
            position: relative;
        }
    }
}
</style>