import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HostFeedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch feedback data from the backend
        axios.get('http://localhost:5000/api/feedbacks')
            .then(response => {
                setFeedbacks(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Tenant Feedbacks</h1>
            {feedbacks.length > 0 ? (
                <ul className="space-y-4">
                    {feedbacks.map(feedback => (
                        <li key={feedback.id} className="p-4 bg-white rounded shadow">
                            <h2 className="text-xl font-semibold">{feedback.title}</h2>
                            <p className="text-gray-700">{feedback.comment}</p>
                            <div className="text-sm text-gray-500">
                                <p>Rating: {feedback.rating}</p>
                                <p>Submitted by: {feedback.tenantName}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div>No feedbacks available.</div>
            )}
        </div>
    );
};

export default HostFeedback;
