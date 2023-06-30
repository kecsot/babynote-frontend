
import { useRecoilValue } from "recoil"
import { babyResource } from "../../api/resource"
import { BabyModel, BabyType } from "../../api/types"
import useResourceConnectedToAtom from "../../hooks/useResourceConnectedToAtom"
import { babyListAtom } from "../../state/baby"
import { useEffect } from "react"

function TestPage() {
    const {
        fetchAllItems, isFetchAllLoading,
        fetchList, isFetchListLoading,
        createItem, isCreateLoading, 
        updateItem, isUpdateLoading,
        deleteItem, isDeleteLoading,
        refreshItem, isRefreshLoading
    } = useResourceConnectedToAtom(babyResource, babyListAtom)

    const list = useRecoilValue(babyListAtom)
    
    useEffect(() => {
        fetchAllItems()
            .then((result) => {
                console.log(result)
            })
    }, [])

    const handleRefresh = (item: BabyType) => {
        refreshItem(item)
            .then((result) => {
                console.log(result)
            })
    }

    const handleAddItem = () => {

        let reverseList = (list: BabyType[], added: BabyType) => {
            return list.reverse();
        }

        const item : BabyModel = { name: 'hi'} 
        createItem(item, reverseList)
            .then((result) => {
                console.log(result)
            })
    }

    const handleRemove = (item: BabyType) => {
        deleteItem(item)
            .then((result) => {
                console.log(result)
            })
    }

    const handleUpdate = (item: BabyType) => {
        const newItem = {
            ...item,
            name : Math.random().toString()
        }

        updateItem(newItem)
            .then((result) => {
                console.log(result)
            })
    }

    const handleCount = () => {
        babyResource.countItems()
            .then((result) => {
                if(result){
                    console.log(result)
                }
            })
    }

    return (
        <>
            {isFetchAllLoading && <div>Fetching All...</div>}
            {isFetchListLoading && <div>Fetching List...</div>}
            {isCreateLoading && <div>Creating...</div>}
            {isUpdateLoading && <div>Updating...</div>}
            {isDeleteLoading && <div>Deleting...</div>}
            {isRefreshLoading && <div>Refreshing...</div>}

            {list.map((item) => {
                return (
                    <div key={item.id}>
                        {item.id} | {item.name}
                        <div onClick={() => {handleUpdate(item)}}>Update</div>
                        <div onClick={() => {handleRemove(item)}}>Remove</div>
                        <div onClick={() => {handleRefresh(item)}}>Refresh</div>
                    </div>
                    
                )
            })}

            <div onClick={handleAddItem}>Add Item</div>
            <div onClick={handleCount}>Count items</div>
        </>
    )
}

export default TestPage
