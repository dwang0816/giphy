import React, { useEffect, useState } from 'react'
import axios from "axios"
import Loader from "./Loader"
const Giphy = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  
  useEffect(()=>{

    const fetchData = async () => {
      setIsError(false)
      setIsLoading(true)

      try {
        const results = await axios("https://api.giphy.com/v1/gifs/trending", {
          params: {
            api_key: "LoJpDfz10eeEdMEl7r18JxkPfXYaHfmZ"
          }
        })
        console.log(results)
        setData(results.data.data);
      } catch (err) {
        setIsError(true)
        console.log(err)
        setTimeout(()=> setIsError(false), 4000)
      }
      setIsLoading(false)
    }
    fetchData()
  }, [])

  const renderGifs = () => {
    if(isLoading){
      return <Loader/>
    }
    return data.map(el => {
      return (
        <div className="gif">
          <img src={el.images.fixed_height.url}/>
        </div>
      )
    })
  }
  const renderError = () => {
    if (isError) {
      return (
        <div 
          className="alert alert-warning alert-dismissible fade show" 
          role="alert"
        >
          Unable to get Gifs, please try again in a few minutes
        </div>
      )
    }
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const handleSubmit = async (event) => {
      event.preventDefault()
      setIsError(false)
      setIsLoading(true)

      try {
        const results = await axios("https://api.giphy.com/v1/gifs/search", {
          params: {
            api_key: "LoJpDfz10eeEdMEl7r18JxkPfXYaHfmZ",
            q: search,
            limit: 1000
          }
        })
        setData(results.data.data);
      } catch (err) {
        setIsError(true)
        console.log(err)
        setTimeout(()=> setIsError(false), 4000)
      }
      setIsLoading(false)
  }
  return (
    <div className="m-2">
      {renderError()}
      <form className="form-inline justify-content-center m-2">
        <input type="text" placeholder="search" className="form-control" onChange={handleSearchChange}/>
        <button type="submit" className="btn btn-primary mx-2" onClick ={handleSubmit}>Go</button>
      </form>
      <div className="container gifs">{renderGifs()}</div>
    </div>
  )
}

export default Giphy