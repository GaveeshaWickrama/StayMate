import { useModeratorsContext } from "../../hooks/useModeratorsContext";
import axios from 'axios';
import { useAuth } from '../../context/auth';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const ModeratorDetails = ({ Moderator }) => {
    const { token } = useAuth();
    const { dispatch } = useModeratorsContext();
    const navigate = useNavigate(); // For redirection

    const handleClick = async () => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/admin/moderators/${Moderator._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                dispatch({ type: 'DELETE_MODERATOR', payload: response.data });
            }
        } catch (error) {
            console.error(error);
            // Handle the error appropriately here, such as showing a notification to the user
        }
    };

    // Redirect to the update page with the moderator's id
    const handleUpdate = () => {
        navigate(`/admin/UpdateModerator/${Moderator._id}`);
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6 w-full">
            <h4 className="text-xl font-semibold mb-2 text-blue-600">{Moderator.firstName} {Moderator.lastName}</h4>
            <p><strong>Number of Currently Assigned Listings: </strong> {Moderator.assigned}</p>
            <div className="mt-4">
                <button
                    onClick={handleUpdate}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                    Update
                </button>
                <strong
                    onClick={handleClick}
                    className="cursor-pointer text-red-600 hover:text-red-800 font-bold ml-4"
                >
                    Delete
                </strong>
            </div>
        </div>
    );
};

export default ModeratorDetails;
