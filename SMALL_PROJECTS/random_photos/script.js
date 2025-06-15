const imagecontainerEl=document.querySelector(".image-container");

const btnEl=document.querySelector(".btn");

btnEl.addEventListener("click",()=>{
    numberOfimages=10;
    addNewImage();
})


function addNewImage(){
    for(let i=0;i<numberOfimages;i++){
        const newImgEl=document.createElement("img");
    newImgEl.src=`https://picsum.photos/300?random=${Math.floor(Math.random()*2000)}`;
    imagecontainerEl.appendChild(newImgEl);
    }
}