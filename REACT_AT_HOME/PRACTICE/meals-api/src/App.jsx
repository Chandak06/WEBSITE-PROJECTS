import React, { useEffect, useState } from 'react';

const App = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchMeal() {
      try {
        const response = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood");
        const datas = await response.json();
        console.log(datas);
        setItems(datas.meals); 
      } catch (error) {
        console.log("Error fetching meals:", error);
      }
    }

    fetchMeal(); 
  }, []);

  return (
    <div className="flex flex-wrap justify-around m-2 " style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '20px' }}>
      {items.map((item) => (
        <section className="card" key={item.idMeal} style={{ border: '1px solid #ccc', padding: '10px', width: '200px' }}>
          <img src={item.strMealThumb} alt={item.strMeal} style={{ width: '100%' }} />
          <section className="content">
            <p><strong>{item.strMeal}</strong></p>
            <p>Id: {item.idMeal}</p>
          </section>
        </section>
      ))}
    </div>
  );
};

export default App;
