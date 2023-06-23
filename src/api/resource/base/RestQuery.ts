import { Query as AppWriteQuery } from "appwrite";

type QueryTypesSingle = string | number | boolean;
export type QueryTypesList = string[] | number[] | boolean[];
export type QueryTypes = QueryTypesSingle | QueryTypesList;

export type RestQueryType = {
    query: string
};

export class RestQuery {

    static equal = (attribute: string, value: QueryTypes): RestQueryType => {
        return {
            query: AppWriteQuery.equal(attribute, value)
        }
    }

    static notEqual = (attribute: string, value: QueryTypes): RestQueryType => {
        return {
            query: AppWriteQuery.notEqual(attribute, value)
        }
    }
    static lessThan = (attribute: string, value: QueryTypes): RestQueryType => {
        return {
            query: AppWriteQuery.lessThan(attribute, value)
        }
    }

    static lessThanEqual = (attribute: string, value: QueryTypes): RestQueryType => {
        return {
            query: AppWriteQuery.lessThanEqual(attribute, value)
        }
    }

    static greaterThan = (attribute: string, value: QueryTypes): RestQueryType => {
        return {
            query: AppWriteQuery.greaterThan(attribute, value)
        }
    }

    static search = (attribute: string, value: string): RestQueryType => {
        return {
            query: AppWriteQuery.search(attribute, value)
        }
    }


    static orderDesc = (attribute: string): RestQueryType => {
        return {
            query: AppWriteQuery.orderDesc(attribute)
        }
    }

    static orderAsc = (attribute: string): RestQueryType => {
        return {
            query: AppWriteQuery.orderAsc(attribute)
        }
    }

    static cursorAfter = (id: string): RestQueryType => {
        return {
            query: AppWriteQuery.cursorAfter(id)
        }
    }

    static cursorBefore = (id: string): RestQueryType => {
        return {
            query: AppWriteQuery.cursorBefore(id)
        }
    }

    static limit = (limit: number): RestQueryType => {
        return {
            query: AppWriteQuery.limit(limit)
        }
    }

    static offset = (offset: number): RestQueryType => {
        return {
            query: AppWriteQuery.offset(offset)
        }
    }

}