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
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
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

    const validateForm = () => {
        const errors = {};
        let valid = true;

        if (!moderator.firstName || !/^[a-zA-Z]+$/.test(moderator.firstName)) {
            errors.firstName = 'First name is required and must contain only letters.';
            valid = false;
        }
        if (!moderator.lastName || !/^[a-zA-Z]+$/.test(moderator.lastName)) {
            errors.lastName = 'Last name is required and must contain only letters.';
            valid = false;
        }
        if (!moderator.email || !/\S+@\S+\.\S+/.test(moderator.email)) {
            errors.email = 'Please enter a valid email address.';
            valid = false;
        }
        if (!moderator.password || moderator.password.length < 6) {
            errors.password = 'Password must be at least 6 characters long.';
            valid = false;
        }
        if (!moderator.nicPassport || !/^[a-zA-Z0-9]+$/.test(moderator.nicPassport)) {
            errors.nicPassport = 'NIC/Passport is required and must be alphanumeric.';
            valid = false;
        }
        if (!moderator.phone || !/^\d{10}$/.test(moderator.phone)) {
            errors.phone = 'Phone number must be 10 digits.';
            valid = false;
        }
        if (!moderator.gender) {
            errors.gender = 'Please select a gender.';
            valid = false;
        }
        if (!moderator.address) {
            errors.address = 'Address is required.';
            valid = false;
        }

        setErrors(errors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const response = await axios.patch(`${import.meta.env.VITE_API_URL}/admin/moderator/${id}`, moderator, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                setSuccessMessage('Moderator updated successfully!');
                setTimeout(() => {
                    setSuccessMessage('');
                    navigate('/admin/ManageModerators');
                }, 3000);
            }
        } catch (error) {
            console.error('Error updating moderator', error);
            setErrorMessage('Failed to update moderator. Please try again.');
            setTimeout(() => setErrorMessage(''), 5000);
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

            {successMessage && (
                <div className="bg-green-500 text-white p-4 rounded-md mb-4 text-center">
                    {successMessage}
                </div>
            )}

            {errorMessage && (
                <div className="bg-red-500 text-white p-4 rounded-md mb-4 text-center">
                    {errorMessage}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                {['firstName', 'lastName', 'email', 'password', 'nicPassport', 'address', 'phone', 'gender'].map((field) => (
                    <div className="mb-4" key={field}>
                        <label className="block font-medium text-gray-700">
                            {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                        </label>
                        <input
                            type={field === 'password' ? 'password' : 'text'}
                            name={field}
                            value={moderator[field]}
                            onChange={handleChange}
                            className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
                    </div>
                ))}

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
