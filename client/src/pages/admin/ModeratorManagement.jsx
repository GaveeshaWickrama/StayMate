import { useEffect,useState } from "react"

//components
import ModeratorDetails from "../components/admin/ModeratorDetails"
import ModeratorForm from "../components/admin/ModeratorForm"

const ModeratorManagement = ()=>{
    const [Moderators,setModerators] = useState(null)

    useEffect(()=>{
        const fetchModerators = async () =>{
            const response = await fetch('/api/Moderators')
            const  json = await response.json()

            if (response.ok){
                setModerators(json)
            }
        }

        fetchModerators()
    },[])


    return(
        <div className="ModeratorManagement">
            <div className="Moderators">
                
                {Moderators && Moderators.map((Moderator)=>(
                    <ModeratorDetails key={Moderator.id} Moderator={Moderator}/>
                ))}
            </div>
            <ModeratorForm/>
        </div>
    )

}

export default ModeratorManagement