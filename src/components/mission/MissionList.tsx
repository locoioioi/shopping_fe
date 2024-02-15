import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../store";
import { getTokenData } from "../../utils/helper";
import { getUser } from "../../api/UserApi";
import { ClipLoader } from "react-spinners";
import { getAvailableMissions } from "../../api/MissionApi";
import { MissionItem } from "./MissionItem";

export const MissionList: React.FC = () => {
    const isLogin = useAppSelector(state => state.auth.isLogin);
    const data = getTokenData(localStorage.getItem("token") ?? "");
    // * fetch user data for display current points
    const {data: user, isPending, isError, error} = useQuery({
        queryKey: ["user"],
        queryFn: () => getUser(data!.id),
        enabled: isLogin,
    })

    const {data: missions, isPending: isPendingMissions} = useQuery({
        queryKey: ["mission", {userId: user?.id}],
        queryFn: () => getAvailableMissions(user!.id),
        enabled: isLogin && user !== undefined,
    });

    if (isError) return <div>{error.message}</div>
    if (isPending) return <ClipLoader />  

    return (
        <div className="ml-16 mt-10 w-10/12">
            <div className="flex flex-row items-center justify-between">
                <span className="text-darkBlue-100 font-poppins text-lg font-semibold">Current points: {user?.point}.00</span>
                <Link className="text-darkBlue-100 font-poppins text-base font-normal hover:underline" to={"/requests"}>check status</Link>
            </div>
            
            <div className="mt-6 flex flex-row flex-wrap">
                {
                    isPendingMissions && <ClipLoader />
                }
                {
                    !isPendingMissions 
                    && missions?.map((mission) => (
                        <MissionItem key={mission.missionId} userId={user.id} mission={mission} />
                    )) 
                }
                {
                    missions?.length === 0 && <div className="mt-4 font-poppins text-darkBlue-100 font-base text-center">No mission available. Please come back later!!!</div>
                }
            </div>
        </div>
    )
};