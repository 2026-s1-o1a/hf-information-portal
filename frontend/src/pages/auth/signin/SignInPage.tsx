import { Link } from "react-router";
import SignUpForm from "../signup/SignUpForm";

interface SignupPageProps {
  loadUserProfile: () => void;
}

function SignupPage({ loadUserProfile }: SignupPageProps) {

  return (
    <>
      <SignUpForm loadUserProfile={loadUserProfile} />
      <br />
      <Link to="/signup">Don't have an account sign-up here!</Link>
    </>
  );
};

export default SignupPage;
