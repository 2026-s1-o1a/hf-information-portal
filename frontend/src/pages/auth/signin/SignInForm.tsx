import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../../Register.module.css';

interface LoginFormProps {
  loadUserProfile: () => void;
}

function SignInForm({ loadUserProfile }: LoginFormProps) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!formData.email || !formData.password) {
      alert('Please fill out all fields.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/auth/signin', formData, {
        withCredentials: true,
      });

      if (response.data.success) {
        console.log('Sign-in successful');
        await loadUserProfile();  // Refresh user state
        navigate('/');
      } else {
        alert('Sign-in failed');
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data.message || 'Error logging in');
      } else {
        console.error('Unexpected error:', error);
        alert('An unexpected error occurred. Please try again.');
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className={styles.registerBtn}>
        Log In
      </button>

      <p>Don't have an account?</p>

      <button
        type="button"
        className={styles.registerBtn}
        onClick={() => navigate('/signup')}
      >
        Create One
      </button>
    </form>
  );
}

export default SignInForm;