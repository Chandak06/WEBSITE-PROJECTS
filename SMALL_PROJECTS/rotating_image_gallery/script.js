const imageContainerEl=document.querySelector(".image-container")

const prevEl=document.getElementById("prev");

const nextEl=document.getElementById("next");

let x=0;
let timer;
prevEl.addEventListener("click",()=>{
    clearTimeout(timer);
    x+=45;
    updateGallery()
})

prevEl.addEventListener("click",()=>{
    clearTimeout(timer);
    x+=45;
    updateGallery()
})

nextEl.addEventListener("click",()=>{
    clearTimeout(timer);
    x-=45;
    updateGallery()
})
function updateGallery(){
    imageContainerEl.style.transform=`
    perspective(1000px) rotateY(${x}deg)`;
    timer= setTimeout(()=>{
        x-=45;
        updateGallery();
    },3000)
}

updateGallery()