import { Models } from "appwrite";
import { BabyType, BaseType, BabyModel } from "../types";
import { BaseRestResource } from "./base/BaseRestResource";


export class BabyResource extends BaseRestResource<BabyModel, BabyType> {

    appendPropertiesToBaseType(baseType: BaseType, item: Models.Document): BabyType {
        return {
            ...baseType,
            name: item.name
        }
    }
    
}