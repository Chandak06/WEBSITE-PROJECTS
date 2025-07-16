const btnEl=document.querySelector(".btn");
const jokeEl=document.getElementById("joke");
const apiKey="TtVAnztcFw2y1itom9EHZg==31F1hlLzqNwuQooQ";
const apiURL="https://api.api-ninjas.com/v1/dadjokes";
const options={
    method:"GET",
    headers:{
        "X-Api-Key":apiKey,
    },
};
async function getJoke(){
    try {
        jokeEl.innerText="Updating..."
    btnEl.disabled=true;
    btnEl.innerText="Loading..."
    const response =await fetch(apiURL,options);
    data=await response.json();
    jokeEl.innerText=data[0].joke;
    btnEl.disabled=false;
    btnEl.innerText="TELL ME A JOKE";
    } catch (error) {
        jokeEl.innerText="Error occured.Try again...";
        btnEl.disabled=false;
       btnEl.innerText="TELL ME A JOKE";
       console.log(error);
    }
}   
btnEl.addEventListener("click",getJoke);