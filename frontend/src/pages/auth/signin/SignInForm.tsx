import { useState } from "react";
import { useNavigate } from 'react-router';
import axios from 'axios';

interface SignInFormProps {
  loadUserProfile: () => void;
}

function SignInForm({ loadUserProfile }: SignInFormProps) {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();  // Prevent default form submission

    // Simple validation check
    if (!formData.email || !formData.password) {
      alert("Please fill out all fields.");
      return;
    }

    try {

      // Get JWT Cookie and Sign up
      const response = await axios.post('http://localhost:3000/api/auth/signin', formData, {
        withCredentials: true,  // Allow cookies (JWT) to be sent and received
      });

      // If sign up is successful navigate to home
      if (response.data.success) {
        console.log('Sign-in successful');
        await loadUserProfile();
        navigate('/home');
      } else {
        alert('Sign-in failed');
      }

    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {

        // Backend error message
        alert(error.response?.data.message || 'Error submitting form');

      } else {
        console.error('Unexpected error:', error);
        alert('An unexpected error occurred. Please try again.');
      }
    }
  };


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,  // previous data form data
      [name]: value, // Update the specific field based on name
    }));
  };

  return (
    <>
      <h1>SIGN IN</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <br />
        <input type="text" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
        <br />
        <br />
        <input type="submit" value="Sign-in" />
      </form>
    </>
  );
};

export default SignInForm;