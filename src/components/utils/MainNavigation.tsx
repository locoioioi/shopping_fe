import { NavLink } from "react-router-dom";
import logo from "../../assests/image/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppDispatch, useAppSelector } from "../../store";
import { getTokenData } from "../../utils/helper";
import { useState } from "react";
import { logout } from "../../store/AuthSlice";
import { getUser } from "../../api/UserApi";
import { useQuery } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";

export const MainNavigation: React.FC = () => {
    const dispatch = useAppDispatch();
    const isLogin = useAppSelector(state => state.auth.isLogin);
    const data = getTokenData(localStorage.getItem("token") ?? "");
    const {data: user, isPending, isError, error} = useQuery({
        queryKey: ["user"],
        queryFn: () => getUser(data!.id),
        enabled: isLogin,
    })
    
    const isAdmin = user?.roles.includes("ADMIN");
    
    const navClass : string = "font-poppins font-medium text-lg text-darkBlue-100";
    let activeWishlist : string = "";

    const [openProfile, setOpenProfile] = useState<boolean>()
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        dispatch(logout());
    };
    return (
        <nav className="flex flex-row m-auto justify-between">
            <ul className="flex items-center py-5 gap-11">
                <li className="w-40">
                    <img src={logo} alt="cute logo of website" />
                </li>
                <li className={navClass}>
                    <NavLink className={({isActive}) => isActive ? "active-indicator relative" : "" } to="/">
                        Home                        
                    </NavLink>
                </li>
                <li className={navClass}>
                    <NavLink className={({isActive}) => isActive ? "active-indicator relative" : "" } to="/products">
                        Product
                    </NavLink>
                </li>
                {
                    isLogin && 
                    <>
                        <li className={navClass}>
                            <NavLink className={({isActive}) => isActive ? "active-indicator relative" : "" } to="/missions">
                                Mission
                            </NavLink>
                        </li>
                        <li className={navClass}>
                            <NavLink className={({isActive}) => isActive ? "active-indicator relative" : "" } to="/requests">
                                Request
                            </NavLink>
                        </li>
                    </>
                }
                {
                    isAdmin && 
                    <li className={navClass}>
                        <NavLink className={({isActive}) => isActive ? "active-indicator relative" : "" } to="/admin">
                            Admin
                        </NavLink>
                    </li>
                }

            </ul>
            <ul className="flex items-center py-5 gap-8">
                {
                    isLogin && 
                    <>
                    <li>
                        <NavLink to="/cart">
                            <FontAwesomeIcon icon="shopping-cart" className="text-darkBlue-100"/>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={
                            ({isActive}) => isActive 
                            ? activeWishlist = "text-red-600" 
                            : activeWishlist = "text-darkBlue-100"
                        } to="/wishlist">
                            <FontAwesomeIcon icon="heart" className={activeWishlist} />
                        </NavLink>
                    </li>
                    <li onClick={() => {
                        setOpenProfile(!openProfile);
                    }} className="font-poppins text-lg relative text-darkBlue-100 py-2 px-4 rounded bg-darkBlue-100 bg-opacity-5 hover:cursor-pointer hover:bg-opacity-15">
                        <div>
                            {
                                isPending && <ClipLoader size={15} />
                            }
                            {
                                isError && <p className="text-red-500 font-poppins font-semibold text-base">{error.message}</p>
                            }
                            {
                                user && `${user.firstName} ${user.lastName}`
                            }
                        </div>
                        <div className={`absolute left-0 ${!openProfile && "hidden"}`} style={{width: "100%"}}>
                            <ul className="mt-3 flex flex-col justify-center items-center">
                                <NavLink to={"/profile"} className="p-1 pr-3 text-base rounded bg-darkBlue-100 bg-opacity-5 hover:bg-opacity-10 text-right mb-1" style={{width : "100%"}} >
                                    <p className={"text-right"}>
                                        Profile
                                    </p>
                                </NavLink>
                                <li onClick={handleLogout} className="p-1 pr-3 text-base rounded bg-darkBlue-100 bg-opacity-5 hover:bg-opacity-10 text-right " style={{width : "100%"}} >
                                    Logout
                                </li>
                            </ul>
                        </div>
                    </li>
                    </>
                }

                {
                    !isLogin && <li className="font-poppins text-lg py-2 px-4 rounded bg-darkBlue-100 bg-opacity-5 
                    hover:bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:text-white">
                    <NavLink to="/login">
                        Log in
                    </NavLink>
                    </li>
                }

            </ul>
        </nav>
    );
};