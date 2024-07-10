const ModeratorDetails = ({Moderator}) =>{
    
    return(
        <div className="Moderator-details">
            <h4>{Moderator.name}</h4>
            <p><strong>Assigned (kg): </strong> {Moderator.load}</p>
            {/* <p><strong>Reps (kg): </strong> {Moderator.reps}</p>
            <p>{Moderator.createdAt}</p> */}

        </div>
    )
}

export default ModeratorDetails