import { useState } from "react";
import Button from "../components/Button";
import { toast } from "react-toastify";
import { Link, Navigate, useNavigate } from "react-router";
import { handleSignInUser, handleSignInWithGoogle } from "../firebase/authService";
import { useDispatch, useSelector } from "react-redux";
import { getUserCart } from "../firebase/firestoreService";
import { setCart } from "../slices/cartSlice";

const LoginPage = () => {
    // States
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Extra hooks
    const naviage = useNavigate();
    const dispatch = useDispatch();

    // If user is already logged in navigate to dashboard
    const { user } = useSelector(state => state.auth);
    if (user) {
        return <Navigate to="/dashboard" />
    }

    // Regular Expressions
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleEmailLogin = (e) => {
        // Prevents page reload
        e.preventDefault();

        // Checking if email and password both exists
        if (!email || !password) {
            toast.error("Please enter email and password!");
            return;
        }

        // Checking if email is valid
        if (!emailRegex.test(email)) {
            toast.error("Email is not valid!");
            return;
        }

        // Login the user if credentials are correct
        handleSignInUser(email, password)
            .then(async (res) => {
                const user = res.user;

                // Getting user cart data
                const cart = await getUserCart(user.uid);

                // Setting cart data to redux
                dispatch(setCart(cart));

                // dispatch(setLoading(true));
                naviage("/dashboard");
            })
            .catch(e => {
                const errorCode = e.code;
                if (errorCode === "auth/invalid-email") {
                    toast.error("The email address is not valid.")
                } else if (errorCode === "auth/user-not-found") {
                    toast.error("No user found with this email. Please sign up first.");
                } else if (errorCode === "auth/wrong-password") {
                    toast.error("Incorrect password. Please try again.");
                } else if (errorCode === "auth/too-many-requests") {
                    toast.error("Too many failed attempts. Try again later.");
                } else if (errorCode === "auth/network-request-failed") {
                    toast.error("Network error. Please check your internet connection.");
                } else if (errorCode === "auth/email-already-in-use") {
                    toast.error("This email is already in use. Try signing in instead.");
                } else if (errorCode === "auth/invalid-credential") {
                    toast.error("Invalid email or password. Please check your details.");
                } else if (errorCode === "auth/account-exists-with-different-credential") {
                    toast.error("An account already exists with this email but a different sign-in method. Try using that method.");
                }
            })
    };

    const handleGoogleLogin = () => {
        handleSignInWithGoogle()
            .then(async (res) => {
                const user = res.user;

                // Getting user cart data
                const cart = await getUserCart(user.uid);

                // Setting cart data to redux
                dispatch(setCart(cart));
                
                naviage("/dashboard");
            })
            .catch(e => {
                toast.error(e.message);
            })
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-white px-4">
            <div className="w-full max-w-lg border border-[#CBCBCB] rounded-[12px] p-8 sm:p-10 shadow-sm">
                {/* Title */}
                <h2 className="text-[#303030] font-['Poppins'] text-[22px] sm:text-3xl font-semibold leading-[36px] text-center">
                    Welcome Back
                </h2>
                <p className="text-[#303030] opacity-75 font-['Montserrat'] text-sm sm:text-base mt-2 text-center">
                    Please log in to continue
                </p>

                {/* ----Login form---- */}
                <form onSubmit={handleEmailLogin} className="mt-8 flex flex-col gap-6">
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

                    {/* Login Button */}
                    <div className="text-center">
                        <Button value="Login" paddingX="40px" paddingY="16px" width="100%" />
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

                {/* Google Login */}
                <div className="mt-6">
                    <button
                        onClick={handleGoogleLogin}
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
                    Don't have an account?{" "}
                    <Link to="/register" className="text-[#FF624C] cursor-pointer hover:underline">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
