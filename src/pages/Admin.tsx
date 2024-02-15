import { Sidebar } from "../components/admin/Sidebar";
import { Outlet } from "react-router-dom";
export const Admin: React.FC = () => {
    return (
        <div className="flex flex-row">
            <Sidebar />
            <Outlet />
        </div>
    )
};