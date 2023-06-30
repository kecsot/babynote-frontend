import { BabyResource } from "./BabyResource";

const databaseId = import.meta.env.VITE_APPWRITE_DATABASE || ''
const babyCollectionId = import.meta.env.VITE_APPWRITE_BABY_COLLECTION || ''


export const babyResource = new BabyResource(databaseId, babyCollectionId)