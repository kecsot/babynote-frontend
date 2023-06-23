export abstract class BaseResource {
    protected databaseId: string;
    protected collectionId: string;

    constructor(databaseId: string, collectionId: string) {
        this.databaseId = databaseId;
        this.collectionId = collectionId;
    }
}