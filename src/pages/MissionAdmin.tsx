import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getAllRequest } from "../api/RequestApi";
import { ClipLoader } from "react-spinners";
import { RequestAdminItem } from "../components/admin/RequestAdminItem";

export const MissionAdmin: React.FC = () => {
    const {data: requests, isPending, isError, error} = useQuery({
        queryKey: ["requests"],
        queryFn: getAllRequest,
    })
    if (isPending) return <div className="flex justify-center items-center mt-10"><ClipLoader /></div>
    if (isError) return <div className="font-poppins text-red-400 font-bold text-center">{error.message}</div>
    return (
        <>
            <div className="flex flex-row flex-wrap ml-3 w-10/12">
                {
                    requests.map((request) => (
                        <RequestAdminItem key={request.requestId} request={request} />
                    ))
                }
            </div>
        </>
    )
};