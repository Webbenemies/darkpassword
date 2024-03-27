import config from "../importenv/config"
import {Client, Account, ID, Avatars} from "appwrite"

export class authservice{
    client = new Client()
    account
    avatars
constructor(){
    this.client
    .setEndpoint(config.appwriteurl)
    .setProject(config.progectid);
    this.account = new Account(this.client)
    this.avatars = new Avatars(this.client)
}

async createaccount({email, password, name}){
    let useracc = await this.account.create(ID.unique(), email, password, name)
    if (useracc) {
        console.log('>>>>>>>>createaccount>>>', useracc)
       return await this.login({email,password})
    } else {
        return useracc
    }
}

async login({email,password}){
   return await this.account.createEmailSession(email,password)
}

async getcurrentacc(){
    let curr = await this.account.get()
    if (curr) {
        console.log('>>>>>>>>getcurrentacc>>>', curr)
        return curr
    } else {
        return false
    }
}

async logout(){
    let run = await this.account.deleteSessions()
    if (run) {
        return run
    } else {
        return null
    }
}

async Listsessions(){
    return await this.account.listSessions()
}

async getlogo(){
    return await this.avatars.getInitials()
}

async createphone(number){
    return await this.account.createPhoneSession(ID.unique(), number)
} 

async otpphone({phoneid,code}){
    return await this.account.updatePhoneSession(phoneid, code)
}

async updatename(name){
    return await this.account.updateName(name)
}

async emailvarify(url){
    return await this.account.createVerification(url)
}

async emailsecret({id, secret}){
    return await this.account.updateVerification(id, secret)
}

async createRepassword (email, url){
    return await this.account.createRecovery(email, url)
}

async confumcreateRepassword(userid, secret, newpass, conpass){
    return await this.account.updateRecovery(userid, secret, newpass, conpass)
}

}



const Auth = new authservice()

export default Auth