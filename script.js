// const BASE_URL =
//   "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json";

const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1";



const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const lastUpdate = document.querySelector("#last-update");
const exchangeBtn = document.querySelector(".exchange-btn");

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = parseFloat(amount.value);
  if (isNaN(amtVal) || amtVal < 1) {
    alert("Please enter a valid amount."); // Alert the user to enter a valid amount
    amount.value = ""; // Clear the input field
    return; // Exit the function
  }
  const endpoint = "currencies";
  const URL = `${BASE_URL}/${endpoint}/${fromCurr.value.toLowerCase()}.json`;
  try {
    let response = await fetch(URL);
    let data = await response.json();
  
    let updatedDate = data["date"];
   
    let fromC =fromCurr.value.toLowerCase() ;
    let toC =toCurr.value.toLowerCase();
  
    let rate = data[fromC][toC];

    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
    lastUpdate.innerText = ` Last update: ${updatedDate}`;
  } catch (error) {
    console.error("Error fetching exchange rate:", error);
  }
};

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

exchangeBtn.addEventListener("click",(evt)=>{
  let temp = fromCurr.value;
  fromCurr.value = toCurr.value;
  toCurr.value = temp;

  // Update the flag icons
  updateFlag(fromCurr);
  updateFlag(toCurr);

  // Update the exchange rate
  updateExchangeRate();
})

window.addEventListener("load", () => {
    const inputField = document.querySelector(".amount input");
    inputField.focus(); // Focus on the input field
});
// window.addEventListener("load", () => {
//   updateExchangeRate();
// });
