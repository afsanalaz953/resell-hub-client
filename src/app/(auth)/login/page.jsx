"use client"
import React from 'react';
import Link from "next/link";
import { useForm } from "react-hook-form";
import {authClient} from "@/lib/auth-client";
import { FaRegEyeSlash } from "react-icons/fa";
import { useState } from 'react';
import {Button} from "@heroui/react";
// import {ForgotPasswordModal } from "@/components/ForgotPasswordModal"





const LoginPage = () => {
const { register, handleSubmit,  formState: { errors }} = useForm ();
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm

const [isShowPassword, setIsShowPassword] = useState(false);
 const [isForgotDialogOpen, setIsForgotDialogOpen] = useState(false);
const handleGoogleSignin = async () => {
const data = await authClient.signIn.social({
 provider: "google",
 });
console.log(data, "data");
}

const handleLoginFunc = async (data) => {
  const { email, password} = data;
console.log(data, "data");

const {data:res, error} = await authClient.signIn.email({
    email,        // required : data.email,
    password,      // required : data.password,
    //  user: {role },
    rememberMe: true,
    callbackURL: "/",   
});

console.log(data, "data");
// };

console.log (res, error);

if (error) {
    alert(error.message)
}
 if (res) {
    alert("Signin Successful")
 } 
};

// new for forgot password
const handleSendResetLink = async () => {
    if (!resetEmail) {
      setResetMessage("Email Address");
      return;
    }
    try {
      const { data, error } = await authClient.forgetPassword({
        email: resetEmail,
        redirectTo: window.location.origin + "/reset-password", // আপনার রিসেট পেজের লিংক
      });
      if (error) {
        setResetMessage(error.message);
      } else {
        setResetMessage("password reset link has passed to your email");
        // ৩ সেকেন্ড পর ডায়ালগ বন্ধ করা যেতে পারে
        setTimeout(() => {
          setIsForgotDialogOpen(false);
          setResetMessage("");
          setResetEmail("");
        }, 3000);
      }
    } catch (err) {
      setResetMessage("Try Again");
    }
  };


    return (
    <div className='bg-slate-200 container mx-auto '>
            
        <div className='bg-white rounded-xl w-120 container mx-auto p-10 my-4 flex gap-2 flex-col justify-center items-center'>
        <h2 className='font-bold text-2xl'>  Login </h2>
        <p className='text-slate-300'> Please login to continue </p>
        <form onSubmit={handleSubmit(handleLoginFunc)} className='space-y-3 mt-4'>
<fieldset className="fiedset">
  <legend className="fieldset-legend font-bold ">Email </legend>
  <input type="text"  className="input border-2 w-full" placeholder="Enter Your Email " {...register("email")} />
</fieldset>

<fieldset className="fieldset  relative">
  <legend className="fieldset-legend font-black"> Password </legend>
  <input 
  type={isShowPassword ? "text":"password"} 
  className="input border-2" 
  placeholder="Enter your Password" {...register("password", { required: "password is require" })}/>
 <span className='absolute right-2 top-4' onClick={() => setIsShowPassword(!isShowPassword)}>
    <FaRegEyeSlash />
    </span>
 {errors.password && <p> password is required </p>} 
</fieldset>

{/* <fieldset className="fieldset">
<label className='font-medium '>Role Selection</label>
      <select {...register("role")} className='rounded border-2 font-bold mr-20 p-2'>
        <option value="admin">admin</option>
        <option value="buyer">buyer</option>
        <option value="sellerr">seller</option>
      </select>
      </fieldset> */}

  {/* নতুন অংশ: ফরগট পাসওয়ার্ড লিংক */}
          <div className="text-right">
            <button
              type="button"
              className="text-sm text-blue-600 hover:underline"
              onClick={() => setIsForgotDialogOpen(true)}
            >
              Forgot Password?
            </button>
          </div>

 
<br />
 <Button type="submit"  className='w-full' ><Link href = '/login'></Link> Log In </Button>
{/* <button className='btn btn-primary w-full'><Link href = '/login'></Link> Log In</button> */}
<div className="divider mt-2 text-sm text-gray-400">OR, Continue With</div>

<fieldset className="fiedset">
  <input type="text"  className="input font-bold text-black text-center text-lg" placeholder="Google" onClick={handleGoogleSignin} />
</fieldset>

<p className='text-sm mt-4'> Donot have an account</p>
<span className='text-sm text-green-600 font-bold'><Link href= "/register"> Register </Link></span>
                 </form>
                </div>  
     {/* মডাল কম্পোনেন্ট ব্যবহার */}
      {/* <ForgotPasswordModal
        isOpen={isForgotDialogOpen}
        onClose={() => setIsForgotDialogOpen(false)}
      />  */}
        </div>  
    );
};

export default LoginPage;