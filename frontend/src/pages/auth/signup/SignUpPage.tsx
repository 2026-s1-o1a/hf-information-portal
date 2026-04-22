import SignUpForm from "../signup/SignUpForm";

interface SignupPageProps {
  loadUserProfile: () => void;
}

function SignupPage({ loadUserProfile }: SignupPageProps) {

  return (
    <>
      <SignUpForm loadUserProfile={loadUserProfile} />
    </>
  );
};

export default SignupPage;
