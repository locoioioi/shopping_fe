import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Mission from "../../models/Mission";
import { useMutation } from "@tanstack/react-query";
import { createRequest } from "../../api/RequestApi";
import { queryClient } from "../../config";
import { ClipLoader } from "react-spinners";

interface MissionItemProps {
    mission: Mission;
    userId: number;
}

export const MissionItem: React.FC<MissionItemProps> = ({ mission, userId }) => {
    const { mutate, isPending } = useMutation({
        mutationFn: createRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["mission", { userId: userId }],
            })
        },
    })
    const handleComplete = () => {
        mutate({missionId: mission.missionId, userId: userId});
    };

    return (
        <div className="w-4/12">
            <div className="px-3 py-2 m-2 flex flex-col gap-4 rounded-lg bg-darkBlue-100 bg-opacity-10">
                <h3 className="text-xl font-poppins font-bold text-darkBlue-100">{mission.request}</h3>
                <p className="text-base font-poppins text-darkBlue-100">
                    reward: <FontAwesomeIcon icon={"diamond"}/> {mission.reward}.00
                </p>
                <button onClick={handleComplete} className="mt-9 rounded-lg bg-purpleDark-100 p-1 text-white text-lg font-semibold">
                    {
                        isPending ? <ClipLoader size={15} /> : "Complete"
                    }
                </button>
            </div>
        </div>
    )
};