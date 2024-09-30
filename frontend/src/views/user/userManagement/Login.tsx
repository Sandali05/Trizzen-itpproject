import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, formData); // Use environment variables
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('userId', user._id);
      localStorage.setItem('user', user);
      console.log(user);
      console.log(user._id); // Store the user ID from the response
      navigate('/'); // Adjust to the correct route for user profile
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url(https://as2.ftcdn.net/v2/jpg/05/14/61/19/1000_F_514611937_qV2pt6TIKXHAWRnUod3X4buhIqWQeeUb.jpg)' }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative flex items-center justify-center min-h-screen shadow-xl">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-4xl font-bold mb-4 pb-8 text-center text-primary">Trizzen</h2>
          <h2 className="text-2xl font-bold mb-4">Welcome back chief!</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-500 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-500 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Login
            </button>
            <p className="text-center mt-4 text-gray-500">Don't have an account? <a href="/register" className="text-blue-500">Register</a></p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
