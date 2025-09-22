import ProfileSection from "../components/ProfileSection"
import OrdersSection from "../components/OrdersSection";
import WishlistSection from "../components/WishlistSection";
import SecuritySection from "../components/SecuritySection";
import SettingsSection from "../components/SettingsSection";
import ProductsSection from "../components/ProductsSection";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const DashboardPage = () => {
    const {user} = useSelector(state => state.auth);
    const { currentTab } = useSelector(state => state.dashboard);

    if(!user) {
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
            <main className="p-10">
                {renderSection()}
            </main>
        </div>
    );
};

export default DashboardPage;
