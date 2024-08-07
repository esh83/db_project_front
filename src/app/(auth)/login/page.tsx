"use client";

import { TLoginPayload } from "@/app/schema/auth.scheme";
import { axiosCustom, isAuth } from "@/app/utils/config";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

export default function Login() {
  const router = useRouter();
  useEffect(() => {
    if (isAuth()) router.replace("/");
  }, [router]);

  const [formData, setFormData] = useState<TLoginPayload>({
    username: "",
    password: "",
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axiosCustom.post("auth/login", formData);
      Cookies.set("token", res.data.token);
      toast.success("login successfully");
      router.replace("/");
    } catch (err) {
      toast.error("username or password wrong");
    }
  };

  return (
    <section className="bg-gray-50 py-10">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 "
        >
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          Musicify
        </a>
        <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Sign in to your account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={(e) => handleSubmit(e)}
            >
              {Object.entries(formData).map((field) => {
                return (
                  <div key={field[0]}>
                    <label
                      htmlFor={field[0]}
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Your {field[0]}
                    </label>
                    <input
                      type={
                        field[0] === "password" || field[0] === "email"
                          ? field[0]
                          : "text"
                      }
                      name={field[0]}
                      id={field[0]}
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder={`enter your ${field[0]}`}
                      required
                      value={field[1]}
                      onChange={(e) =>
                        setFormData((prevData) => ({
                          ...prevData,
                          [field[0]]: e.target.value,
                        }))
                      }
                    />
                  </div>
                );
              })}
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 "
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500">
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline "
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 ">
                Don’t have an account yet?{" "}
                <Link
                  href="/register"
                  className="font-medium text-primary-600 hover:underline "
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
