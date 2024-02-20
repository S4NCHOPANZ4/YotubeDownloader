import React, { useEffect, useState } from "react";
import { IoCloudDownload } from "react-icons/io5";
import { IoArrowForwardSharp } from "react-icons/io5";
import { RxCopy } from "react-icons/rx";
import fetchYoutubeVideo from "../fetchHandler/fetch-youtube-video";
import FetchYotubeResult from "../components/FetchYotubeResult";

const Home = () => {
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [url, setUrl] = useState('');


  useEffect(() => {
    console.log(videoData)
  },[videoData])

  const fetchData = async (url) => {
    setLoading(true);
    setError(false);
    console.log("started");
    try {
      const response = await fetchYoutubeVideo(url);
      setLoading(false);
      setVideoData(response)
      console.log(response);
    } catch (e) {
      setLoading(false);
      setError(true);
      setVideoData(e);
    }
  };

  return (
    <div className="h-screen  ">
      {/* Navbar? */}
      <div className="w-[1200px] mx-auto my-3">
        <div className="flex items-center  space-x-3">
          <IoCloudDownload className="text-red-500 text-4xl " />
          <p className="text-xl font-semibold">Youtube Downloader</p>
        </div>
      </div>
      <div className="w-[1200px] mx-auto my-3 p-2 border flex flex-col justify-center items-center">
        <p className="font-semibold">Convert to MP4</p>
        <div className="w-full flex items-center justify-center">
          <div className="flex items-center space-x-2 my-3">
            <div className="cursor-pointer">
              <RxCopy />
            </div>
            <div className=" rounded-sm flex justify-between w-[600px] ">
              <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
                className="pl-2 pr-1 focus:outline-none py-1 w-full border font-light  border-red-500 focus:border-red-300"
                placeholder="Paste your youtube url "
              />
              <button onClick={() => fetchData(url)} className="bg-red-500 hover:bg-red-400 transition-all text-white text-sm px-2  flex items-center  border-none">
                Start <IoArrowForwardSharp className="ml-2" />
              </button>
            </div>
          </div>
        </div>
        {/* <div className="flex items-center space-x-3">
          <button className="bg-red-500 text-white hover:bg-red-600 transition-all font-medium px-3 py-1 rounded-full text-sm">
            sdpaofj908asd
          </button>
          <button className="bg-red-500 text-white hover:bg-red-600 transition-all font-medium px-3 py-1 rounded-full text-sm">
            sdpaofj908asd
          </button>
        </div> */}
      </div>

      <div className="w-[1200px] mx-auto my-3 border p-3 flex justify-center">
        {videoData &&
        <FetchYotubeResult data={videoData.response[0]}/>
        
        }
      </div>
    </div>
  );
};

export default Home;
