import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Request from "../../models/Request";
import { faCalendarAlt, faCheck, faClock, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@tanstack/react-query";
import { getMissionById } from "../../api/MissionApi";
import { ClipLoader } from "react-spinners";

interface RequestItemProps {
    request: Request;
}
export const RequestItem: React.FC<RequestItemProps> = ({ request }) => {
    const {data: mission, isPending, isError, error} = useQuery({
        queryKey: ["mission", { missionId: request.missionId}],
        queryFn: () => getMissionById(request.missionId),
    })
    
    const date = new Date(request.date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    if (isPending) return <div className="flex justify-center items-center"><ClipLoader /></div>
    if (isError) return <div className="flex justify-center items-center text-red-500 font-poppins">{error.message}</div>
    return (
        <div className="w-3/12">
            <div className="p-2 rounded-lg bg-darkBlue-100 bg-opacity-15 m-2">
                <div className="flex flex-row justify-between">
                    <h1 className="font-poppins font-semibold text-darkBlue-100">{mission!.request}</h1>
                    <p className="text-darkBlue-100 font-semibold">
                        <FontAwesomeIcon icon={"diamond"} />
                        <span className="ml-1 text-darkBlue-100 font-poppins">{mission!.reward}.00</span>
                    </p>
                </div>
                <p className="text-darkBlue-100 mt-3">
                    <FontAwesomeIcon className="mr-2" icon={faCalendarAlt} />
                    {date}
                </p>
                <div className={`mt-7 flex flex-row items-center 
                                justify-center gap-2 py-2 px-2 rounded-lg 
                                ${request.status === "PENDING" && "bg-yellow-400" }
                                ${request.status === "REJECTED" && "bg-red-400"}
                                ${request.status === "ACCEPTED" && "bg-green-400"} text-white`}>
                    {
                        request.status === "PENDING" && <FontAwesomeIcon className="mt-1" icon={faClock} />
                    }
                    {
                        request.status === "REJECTED" && <FontAwesomeIcon className="mt-1" icon={faTimes} />
                    }
                    {
                        request.status === "ACCEPTED" && <FontAwesomeIcon className="mt-1" icon={faCheck} />
                    }
                    <p className="">{request.status.toLowerCase()}</p>
                </div>
            </div>
        </div>
    )
};