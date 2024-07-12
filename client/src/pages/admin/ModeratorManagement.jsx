import { useEffect, useState } from "react";
import axios from 'axios';
import { useAuth } from '../../context/auth';

//components
import ModeratorDetails from "../../components/admin/ModeratorDetails";
import ModeratorForm from "../../components/admin/ModeratorForm";

const ModeratorManagement = () => {
    const { token } = useAuth();
    const [Moderators, setModerators] = useState(null);

    useEffect(() => {
        const fetchModerators = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/moderators`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.status === 200) {
                    const json = response.data;
                    setModerators(json);
                } else {
                    console.error('Failed to fetch moderators. Status:', response.status);
                }
            } catch (error) {
                console.error('Error fetching moderators:', error);
            }
        };

        fetchModerators();
    }, [token]);

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
