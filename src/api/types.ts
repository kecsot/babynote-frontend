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

export type BabyModel = IBaseModel & {
    name: string
}

export type BabyType = BaseType & BabyModel;