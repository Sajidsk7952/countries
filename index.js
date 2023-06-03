const countrydisp = document.querySelector(".countries");
const filter = document.querySelector(".filter");
const items = document.querySelector(".items");
const reg = document.querySelectorAll(".reg");
const search=document.querySelector("#search");
const darkmode=document.querySelector('.darkmode');
darkmode.addEventListener("click",()=>{
  console.log("dark mode is enabled!!");
  document.body.classList.toggle("dark");
  items.classList.toggle("varbg");
})
console.log(darkmode);
// console.log(search.target.value);
// console.log(reg);
// console.log(countrydisp);
async function getCountry() {
  const url = await fetch("https://restcountries.com/v3.1/all");
  const res = await url.json();
  console.log(res);
  res.forEach((element) => {
    showcontry(element);
  });
}
getCountry();
const showcontry = (data) => {
  const country = document.createElement("div");
  country.classList.add("country");
  country.innerHTML = `
    <div class="country_img">
        <img src="${data.flags.svg}" alt="">
    </div>
    <div class="country_info">
        <h4 class="country_name">${data.name.official}</h4>
        <p><strong>capital:</strong>${data.capital}</p>
        <p><strong>population:</strong>${data.population}</p>
        <p class="region"><strong>region:</strong>${data.region}</p>
    </div>`;
  countrydisp.appendChild(country);
  country.addEventListener("click",()=>{
    showdetails(data);
  })
};
filter.addEventListener("click", () => {
  items.classList.toggle("showdropdown");
});
const region=document.getElementsByClassName("region");
const country_name=document.getElementsByClassName("country_name");
reg.forEach((element) => {
    element.addEventListener("click", () => {
    //   console.log(element.innerText);
      Array.from(region).forEach(e => {
        // console.log(e.innerText);
        if (e.innerText.includes(element.innerText)||element.innerText=='ALL') {
            e.parentElement.parentElement.style.display="grid"
        }
        else{
            e.parentElement.parentElement.style.display="none"
        }
      });
    });
});
search.addEventListener("input",()=>{
    const searchval=search.value.toLowerCase();
    Array.from(country_name).forEach(ele=>{
        if (ele.innerText.toLowerCase().includes(searchval)) {
            ele.parentElement.parentElement.style.display="grid"
        }
        else{
            ele.parentElement.parentElement.style.display="none"
        }
    })
})
const countrymodal=document.querySelector(".countrymodal");
function showdetails(data){
  countrymodal.classList.toggle('show');
  countrymodal.innerHTML=`<div><button class="back">Back</button>
  <div class="modal">
      <div class="flagimg">
          <img src="${data.flags.svg}" alt="">
      </div>
      <div class="modalinfo">
          <h1 class="title">${data.name.official}</h1>
          <div class="details">
              <div class="left">
                  <p><strong>Common name:</strong>${data.name.common}</p>
                  <p><strong>population:</strong>${data.population}</p>
                  <p><strong>Region:</strong>${data.region}</p>
                  <p><strong>subregion:</strong>${data.subregion}</p>
                  <p><strong>capital:</strong>${data.capital}</p>
              </div>
              <div class="right">
                  <p><strong>top level domain:</strong>${data.tld}</p>
                  <p><strong>timezone:</strong>${data.timezones}</p>
                  <p><strong>languages:</strong>${data.languages}</p>
              </div>
          </div>
      </div>
  </div></div>`
  const back = countrymodal.querySelector(".back");
  back.addEventListener("click",()=>{
    countrymodal.classList.toggle('show');
  })
}
