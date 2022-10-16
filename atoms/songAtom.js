import { atom } from "recoil";

export const currentTrackIdState = atom({
    key: "currentTrackIdState", // unique id with respect to other selectors
    default: null, // initial value
})

export const isPlayingState = atom({
    key: "isPlayingState",
    default: false,
})