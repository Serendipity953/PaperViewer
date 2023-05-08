<template>
    <div class="header">
        <el-header>
            <div class="title">毕业论文管理系统</div>
            <div style="width: 300px;">
                {{ userInfo.name }}
                <el-dropdown>
                    <span class="el-dropdown-link">
                        个人中心<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item icon="el-icon-plus" @click.native="Info">个人信息</el-dropdown-item>
                        <el-dropdown-item icon="el-icon-circle-plus" @click.native="Psw">修改密码</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <el-button type="text" @click="logOut" style="color: aliceblue;">登出</el-button>
                <div style="margin-right: 5px;"></div>
            </div>
            <el-card :class="['Popup', openBe_1 ? 'openActive' : '']">
                <div @click="ChangeAvatar">
                    <el-avatar shape="square" :size="80" :src="squareUrl" v-if="userInfo.avatar == ''"></el-avatar>
                    <el-avatar shape="square" :size="80" :src="userInfo.avatar" v-else></el-avatar>
                </div>
                <el-divider>{{ userInfo.name }}</el-divider>
                <el-descriptions class="margin-top" title="个人信息" :column="1" size="small">
                    <template slot="extra">
                        <el-button type="primary" size="small" @click="dialogFormVisible = true">修改</el-button>
                    </template>
                    <el-descriptions-item label="身份号">{{ userInfo.identityNumber }}</el-descriptions-item>
                    <el-descriptions-item label="身份">{{ userInfo.role }}</el-descriptions-item>
                    <el-descriptions-item label="性别">{{ userInfo.gender }}</el-descriptions-item>
                    <el-descriptions-item label="年龄">{{ userInfo.age }}</el-descriptions-item>
                    <el-descriptions-item label="手机号">{{ userInfo.phoneNumber }}</el-descriptions-item>
                    <el-descriptions-item label="邮箱">{{ userInfo.email }}</el-descriptions-item>
                </el-descriptions>
            </el-card>

            <el-card :class="['Popup_2', openBe_2 ? 'openActive_2' : '']">
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
                    class="demo-ruleForm">
                    <el-form-item label="旧密码" prop="oldpass">
                        <el-input v-model="ruleForm.oldpass"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="pass">
                        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认新密码" prop="checkPass">
                        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <div v-show="MaskBe" class="MaskCss" @click="closeFun()"></div>



            <el-dialog title="个人信息修改" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                    <el-form-item label="年龄" :label-width="formLabelWidth">
                        <el-input v-model="form.age" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号" :label-width="formLabelWidth">
                        <el-input v-model="form.phoneNumber" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" :label-width="formLabelWidth">
                        <el-input v-model="form.email" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" :label-width="formLabelWidth">
                        <el-select v-model="form.gender" placeholder="请选择您的性别">
                            <el-option label="男" :value=1></el-option>
                            <el-option label="女" :value=0></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="UpdatInfo">确 定</el-button>
                </div>
            </el-dialog>

            <el-dialog title="上传头像" :visible.sync="dialogAvatarVisible">
                <div>
                    <el-upload class="upload-demo" action="#" :multiple="false" :show-file-list="true" :auto-upload="false"
                        ref="uploadavatar" :http-request="UploadAvatar" :file-list="Avatar"
                        :on-change="handleUploadChangeAvatar" :before-upload="beforeUploadAvatar">
                        <div class="el-upload__text">选择图片</div>
                        <template #tip>
                            <div class="el-upload__tip">
                                注：上传格式为.png或.jpg文件
                            </div>
                        </template>
                    </el-upload>
                    <el-button type="primary" @click="UpdateAvatar">上传<i
                            class="el-icon-upload el-icon--right"></i></el-button>
                </div>
            </el-dialog>
        </el-header>
    </div>
</template>
  
<script>
import { getToken, removeToken, setToken } from '../../utils/setToken.js'
import md5 from 'js-md5';
import { logout, UpdatePasswd, UpdateUsrInfo, UploadImage, UpdateUsrAvatar, getUserInfo } from '../../api/api.js'
import { MessageBox } from 'element-ui';
export default {
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.ruleForm.checkPass !== '') {
                    this.$refs.ruleForm.validateField('checkPass');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.pass) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            userInfo: {
                identityNumber: "310101200203015810",
                name: "奥伦",
                role: 0,
                gender: 0,
                age: 20,
                phoneNumber: "15800078287",
                lastLogin: "2023-04-04T09:28:42+08:00",
                avatar: "",
                email: ""
            },
            InfoShow: {},
            openBe_1: false, // 是否打开弹出层
            openBe_2: false, // 是否打开弹出层
            MaskBe: false,  // 是否开启遮罩层
            squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
            //squareUrl: "http://124.221.197.218:80/images/2023/05/04/6.jpg",

            formLabelWidth: '120px',
            dialogFormVisible: false,
            dialogAvatarVisible: false,
            avatarurl: '',
            Avatar: [],
            form: {
                name: '',
                gender: '',
                age: '',
                phoneNumber: '',
                email: ''
            },
            ruleForm: {
                pass: '',
                checkPass: '',
                oldpass: ''
            },
            rules: {
                pass: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
                oldpass: [
                    { validator: validatePass, trigger: 'blur' }
                ]
            }
        }
    },
    created() {

        this.userInfo = getToken('userInfo')
        console.log('userinfo', this.userInfo)
        if (this.userInfo.role == 0) {
            this.userInfo.role = '学生'
        }
        else if (this.userInfo.role == 1) {
            this.userInfo.role = '老师'
        }
        else if (this.userInfo.role == 2) {
            this.userInfo.role = '教务老师'
        }
        if (this.userInfo.gender == 0) {
            this.userInfo.gender = '女'
        }
        else if (this.userInfo.gender == 1) {
            this.userInfo.gender = '男'
        }

    },
    mounted() {



    },
    methods: {
        ChangeAvatar() {
            this.dialogAvatarVisible = true
        },
        beforeUploadAvatar(file) {
            const fileType = file.name.substring(file.name.lastIndexOf('.'))
            if (fileType.toLowerCase() != '.png' && fileType.toLowerCase() != '.jpg') {
                this.$message.error('文件必须为.png或.jpg类型')
                this.Avatar = []
                return false
            }
        },
        UploadAvatar(params) {
            const formData = new FormData();
            formData.append("source", this.Avatar[0].raw);
            UploadImage(formData).then(res1 => {
                if (res1.data.code == 0) {
                    console.log("res1", res1);
                    this.avatarurl = res1.data.result
                    console.log(this.avatarurl)
                    var parm = { url: this.avatarurl }
                    UpdateUsrAvatar(parm).then(res2 => {
                        if (res2.data.code == 0) {
                            var newInfo = this.userInfo
                            newInfo.avatar = this.avatarurl
                            setToken('userInfo', newInfo)
                            console.log("res2", res2)
                            this.userInfo = getToken('userInfo')
                            console.log('userinfo', this.userInfo)
                            if (this.userInfo.role == 0) {
                                this.userInfo.role = '学生'
                            }
                            else if (this.userInfo.role == 1) {
                                this.userInfo.role = '老师'
                            }
                            else if (this.userInfo.role == 2) {
                                this.userInfo.role = '教务老师'
                            }
                            if (this.userInfo.gender == 0) {
                                this.userInfo.gender = '女'
                            }
                            else if (this.userInfo.gender == 1) {
                                this.userInfo.gender = '男'
                            }
                            params.onSuccess(); //成功icon
                            this.$message({
                                message: "头像上传成功！",
                                type: "success"
                            });
                            this.$router.go(0)
                        }
                    })

                }

            }).catch(r => {
                this.$message.error("上传失败！");
                throw Error(r);
            });
        },
        handleUploadChangeAvatar(file, fileList) {
            if (fileList.length > 0) {
                this.Avatar = [fileList[fileList.length - 1]] // 这一步 ，是 展示最后一次选择的文件
            }
        },
        UpdateAvatar() {
            if (this.Avatar.length <= 0) {
                this.$message({
                    message: "请先选择图片！",
                    type: "error"
                });
            }
            this.$refs.uploadavatar.submit(); //触发自定义上传
            this.dialogAvatarVisible = false
            this.Avatar = []
        },
        UpdatInfo() {
            this.dialogFormVisible = false
            this.form.name = this.userInfo.name
            this.form.age = this.form.age * 1
            console.log(this.form)
            UpdateUsrInfo(this.form).then(res => {
                if (res.data.code == 0) {
                    getUserInfo().then(res => {
                        console.log(res)
                        setToken('userInfo', res.data.result)
                        this.userInfo = getToken('userInfo')
                        console.log('userinfo', this.userInfo)
                        if (this.userInfo.role == 0) {
                            this.userInfo.role = '学生'
                        }
                        else if (this.userInfo.role == 1) {
                            this.userInfo.role = '老师'
                        }
                        else if (this.userInfo.role == 2) {
                            this.userInfo.role = '教务老师'
                        }
                        if (this.userInfo.gender == 0) {
                            this.userInfo.gender = '女'
                        }
                        else if (this.userInfo.gender == 1) {
                            this.userInfo.gender = '男'
                        }
                    })
                    MessageBox({ message: "用户信息修改成功", type: 'success' })
                    this.$router.go(0)
                }
            })

        },
        logOut() {
            logout().then(res => {
                //console.log(res)
                if (res.data.code === 0) {
                    removeToken('userInfo')
                    removeToken('userrole')
                    this.$message({ message: "您已登出账户", type: 'success' })
                    this.$router.replace('/login');
                }
                else {
                    alert('登出错误')
                }
            })
        },

        // 打开弹出层
        Info() {
            this.MaskBe = true
            this.openBe_1 = true
        },
        Psw() {
            this.MaskBe = true
            this.openBe_2 = true
        },
        // 点击遮罩则关闭弹层~
        closeFun() {
            this.MaskBe = false
            this.openBe_1 = false
            this.openBe_2 = false

        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    var psw = { oldPassword: md5(this.ruleForm.oldpass), newPassword: md5(this.ruleForm.pass) }
                    UpdatePasswd(psw).then(res => {
                        if (res.data.code == 0) {
                            MessageBox({ message: "密码修改成功", type: 'success' })
                            this.$router.replace('/login');
                        }

                        else
                            MessageBox({ message: "密码修改失败，请确认需要修改的密码是否输入正确", type: 'error' })
                    })

                } else {
                    MessageBox({ message: "密码修改失败", type: 'error' })
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.margin-top {
    margin: 0 auto;
}

.el-dropdown-link {
    cursor: pointer;
    color: #FFF;
}

.el-icon-arrow-down {
    font-size: 12px;
}

.el-dropdown {
    margin-right: 10px;
    margin-left: 10px;
}

.el-header {
    background: #bd162c;
    color: #fff;
    line-height: 60px;
    display: flex;
    justify-content: space-between;
    margin-left: 0;
    padding: 0 20px;
    padding-top: 0px;
    padding-right: 20px;
    padding-bottom: 0px;
    padding-left: 0px;

    .title {
        width: 200px;
        font-size: 20px;
    }
}

/* 弹出层默认样式 */
.Popup {
    width: 300px;
    height: 60%;
    top: 160px;
    background: #fff;
    position: fixed;
    right: -300px;
    z-index: 11000;
    transition: all 0.25s linear;
}

/* 点击按钮是将盒子 bottom 值归零即可实现弹出效果,
	同理，如需更改弹出方向只需将bottom改成top、left、right即可
	(默认样式的方向也需一起更改哦) */
.openActive {
    right: 0px !important;
}

.Popup_2 {
    width: 500px;
    height: 30%;
    top: 300px;
    background: #fff;
    position: fixed;
    right: -500px;
    z-index: 11000;
    transition: all 0.25s linear;
}

/* 点击按钮是将盒子 bottom 值归零即可实现弹出效果,
	同理，如需更改弹出方向只需将bottom改成top、left、right即可
	(默认样式的方向也需一起更改哦) */
.openActive_2 {
    right: 0px !important;
}

/* 遮罩层样式 */
.MaskCss {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(250, 249, 249, 0.1);
    z-index: 10000;
}
</style>
  