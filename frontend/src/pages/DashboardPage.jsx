import ProfileSection from "../components/ProfileSection"
import OrdersSection from "../components/OrdersSection";
import WishlistSection from "../components/WishlistSection";
import SecuritySection from "../components/SecuritySection";
import SettingsSection from "../components/SettingsSection";
import ProductsSection from "../components/ProductsSection";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import { useEffect } from "react";
import { clearCategory } from "../slices/productsSlice";

const DashboardPage = () => {
    // Redux states
    const { user } = useSelector(state => state.auth);
    const { currentTab } = useSelector(state => state.dashboard);
    const { category } = useSelector(state => state.products);

    // Extra hook
    const dispatch = useDispatch();

    useEffect(() => {
        if (category) {
            dispatch(clearCategory());
        }
    }, []);

    // This is used for scrolling back to the top
    useEffect(() => {
        if (window.scrollY > 0) {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [])

    if (!user) {
        return <Navigate to="/login" />
    }

    const renderSection = () => {
        switch (currentTab) {
            case "Profile": return <ProfileSection />;
            case "Orders": return <OrdersSection />;
            case "Wishlist": return <WishlistSection />;
            case "Security": return <SecuritySection />;
            case "Settings": return <SettingsSection />;
            case "Products": return <ProductsSection />
            default: return null;
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <main className="pt-5 sm:p-10 w-full flex justify-center">
                {renderSection()}
            </main>
        </div>
    );
};

export default DashboardPage;
