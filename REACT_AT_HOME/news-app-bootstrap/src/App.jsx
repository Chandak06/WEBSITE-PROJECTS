import React from 'react'
import Navbar from './components/Navbar'
import Newsboard from './components/Newsboard'
import NewsItem from './components/NewsItem'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Newsboard/>
      <NewsItem/>
    </div>
  )
}

export default App