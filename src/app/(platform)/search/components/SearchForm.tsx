"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchForm() {
  const [formData, setFormData] = useState<any>({
    music_name: "",
    singer_name: "",
    text: "",
    genre: "",
  });
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(
      `/search?music_name=${formData.music_name}&singer_name=${formData.singer_name}&text=${formData.text}&genre=${formData.genre}`
    );
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
              Search For a Music
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
                      {field[0]}
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
                      
                      value={field[1] as any}
                      onChange={(e) =>
                        setFormData((prevData: any) => ({
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
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
