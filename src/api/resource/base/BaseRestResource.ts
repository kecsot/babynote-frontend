import { ID, Models } from "appwrite";
import { BaseResource } from "./BaseResource"; 
import { BaseList, BaseType, IBaseModel } from "../../types";
import { RestQuery, RestQueryType } from "./RestQuery";
import { databases } from "../../appwrite";

export abstract class BaseRestResource<B extends IBaseModel, T extends BaseType> extends BaseResource {

    abstract appendPropertiesToBaseType(baseType: BaseType, item: Models.Document): T

    convertDataModelToType(item: Models.Document): T {
        const baseType = {
            id: item.$id,
            createdAt: item.$createdAt,
            updatedAt: item.$updatedAt
        } as BaseType

        return this.appendPropertiesToBaseType(baseType, item)
    }

    getList(page: number = 0, limit: number = 25, queries: RestQueryType[] = []): Promise<BaseList<T>> {
        let queryStrings = [
            ...queries,
            RestQuery.offset(page * limit),
            RestQuery.limit(limit),
        ].map((item: RestQueryType) => {
            return item.query;
        })

        return databases.listDocuments(
            this.databaseId,
            this.collectionId,
            queryStrings
        ).then((response) => {
            return {
                total: response.total,
                data: response.documents.map((x) => this.convertDataModelToType(x))
            } as BaseList<T>;
        })
    }

    getAllItems(queries: RestQueryType[] = []): Promise<BaseList<T>> {
        let result = [] as T[];
        let page = 0;
        let limit = 100;

        return new Promise((resolve, reject) => {
            let getItems = () => {
                this.getList(page, limit, queries).then((response) => {
                    result.push(...response.data);
                    if (response.data.length === limit) {
                        page++;
                        getItems();
                    } else {
                        resolve({
                            total: result.length,
                            data: result
                        } as BaseList<T>);
                    }
                }).catch((error) => {
                    reject(error);
                })
            }
            getItems();
        })
    }

    countItems(queries: RestQueryType[] = []): Promise<number> {
        let queryStrings = [
            ...queries,
            RestQuery.limit(0),
        ].map((item: RestQueryType) => {
            return item.query;
        })

        return databases.listDocuments(
            this.databaseId,
            this.collectionId,
            queryStrings
        ).then((response) => {
            return response.total;
        })
    }

    addItem(item: B): Promise<T> {
        return databases.createDocument(
            this.databaseId,
            this.collectionId,
            ID.unique(),
            item,
        ).then((response) => {
            return this.convertDataModelToType(response);
        })
    }

    getItem(id: string): Promise<T> {
        return databases.getDocument(
            this.databaseId,
            this.collectionId,
            id
        ).then((response) => {
            return this.convertDataModelToType(response);
        })
    }

    updateItem(item: T): Promise<T> {
        // TODO: Remove all 'B' key from item: 'T'
        const data = item

        return databases.updateDocument(
            this.databaseId,
            this.collectionId,
            item.id,
            {
                ...data,
                $id: item.id,
            }
        ).then((response) => {
            return this.convertDataModelToType(response);
        })
    }

    deleteItem(id: string): Promise<boolean> {
        return databases.deleteDocument(
            this.databaseId,
            this.collectionId,
            id
        ).then(() => {
            return true
        })
    }

}