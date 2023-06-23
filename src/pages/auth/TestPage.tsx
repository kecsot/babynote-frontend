import { useEffect, useState } from "react"
import { babyResource } from "../../api/resource"
import { BabyModel, BabyType } from "../../api/types"

function TestPage() {
    const [allItem, setAllItem] = useState<BabyType[]>([])

    useEffect(() => {
        handleReadAll()
    }, [])

    const handleReadAll = () => {
        babyResource.getAllItems()
            .then((res) => {
                console.log(res)
                setAllItem(res.data)
            })
            .catch((err) => console.log(err))
    }

    const handleAddItem = () => {
        const item : BabyModel = { name: 'hi'} 
        babyResource.addItem(item)
            .then((item) => {
                setAllItem((prev) => {
                    return [...prev, item]
                })
            })
    }

    const handleRemove = (item: BabyType) => {
        babyResource.deleteItem(item.id)
            .then((success) => {
                if(success){
                    setAllItem((prev) => {
                        return prev.filter(x => x.id !== item.id)
                    })
                }
            })
    }

    const handleUpdate = (item: BabyType) => {
        item.name += '+'

        babyResource.updateItem(item)
            .then((result) => {
                if(result){
                    setAllItem((prev) => {
                        return prev.map(x => x.id === item.id ? result : x)
                    })
                }
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
            {allItem && allItem.map((item) => {
                return (
                    <div key={item.id}>
                        {item.id} | {item.name}
                        <div onClick={() => {handleUpdate(item)}}>Update</div>
                        <div onClick={() => {handleRemove(item)}}>Remove</div>
                    </div>
                    
                )
            })}

            <div onClick={handleAddItem}>Add Item</div>
            <div onClick={handleCount}>Count items</div>
        </>
    )
}

export default TestPage
