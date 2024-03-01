import config from "../importenv/config"
import {Client, Account, ID} from "appwrite"

export class authservice{
    client = new Client()
    account
constructor(){
    this.client
    .setEndpoint(config.appwriteurl)
    .setProject(config.progectid);
    this.account = new Account(this.client)
}

async createaccount({email, password, name}){
    let useracc = await this.account.create(ID.unique(), email, password, name)
    console.log(email, password, name, useracc);
    if (useracc) {
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
    console.log('>>>>>>>>>>>getcurrentacc', curr )
    console.log(curr);
    if (curr) {
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


}



const Auth = new authservice()

export default Auth