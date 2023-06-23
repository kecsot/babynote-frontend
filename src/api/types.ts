export type IBaseModel {}

export type BaseType = {
    id: string
    createdAt: string;
    updatedAt: string;
}

export type BaseList<T extends BaseType> = {
    total: number;
    data: T[];
}