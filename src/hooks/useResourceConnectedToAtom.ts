import { BaseType, IBaseModel } from '../api/types';
import { BaseRestResource } from '../api/resource/base/BaseRestResource';
import { RecoilState, useSetRecoilState } from "recoil";
import { useState } from 'react';
import { RestQueryType } from '../api/resource/base/RestQuery';

// TODO: Promise<boolean> result is needed?
export default function useResourceConnectedToAtom<B extends IBaseModel, T extends BaseType>(resource: BaseRestResource<B, T>, atom: RecoilState<T[]>) {
    const [isFetchAllLoading, setFetchAllLoading] = useState(false)
    const [isFetchListLoading, setFetchListLoading] = useState(false)
    const [isCreateLoading, setCreateLoading] = useState(false)
    const [isUpdateLoading, setUpdateLoading] = useState(false)
    const [isDeleteLoading, setDeleteLoading] = useState(false)
    const [isRefreshLoading, setRefreshLoading] = useState(false)
    const setAtom = useSetRecoilState(atom);

    /**
     * Possible to fetch all items into Atom
     * 
     * @param queries Possible to do custom ordering, filtering
     * @returns
     */
    function fetchAllItems(queries: RestQueryType[] = []): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            setFetchAllLoading(true);
            resource.getAllItems(queries)
                .then((result) => {
                    if (result) {
                        setAtom(result.data)
                    }
                    setFetchAllLoading(false);
                    resolve(true)
                })
                .catch((error) => {
                    setFetchAllLoading(false);
                    reject(error)
                })
        });
    }

    /**
     * Possible to fetch list of items into Atom
     * 
     * @param queries Possible to do custom ordering, filtering
     * @returns 
     */
    function fetchList(page: number, limit: number, queries: RestQueryType[] = []): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            setFetchListLoading(true);
            resource.getList(page, limit, queries)
                .then((result) => {
                    if (result) {
                        setAtom(result.data)
                    }
                    setFetchListLoading(false);
                    resolve(true)
                })
                .catch((error) => {
                    setFetchListLoading(false);
                    reject(error)
                })
        });
    }

    /**
     * Create item in the resource and place in the atom list
     * 
     * @param item The item to add 
     * @param alterList Possible to change the default logic (For example: name changed, should move to keep in order)
     * @returns 
     */
    function createItem(item: B, alterList?: (list: T[]) => T[]): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            setCreateLoading(true);
            resource.createItem(item)
                .then((result: T) => {
                    if (result) {
                        setAtom((items) => {
                            let get = () => [...items, result];
                            return alterList ? alterList(get()) : get();
                        })
                    }
                    setCreateLoading(false);
                    resolve(true)
                })
                .catch((error) => {
                    setCreateLoading(false);
                    reject(error)
                })
        });
    }

    /**
     * Update item in the resource and also in the atom
     * 
     * @param item The item to add 
     * @param alterList Possible to change the default logic (For example: name changed, should move to keep in order)
     * @returns 
     */
    function updateItem(item: T, alterList?: (list: T[]) => T[]): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            setUpdateLoading(true);
            resource.updateItem(item)
                .then((result) => {
                    if (result) {
                        setAtom((items) => {
                            let get = () => items.map(x => x.id === item.id ? result : x)
                            return alterList ? alterList(get()) : get();
                        })
                    }
                    setUpdateLoading(false);
                    resolve(true)
                })
                .catch((error) => {
                    setUpdateLoading(false);
                    reject(error)
                })
        });
    }

    /**
     * Delete item in the resource and also in the atom
     * 
     * @param item 
     * @returns 
     */
    function deleteItem(item: T): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            setDeleteLoading(true);
            resource.deleteItem(item.id)
                .then((result) => {
                    if (result) {
                        setAtom((items) => items.filter(x => x.id !== item.id))
                    }
                    setDeleteLoading(false);
                    resolve(true)
                })
                .catch((error) => {
                    setDeleteLoading(false);
                    reject(error)
                })
        });
    }

    /**
     * Refresh an existing item in the atom.
     * 
     * @param item 
     * @param alterList Possible to change the default logic (Example: Change the place after name changed)
     * @returns 
     */
    function refreshItem(item: T, alterList?: (list: T[]) => T[]): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            setRefreshLoading(true);
            resource.getItem(item.id)
                .then((result) => {
                    if (result) {
                        setAtom((items) => {
                            let get = () => items.map(x => x.id === item.id ? result : x)
                            return alterList ? alterList(get()) : get();
                        })
                    }
                    setRefreshLoading(false);
                    resolve(true)
                })
                .catch((error) => {
                    setRefreshLoading(false);
                    reject(error)
                })
        });
    }

    return {
        fetchAllItems, isFetchAllLoading,
        fetchList, isFetchListLoading,
        createItem, isCreateLoading,
        updateItem, isUpdateLoading,
        deleteItem, isDeleteLoading,
        refreshItem, isRefreshLoading
    };
}
