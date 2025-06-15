console.log("Hey i am using JavaScript!");

const emojisEl=document.querySelectorAll(".fa-regular");
const starsEl=document.querySelectorAll(".fa-star");
const colorArray=['red','orange','lightblue','lightgreen','green']
updateRating(0);
starsEl.forEach((starEl,index)=>{
    starEl.addEventListener("click",()=>
    updateRating(index));
})

function updateRating(index){
    starsEl.forEach((star,idx)=>{
        if(idx<index+1){
            star.classList.add("active");
        }
        else{
            star.classList.remove('active');
        }
    });

    emojisEl.forEach(emoji=>{
    emoji.style.transform=`translateX(-${index*50}px)`
    emoji.style.color=colorArray[index]
});
}
updateRating()