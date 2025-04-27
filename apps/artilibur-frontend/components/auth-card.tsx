"use client";


import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface authPageInterfcaes{
    children:ReactNode
    header:string,
    headerLabel:string,
    backbuttonlabel:string,
    backbuttonUrl:string
}

const AuthPage = ({
    header,
    headerLabel,
    backbuttonlabel,
    backbuttonUrl,
    children
}:authPageInterfcaes) => {

    const router=useRouter();
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="bg-zinc-100 w-[400px] h-auto rounded-md px-3 py-6">
        <div className="text-center flex flex-col gap-y-2 text-black">
            <span className="text-2xl font-bold">{header}</span>
            <p>{headerLabel}</p>
        </div>
        <div>
          {children}
        </div>
        <div className="text-center">
            <p className="text-zinc-500 cursor-pointer hover:text-zinc-600" onClick={()=>{
                router.push(backbuttonUrl)
            }}>{backbuttonlabel}</p>
        </div>
      </div>
    </div>
  )
};

export default AuthPage;
