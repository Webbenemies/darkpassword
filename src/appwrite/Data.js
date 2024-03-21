import config from "../importenv/config"
import {Client, Databases, ID, Query} from "appwrite"

export class dataservices{
    client = new Client()
    database
constructor(){
this.client
.setEndpoint(config.appwriteurl)
.setProject(config.progectid)

this.database = new Databases(this.client)
}

async createtodo({title,content, colluserid}){
    console.log('>>>>>>>>>>>',config.databaseid, config.collectionid)
    return await this.database.createDocument(config.databaseid, config.collectionid, ID.unique(), {title,content,colluserid})
}

async deletetodo(docid){
 let delet =  await this.database.deleteDocument(config.databaseid, config.collectionid, docid)
 if (delet) {
    return delet
 } else {
    return false
 }
}

async updatetodo(docid, {content,code}){
    return await this.database.updateDocument(config.databaseid, config.collectionid, docid,  {content,code})
}

async alltodos(quries){
    return await this.database.listDocuments(config.databaseid, config.collectionid, [Query.equal('colluserid', [quries])])
}

async gettodo(docid){
    return await this.database.getDocument(config.databaseid, config.collectionid, docid)
}

// ultratag

async createultratag({ultraname, ulteruserid, ultratagfileid}){
    return await this.database.createDocument(config.databaseid, config.ultracollid, ultratagfileid, {ultraname, ulteruserid, ultratagfileid})
}

async allultratags(quries){
    return await this.database.listDocuments(config.databaseid, config.ultracollid, [Query.equal('ulteruserid', [quries])])
}

async deleteaultra(docid){
    let delet =  await this.database.deleteDocument(config.databaseid, config.ultracollid, docid)
    if (delet) {
       return delet
    } else {
       return false
    }
   }

   async getultra(docid){
    return await this.database.getDocument(config.databaseid, config.ultracollid, docid)
}

}



const Dataserv = new dataservices()

export default Dataserv