"use client";

import Modal from "@/app/components/Modal";
import { axiosCustom, isAuth } from "@/app/utils/config";
import Link from "next/link";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";

export default function CreateMusic() {
  const [formData, setFormData] = useState<any>({
    name: "",
    album_id: 0,
    rangeage: "",
    text: "",
    genre: "",
    audio: null,
    image: null,
  });
  const [albums, setAlbums] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const authResult: any = isAuth();
        const res = await axiosCustom.get(`singer/album/${authResult?.id}`);
        console.log(res);
        setAlbums(res.data);
      } catch (err) {
        console.log(err);
        setAlbums([]);
      }
    })();
  }, [show]);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const bodyFormData = new FormData();
    bodyFormData.append("name", formData.name);
    bodyFormData.append("album_id", formData.album_id);
    bodyFormData.append("rangeage", formData.rangeage);
    bodyFormData.append("text", formData.text);
    bodyFormData.append("genre", formData.genre);
    bodyFormData.append("audio", formData.audio);
    bodyFormData.append("image", formData.image);
    try {
      const res = await axiosCustom({
        method: "post",
        url: "singer/addmusic",
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("added successfully");
    } catch (err) {
      toast.error("error happened");
      console.log(err);
      
    }
  };

  return (
    <section className="bg-gray-50 py-10">
      <Modal
        title="select album"
        showModal={show}
        setShowModal={setShow}
        body={
          <div className="flex flex-col space-y-5">
            {albums.map((al: any) => {
              return (
                <button
                  key={al.id}
                  className=""
                  onClick={() => {
                    setFormData((prevData: any) => ({
                      ...prevData,
                      album_id: al.id,
                    }));
                    setShow(false);
                  }}
                >
                  {al.name}
                </button>
              );
            })}
          </div>
        }
      />
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
              add new music
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={(e) => handleSubmit(e)}
            >
              {Object.entries(formData).map((field) => {
                if (field[0] === "image" || field[0] === "audio") {
                  return (
                    <div key={field[0]}>
                      <label
                        htmlFor={field[0]}
                        className="block mb-2 text-sm font-medium text-gray-900 "
                      >
                         {field[0]}
                      </label>
                      <input
                        type={"file"}
                        name={field[0]}
                        id={field[0]}
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder={`enter ${field[0]}`}
                        required
                        onChange={(e) =>
                          setFormData((prevData: any) => ({
                            ...prevData,
                            [field[0]]: e.target.files?.[0],
                          }))
                        }
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
                         {field[0]}
                      </label>
                      {field[0] == "album_id" && (
                        <button
                          type="button"
                          className="bg-sky-600 text-white p-2 rounded"
                          onClick={() => setShow(true)}
                        >
                          select
                        </button>
                      )}
                      <input
                        type={
                          field[0] === "password" || field[0] === "email"
                            ? field[0]
                            : "text"
                        }
                        name={field[0]}
                        id={field[0]}
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder={`enter ${field[0]}`}
                        required
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
                Create Music
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
