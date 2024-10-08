import { SignIn } from "@clerk/clerk-react";

const SignInPage: React.FC = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <SignIn
                path="/sign-in"
                routing="path"
            />
        </div>
    )
}

export default SignInPage