import { Link } from "react-router";
import SignInForm from "./SignInForm";

interface SignupPageProps {
  loadUserProfile: () => void;
}

function SignupPage({ loadUserProfile }: SignupPageProps) {

  return (
    <>
      <SignInForm loadUserProfile={loadUserProfile} />
      <br />
      <Link to="/signup">Don't have an account sign-up here!</Link>
    </>
  );
};

export default SignupPage;
