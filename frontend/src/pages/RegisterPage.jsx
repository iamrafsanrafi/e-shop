import { useState } from "react";
import Button from "../components/Button";
import { toast } from "react-toastify";
import { handleCreateUser, handleSignInWithGoogle } from "../firebase/authService";
import { Link, Navigate, useNavigate } from "react-router";
import { createUserDocument } from "../firebase/firestoreService";
import { useSelector } from "react-redux";

const RegisterPage = () => {
    // States
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Extra hooks
    const navigate = useNavigate();

    // If user is already logged in navigate to dashboard
    const { user } = useSelector(state => state.auth);
    if (user) {
        return <Navigate to="/dashboard" />
    }

    // Regular Expressions
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/;

    const handleRegister = (e) => {
        // Prevents page reload
        e.preventDefault();

        // Checking if all value are available
        if (!name || !email || !password) {
            toast.error("Please provide data for all fields.");
            return;
        }

        // Checking if name is valid
        if (name.length < 4) {
            toast.warning("Name should at leats contain 4 letters.");
            return;
        }

        // Checking if email is valid
        if (!emailRegex.test(email)) {
            toast.error("Email is not valid.");
            return;
        }

        // Checking if password is strong
        if (!passwordRegex.test(password)) {
            toast.error("Password must be at least 6 characters and include uppercase, lowercase, number, and special character.");
            return;
        }

        // If everything is ok then create the account
        handleCreateUser(email, password)
            .then(async (userCredentials) => {
                const user = userCredentials.user;

                // Create user doc immediately
                await createUserDocument(user, { displayName: name })

                setEmail("");
                setName("");
                setPassword("");
                navigate("/dashboard");
            })
            .catch(e => {
                toast.error(e.message);
            })
    };

    const handleGoogleSignUp = () => {
        handleSignInWithGoogle()
            .then(async (res) => {
                const user = res.user;

                // Create user doc immediately
                await createUserDocument(user, { displayName: user.displayName })

                navigate("/dashboard");
            })
            .catch(e => {
                toast.error(e.message);
            })
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-white px-4">
            <div className="w-full max-w-lg border border-[#CBCBCB] rounded-[12px] p-8 sm:p-10 shadow-sm">
                {/* Title */}
                <h2 className="text-[#303030] font-['Poppins'] text-[22px] sm:text-3xl font-semibold leading-[36px] text-center">
                    Create Account
                </h2>
                <p className="text-[#303030] opacity-75 font-['Montserrat'] text-sm sm:text-base mt-2 text-center">
                    Register to start shopping
                </p>

                {/* Form */}
                <form onSubmit={handleRegister} className="mt-8 flex flex-col gap-6">
                    {/* Name */}
                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="name"
                            className="text-[#303030] font-['Montserrat'] text-sm sm:text-base font-semibold"
                        >
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Amelia Robert Watson"
                            required
                            className="py-3 px-4 outline-none border border-[#CBCBCB] rounded-[10px] text-[#303030] placeholder:text-[#303030] placeholder:opacity-75 font-['Montserrat'] text-base w-full"
                        />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="email"
                            className="text-[#303030] font-['Montserrat'] text-sm sm:text-base font-semibold"
                        >
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="amelia.watson@eshop.com"
                            required
                            className="py-3 px-4 outline-none border border-[#CBCBCB] rounded-[10px] text-[#303030] placeholder:text-[#303030] placeholder:opacity-75 font-['Montserrat'] text-base w-full"
                        />
                    </div>

                    {/* Password */}
                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="password"
                            className="text-[#303030] font-['Montserrat'] text-sm sm:text-base font-semibold"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="$Qwerty123"
                            required
                            className="py-3 px-4 outline-none border border-[#CBCBCB] rounded-[10px] text-[#303030] placeholder:text-[#303030] placeholder:opacity-75 font-['Montserrat'] text-base w-full"
                        />
                    </div>

                    {/* Register Button */}
                    <div className="text-center">
                        <Button value="Register" paddingX="40px" paddingY="16px" width="100%" />
                    </div>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-3 mt-6">
                    <div className="flex-1 h-px bg-[#CBCBCB]" />
                    <span className="text-[#303030] font-['Montserrat'] text-sm opacity-75">
                        OR
                    </span>
                    <div className="flex-1 h-px bg-[#CBCBCB]" />
                </div>

                {/* Google Sign Up */}
                <div className="mt-6">
                    <button
                        onClick={handleGoogleSignUp}
                        className="w-full flex items-center justify-center gap-3 py-3 border border-[#CBCBCB] rounded-[10px] font-['Montserrat'] text-base text-[#303030] hover:bg-[#f8f8f8] transition cursor-pointer"
                    >
                        <img
                            src="https://www.svgrepo.com/show/355037/google.svg"
                            alt="Google"
                            className="w-5 h-5"
                        />
                        Continue with Google
                    </button>
                </div>

                <p className="text-center text-[#303030] opacity-75 mt-6 font-['Montserrat']">
                    Already have an account?{" "}
                    <Link to="/login" className="text-[#FF624C] cursor-pointer hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
