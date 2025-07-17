import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'

const Newsboard = () => {
    const [articles,setArticles]=useState([])

    useEffect(()=>{
        let url="https://newsapi.org/v2/everything?q=tesla&from=2025-06-08&sortBy=publishedAt&apiKey=6bf7a031ad7f4247961bf2601a99de95"

        fetch(url).then((response) => response.json()).then(data=>setArticles(data.articles))

    },[])
  return (
    <div>
        <h2 className='text-center'>Latest <span className='badge bg-danger'>News</span></h2>
        {articles.map((news,index)=>{
            return <NewsItem key={index} title={news.title} description={news.description} src={news.urlToImage} url={news.url}/>
        })}
    </div>
  )
}

export default Newsboard