import React from "react";
import profileImg from "../../assests/image/profileImg.jpg";
import { getTokenData } from "../../utils/helper";
import { useAppSelector } from "../../store";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../api/UserApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Information: React.FC = () => {
    const data = getTokenData(localStorage.getItem("token") ?? "");
    const isLogin = useAppSelector(state => state.auth.isLogin);
    // * fetch user data for display current points
    const {data: user} = useQuery({
        queryKey: ["user"],
        queryFn: () => getUser(data!.id),
        enabled: isLogin,
    })
    console.log(user);
    return <div className="mt-3">
        <h1 className="text-darkBlue-100 font-poppins text-2xl font-bold mb-3">Personal Information</h1>
        <div className="flex flex-row gap-4">
            <img src={profileImg} alt="Chin xinh" className="w-3/12 rounded-lg"/>
            <div className="flex flex-col gap-2 w-6/12 rounded-lg bg-darkBlue-100 bg-opacity-10 p-4">
                <h2 className="text-darkBlue-100 font-poppins text-xl">Nguyen Hue Chin (Chin cutee)</h2>
                <p className="mt-3 text-darkBlue-100 font-poppins text-xl">
                    Points: <FontAwesomeIcon icon={"diamond"}/> {user?.point}.00
                </p>
                <p className="mt-3 text-darkBlue-100 font-poppins text-base underline">
                    trinhxinh@cute2002.com
                </p>
                <p className="mt-3 text-darkBlue-100 font-poppins text-base">
                    1042 Le Van Luong, Tan Phong, District 7, Ho Chi Minh City
                </p>
            </div>
        </div>
    </div>
};