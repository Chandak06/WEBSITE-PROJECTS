import React from "react";
import Nav from "./navigation/Nav";
import Recommended from "./recommended/Recommended";
import "./index.css";
import Sidebar from "./sidebar/Sidebar";
import Card from "./components/Card";
import Products from "./products/Products";
import { useState } from "react";
import products from "./db/data"
const App = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };
  const handleChange = (e) => {
    setSelectedCategory(e.target.value);
  };
    const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredItems =products.filter((product)=>product.title.toLowerCase().indexOf(query.toLowerCase())!==-1)

  const filteredData=(products,selected,query)=>{
    let filteredProducts=products;
    if(query) {
      filteredProducts=filteredItems;
    }

    if(selected){
      filteredProducts=filteredProducts.filter(({category, color, company, newPrice, title })=>
        category === selected ||
          color === selected ||
          company === selected ||
          newPrice === selected ||
          title === selected
      
      )
  }

  return filteredProducts.map(
      ({ img, title, star, reviews, prevPrice, newPrice }) => (
        <Card
          key={Math.random()}
          img={img}
          title={title}
          star={star}
          reviews={reviews}
          prevPrice={prevPrice}
          newPrice={newPrice}
        />
      )
    );
  }

  const result=filteredData(products,selectedCategory,query)
  return (
    <div>
      <Sidebar handleChange={handleChange} />
      <Nav handleInputChange={handleInputChange} query={query}/>
      <Recommended handleClick={handleClick}/>
      <Products result={result}/>
    </div>
  );
};

export default App;
