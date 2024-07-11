"use client";

import { TRegisterPayload } from "@/app/schema/auth.scheme";
import { axiosCustom } from "@/app/utils/config";
import Link from "next/link";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";

export default function RegisterSinger() {
  const [formData, setFormData] = useState<TRegisterPayload>({
    username: "",
    password: "",
    email: "",
    address: "",
    birthdate: "",
    image: null,
  });
  const [startDate, setStartDate] = useState<Date | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const bodyFormData = new FormData();
    bodyFormData.append("username", formData.username);
    bodyFormData.append("password", formData.password);
    bodyFormData.append("email", formData.email);
    bodyFormData.append("address", formData.address);
    bodyFormData.append("birthdate", formData.birthdate);
    bodyFormData.append("image", formData.image);
    try {
      const res = await axiosCustom({
        method: "post",
        url: "auth/singer/register",
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("registered successfully");
    } catch (err) {
      toast.error("error happened");
    }
  };
  const handleChngeDate = (newDate: Date | null) => {
    if (newDate) {
      setStartDate(newDate);
      setFormData((prevData) => ({
        ...prevData,
        birthdate: newDate.toISOString().substring(0, 10),
      }));
    }
  };
  return (
    <section className="bg-gray-50 py-10">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0">
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
              Create new Account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={(e) => handleSubmit(e)}
            >
              {Object.entries(formData).map((field) => {
                if (field[0] === "image") {
                 return  <div key={field[0]}>
                    <label
                      htmlFor={field[0]}
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Your {field[0]}
                    </label>
                    <input
                      type={"file"}
                      name={field[0]}
                      id={field[0]}
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder={`enter your ${field[0]}`}
                      required
                      onChange={(e) =>
                        setFormData((prevData) => ({
                          ...prevData,
                          image: e.target.files?.[0],
                        }))
                      }
                    />
                  </div>;
                }
                if (field[0] === "birthdate") {
                  return (
                    <div key={field[0]}>
                      <label
                        htmlFor={field[0]}
                        className="block mb-2 text-sm font-medium text-gray-900 "
                      >
                        Your {field[0]}
                      </label>
                      <DatePicker
                        withPortal={true}
                        placeholderText="enter your birthdate"
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block !w-full p-2.5"
                        selected={startDate}
                        showYearDropdown
                        dateFormatCalendar="MMMM"
                        yearDropdownItemNumber={45}
                        maxDate={new Date()}
                        scrollableYearDropdown
                        onChange={(date) => handleChngeDate(date)}
                      />
                    </div>
                  );
                } else
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

              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Register
              </button>
              <p className="text-sm font-light text-gray-500 ">
                Already have an account yet?{" "}
                <Link
                  href="/login"
                  className="font-medium text-primary-600 hover:underline "
                >
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
