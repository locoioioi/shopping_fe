import { useMutation } from "@tanstack/react-query";
import { newMission } from "../api/MissionApi";
import { queryClient } from "../config";

export const CreateMission: React.FC = () => {
    const { mutate } = useMutation({
        mutationFn: newMission,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["mission"]
            })
        }
    })
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        mutate({
            request: formData.get("request") as string,
            reward : parseInt(formData.get("reward") as string)
        });
    };
    return (
        <div className="w-10/12 flex justify-center ">
            <div className="w-1/2 border rounded p-3">
                <h1 className="text-purpleDark-100 text-2xl font-poppins font-semibold">Mission</h1>
                <form onSubmit={handleSubmit}  className="flex flex-col mt-3">
                    <label htmlFor="request" className="text-darkBlue-100 text-base font-poppins">Request</label>
                    <input id="request" required type="text" name="request" placeholder="Request" className="rounded p-2 mt-2 border" />
                    <label htmlFor="reward" className="mt-3 text-darkBlue-100 text-base font-poppins">Reward</label>
                    <input id="reward" required type="number" name="reward" placeholder="Reward" className="rounded p-2 mt-2 border" />

                    <button type="submit" className="mt-3 bg-purpleDark-100 text-white font-poppins rounded p-2">Create</button>
                </form>
            </div>
        </div>
    )
};