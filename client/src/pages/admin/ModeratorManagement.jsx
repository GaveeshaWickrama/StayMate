import { useEffect } from "react";
import axios from 'axios';
import { useAuth } from '../../context/auth';
import { useModeratorsContext } from "../../hooks/useModeratorsContext";

//components
import ModeratorDetails from "../../components/admin/ModeratorDetails";
import ModeratorForm from "../../components/admin/ModeratorForm";

const ModeratorManagement = () => {
    const { token } = useAuth();
    const {Moderators, dispatch} = useModeratorsContext();

    useEffect(() => {
        const fetchModerators = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/moderators`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.status === 200) {
                    console.log('Fetched Moderators:', response.data);  // Add this line
                    const json = response.data;
                    dispatch({type: 'SET_MODERATORS', payload: json})
                } else {
                    console.error('Failed to fetch moderators. Status:', response.status);
                }
            } catch (error) {
                console.error('Error fetching moderators:', error);
            }
        };

        fetchModerators();
    }, [token,dispatch]);

    return (
        <div className="container mx-auto bg-gray-100 p-8">
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="w-full lg:w-2/3">
                    {/* <h2 className="text-2xl font-bold mb-4">Moderators</h2> */}
                    <div className="grid grid-cols-1 gap-4">
                        {Moderators ? (
                            Moderators.map((Moderator) => (
                                <ModeratorDetails key={Moderator.id} Moderator={Moderator} />
                            ))
                        ) : (
                            <p>Loading moderators...</p>
                        )}
                    </div>
                </div>
                <div className="w-full lg:w-1/3">
                    <ModeratorForm />
                </div>
            </div>
        </div>
    );
};

export default ModeratorManagement;
