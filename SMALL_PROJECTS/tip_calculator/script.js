const billEl=document.getElementById("bill-amount");
const tipEl=document.getElementById("tip");
const btnEl=document.querySelector(".btn");
const resultEl=document.querySelector(".result");
btnEl.addEventListener("click",()=>{
    const billAmount=+billEl.value;
    const tipPercent=+tipEl.value;

    const totalValue= (billAmount+(tipPercent/100)*billAmount).toFixed(2);
    resultEl.innerHTML=`Total: ${totalValue}`;
});