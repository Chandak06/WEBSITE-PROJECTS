console.log("Hey i am using JavaScript!");

const starsEl=document.querySelectorAll(".fa-star")
const emojisEl=document.querySelectorAll(".fa-regular")
const colorArray=['red','orange','lightblue','lightgreen','green']
const btnEl=document.querySelector(".btn");
const feedbackContainer=document.querySelector(".feedback-container");
updateRating(0);

starsEl.forEach((starEl,index) => {
    starEl.addEventListener("click",()=>{
        updateRating(index);
    })
});

btnEl.addEventListener("click",()=>{
    feedbackContainer.style.display = "none";
    document.querySelector(".thankyou-msg").style.display = "block";
})

function updateRating(index){
    starsEl.forEach((starsEl,idx)=>{
        if(idx<index+1){
            starsEl.classList.add("active");
        }
        else{
            starsEl.classList.remove("active");
        }
    });
    emojisEl.forEach(emojiEl=>{
        emojiEl.style.transform=`translateX(-${index*50}px)`;
        emojiEl.style.color=colorArray[index];
    })
}