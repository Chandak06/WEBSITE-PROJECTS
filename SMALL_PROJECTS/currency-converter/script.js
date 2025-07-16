const currencyFirstEl = document.getElementById("currency-first");

const worthFirstEl = document.getElementById("worth-first");

const currencySecondEl = document.getElementById("currency-second");

const worthSecondEl = document.getElementById("worth-second");

const exchangeRateEl = document.getElementById("exchange-rate");

async function updateRate() {
    const response = await fetch(
        `https://v6.exchangerate-api.com/v6/5f9d1c87f7250159c9c9b17d/latest/${currencyFirstEl.value}`
    )
    const data = await response.json();
    const rate = data.conversion_rates[currencySecondEl.value];

    exchangeRateEl.innerText = `1 ${currencyFirstEl.value} = ${rate + " " + currencySecondEl.value}`;

    worthSecondEl.value = (worthFirstEl.value * rate).toFixed(2);
}

updateRate();

currencyFirstEl.addEventListener("change", updateRate);

currencySecondEl.addEventListener("change", updateRate);

worthFirstEl.addEventListener("input", updateRate);