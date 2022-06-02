"use strict"

const slider = document.querySelector(".slider input");

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

const price = document.querySelector(".price > span:nth-child(1)");

function handleMonthlyPrice() {
    const sliderCurrentValue = +slider.value;
    const pageviews = document.querySelector(".pageviews > span:nth-child(1)");
    const priceValues = [8, 12, 16, 24, 36];
    const pageviewsValues = ["10 mil", "50 mil", "100 mil", "500 mil", "1 milhão"]

    priceValues.forEach((item, index) => {
        if (sliderCurrentValue === index) {
            const formattedPriceValue = item.toLocaleString("pt-BR", {style: "currency", currency: "BRL"});

            price.innerText = formattedPriceValue;
            pageviews.innerText = pageviewsValues[index];
        }
    });
}
function handleAnnualPrice() {
    const currentPrice = +price.innerText.slice(2).trim().replace(",", ".");
    const discount = (price) => (25 / 100) * price;
    const priceWithDiscount = currentPrice - discount(currentPrice);
    const annualPrice = priceWithDiscount.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });

    price.innerText = annualPrice;
}

const btnToggle = document.querySelector(".toggle > input");
function handlePrice() {
    if (!btnToggle.checked) {
        handleMonthlyPrice();
        console.log("preço mensal")
    } else {
        handleAnnualPrice();
        console.log("preço anual")
    }
}
handlePrice();
slider.addEventListener("input", handlePrice);
btnToggle.addEventListener("click", handlePrice);


const cta = document.querySelector(".cta button");
cta.addEventListener("click", () => {
    window.alert("Esse botão é apenas demonstrativo!")
});