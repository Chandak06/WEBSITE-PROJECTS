const containerEl = document.querySelector(".container");

for (let index = 0; index < 30; index++) {
    const colorContainerEl = document.createElement("div");
    colorContainerEl.classList.add("color-container");
    containerEl.appendChild(colorContainerEl);
}

const colorcontainerEls = document.querySelectorAll(".color-container");

function colorGenerator() {
    colorcontainerEls.forEach((colorContainerEl) => {
        const newCode = randomColorCode();
        colorContainerEl.style.backgroundColor = "#" + newCode;
        colorContainerEl.innerHTML = "#" + newCode;
    });
    setTimeout(colorGenerator, 5000)
}

function randomColorCode() {
    const chars = "0123456789abcdef";
    const colorCodeLength = 6;
    let code = "";
    for (let index = 0; index < colorCodeLength; index++) {
        const randNum = Math.floor(Math.random() * chars.length);
        code += chars[randNum];

    }
    return code;
}

colorGenerator()