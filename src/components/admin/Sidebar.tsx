import { NavLink } from "react-router-dom";

export const Sidebar: React.FC = () => {
    return (
        <div className="w-2/12 bg-darkBlue-100 bg-opacity-5 rounded p-3">
            <h1 className="text-darkBlue-100 font-poppins text-2xl font-bold">Admin</h1>
            <ul className="mt-3">
                <li className="mt-2">
                    <NavLink to="/admin/missions" className="block text-center mt-5 rounded p-2 bg-purpleDark-100 text-white bg-opacity-60 ">Requests</NavLink>
                </li>
                <li className="mt-2">
                    <NavLink to="/admin/orders" className="block text-center mt-5 rounded p-2 bg-purpleDark-100 text-white bg-opacity-60 ">Orders</NavLink>
                </li>
                <li>
                    <NavLink to="/admin/product" className="block text-center mt-5 rounded p-2 bg-purpleDark-100 text-white bg-opacity-60 ">Products</NavLink>
                </li>
                <li>
                    <NavLink to="/admin/missions/create" className="block text-center mt-5 rounded p-2 bg-purpleDark-100 text-white bg-opacity-60 ">Missions</NavLink>
                </li>
            </ul>
        </div>
    )
};