import SignupForm from "./SignUpForm";

interface SignupPageProps {
  loadUserProfile: () => void;
}

function SignupPage({ loadUserProfile }: SignupPageProps) {
    return (
        <>
        <SignupForm loadUserProfile={loadUserProfile} />
        </>
    );
};

export default SignupPage;