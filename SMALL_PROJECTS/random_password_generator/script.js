console.log("Hey i am using JavaScript");
const btnEl=document.querySelector(".btn")
const inputEl=document.getElementById("input")
const copyIconEl=document.querySelector(".fa-copy");
const alertContainerEl=document.querySelector(".alert-container");
btnEl.addEventListener("click",()=>{
    createPassword();
})
copyIconEl.addEventListener('click',()=>{
    copyPassword();
})
function createPassword(){
    const char="0123456789abcdefghijklmnopqrstuvwxtz!@#$%^&*()_+?:{}[]ABCDEFGHIJKLMNOPQRSTUVWXYZ"

    const passwordLength=14;
    let password="";
   for (let index = 0; index < passwordLength; index++) {
    const randomNum=Math.floor(Math.random()*char.length)
    password+=char.substring(randomNum,randomNum+1);
    console.log(password);
   }
   inputEl.value=password;
   alertContainerEl.innerText=password+" Copied";
   
}

function copyPassword(){
    inputEl.select();
    // inputEl.setSelectionRange(0,999);
    //USE TO COPY TEXT FOR MOBILE 
    navigator.clipboard.writeText(inputEl.value);
    if(inputEl.value){
        alertContainerEl.classList.add("active");

   setTimeout(()=>{
    alertContainerEl.classList.remove("active");
   },2000);
    }  
}