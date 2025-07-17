import React, { useEffect, useState } from 'react'
import "../style.css"
import axios from "axios";

const Meals = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios
            .get("https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood")
            .then((res) => {
                setItems(res.data.meals);
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const itemslist = items.map(({ strMeal, strMealThumb, idMeal }) => {
        return (
            <section className="card">
                <img src={strMealThumb} />
                <section className="content">
                    <p>{strMeal}</p>
                    <p>#{idMeal}</p>
                </section>
            </section>
        );
    });
    return <div className="items-container">{itemslist}</div>;
}

export default Meals