export function setToken(Key,Info){
    console.log("the token have been setted")
    return localStorage.setItem(Key,JSON.stringify(Info));
}
export function getToken(Key){
    //console.log("the token have been got")
    var value=localStorage.getItem(Key);
    if(value){
        return JSON.parse(value)
    }

}
export function removeToken(Key){
    console.log("the token have been removed")
    return localStorage.removeItem(Key);
}