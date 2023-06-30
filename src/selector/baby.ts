import { RecoilValueReadOnly, selector } from "recoil";
import { BabyType } from "../api/types";
import { babyListAtom, nameFilterAtom } from "../state/baby";


const filteredBabyListSelector: RecoilValueReadOnly<BabyType[]> = selector({
    key: 'filteredBabyListSelector',
    get: ({ get }) => {
        const babyList = get(babyListAtom);
        const nameFilter = get(nameFilterAtom);

        return babyList.filter((x) => x.name.includes(nameFilter))
    },
});

export {
    filteredBabyListSelector
}