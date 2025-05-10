const base_url ="https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_t9uVTa5twcSSsLrd6ZvQw7xd0xqeGpqPPMCqBtx9";

const dropdown=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");

for(let select of dropdown){
for(Currcode in countryList){
    let newOption=document.createElement("option");
    newOption.innerText=Currcode;
    newOption.value=Currcode;
    if(select.name==="from" && Currcode==="USD"){
        newOption.selected="selected";
    }
    else if(select.name==="to" && Currcode==="INR"){
        newOption.selected="selected";
    }
    select.append(newOption);
    
}

select.addEventListener("change",(evt)=>{
    updateFlag(evt.target);
});
}

const updateExchangeRate=async()=>{
let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    if (amtval === "" || amtval < 1) {
        amtval = 0;
        amount.value = "0";
    }

    // Construct the correct API URL
    const URL = `${base_url}&base_currency=${fromCurr.value}&currencies=${toCurr.value}`;
    console.log(URL);
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data.data[toCurr.value];

    let finalAmount=amtval*rate;
    msg.innerText=`${amtval} ${fromCurr.value}=${finalAmount} ${toCurr.value}`;
}

const updateFlag=(element)=>{
    let Currcode=element.value;
    console.log(Currcode);
    let countryCode=countryList[Currcode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
}

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load",()=>{
    updateExchangeRate();
})