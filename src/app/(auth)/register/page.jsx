"use client"
import React from 'react';
import Link from "next/link";
import {useForm} from "react-hook-form";
import {authClient} from "@/lib/auth-client"
import { DiPhotoshop } from 'react-icons/di';
import { useRouter } from 'next/navigation';
import {Button} from "@heroui/react";

const RegisterPage = () => {
const { register, handleSubmit,formState: { errors }} = useForm();
   const router = useRouter();
   
  const handleGoogleSignin = async () => {
  const data = await authClient.signIn.social({
   provider: "google",
   });
  console.log(data, "data");
  } 
   
   const handleRegisterFunc = async(data) => {
    console.log(data, "Formdata"); 
    // can get this upper data  //  
   
   
    const {name, email, password, image, role} = data;
     const {data:res, error} = await authClient.signUp.email({
    name: name, // required
    email: email, // required
    image: image,
    password: password, // required
    role:role,
  
    autoSignIn: false,
    callbackURL: "/login",
  
    
  
});
console.log ("data:res",res, "Error",error);

if (error) {
    alert(error.message)
}
 if (res) {
// await authClient.signOut();
    alert("Signup Successful")
    router.push("/login")
 }   
    };




    return (
        <div className='bg-slate-200  container mx-auto my-10'>
            
            <div className='bg-white rounded-xl w-120 container mx-auto p-10 my-6 flex gap-4 flex-col justify-center items-center'>
                <h2 className='font-bold text-2xl'> Register</h2>
 <div className='conatiner mx-auto w-full rounded'>
<form onSubmit={handleSubmit(handleRegisterFunc)} className='mx-10 mt-4 w-full rounded'>
                    <fieldset className="fieldset">
  <legend className="fieldset-legend">Name</legend>
  <input type="text" className="input  border-2" placeholder="Enter Your Name" {...register("name", {
    required: "name is required",
  })} />
{errors.name && <p className=' text-red-500'> {errors.name.message} </p>} 
</fieldset>

 <fieldset className="fieldset">
  <legend className="fieldset-legend">Email</legend>
  <input type="text" className="input" placeholder="Enter Your Email" {...register("email",{
    required: "Email is required",
  })} />
{errors.email && <p className=' text-red-500'> {errors.email.message} </p>}
</fieldset>

 <fieldset className="fieldset">
  <legend className="fieldset-legend">Photo URL</legend>
  <input type="text" className="input" placeholder="Photo url" {...register("image",{
    required: "Photo url is required",
  })} />
{errors.image && <p className=' text-red-500'> {errors.image.message} </p>}
</fieldset>

<fieldset className="fieldset">
  <legend className="fieldset-legend"> Password </legend>
  <input type="password" className="input" placeholder="Enter your Password" {...register("password", 
    { required: "password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  validate: {
                    hasUpperCase: (value) =>
                      /[A-Z]/.test(value) ||
                      "Password must contain at least one uppercase letter",
                    hasLowerCase: (value) =>
                      /[a-z]/.test(value) ||
                      "Password must contain at least one lowercase letter",
}
     })}/>
   {errors.password && <p className='text-red-500 font-bold'> {errors.password.message} </p>}
   <p className='text-shadow-base-100'>Must contain uppercase, lowercase, and at least 6 characters</p>
</fieldset>
<fieldset className="fieldset">
<label className='font-medium '>Role Selection</label>
      <select {...register("role", {required: "role is required",
  })} className='rounded border-2 font-bold mr-20 p-2'>
        {/* <option value="admin">admin</option> */}
        <option value="buyer">buyer</option>
        <option value="seller">seller</option>
      </select>
      </fieldset>
{/* <br /> */}
    <Button type="submit"  className='w-80 mt-2 font-bold' >  Register </Button>
    <div className='divider mr-8 text-sm text-gray-400'>OR</div>
    {/* <div className="  text-sm text-gray-400">Continue With</div> */}

<fieldset className="fiedset">
  <input type="text"  className="input font-bold text-blue-800 text-center text-lg" placeholder="Continue with Google" onClick={handleGoogleSignin} />
</fieldset>
{/* <button type="submit"  className='btn w-full'> </button> */}
<p className='text-sm'> Already have an account</p>
<span className='text-sm font-bold text-blue-700'><Link href= "/login"> sign in </Link></span>
     </form>

</div>



            </div>
           
        </div>
    );
};

export default RegisterPage;