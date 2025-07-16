const testimonils = [{
    photoUrl: "https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "~ Alex",
    text: "I've been an Apple user for over five years now, and I can honestly say that switching to Apple was one of the best decisions I've ever made."
},
{
    photoUrl: "https://images.unsplash.com/photo-1678286742832-26543bb49959?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "~ John",
    text: "I recently had the pleasure of experiencing the exceptional quality of Apple products, and I must say, they truly stand out in a crowded market."
},
{
    photoUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "~ Ali",
    text: "What I love most about Apple is how seamlessly all their products work together. I can start a project on my MacBook, continue it on my iPad, and finish it on my iPhone without missing a beat."
}
]

let idx=0;

const imgEl=document.querySelector("img");
const textEl=document.querySelector(".text");
const usernameEl=document.querySelector(".username");
function updateTestimonials(){
    const {photoUrl,name,text}=testimonils[idx];
    imgEl.src=photoUrl;
    textEl.innerText=text;
    usernameEl.innerText=name;
    idx++;

    if(idx===testimonils.length){
        idx=0;
    }
    setTimeout(()=>{
        updateTestimonials()
    },5000);
}
updateTestimonials();