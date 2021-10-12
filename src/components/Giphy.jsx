import React, {useEffect, useState } from 'react'
import axios from "axios"

const Giphy = () => {
  const [data, setData] = useState([])
  
  useEffect(()=>{

    const fetchData = async () => {
      const results = await axios("https://api.giphy.com/v1/gifs/trending", {
        params: {
          api_key: "LoJpDfz10eeEdMEl7r18JxkPfXYaHfmZ"
        }
      })
      console.log(results)
      setData(results.data.data);
    }
    fetchData()
  }, [])

  const renderGifs = () => {
    return data.map(el => {
      return (
        <div className="gif">
          <img src={el.images.fixed_height.url}/>
        </div>
      )
    })
  }
  return <div className="container gifs">{renderGifs()}</div>
}

export default Giphy