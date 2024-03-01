const config = {
    progectid: String(import.meta.env.VITE_PROJECT_ID),
    appwriteurl: String(import.meta.env.VITE_PROJECT_URL),
    databaseid: String(import.meta.env.VITE_DATABASE_ID),
    collectionid: String(import.meta.env.VITE_COLLECTION_ID),
    bucketid: String(import.meta.env.VITE_BUCKET_ID),
    ultracollid: String(import.meta.env.VITE_ULTRACOLL_ID)
}

export default config