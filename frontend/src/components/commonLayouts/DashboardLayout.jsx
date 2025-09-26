import { Outlet } from "react-router";
import DashboardSidebar from "../DashboardSidebar";
import Header from "../header/Header";

const DashboardLayout = () => {
    return (
        <div>
            <Header />
            <div className="flex mt-6 border-t border-gray-200">
                {/* <DashboardSidebar /> */}
                <div className="flex-1">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;