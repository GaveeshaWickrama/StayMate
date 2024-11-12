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
    const [error, setError] = useState('');
    const [emptyFields,setEmptyFields] = useState([])
    const [phone,setPhone] = useState('')
    const role = 'moderator';
    // const gender='male';
    // const phone="44";
    const handleChange = (e) => {
        setGender(e.target.value);
      };
    

    const handleSubmit = async (e) => {
        e.preventDefault();

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
                setEmptyFields(response.data.emptyFields)
            } else {
                
                setError(null);
                console.log('State before reset:', { firstName, lastName, email, password, nicPassport, gender, address });

                // Reset form fields
                setFirstName('');
                setLastName('');
                setEmail('');
                setPassword('');
                setNicPassport('');
                setGender('');
                setAddress('');

                console.log('State after reset:', { firstName, lastName, email, password, nicPassport, gender, address });

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
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                className="w-full p-2 mb-4 border rounded ${emptyFields.includes('firstName') ? 'border-red-500' : 'border-gray-300'}"
            />
            
            <label className="block mb-2">Last Name:</label>
            <input 
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                className="w-full p-2 mb-4 border rounded ${emptyFields.includes('lastName') ? 'border-red-500' : 'border-gray-300'}"
            />
            <label className="block mb-2">Email:</label>
            <input 
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="w-full p-2 mb-4 border rounded ${emptyFields.includes('email') ? 'border-red-500' : 'border-gray-300'}"
            />
            <label className="block mb-2">Password:</label>
            <input 
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="w-full p-2 mb-4 border rounded ${emptyFields.includes('password') ? 'border-red-500' : 'border-gray-300'}"
            />
            <label className="block mb-2">NICPassport:</label>
            <input 
                type="text"
                onChange={(e) => setNicPassport(e.target.value)}
                value={nicPassport}
                className="w-full p-2 mb-4 border rounded ${emptyFields.includes('') ? 'border-red-500' : 'border-gray-300'}"
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
                className="w-full p-2 mb-4 border border-gray-300 rounded"
            />

            <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Add Moderator</button>
            {error && <div className="mt-4 text-red-500 border border-red-500 bg-red-100 p-2 rounded">{error}</div>}
        </form>
    );
};

export default ModeratorForm;
