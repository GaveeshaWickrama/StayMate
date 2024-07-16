import { useState } from "react";
import axios from 'axios';
import { useAuth } from '../../context/auth';
import { useModeratorsContext } from "../../hooks/useModeratorsContext";

const ModeratorForm = () => {
    const { token } = useAuth();
    const { dispatch } = useModeratorsContext();

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nic, setNic] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');
    const role = 'moderator';

    const handleSubmit = async (e) => {
        e.preventDefault();

        const moderator = { firstname, lastname, email, password, nic, gender, address, role };

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/admin/moderators`, moderator, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.status !== 201) {
                setError(response.data.error);
            } else {
                console.log("Came here")
                setError(null);
                console.log('State before reset:', { firstname, lastname, email, password, nic, gender, address });

                // Reset form fields
                setFirstname('');
                setLastname('');
                setEmail('');
                setPassword('');
                setNic('');
                setGender('');
                setAddress('');

                console.log('State after reset:', { firstname, lastname, email, password, nic, gender, address });

                console.log('new Moderator added', response.data);
                dispatch({ type: 'CREATE_MODERATORS', payload: response.data });
            }
        } catch (error) {
            setError(error.response?.data?.error );
        }
    };

    return (
        <form className="bg-white shadow-md rounded-lg p-6" onSubmit={handleSubmit}>
            <h3 className="text-xl font-semibold mb-4">Add a New Moderator</h3>

            <label className="block mb-2">First Name:</label>
            <input 
                type="text"
                onChange={(e) => setFirstname(e.target.value)}
                value={firstname}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            
            <label className="block mb-2">Last Name:</label>
            <input 
                type="text"
                onChange={(e) => setLastname(e.target.value)}
                value={lastname}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <label className="block mb-2">Email:</label>
            <input 
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <label className="block mb-2">Password:</label>
            <input 
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <label className="block mb-2">NIC:</label>
            <input 
                type="text"
                onChange={(e) => setNic(e.target.value)}
                value={nic}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <label className="block mb-2">Address:</label>
            <input 
                type="text"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
            />

            {/* hardcoding the role to be moderator */}
            <label className="block mb-2">Role:</label>
            <input 
                type="text"
                value={role}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                readOnly
            />

            <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Add Moderator</button>
            {error && <div className="mt-4 text-red-500 border border-red-500 bg-red-100 p-2 rounded">{error}</div>}
        </form>
    );
};

export default ModeratorForm;
