import { atom } from "recoil";
import { BabyType } from "../api/types";
import { recoilPersist } from "recoil-persist";

const {persistAtom} = recoilPersist()

export const babyListAtom = atom<BabyType[]>({
    key: 'babyListAtom',
    default: [],
});

export const nameFilterAtom = atom<string|null>({
    key: 'nameFilterAtom',
    default: null,
    effects: [persistAtom],
});
