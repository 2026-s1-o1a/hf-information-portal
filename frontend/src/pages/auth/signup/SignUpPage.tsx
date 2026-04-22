import { Link } from "react-router-dom";
import SignUpForm from "../signup/SignUpForm";

interface SignupPageProps {
  loadUserProfile: () => void;
}

function SignupPage({ loadUserProfile }: SignupPageProps) {

  return (
    <>
      <SignUpForm loadUserProfile={loadUserProfile} />
       <Link to="/signin">Already have an account? sign-in here!</Link>
    </>
  );
};

export default SignupPage;
