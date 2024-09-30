import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    firstname: '',
    lastname: '',
    address: '',
    mobilenumber: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let valid = true;
    let newError: string | null = null;

    // Validate username
    if (!/^[A-Za-z]{5,}$/.test(formData.username)) {
      newError = "Username must be at least 6 characters long";
      valid = false;
    }

    // Validate first name
    if (!/^[A-Za-z\s]+$/.test(formData.firstname)) {
      newError = "First name must contain only alphabetic letters and spaces.";
      valid = false;
    }

    // Validate last name
    if (!/^[A-Za-z\s]+$/.test(formData.lastname)) {
      newError = "Last name must contain only alphabetic letters and spaces.";
      valid = false;
    }

    // Validate address
    if (formData.address.trim() === '') {
      newError = "Address cannot be empty.";
      valid = false;
    }

    // Validate mobile number
    if (!/^0\d{9}$/.test(formData.mobilenumber)) {
      newError = "Mobile number must start with 0 and be 10 digits long";
      valid = false;
    }

    // Validate email
    if (!/^[a-zA-Z][\w.-]*@[a-zA-Z]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      newError = "E-mail should start with a letter and contain '@'.";
      valid = false;
    }

    setError(newError);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = validateForm();

    if (!isValid) {
      return; // Stop submission if the form is invalid
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, formData);
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://as2.ftcdn.net/v2/jpg/05/14/61/19/1000_F_514611937_qV2pt6TIKXHAWRnUod3X4buhIqWQeeUb.jpg')" }}>
      <div className="flex items-center justify-center min-h-screen bg-gray-900 bg-opacity-50 p-4">
        <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Register</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  placeholder="Enter your username"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstname">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  placeholder="Enter your first name"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastname">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  placeholder="Enter your last name"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  placeholder="Enter your address"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mobilenumber">
                  Mobile Number
                </label>
                <input
                  type="text"
                  id="mobilenumber"
                  name="mobilenumber"
                  value={formData.mobilenumber}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  placeholder="Enter your mobile number"
                  required
                />
              </div>
              <div className="mb-4 md:col-span-2">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="mb-4 md:col-span-2">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Register
            </button>
            <p className="text-center mt-4 text-gray-500">Already have an account? <a href="/login" className="text-blue-500">Login</a></p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
