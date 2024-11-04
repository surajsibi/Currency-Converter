const BASE_URL = "https://v6.exchangerate-api.com/v6/afe51c96ef56d3123705cf41/pair"


const dropdowns = document.querySelectorAll(".dropdown select")
const btn = document.querySelector("form button")
const fromcurr = document.querySelector(".from select")
const tocurr = document.querySelector(".to select")
const msg = document.querySelector(".msg")

window.addEventListener("load",()=>{
  start()
})



for (let select of dropdowns){
  for ( currCode in countryList){
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name==="from" && currCode === "USD") {
        newOption.selected="selected";        
    }
    else if(select.name==="to" && currCode ==="INR") {
        newOption.selected = "selected"
    }
    select.append(newOption)
  }
  select.addEventListener("change",(evt)=>{
    updateFlag(evt.target)
  })
}


  const updateFlag = (e)=>{
   let  currCode = e.value
    let countryCode = countryList[currCode]
    // console.log(countryCode)
   let new_src=  `https://flagsapi.com/${countryCode}/flat/64.png`
   

   let img  = e.parentElement.querySelector("img")
   img.src= new_src

  }

  

  const start = async()=>{
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value
    if(amtVal === "" || amtVal < 1){
        amtVal=1
        amount.value = "1"
    }
    console.log(fromcurr.value)
    console.log(tocurr.value)
    const URL = `${BASE_URL}/${fromcurr.value}/${tocurr.value}`;
    let response = await fetch(URL)
    data = await response.json();
    let rate = data.conversion_rate
    // console.log(rate)
    
    
    let finalAmount = amtVal*rate
    console.log(finalAmount)
    msg.innerText  =  `${amtVal} ${fromcurr.value} = ${finalAmount} ${tocurr.value}`
  }
  btn.addEventListener("click",async (e)=>{
    e.preventDefault();
    start()
  })