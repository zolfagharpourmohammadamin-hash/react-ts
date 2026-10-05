import { createContext } from "react"
import type { them } from "../Types/general"

export type GlobalContextType={
    them:them
    toggleThem?:()=>void
}
export const GlobalContext = createContext<GlobalContextType>({
       them:"Light"
})

