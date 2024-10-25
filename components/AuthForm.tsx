"use client";

// IMPORTS
import { z } from "zod";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomInputs from "./CustomInputs";
import { AuthFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/actions/user.actions";

// ------x------ //

const AuthForm = ({ type }: { type: string }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()
  // 1. Define your form.
  const formSchema = AuthFormSchema(type)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
  
    // This will be type-safe and validated.
    setIsLoading(true);

    try {
      // Sign up/in with the Appwrite & create plaid token
      if(type === 'sign-up'){
        const newUser = await signUp(data)
        setUser(newUser)
      }

      if(type === 'sign-in'){
        const response = await signIn({
          email: data.email,
          password: data.password
        })
        if(response){
          router.push('/')
        }
      }
    } catch (error) {
      console.log(error)      
    } finally {
      setIsLoading(false)
    }

    console.log(data);
    setIsLoading(false);
  }
  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className=" flex cursor-pointer items-center gap-1">
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="clone logo"
          />
          <h1 className="text-26 font-ibm-plex-serif text-black-1 font-bold">
            Clone
          </h1>
        </Link>

        {/* USER EXIST */}
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}
            <p className="text-16 font-normal text-gray-600">
              {user
                ? "Link your account to get started"
                : "Please enter your details"}
            </p>
          </h1>
        </div>
      </header>
      {user ? (
        <div className="flex flex-coll gap-4">{/* {PLAID LINK} */}</div>
      ) : (
        <>
          <Form {...form}>
            {/* Seeing wheter its signin page or signup for additional inputs */}
            {/* SIGNUP Creds*/}
            {type === 'sign-up' && (
              <>
                <div className="flex gap-4">
                <CustomInputs control={form.control} name="firstName" label="Firstname" placeholder="ex: John"/>
                <CustomInputs control={form.control} name="lastName" label="Lastname" placeholder="ex: Doe"/>
                </div>
                {/* Address */}
                <CustomInputs control={form.control} name="address1" label="Address" placeholder="Enter address"/>
                {/* City */}
                <CustomInputs control={form.control} name="city" label="City" placeholder="Ex: Kolkata"/>
                {/* Pin and State */}
                <div className="flex gap-4">
                <CustomInputs control={form.control} name="state" label="State" placeholder="Ex: West Bengal"/>
                <CustomInputs control={form.control} name="pincode" label="PIN Code" placeholder="Ex: 110011"/>
                </div>
                {/* DOB and Adhaar */}
                <div className="flex gap-4">
                <CustomInputs control={form.control} name="dob" label="Date of Birth" placeholder="ex: yyyy-mm-dd"/>
                <CustomInputs control={form.control} name="adhaar" label="Adhaar Number" placeholder="Ex: 4991 1866 5246"/>
                </div>
              </>
            )}

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <CustomInputs
                control={form.control}
                name="email"
                label="Email"
                placeholder="Enter your email"
              />

              <CustomInputs
                control={form.control}
                name="password"
                label="Password"
                placeholder="Enter your password"
              />
              <div className="flex flex-col gap-4">
                <Button type="submit" className="form-btn" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      &nbsp; Loading...
                    </>
                  ) : type === "sign-in" ? (
                    "Sign In"
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>
            </form>
          </Form>

          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal">
              {type === "sign-in"
                ? "Dont have an Account?"
                : "Already have an Account?"}
            </p>
            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className="form-link"
            >
              {type === "sign-in" ? "Sign Up" : "Sign In"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
