import { useModeratorsContext } from "../../hooks/useModeratorsContext";
import axios from 'axios';
import { useAuth } from '../../context/auth';

const ModeratorDetails = ({ Moderator }) => {
    const { token } = useAuth();
    const { dispatch } = useModeratorsContext();

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

    return (
        <div className="bg-white shadow-md rounded-lg p-6 w-full">
            <h4 className="text-xl font-semibold mb-2 text-blue-600">{Moderator.firstname} {Moderator.lastname}</h4>
            <p><strong>Number of Currently Assigned Listings: </strong> {Moderator.assigned}</p>
            <strong onClick={handleClick} className="cursor-pointer text-red-600 hover:text-red-800 font-bold">Delete</strong>
        </div>
    );
};

export default ModeratorDetails;
