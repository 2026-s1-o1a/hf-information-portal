import { Link } from 'react-router-dom';
import LoginForm from './SignInForm';
import styles from '../../Register.module.css';

interface LoginPageProps {
  loadUserProfile: () => void;
}

function SignInPage({ loadUserProfile }: LoginPageProps) {
  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerCard}>
        <h2>LOG IN</h2>
        <div className={styles.registerForm}>
          <LoginForm loadUserProfile={loadUserProfile} />
        </div>
        <br />
        <br />
        <Link to="/">Go home!</Link>
      </div>
    </div>
  );
}

export default SignInPage;