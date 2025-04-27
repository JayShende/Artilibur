"use client";

import AuthPage from "@/components/auth-card";
import InputBox from "@/components/input-box";

const SignInPage = () => {
  return (
    <div className="w-screen h-screen bg-zinc-300">
      <AuthPage
      header="Sign In"
      headerLabel="Signin Into Your Account"
      backbuttonlabel="Don't Have An Account? SignUp"
      backbuttonUrl="/signup"
      >
        <InputBox
        type="text"
        placeholder="johndoe@gmail.com"
        label="Email"
        onchangeFun={()=>{}}
        />
         <InputBox
        type="password"
        placeholder="******"
        label="Password"
        onchangeFun={()=>{}}
        />
        <div className="mx-2 my-3">
     <button
      className="text-white font-semibold w-full h-auto bg-zinc-800 hover:bg-zinc-600 cursor-pointer py-1 rounded-md "
      >Sign Up</button>
     </div>
    </AuthPage>
    </div>
  )
};

export default SignInPage;
