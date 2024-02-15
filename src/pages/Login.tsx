import { useMutation } from "@tanstack/react-query";
import React from "react";
import { login } from "../api/UserApi";
import { useAppDispatch } from "../store";
import { login as loginState } from "../store/AuthSlice";
import { useNavigate } from "react-router-dom";

export const Login: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { mutate }= useMutation({
        mutationFn: login,
        onSuccess: () => {
            dispatch(loginState());
            navigate("/");
        }
    })
    
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const data = Object.fromEntries(form.entries());

        mutate({
            username: data.username as string,
            password: data.password as string
        });
    };

    return (
        <div className="flex flex-col justify-center items-center">            
            <form action="" onSubmit={handleSubmit} className="w-6/12 flex flex-col p-14 pb-24 bg-darkBlue-100 bg-opacity-10 rounded-lg">
                <div className="mb-8">
                    <h3 className="mb-14 font-chewy text-3xl text-purpleDark-100">Love Chin</h3>
                    <p className="mb-[10px] text-stone-500 font-poppins text-xs">Welcome back!!!</p>
                    <span className="font-poppins text-5xl font-bold text-darkBlue-100">Sign in</span>
                </div>

                <label htmlFor="username" className="text-darkBlue-100 text-base font-poppins font-medium">Username</label>
                <input id="username" required type="text" name="username" className="rounded text-darkBlue-100 text-sm font-poppins font-regular p-2"/>
                
                <label htmlFor="password" className="mt-5 text-darkBlue-100 text-base font-poppins font-medium">Password</label>
                <input id="password" required name="password" type="password" className="rounded text-darkBlue-100 text-sm font-poppins font-regular p-2"/>

                <button className="mt-8 bg-darkBlue-100 p-2 rounded-md w-4/12 self-center text-white font-poppins text-lg">Login</button>
            </form>
        </div>
    );
};