import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/auth';

const UpdateModerator = () => {
    const { token } = useAuth();
    const { id } = useParams();
    const [moderator, setModerator] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        nicPassport: '',
        gender: '',
        address: '',
        role: 'moderator',
        phone: ''
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch moderator details when the component mounts
        const fetchModerator = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/moderator/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setModerator(response.data);
            } catch (error) {
                console.error('Failed to fetch moderator', error);
            }
        };

        fetchModerator();
    }, [id, token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.patch(`${import.meta.env.VITE_API_URL}/admin/moderator/${id}`, moderator, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                setSuccessMessage('Moderator updated successfully!');
                setTimeout(() => {
                    setSuccessMessage(''); // Clear the success message after a few seconds
                    navigate('/admin/ManageModerators'); // Redirect back to the moderator list
                }, 3000); // Message disappears after 3 seconds
            }
        } catch (error) {
            console.error('Error updating moderator', error);
            setErrorMessage('Failed to update moderator. Please try again.');
            setTimeout(() => setErrorMessage(''), 5000); // Clear error message after 5 seconds
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setModerator((prevModerator) => ({
            ...prevModerator,
            [name]: value
        }));
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6 max-w-xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6 text-center">Update Moderator</h2>

            {/* Success Message */}
            {successMessage && (
                <div className="bg-green-500 text-white p-4 rounded-md mb-4 text-center">
                    {successMessage}
                </div>
            )}

            {/* Error Message */}
            {errorMessage && (
                <div className="bg-red-500 text-white p-4 rounded-md mb-4 text-center">
                    {errorMessage}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block font-medium text-gray-700">First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        value={moderator.firstName}
                        onChange={handleChange}
                        className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block font-medium text-gray-700">Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        value={moderator.lastName}
                        onChange={handleChange}
                        className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={moderator.email}
                        onChange={handleChange}
                        className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={moderator.password}
                        onChange={handleChange}
                        className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block font-medium text-gray-700">NIC/Passport</label>
                    <input
                        type="text"
                        name="nicPassport"
                        value={moderator.nicPassport}
                        onChange={handleChange}
                        className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block font-medium text-gray-700">Gender</label>
                    <select
                        name="gender"
                        value={moderator.gender}
                        onChange={handleChange}
                        className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block font-medium text-gray-700">Address</label>
                    <textarea
                        name="address"
                        value={moderator.address}
                        onChange={handleChange}
                        className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block font-medium text-gray-700">Phone</label>
                    <input
                        type="text"
                        name="phone"
                        value={moderator.phone}
                        onChange={handleChange}
                        className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block font-medium text-gray-700">Role</label>
                    <input
                        type="text"
                        name="role"
                        value={moderator.role}
                        onChange={handleChange}
                        className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default UpdateModerator;
