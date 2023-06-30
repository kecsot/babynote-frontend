import { atom } from "recoil";
import { BabyType } from "../api/types";

export const babyListAtom = atom<BabyType[]>({
    key: 'babyListAtom',
    default: [],
});

export const nameFilterAtom = atom<string|null>({
    key: 'nameFilterAtom',
    default: null,
});
