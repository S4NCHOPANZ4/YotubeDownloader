import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

import { RiDownloadLine } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

const DownloadOptions = ({ opt, fileName }) => {
  const filterData = (arr) => {
    const filteredAndSorted = arr
      .filter((obj) => obj.extension === "mp4")
      .sort((a, b) => b.res - a.res);
    return filteredAndSorted;
  };

  const [openOptions, setOpenOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    filterData(opt)[filterData(opt).length - 1]
  );
  const optionsRef = useRef(null);

  const converToMb = (size) => {
    return (size / 1048576).toFixed(2);
  };

  const selectOption = (opt) => {
    setOpenOptions(false)
    setSelectedOption(opt)
  }

  const handleDownload = async(videoLink, filename) => {
    window.open(videoLink, '_blank');
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setOpenOptions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [optionsRef]);

  return (
    <div className="flex space-x-2">
      <button
        ref={optionsRef}
        onClick={() => setOpenOptions(true)}
        className="border rouded-lg px-2 py-1 relative flex items-center"
      >
        {selectedOption.quality}p - {selectedOption.filesize ? converToMb(selectedOption.filesize) + "MB" : "..."}{" "} - .{selectedOption.extension} {openOptions? <IoIosArrowUp className="ml-2"/> : <IoIosArrowDown className="ml-2"/>}

        {openOptions && (
          <div className="absolute w-[300px] h-auto border bg-white left-0 top-[110%] rounded-md ">
            <div className="font-semibold text-start pt-2 px-2 pb-1  border-b">
              Download Options
            </div>
            <div>
              {filterData(opt).map((item, i) => {
                return (
                  <div key={i} onClick={() => selectOption(item)} className="flex justify-between py-1 px-2 hover:bg-stone-100">
                    <p className="text-end hover:bg-stone-50 text-sm ">
                      <span className="mr-1">{item.quality}p</span>
                      (.{item.extension})
                    </p>
                    <p className="text-xs font-semibold">
                      {item.filesize ? converToMb(item.filesize) + "MB" : "..."}{" "}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </button>
      <button onClick={() => handleDownload(selectedOption.url, fileName+'_'+selectedOption.quality+'p')} className="font-medium bg-green-400 hover:bg-green-500 py-1 px-2 rounded-lg text-white flex items-center ">
        Download <RiDownloadLine className="mx-1" />
      </button>
    </div>
  );
};

export default DownloadOptions;
