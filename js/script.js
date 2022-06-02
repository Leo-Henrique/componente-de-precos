"use strict"

const slider = document.querySelector(".slider input");
const btnToggle = document.querySelector(".toggle > input");

function handlePrice() {
    const pageviews = document.querySelector(".pageviews > span:nth-child(1)");
    const price = document.querySelector(".price > span:nth-child(1)");
    const sliderCurrentValue = +slider.value;
    const priceValues = [8, 12, 16, 24, 36];
    const pageviewsValues = ["10 mil", "50 mil", "100 mil", "500 mil", "1 milhão"];

    function monthlyPrice(priceValue, index) {
        const monthlyPrice = priceValue.toLocaleString("pt-BR", {style: "currency", currency: "BRL"});

        price.innerText = monthlyPrice;
        pageviews.innerText = pageviewsValues[index];
    }
    function annualPrice(priceValue, index) {
        const discount = (price) => (25 / 100) * price;
        const priceWithDiscount = priceValue - discount(priceValue);
        const annualPrice = priceWithDiscount.toLocaleString("pt-BR", {style: "currency", currency: "BRL",});

        price.innerText = annualPrice;
        pageviews.innerText = pageviewsValues[index];
    }

    priceValues.forEach((priceValue, index) => {
        if (sliderCurrentValue === index) {
            if (!btnToggle.checked) {
                monthlyPrice(priceValue, index);
            } else {
                annualPrice(priceValue, index);
            }
        }
    });
}

function handleSliderBackground() {
    const sliderCurrentValue = +slider.value;
    const maxValue = +slider.getAttribute("max");
    const stepInPercentage = +(100 / maxValue).toFixed(2);
    const gradientPercentage = (stepInPercentage * sliderCurrentValue).toFixed(2) + "%";
    const leftBgColor = "#10d5c2";
    const rightBgColor = "#eaeefb";
    const setPercentages = `linear-gradient(to right, 
        ${leftBgColor} ${gradientPercentage}, 
        ${rightBgColor} ${gradientPercentage}
        )`;

    slider.style.setProperty("--background", setPercentages);
}

handlePrice();
handleSliderBackground();

slider.addEventListener("input", () => {
    handlePrice();
    handleSliderBackground();
});
btnToggle.addEventListener("click", handlePrice);


// not part of the challenge
const cta = document.querySelector(".cta button");
cta.addEventListener("click", () => {
    window.alert("Esse botão é apenas demonstrativo!")
});