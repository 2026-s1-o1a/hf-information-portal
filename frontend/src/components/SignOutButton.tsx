import { useNavigate } from 'react-router';
import axios from 'axios';

interface SignOutButtonProps {
  loadUserProfile: () => void;
}

function SignOutButton({ loadUserProfile }: SignOutButtonProps) {

  const navigate = useNavigate();

  const handleSignOut = async (event: React.FormEvent) => {

    event.preventDefault();  // Prevent default form submission

    try {

      // Get JWT Cookie and Sign up
      const response = await axios.post('http://localhost:3000/api/auth/signout', {}, {
        withCredentials: true,  // Allow cookies (JWT) to be sent and received
      });

      // If sign up is successful navigate to home
      if (response.data.success) {
        console.log('Sign-out successful');
        await loadUserProfile();
        navigate('/');
      } else {
        alert('Sign-out failed');
      }

    } catch (error: unknown) {
        console.error('Unexpected error:', error);
        alert('An unexpected error occurred. Please try again.');
    }
  };
  
  return(
    <>
      <button onClick={handleSignOut}>Sign Out</button>;
    </>
  );
};

export default SignOutButton;