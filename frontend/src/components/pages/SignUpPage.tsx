import { SignUp } from "@clerk/clerk-react";

const SignUpPage: React.FC = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <SignUp
                path="/sign-up"
                routing="path"
            />
        </div>
    )
}

export default SignUpPage