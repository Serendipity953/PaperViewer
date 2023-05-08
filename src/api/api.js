//将借口请求封装成api使用
import service from "../service";

export function timestampToDate(timestamp){    
    let date = new Date();    
    date.setTime(timestamp * 1000)        
    return date
  }

export function login(data){
    return service({
        method:'post',
        url:'/auth/login',
        data
    })
}
export function getUserInfo(){
    return service({
        method:'get',
        url:'/auth/me',
    })
}
export function logout(){
    return service({
        method:'post',
        url:'/auth/logout',
    })
}
export function mentorGetStudents(parm){
    return service({
        method:'get',
        url:'/supervisor/stu_list',
        params:parm
    })
}
export function GetPersonInfo(){
    return service({
        method:'get',
        url:'/stu/status_info',
    })
}
export function UpdatePersonInfo(parm){
    return service({
        method:'post',
        url:'/stu/status_info',
        data:parm
    })
}
export function GetGraduationProgress(){
    return service({
        method:'get',
        url:'/stu/file_info',
    })
}
export function UploadFirstDraft(data){
    return service({
        method:'post',
        url:'/stu/first_draft_upload',
        data,
        headers: {
            "Content-Type": "mutipart/form-data"
          }
    })
}
export function UploadResearchMaterial(data){
    return service({
        method:'post',
        url:'/stu/research_evaluation_material_upload',
        data,
        headers: {
            "Content-Type": "mutipart/form-data"
          }
    })
}
export function UploadReviewForm(data){
    return service({
        method:'post',
        url:'/stu/preliminary_review_form_upload',
        data,
        headers: {
            "Content-Type": "mutipart/form-data"
          }
    })
}
export function GetComment(){
    return service({
        method:'get',
        url:'/stu/comment',

    })
}
export function SelfComment(parm){
    return service({
        method:'post',
        url:'/stu/comment',
        data:parm
    })
}
export function ApplyDgree(){
    return service({
        method:'post',
        url:'/stu/apply_degree',

    })
}
export function MentorGetComment(parm){
    return service({
        method:'get',
        url:'/supervisor/comment',
        params:parm
    })
}
export function MentorComment(parm){
    return service({
        method:'post',
        url:'/supervisor/comment',
        data:parm
    })
}
export function MentorConfirm(parm){
    return service({
        method:'post',
        url:'/supervisor/confirm',
        data:parm
    })
}
export function StudentBind(parm){
    return service({
        method:'post',
        url:'/supervisor/bind',
        data:parm
    })
}
export function GetAllStudents(parm){
    return service({
        method:'get',
        url:'/admin/stu_list',
        params:parm
    })
}
export function UploaDefenseScore(parm){
    return service({
        method:'post',
        url:'/admin/upload_defense_score',
        data:parm
    })
}
export function UploaBlindScore(parm){
    return service({
        method:'post',
        url:'/admin/upload_blind_score',
        data:parm
    })
}
export function DegreeConfirm(parm){
    return service({
        method:'post',
        url:'/admin/upload_degree_confirmed',
        data:parm
    })
}
export function UpdatePasswd(parm){
    return service({
        method:'post',
        url:'/auth/password',
        data:parm
    })
}
export function UpdateUsrInfo(parm){
    return service({
        method:'post',
        url:'/auth/me',
        data:parm
    })
}
export function UploadImage(parm){
    return service({
        method:'put',
        url:'/image_upload',
        data:parm
    })
}
export function UpdateUsrAvatar(parm){
    return service({
        method:'post',
        url:'/auth/avatar_upload',
        data:parm
    })
}