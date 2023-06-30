
import { useRecoilState, useRecoilValue } from "recoil"
import { babyResource } from "../api/resource"
import { BabyModel, BabyType } from "../api/types"
import useResourceConnectedToAtom from "../hooks/useResourceConnectedToAtom"
import { babyListAtom, nameFilterAtom } from "../state/baby"
import { useEffect } from "react"
import BabyItem from "../sections/baby/BabyItem"
import { ChangeEvent } from "react"
import { filteredBabyListSelector } from "../selector/baby"
import { useErrorBoundary } from "react-error-boundary"

function ExamplePage() {
    const {
        fetchAllItems, isFetchAllLoading,
        fetchList, isFetchListLoading,
        createItem, isCreateLoading,
        updateItem, isUpdateLoading,
        deleteItem, isDeleteLoading,
        refreshItem, isRefreshLoading
    } = useResourceConnectedToAtom(babyResource, babyListAtom)

    const [nameFilter, setNameFilter] = useRecoilState(nameFilterAtom)
    const list = useRecoilValue(filteredBabyListSelector)
    const { showBoundary } = useErrorBoundary();

    useEffect(() => {
        fetchAllItems()
            .then((result) => {
                console.log(result)
            })
            .catch(showBoundary)
    }, [])

    const handleAddItem = () => {
    //    let reverseList = (list: BabyType[], added: BabyType) => {
    //        return list.reverse();
    //    }

        const item: BabyModel = { name: 'hi' }
        createItem(item, reverseList)
            .then((result) => {
                console.log(result)
            })
            .catch(showBoundary)
    }

    const handleEditItem = (item: BabyType) => {
        const newItem = {
            ...item,
            name: Math.random().toString()
        }

        updateItem(newItem)
            .then((result) => {
                console.log(result)
            })
            .catch(showBoundary)
    }

    const handleDeleteItem = (item: BabyType) => {
        deleteItem(item)
            .then((result) => {
                console.log(result)
            })
            .catch(showBoundary)
    }

    const handleOnNameFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNameFilter(event.target.value)
    }

    const handleShowBoundary = () => {
        showBoundary(new Error('This is an example error'))
    }

    return (
        <>
            {isFetchAllLoading && <div>Fetching All...</div>}
            {isFetchListLoading && <div>Fetching List...</div>}
            {isCreateLoading && <div>Creating...</div>}
            {isUpdateLoading && <div>Updating...</div>}
            {isDeleteLoading && <div>Deleting...</div>}
            {isRefreshLoading && <div>Refreshing...</div>}

            <div>
                <label>Filter:</label>
                <input
                    onChange={handleOnNameFilterChange}
                    value={nameFilter ?? ''}></input>
            </div>


            {list.map((item) => {
                return (
                    <BabyItem
                        key={item.id}
                        item={item}
                        onEdit={() => { handleEditItem(item) }}
                        onDelete={() => { handleDeleteItem(item) }}
                    />
                )
            })}

            <div onClick={handleAddItem}>Add Item</div>
            <div onClick={handleShowBoundary}>Show boundary</div>
        </>
    )
}

export default ExamplePage
