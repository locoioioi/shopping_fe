import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQuery } from "@tanstack/react-query";
import Request from "../../models/Request";
import { getMissionById } from "../../api/MissionApi";
import { ClipLoader } from "react-spinners";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { getUser } from "../../api/UserApi";
import { responseRequest } from "../../api/RequestApi";
import { queryClient } from "../../config";

export const RequestAdminItem: React.FC<{ request: Request }> = ({ request }) => {
    const {data: mission, isPending, isError, error} = useQuery({
        queryKey: ["mission", { missionId: request.missionId}],
        queryFn: () => getMissionById(request.missionId),
    })

    const { mutate } = useMutation({
        mutationFn: responseRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["requests"]
            });
        }
    })

    const date = new Date(request.date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    // * fetch user data for display current points
    const {data: user} = useQuery({
        queryKey: ["user" , {
            type: {
                userId: request.userId
            }
        }],
        queryFn: () => getUser(request.userId + ""),
    })

    const handleResponse = (response : string) => {
        mutate({
            requestId: request.requestId,
            status: response
        })
    };

    if (isPending) return <div className="flex justify-center items-center"><ClipLoader /></div>
    if (isError) return <div className="flex justify-center items-center text-red-500 font-poppins">{error.message}</div>
    return (
        <div className="w-4/12">
            <div className="p-2 rounded-lg bg-darkBlue-100 bg-opacity-15 m-2">
                <div className="flex flex-row justify-between">
                    <h1 className="font-poppins font-semibold text-darkBlue-100">{mission!.request}</h1>
                    <p className="text-darkBlue-100 font-semibold">
                        <FontAwesomeIcon icon={"diamond"} />
                        <span className="ml-1 text-darkBlue-100 font-poppins">{mission!.reward}.00</span>
                    </p>
                </div>
                <p className="text-darkBlue-100 mt-3 font-poppins text-xs">
                    Created By : {user?.firstName} {user?.lastName}
                </p>
                <p className="text-darkBlue-100 mt-3">
                    <FontAwesomeIcon className="mr-2" icon={faCalendarAlt} />
                    {date}
                </p>
                <div className="mt-3 flex flex-row justify-end">
                    <div onClick={() => {
                        handleResponse("Accepted")
                    }} className="hover:cursor-pointer hover:bg-opacity-70 p-2 rounded bg-darkBlue-100 text-white ">
                        Accept
                    </div>
                    <div className="w-[2px] rounded bg-stone-600 ml-1"></div>
                    <p onClick={() => {
                        handleResponse("Rejected")
                    }} className="text mt-3 ml-2 font-poppins text-xs hover:cursor-pointer">Reject</p>
                </div>
            </div>
        </div>
    )
};