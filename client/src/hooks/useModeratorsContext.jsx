import { ModeratorContext } from "../context/ModeratorContext";
import { useContext } from "react";

export const useModeratorsContext = () =>{
    const context = useContext( ModeratorContext)

    if(!context){
        throw Error('useModeratorContext must be inside an ModeratorContexProvider')
    }

    return context
}