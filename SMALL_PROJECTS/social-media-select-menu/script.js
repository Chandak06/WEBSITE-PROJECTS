const menuEl=document.querySelector(".menu");
const menuTextEl=document.querySelector(".menu p");
const socialMedia=document.querySelector(".social-media");
const liEls=document.querySelectorAll(".social-media li");



menuEl.addEventListener("click",()=>{
    socialMedia.classList.toggle("hide");
    menuEl.classList.toggle("rotate");
    menuEl.classList.toggle("clicked");
})


liEls.forEach(liEl=>{
    liEl.addEventListener("click",()=>{
        menuTextEl.innerHTML=liEl.innerHTML;
        socialMedia.classList.add("hide");
        menuEl.classList.toggle("rotate");
        menuEl.classList.toggle('clicked');
    })
})