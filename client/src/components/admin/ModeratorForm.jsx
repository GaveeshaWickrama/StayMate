import { useState } from "react";
import axios from 'axios';
import { useAuth } from '../../context/auth';
import { useModeratorsContext } from "../../hooks/useModeratorsContext";

const ModeratorForm = () => {
    const { token } = useAuth();
    const { dispatch } = useModeratorsContext();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nicPassport, setNicPassport] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const [emptyFields, setEmptyFields] = useState([]);
    const role = 'moderator';

    // Validation state
    const [fieldErrors, setFieldErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        nicPassport: '',
        phone: ''
    });

    const handleChange = (e) => {
        setGender(e.target.value);
    };

    // Validate form fields before submission
    const validateForm = () => {
        let valid = true;
        const errors = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            nicPassport: '',
            phone: ''
        };

        if (!firstName || !/^[a-zA-Z]+$/.test(firstName)) {
            errors.firstName = 'First name is required and must contain only letters.';
            valid = false;
        }
        if (!lastName || !/^[a-zA-Z]+$/.test(lastName)) {
            errors.lastName = 'Last name is required and must contain only letters.';
            valid = false;
        }
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Please enter a valid email address.';
            valid = false;
        }
        if (!password || password.length < 6) {
            errors.password = 'Password must be at least 6 characters long.';
            valid = false;
        }
        if (!nicPassport || !/^[a-zA-Z0-9]+$/.test(nicPassport)) {
            errors.nicPassport = 'NIC/Passport is required and must be alphanumeric.';
            valid = false;
        }
        if (!phone || !/^\d{10}$/.test(phone)) {
            errors.phone = 'Phone number must be 10 digits.';
            valid = false;
        }

        setFieldErrors(errors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return; // Don't submit if validation fails
        }

        const moderator = { firstName, lastName, email, password, nicPassport, gender, address, role, phone };

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/admin/moderators`, moderator, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.status !== 201) {
                setError(response.data.error);
                setEmptyFields(response.data.emptyFields);
            } else {
                setError(null);
                setFirstName('');
                setLastName('');
                setEmail('');
                setPassword('');
                setNicPassport('');
                setGender('');
                setAddress('');
                setPhone('');
                console.log('New moderator added:', response.data);
                dispatch({ type: 'CREATE_MODERATORS', payload: response.data });
            }
        } catch (error) {
            setError(error.response?.data?.error);
        }
    };

    return (
        <form className="bg-white shadow-md rounded-lg p-6" onSubmit={handleSubmit}>
            <h3 className="text-xl font-semibold mb-4">Add a New Moderator</h3>

            <label className="block mb-2">First Name:</label>
            <input 
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                className={`w-full p-2 mb-4 border rounded ${fieldErrors.firstName ? 'border-red-500' : 'border-gray-300'}`}
            />
            {fieldErrors.firstName && <p className="text-red-500 text-sm">{fieldErrors.firstName}</p>}

            <label className="block mb-2">Last Name:</label>
            <input 
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                className={`w-full p-2 mb-4 border rounded ${fieldErrors.lastName ? 'border-red-500' : 'border-gray-300'}`}
            />
            {fieldErrors.lastName && <p className="text-red-500 text-sm">{fieldErrors.lastName}</p>}

            <label className="block mb-2">Email:</label>
            <input 
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className={`w-full p-2 mb-4 border rounded ${fieldErrors.email ? 'border-red-500' : 'border-gray-300'}`}
            />
            {fieldErrors.email && <p className="text-red-500 text-sm">{fieldErrors.email}</p>}

            <label className="block mb-2">Password:</label>
            <input 
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className={`w-full p-2 mb-4 border rounded ${fieldErrors.password ? 'border-red-500' : 'border-gray-300'}`}
            />
            {fieldErrors.password && <p className="text-red-500 text-sm">{fieldErrors.password}</p>}

            <label className="block mb-2">NIC/Passport:</label>
            <input 
                type="text"
                onChange={(e) => setNicPassport(e.target.value)}
                value={nicPassport}
                className={`w-full p-2 mb-4 border rounded ${fieldErrors.nicPassport ? 'border-red-500' : 'border-gray-300'}`}
            />
            {fieldErrors.nicPassport && <p className="text-red-500 text-sm">{fieldErrors.nicPassport}</p>}

            <label className="block mb-2">Address:</label>
            <input 
                type="text"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                className="w-full p-2 mb-4 border rounded"
            />

            <label className="block mb-2">Role:</label>
            <input 
                type="text"
                value={role}
                className="w-full p-2 mb-4 border rounded"
                readOnly
            />

            <label className="block mb-2">Gender:</label>
            <div className="mb-4">
                <label className="mr-4">
                    <input 
                        type="radio" 
                        value="male" 
                        checked={gender === 'male'} 
                        onChange={handleChange} 
                        className="mr-2"
                    />
                    Male
                </label>
                <label>
                    <input 
                        type="radio" 
                        value="female" 
                        checked={gender === 'female'} 
                        onChange={handleChange} 
                        className="mr-2"
                    />
                    Female
                </label>
            </div>

            <label className="block mb-2">Phone:</label>
            <input 
                type="text"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                className={`w-full p-2 mb-4 border rounded ${fieldErrors.phone ? 'border-red-500' : 'border-gray-300'}`}
            />
            {fieldErrors.phone && <p className="text-red-500 text-sm">{fieldErrors.phone}</p>}

            <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Add Moderator</button>
            {error && <div className="mt-4 text-red-500 border border-red-500 p-2">{error}</div>}
        </form>
    );
};

export default ModeratorForm;
