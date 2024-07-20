import { createContext, useReducer } from "react";

export const ModeratorContext = createContext()

export const ModeratorReducer = (state, action) =>{
    switch (action.type){
        case 'SET_MODERATORS' :
            return {
                Moderators: action.payload
            }
        case 'CREATE_MODERATORS' :
            return {
                Moderators: [action.payload, ...state.Moderators]
            }
        case 'DELETE_MODERATOR' :
            return {
                Moderators: state.Moderators.filter((m) => m._id !== action.payload._id )
            }
        default:
            return state
    }
}

export const ModeratorContextProvider = ( { children }) => {
    const [state,dispatch] = useReducer(ModeratorReducer, {
        Moderators : null
    })

    return(
        <ModeratorContext.Provider value={ {...state, dispatch} }>
            { children }
        </ModeratorContext.Provider>
    )
}