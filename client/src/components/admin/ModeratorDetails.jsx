const ModeratorDetails = ({ Moderator }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-6 w-full">
            <h4 className="text-xl font-semibold mb-2 text-blue-600">{Moderator.firstname} {Moderator.lastname}</h4>
            <p><strong>Number of Currently Assigned Listings : </strong> {Moderator.assigned}</p>
        </div>
    );
};

export default ModeratorDetails;
