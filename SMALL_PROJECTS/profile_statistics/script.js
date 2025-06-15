const countersEl = document.querySelectorAll(".counter");

countersEl.forEach(counterEl => {
    counterEl.innerText = "0";
    incrementcounter();
    function incrementcounter() {
        let currentNum = +counterEl.innerText;
        const dataceil = counterEl.getAttribute("data-ceil");
        // console.log(dataceil);

        const increment = dataceil / 15;
        currentNum = Math.ceil(currentNum + increment);

        if (currentNum < dataceil) {
            counterEl.innerText = currentNum;
            setTimeout(incrementcounter, 50);
        }
        else {
            counterEl.innerText = dataceil
        }
    }
}
)