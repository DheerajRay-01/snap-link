import React, { useState } from "react";
import { IoIosLink } from "react-icons/io";
import axiosInstance from "../../utils/axios";
import ErrorBox from "../ErrorBox";
import ShortUrlCard from "../ShortUrlCard";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addLink } from "../../utils/redux/myLinksSlice";

function Home() {
   const userData = useSelector((state) => state?.user?.user);
   const isAuthenticated = !!userData;

  const [error, setError] = useState("");

  const [ShortUrl, setShortUrl] = useState("");
  const [optionOpen, setOptionOpen] = useState(false);
  const [slug, setSlug] = useState("");
  const [linkData, setLinkData] = useState({});
  const dispatch = useDispatch()

  const { register, handleSubmit, watch, reset } = useForm();
  const url = watch("url");

  const Submit = async (data) => {
    console.log(data);

    setError("");
    try {
      let urlRes;

      if(isAuthenticated){
         urlRes = await axiosInstance.post("/links/create", data);
         if(urlRes){
            dispatch(addLink(urlRes?.data?.data))
         }
      }
      else{
        urlRes = await axiosInstance.post("/links/create-by-guest", data);
      }
      console.log(urlRes?.data.data);
      const short = urlRes?.data?.data.shortUrl;
      setSlug(urlRes?.data?.data?.slug);
      setShortUrl(short);
      setLinkData(urlRes?.data?.data)
      toast.success("Short URL created")
      reset();
    } catch (error) {
      const message = error?.response?.data?.message || "Something went wrong";
      setError(message);
      console.error(message);
    }
  };

  const toggleOption = () => {
    if(isAuthenticated){
      setOptionOpen((prev) => !prev);
    }
    toast.error("Login Required For Customization")
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center min-h-screen items-start pt-3">
        <div className="max-w-lg">
          <h1 className="text-5xl font-bold">Welcome to SnapLink</h1>
            <p className="py-6 text-base-content">
              Turn any lengthy URL into a short, smart link. Add click limits,
              passwords, and QR codes with ease.
          </p>

          <form onSubmit={handleSubmit(Submit)}>
            <label className="input validator w-full m-3">
              <IoIosLink size={20} />
              <input
                type="url"
                placeholder="https://"
                pattern="^(https?://)?([a-zA-Z0-9]([a-zA-Z0-9\-].*[a-zA-Z0-9])?\.)+[a-zA-Z].*$"
                title="Must be valid URL"
                {...register("url", { required: true })}
              />
            </label>

            {optionOpen && (
              <ul className="list bg-base-100 rounded-box shadow-md gap-2 px-3 ml-5 pb-3">
                <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
                  Customize your SnapLink
                </li>

                <li>
                  <label className="floating-label">
                    <span>e.g., My Portfolio Link</span>
                    <input
                      defaultValue=""
                      {...register("title")}
                      type="text"
                      placeholder="Title"
                      className="input input-md w-full"
                    />
                  </label>
                </li>

                <li>
                  <label className="floating-label">
                    <span>e.g., dheeraj123</span>
                    <input
                      defaultValue=""
                      {...register("slug")}
                      placeholder="Custom Slug"
                      className="input input-md w-full"
                    />
                  </label>
                </li>

                <li>
                  <label className="floating-label">
                    <span>Set Password</span>
                    <input
                      type="password"
                      defaultValue=""
                      {...register("password")}
                      placeholder="Password"
                      className="input input-md w-full"
                    />
                  </label>
                </li>

                <li>
                  <label className="floating-label">
                    <span>e.g., 50 (minimum - 0)</span>
                    <input
                      type="number"
                      defaultValue=""
                      {...register("clickLimit")}
                      placeholder="Click Limit"
                      className="input input-md w-full"
                    />
                  </label>
                </li>
              </ul>
            )}

            {error && <ErrorBox error={error} />}
            {/* {ShortUrl && <ShortUrlCard url={ShortUrl} slug={slug}/>} */}
            {ShortUrl && <ShortUrlCard linkData={linkData}/>}

            <div className="flex flex-wrap justify-center items-center gap-3 mt-3">
              <button
                // onClick={handleSubmit}
                type="submit"
                className={`btn btn-primary ${url ? "" : "btn-soft m-3"}`}
              >
                Generate SnapLink
              </button>

              <button
              type="button"
                onClick={toggleOption}
                className={`btn btn-primary ${url ? "" : "btn-soft m-3"}`}
              >
                {optionOpen ? "Close" : "Custom SnapLink"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Home;
