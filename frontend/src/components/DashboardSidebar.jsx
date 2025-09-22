import { FaUser, FaBoxOpen, FaHeart, FaLock, FaCog } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentTab } from "../slices/dashboardSlice";
import { handleSignOut } from "../firebase/authService";
import { useNavigate } from "react-router";
import { AiFillProduct } from "react-icons/ai";
import { clearCart } from "../slices/cartSlice";

const DashboardSidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentTab } = useSelector(state => state.dashboard);
    const { user, loading } = useSelector(state => state.auth);

    // if(loading) return;

    const sidebarItems = [
        { label: "Profile", icon: <FaUser /> },
        { label: "Orders", icon: <FaBoxOpen /> },
        { label: "Wishlist", icon: <FaHeart /> },
        { label: "Security", icon: <FaLock /> },
        { label: "Settings", icon: <FaCog /> },
        { label: user.userType === "admin" ? "Products" : "", icon: user.userType === "admin" ? <AiFillProduct /> : "" },
    ];

    return (
        <aside className="w-64 bg-white shadow-md border-r border-gray-200 min-h-screen p-6 flex flex-col">
            <h1 className="text-2xl font-bold mb-10 text-[#303030] font-['Poppins']">
                Dashboard
            </h1>
            <nav className="flex flex-col gap-3">
                {sidebarItems.map((item) => (
                    <button
                        key={item.label}
                        onClick={() => dispatch(setCurrentTab(item.label))}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
              ${currentTab === item.label
                                ? "bg-[#FF624C] text-white font-semibold shadow-lg"
                                : "text-[#303030] hover:bg-gray-100"
                            }`}
                    >
                        <span className="text-lg">{item.icon}</span>
                        <span className="text-sm sm:text-base">{item.label}</span>
                    </button>
                ))}
            </nav>

            {/* Logout Button at the bottom */}
            <div className="mt-5 pt-1 border-t border-gray-200">
                <button onClick={() => {
                    handleSignOut();
                    // Clearing the cart
                    localStorage.removeItem("cart");
                    dispatch(clearCart());
                    navigate("/");
                }} className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#FF624C] font-semibold hover:bg-gray-100 transition-all">
                    <FaLock />
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default DashboardSidebar;
