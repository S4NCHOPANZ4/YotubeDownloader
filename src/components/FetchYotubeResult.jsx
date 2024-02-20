import React from 'react'
import { AiOutlineYoutube } from "react-icons/ai";
import DownloadOptions from './DownloadOptions';

const FetchYotubeResult = ({data}) => {
  return (
    <div className='flex space-x-2 w-full'>
      <div className='relative overflow-hidden rounded-md'>
        <div className='w-full h-full opacity-0 hover:opacity-100 bg-[#00000061] cursor-pointer absolute transition-all flex items-center justify-center'>
          <AiOutlineYoutube  className='text-white text-2xl' />
        </div>
        <img className='w-[300px] h-[160px]  object-cover' src={data.pictureUrl}/>
      </div>
      <div className='flex flex-col  justify-start space-y-2'>
        <div>
          <p className='font-semibold text-lg'>{data.meta.title}</p>
          <p className='font-ligth text-sm'>{data.meta.duration}</p>
        </div>
        <div>
          <DownloadOptions opt={data.urls} fileName={data.meta.title}/>
        </div>
      </div>
    </div>
  )
}

export default FetchYotubeResult