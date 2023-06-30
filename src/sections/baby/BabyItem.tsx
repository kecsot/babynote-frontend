import { BabyType } from "../../api/types"

type Props = {
    item: BabyType,
    onEdit: VoidFunction,
    onDelete: VoidFunction,

}

function BabyItem({ item, onEdit, onDelete }: Props) {

    return (
        <div>
            <div>Id: {item.id}</div>
            <div>Name: {item.name}</div>
            <div>
                <button onClick={onEdit}>Edit</button>
                <button onClick={onDelete}>Delete</button>
            </div>
        </div>
    )
}

export default BabyItem
