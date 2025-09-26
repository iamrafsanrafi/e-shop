import { useDispatch, useSelector } from "react-redux";
import { handleSignOut } from "../firebase/authService";
import { clearCart } from "../slices/cartSlice";
import { useNavigate } from "react-router";
import { FaLock } from "react-icons/fa";

const ProfileSection = () => {
    // Redux states
    const { name, email, phone, address, photoURL } = useSelector(state => state.auth.user);
    const { user } = useSelector(state => state.auth);

    // Extra hooks
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div>
            <h2 className="text-xl md:text-2xl font-semibold mb-4">Profile Information <span className="text-red-500 font-bold">{user.userType === "admin" ? "Admin*" : ""}</span></h2>
            <div className="flex items-center gap-2 sm:gap-5">
                {
                    photoURL && <div>
                        <img className="w-[72px] h-[72px]" src={photoURL} alt={name} />
                    </div>
                }
                <div className="space-y-4">
                    <div className="text-[14px] sm:text-base">
                        <span className="font-semibold">Full Name:</span> {name}
                    </div>
                    <div className="text-[14px] sm:text-base">
                        <span className="font-semibold">Email:</span> {email}
                    </div>

                    {phone && <div>
                        <span className="font-semibold">Phone:</span> {phone}
                    </div>}

                    {address && <div>
                        <span className="font-semibold">Address:</span> {address}
                    </div>}
                </div>
            </div>

            <div className="mt-5 pt-1 border-t border-gray-200">
                <button onClick={() => {
                    // Signing out
                    handleSignOut();
                    
                    // Clearing the cart
                    localStorage.removeItem("cart");
                    dispatch(clearCart());

                    // Navigation to home page
                    navigate("/");
                }} className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#FF624C] font-semibold bg-gray-200 lg:bg-transparent lg:hover:bg-gray-200 cursor-pointer transition-all">
                    <FaLock />
                    Logout
                </button>
            </div>
        </div>
    );
};

export default ProfileSection;