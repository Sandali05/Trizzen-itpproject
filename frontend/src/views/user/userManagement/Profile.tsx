import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  username: string;
  firstname: string;
  lastname: string;
  address: string;
  mobilenumber: string;
  email: string;
}

interface Order {
  name: string;
  totalAmount: number;
  status: string;
}

interface Feedback {
  name: string;
  rating: number;
  comment: string;
  reply?: string;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const profileResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/profilep-get`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(profileResponse.data);

        const ordersResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/orders/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(ordersResponse.data);

        // Fetch user's feedback
        const feedbackResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/feedbacks`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFeedbacks(feedbackResponse.data);
      } catch (err: any) {
        setError(err.response?.data.message || 'Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <p>Loading user profile...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="user-profile max-w-7xl mx-auto p-6 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 rounded-xl shadow-2xl space-y-8">
      {/* Profile Details */}
      {user && (
        <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h1 className="text-3xl font-bold text-gray-800">{user.firstname} {user.lastname}'s Profile</h1>
          <p className="mt-4 text-lg"><strong>Username:</strong> {user.username}</p>
          <p className="text-lg"><strong>Email:</strong> {user.email}</p>
          <p className="text-lg"><strong>Mobile Number:</strong> {user.mobilenumber}</p>
          <p className="text-lg"><strong>Address:</strong> {user.address}</p>
        </div>
      )}

      {/* Orders Section */}
      <div className="orders bg-gradient-to-r from-blue-100 to-blue-300 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Orders</h2>
        {orders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((order, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg font-semibold text-gray-700">{order.name}</h3>
                <p className="text-gray-600"><strong>Total Price:</strong> ${order.totalAmount.toFixed(2)}</p>
                <p className={`text-sm font-medium ${order.status === 'completed' ? 'text-green-600' : 'text-yellow-600'}`}>
                  <strong>Status:</strong> {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">You have no orders yet.</p>
        )}
      </div>

      {/* Feedback Section */}
      <div className="feedbacks bg-gradient-to-r from-purple-100 to-purple-300 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Feedback</h2>
        {feedbacks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {feedbacks.map((feedback, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-lg transition-shadow"
              >
                {/* <h3 className="text-lg font-semibold text-gray-700">{feedback.name}</h3>
                <p className="text-gray-600"><strong>Rating:</strong> {feedback.rating} / 5</p> */}
                <p className="text-gray-600"><strong>Comment:</strong> {feedback.comment}</p>
                {feedback.reply && (
                  <p className="text-blue-600"><strong>Reply:</strong> {feedback.reply}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">You have not submitted any feedback yet.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
