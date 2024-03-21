import { Client, Storage, ID } from "appwrite"
import config from "../importenv/config"

export class service{
    client = new Client()
    storage
    constructor(){
        this.client
        .setEndpoint(config.appwriteurl)
        .setProject(config.progectid)

        this.storage = new Storage(this.client)
    }

    async uploadfile(file){
        return await this.storage.createFile(config.bucketid, ID.unique(), file)
    }

    async getfile(fileid){
        return await this.storage.getFile(config.bucketid, fileid)
    }

    async deletfile(fileid){
        return await this.storage.deleteFile(config.bucketid, fileid)
    }

    async listfiles(){
        return await this.storage.listFiles(config.bucketid)
    }

    async FileView(fileid){
        return await this.storage.getFileView(config.bucketid, fileid)
    }

}


const Bucket = new service()

export default Bucket