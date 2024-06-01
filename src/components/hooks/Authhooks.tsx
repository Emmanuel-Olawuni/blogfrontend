'use client'
import { useContext } from "react"
import AuthContext from "../contexts/AuthContext"

export const useAuthHooks = ()=> {
    const context = useContext(AuthContext)
    if(context === undefined) throw new Error('Context must be used within a provider')
        
        return context;
}