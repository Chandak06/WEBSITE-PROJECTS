const hour = document.querySelector(".hours");
const minute = document.querySelector(".mins");
const second = document.querySelector(".secs");

function setDate(){
    const now=new Date();
    const getHour=now.getHours();
    const getMin=now.getMinutes();
    const getSec=now.getSeconds();

   const hourDegree = (getHour / 12) * 360 + (getMin / 60) * 30; // adds smooth transition
    const minDegree = (getMin / 60) * 360 + (getSec / 60) * 6;
    const secDegree = (getSec / 60) * 360;

    hour.style.transform=`rotate(${hourDegree}deg)`;
    minute.style.transform=`rotate(${minDegree}deg)`;
    second.style.transform=`rotate(${secDegree}deg)`;
};
setInterval(setDate, 1000);