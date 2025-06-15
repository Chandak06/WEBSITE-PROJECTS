const searchBarContainerEl=document.querySelector(".search-bar-container"); 


const magnifierEl=document.querySelector(".fa-magnifying-glass");

magnifierEl.addEventListener("click",()=>{
    searchBarContainerEl.classList.toggle("active")});