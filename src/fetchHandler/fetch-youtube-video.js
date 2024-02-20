import axios from "axios";
const apiKey = import.meta.env.VITE_APP_RAPID_KEY;
const host = import.meta.env.VITE_APP_RAPID_HOST;

const fetchYoutubeVideo  = async(url) => {
    const options = {
        method: 'POST',
        url: 'https://youtube86.p.rapidapi.com/api/youtube/links',
        headers: {
          'content-type': 'application/json',
          'X-Forwarded-For': '70.41.3.18',
          'X-RapidAPI-Key': apiKey,
          'X-RapidAPI-Host': host
        },
        data: {
            url: url
        }
    };

    try {
        const response = await axios.request(options);
        return {
            response: response.data,
            status: 200
        }
    } catch (error) {
        return {
            data: error,
            status: 404
        }
    }
}

export default fetchYoutubeVideo;

