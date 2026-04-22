import { useState } from "react";;
import { useNavigate } from 'react-router';
import axios from 'axios';

interface SignUpFormProps {
  loadUserProfile: () => void;
}

function SignUpForm({ loadUserProfile }: SignUpFormProps) {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();  // Prevent default form submission

     // Simple validation check
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      alert("Please fill out all fields.");
      return;
    }
    
    try {

      // Get JWT Cookie and Sign up
       const response = await axios.post('http://localhost:3000/api/auth/signup', formData, {
        withCredentials: true,  // Allow cookies (JWT) to be sent and received
      });
       
      // If sign up is successful navigate to home
      if (response.data.success) {
        console.log('Sign-up successful');
        await loadUserProfile()
        navigate('/home');
      } else {
        alert('Sign-up failed');
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
      <h1>SIGN UP</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
        <br />
        <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
        <br />
        <input type="text" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <br />
        <input type="text" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
        <br />
        <br />
        <input type="submit" value="Sign-up" />
      </form>

    </>
  );
};

export default SignUpForm;