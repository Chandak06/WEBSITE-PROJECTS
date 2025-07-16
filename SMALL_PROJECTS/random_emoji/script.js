const btnEl = document.getElementById("btn");
const emojiNameEl = document.getElementById("emoji-name");



const emoji=[];

async function getEmoji(){
    let response = await fetch("https://emoji-api.com/emojis?access_key=682b6aaa85f07a1dd4860507488fab131345e6c1");
    data =await response.json();

    for (let i = 0; i < 1500; i++) {
       
    emoji.push({
      emojiName: data[i].character,
      emojiCode: data[i].unicodeName,
    });
    }
}
for(let i=0;i<1500;i++){
     console.log(emoji);
}
getEmoji();

btnEl.addEventListener("click",()=>{
    const randomNum=Math.floor(Math.random() * emoji.length);
    btnEl.innerText=emoji[randomNum].emojiName;
    emojiNameEl.innerText=emoji[randomNum].emojiCode;
});     