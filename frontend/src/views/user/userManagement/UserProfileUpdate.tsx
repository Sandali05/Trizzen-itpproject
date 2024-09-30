import { useState, useEffect, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

interface UserProfile {
  firstname: string;
  lastname: string;
  email: string;
  address: string;
}

const UserProfileUpdate = () => {
  const navigate = useNavigate();

  // State to hold form data
  const [formData, setFormData] = useState<UserProfile>({
    firstname: '',
    lastname: '',
    email: '',
    address: ''
  });
  
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  // Fetch user data from API and pre-fill the form
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/profilep-get`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userProfile: UserProfile = response.data;
        setFormData({
          firstname: userProfile.firstname,
          lastname: userProfile.lastname,
          email: userProfile.email,
          address: userProfile.address,
        });
      } catch (err) {
        setError("Failed to fetch user data");
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate password match
    if (password && password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const token = localStorage.getItem('token');
      
      const updatedUser = {
        ...formData,
        ...(password && { password }) // Only include password if it’s changed
      };

      const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/auth/profile-update`, updatedUser, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        navigate("/profile");
      }
    } catch (err: any) {
      setError(err.response?.data.message || 'Failed to update profile');
    }
  };

  return (
    <div>
      <div className="grid justify-center bg-gray-100 mx-auto mb-16 mt-12 p-5 rounded-xl max-w-lg drop-shadow-md">
        <h1 className="text-2xl text-black text-center mb-4">Update Profile</h1>
        <form className="w-96 grid" onSubmit={handleSubmit}>
          <label className="text-gray-500">First Name</label>
          <input
            type="text"
            className="rounded-lg p-2 px-5 mb-4 border border-gray-300"
            placeholder="Enter your first name here"
            name="firstname"
            onChange={handleChange}
            value={formData.firstname}
            required
          />
          <label className="text-gray-500">Last Name</label>
          <input
            type="text"
            className="rounded-lg p-2 px-5 mb-4 border border-gray-300"
            placeholder="Enter your last name here"
            name="lastname"
            onChange={handleChange}
            value={formData.lastname}
            required
          />
          <label className="text-gray-500">Email Address</label>
          <input
            type="email"
            className="rounded-lg p-2 px-5 mb-4 border border-gray-300"
            placeholder="Enter your email here"
            name="email"
            onChange={handleChange}
            value={formData.email}
            required
          />
          <label className="text-gray-500">Delivery Address</label>
          <input
            type="text"
            className="rounded-lg p-2 px-5 mb-4 border border-gray-300"
            placeholder="Enter your Address here"
            name="address"
            onChange={handleChange}
            value={formData.address}
            required
          />
          <label className="text-gray-500">New Password</label>
          <input
            type="password"
            className="rounded-lg p-2 px-5 mb-4 border border-gray-300"
            placeholder="Enter your new password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <label className="text-gray-500">Re-enter New Password</label>
          <input
            type="password"
            className="rounded-lg p-2 px-5 mb-4 border border-gray-300"
            placeholder="Re-enter your new password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />

          <div className="btn section flex m-4 ml-0">
            <button
              type="submit"
              className="mx-auto px-5 py-2 px-10 text-20 text-white font-semibold rounded-lg border focus:outline-none bg-primary"
            >
              Update
            </button>
          </div>

          {error && (
            <div
              id="alert-2"
              className="flex items-center p-4 mb-4 text-red-800 rounded-full bg-red-50 justify-center border-red-400 border-2"
              role="alert"
            >
              <svg
                className="flex-shrink-0 w-6 h-6"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <div className="ms-3 text-lg font-medium">{error}</div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default UserProfileUpdate;
