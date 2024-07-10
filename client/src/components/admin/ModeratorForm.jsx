import { useState , useEffect } from "react";

const ModeratorForm = () => {
    const [name, setName] = useState('')
    const [assigned, setAssigned] = useState('')
    // const [load, setLoad] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e)=>{
        e.preventDefault()

        const Moderator = {name,assigned}
    
        const response = await fetch('/api/Moderators', {
        method: 'POST',
        body: JSON.stringify(moderator),
        headers: {
            'Content-Type': 'application/json'
        }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            setError(null)
            setName('')
            // setLoad('')
            setAssigned('')
            console.log('new Moderator added', json)
            //dispatch({type: 'CREATE_Moderator', payload: json})
        }

    }

    return(
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Moderator</h3>

            <label>Moderator name: </label>
            <input 
                type="text"
                onChange={(e)=>setName(e.target.value)}
                value={name}
            />

            {/* <label>Excerzise Load: </label>
            <input 
                type="number"
                onChange={(e)=>setLoad(e.target.value)}
                value={load}
            /> */}

            <label>Assigned: </label>
            <input 
                type="number"
                onChange={(e)=>setAssigned(e.target.value)}
                value={assigned}
            />

            <button>Add Moderator</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default ModeratorForm