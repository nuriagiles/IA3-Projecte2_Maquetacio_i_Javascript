import { productDetailData } from './js/productDetail.js';
import { searchResultsData } from './js/resultats.js';
import {checkoutData} from './js/checkOut.js'
import {myTripsData} from './js/myTrips.js'

//supabase
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://oiyitodcscieoxokdobj.supabase.co";
let supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9peWl0b2Rjc2NpZW94b2tkb2JqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzNDU5MzksImV4cCI6MjA5MTkyMTkzOX0.9lNN7LXRRTkyXRwGgKAqk5va5NsdWtGJRfioBkMLx9M";
export const supabase = createClient(supabaseUrl, supabaseAnonKey);


let filas1 = ''
let filas2 = ''
let filas3 = ''
let filas4 = ''

let resultado = ''
let filtros1 = ''
let filtros2 = ''
let filtros3 = ''
let hotelesResult = ''

let productInfo = ''
let productInfo2 = ''
let resultado2= ''
let textPromotional = ''
let rooms = ''

let check1 = ''
let check2 = ''
let check3 = ''

let Mytrips = ''

//Función para renderizar el HTML
function render(selector, html) {
    const el = document.querySelector(selector);
    if (!el) return; // si no existe, no hace nada
    el.innerHTML = html;
}



//Homepage
//Destinacion 
async function renderDestinacions() {
  const { data, error } = await supabase
    .from("destinacionsDestacades")
    .select("*");

  if (error) {
    console.error(error);
    return;
  }

  let filas1 = '';

  for (let i = 0; i < data.length; i++) {
    filas1 += `
      <div>
        <img src="/${data[i].imatgeUrl}" alt="">
        <h3 class="tamaño-20">${data[i].nom}</h3>
        <p class="p-14">${data[i].propietatsCount} properties</p>
      </div>
    `;
  }

  render("#seccion2-destinacion", filas1);
}
renderDestinacions();

//Ofertas
async function renderOfertes() {
  const { data, error } = await supabase
    .from("ofertes")
    .select("*");

  if (error) {
    console.error("Error loading ofertes:", error);
    return;
  }

  let filas2 = '';

  for (let i = 0; i < data.length; i++) {
    filas2 += `
      <div>
        <img src="/${data[i].imatgeUrl}" alt="">
        <div class="div-texto3">    
          <h3 class="tamaño-20">${data[i].titol}</h3>
          <p class="p-16">${data[i].descripcio}</p>
        </div>
      </div>
    `;
  }

  render("#seccion3-ofertes", filas2);
}

renderOfertes();

//Hoteles
async function renderHotels() {
  const { data, error } = await supabase
    .from("hotelsPopulars")
    .select("*");

  if (error) {
    console.error("Error loading hotels:", error);
    return;
  }

  let filas3 = '';

  for (let i = 0; i < data.length; i++) {
    filas3 += `
      <div>
        <img src="/${data[i].imatgeUrl}" alt="">
        <h3 class="tamaño-20">${data[i].nom}</h3>
        <p class="p-14">${data[i].propietatsCount} properties</p>
      </div>
    `;
  }

  render("#seccion4-hoteles", filas3);
}

renderHotels();

//Search result
//Buscador

let filas4 = "";

filas4 += `<div class="input-item clase1">
                <span class="icon"><img src="/homepage/location.svg" alt=""></span>
                <input id="location" type="text" placeholder="${searchResultsData.query.where}" data-final="${searchResultsData.query.where}">
            </div>`

filas4 += `<div class="input-item clase2">
                <span class="icon"><img src="/homepage/calendar.svg" alt=""></span>
                <input id="checkin" type="text" placeholder="${searchResultsData.query.checkin}" data-final="04-19-2022">
            </div>`

filas4 += `<div class="input-item clase2">
                <span class="icon"><img src="/homepage/calendar.svg" alt=""></span>
                <input id="checkout" type="text" placeholder="${searchResultsData.query.checkout}" data-final="04-19-2022">
            </div>`
filas4 += `<div class="input-item clase3">
                <span class="icon"><img src="/homepage/user-square.svg" alt=""></span>
                <input id="guests" type="text" placeholder="${searchResultsData.query.guests}" data-final="0 adult, 0 children">
            </div>`
filas4 += `<button onclick="location.href='/searchresult/result.html'">Search</button>`
render("#search-result", filas4);

resultado += searchResultsData.totalResults
render("#resultados-numero", resultado);

//Filtros
for(let i = 0; i<searchResultsData.filters.budgetRanges.length; i++){
    filtros1 += `<li class="p-14"><label><input type="checkbox"> $ ${searchResultsData.filters.budgetRanges[i].min} - $ ${searchResultsData.filters.budgetRanges[i].max}</label>${searchResultsData.filters.budgetRanges[i].count}</li>`
}

render("#filter-js", filtros1);

for(let i = 0; i<searchResultsData.filters.budgetRanges.length; i++){
    filtros2 += `<li class="p-14"><label><input type="checkbox">${searchResultsData.filters.popularFilters[i].label}</label> ${searchResultsData.filters.popularFilters[i].count}</li>`    
}

render("#filtro-lista", filtros2);

for(let i = 0; i<searchResultsData.filters.budgetRanges.length; i++){
    filtros3 += `<li class="p-14"><label><input type="checkbox"> ${searchResultsData.filters.activities[i].label}</label>${searchResultsData.filters.activities[i].count}</li>`
}

render("#filtro-actividades", filtros3);

//Resultados hoteles
for(let i = 0; i<searchResultsData.results.length; i++){
    hotelesResult += `<div class="div-a1">
                            <img src="/searchresult/result-img/${searchResultsData.results[i].Img}" alt="" class="img8">

                            <div class="div-a1texto-container">
                                <div class="etiqueta">
                                    <h3>${searchResultsData.results[i].name}</h3>`
    if (searchResultsData.results[i].badge) {

        if (searchResultsData.results[i].badge.includes("15")) {
            hotelesResult += `<div class="fondo-rojo">
                                <p>${searchResultsData.results[i].badge}</p>
                            </div>`;
        } 
        else {
            if (searchResultsData.results[i].badge.includes("30")) {
                hotelesResult += `<div class="fondo-naranja">
                                    <p>${searchResultsData.results[i].badge}</p>
                                </div>`;
            }
        }

    }   
                                    
    hotelesResult += `</div>
                            <div class="div-text">
                                    <div class="div-a1texto">    
                                        <div class="puntuacion">
                                            <img src="/searchresult/result-img/stars.svg" alt="">
                                            <p class="p-14 color-gris">${searchResultsData.results[i].rating} (${searchResultsData.results[i].reviewsCount} Reviews)</p>
                                        </div>
                                        <p class="p-13 color-gris margin"><b>${searchResultsData.results[i].description.split("\n")[0]}</b></p>
                                        <p class="p-13 color-gris">${searchResultsData.results[i].description.split("\n")[1]}</p>
                                        <button onclick="location.href='product-detail/product.html'">See availability</button>
                                    </div>
                                    <div class="div-precio">`
    
    if (searchResultsData.results[i].descount){
        hotelesResult += `<div class="descuento">
                            <p class="p-13">${searchResultsData.results[i].descount ? searchResultsData.results[i].descount : ""}</p>
                        </div>`
    }                                

                                    
    hotelesResult += `<p class="p-14 color-gris">1 room 2 days</p>
                                        <div class="precio">
                                            <img src="result-img/${searchResultsData.results[i].oldPrice ? searchResultsData.results[i].oldPrice : ""}.svg" alt="">
                                            <h3>${searchResultsData.results[i].pricePerNight}</h3>
                                        </div>
                                        
                                        <p class="p-14 color-gris">Includes taxes and fees</p>
                                    </div>
                                </div>
                                
                            </div>

                        </div>`                                        
                                                                     
                           
}
render("#hoteles-resultados", hotelesResult);

//Product info
productInfo += `<div class="div-a1texto">
                            <h3 class="titulo-h3 tamaño-32">${productDetailData.hotel.name}</h3>
                        <div class="puntuacion">
                            <img src="/searchresult/result-img/stars.svg" alt="" width="82" height="20">
                            <p class="p-14 color-gris">${productDetailData.hotel.rating} (${productDetailData.hotel.reviewsCount} Reviews)</p>
                        </div>

                        <div class="location p-14">
                            <img src="product-img/location.svg" alt="">
                            <p class="p-13">${productDetailData.hotel.address}</p>
                            
                        </div>        
                    </div>
                    <div class="information-div">
                        <h4>Overview</h4>
                        <div class="overview-text">
                            <p>
                                ${productDetailData.hotel.overviewText.split("\n")[0]}
                            </p>
                            <p>
                                ${productDetailData.hotel.overviewText.split("\n")[1]}
                            </p>
                            <p>
                                ${productDetailData.hotel.overviewText.split("\n")[2]}
                            </p> 
                        </div>
                        
                        <hr class="hr-information">
                        <div>
                            <h4>Top facilities</h4>
                            <div class="ul-top">
                                <ul>
                                    <li><img src="product-img/${productDetailData.topFacilities[0].id}.svg" alt="">${productDetailData.topFacilities[0].label}</li>
                                    <li><img src="product-img/${productDetailData.topFacilities[1].id}.svg" alt="">${productDetailData.topFacilities[1].label}</li>
                                    <li><img src="product-img/${productDetailData.topFacilities[2].id}.svg" alt="">${productDetailData.topFacilities[2].label}</li>
                                </ul>
                                <ul>
                                    <li><img src="product-img/${productDetailData.topFacilities[3].id}.svg" alt="">${productDetailData.topFacilities[3].label}</li>
                                    <li><img src="product-img/${productDetailData.topFacilities[4].id}.svg" alt="">${productDetailData.topFacilities[4].label}</li>
                                    <li><img src="product-img/${productDetailData.topFacilities[5].id}.svg" alt="">${productDetailData.topFacilities[5].label}</li>
                                </ul> 
                            </div>
                            
                        </div>
                    </div>`

render("#product-info", productInfo)

productInfo2 += `<ul>`
productInfo2 += `<li><img src="product-img/plane.svg" alt="">${productDetailData.exploreArea[0].name}</li>`
for(let i=1; i<productDetailData.exploreArea.length; i++){
    productInfo2 += `<li><img src="product-img/bxs-map.svg" alt="">${productDetailData.exploreArea[i].name}</li>`                                                    
}
productInfo2 += `</ul>`
productInfo2 += `<ul class="explore-area-time">`

for(let i=0; i<productDetailData.exploreArea.length; i++){
    productInfo2 += `<li>${productDetailData.exploreArea[i].distance}</li>`

}

productInfo2 += `</ul>`
                            
render("#exploreArea", productInfo2)


resultado2 += `<div class="input-item clase2">
                <span class="icon"><img src="/homepage/calendar.svg" alt=""></span>
                <input id="checkin" type="text" placeholder="${searchResultsData.query.checkin}" data-final="04-19-2022">
            </div>`

resultado2 += `<div class="input-item clase2">
                <span class="icon"><img src="/homepage/calendar.svg" alt=""></span>
                <input id="checkout" type="text" placeholder="${searchResultsData.query.checkout}" data-final="04-19-2022">
            </div>`
resultado2 += `<div class="input-item clase3">
                <span class="icon"><img src="/homepage/user-square.svg" alt=""></span>
                <input id="guests" type="text" placeholder="${searchResultsData.query.guests}" data-final="0 adult, 0 children">
            </div>`
resultado2 += `<button onclick="location.href='/searchresult/result.html'">Check Availability</button>`
render("#search-result2", resultado2);

textPromotional += `<img src="/searchresult/result-img/principalblanco.svg" alt="" class="myplace-promotional">`
textPromotional +=  `<p class="p-promotional"><b class="blanco">${productDetailData.promoCard.title.split("\n")[0]}<br> ${productDetailData.promoCard.title.split("\n")[1]} <br> ${productDetailData.promoCard.title.split("\n")[2]} 
                    <br> <b class="amarillo">${productDetailData.promoCard.title.split("\n")[3]}</b></b></p>`

render("#promotional-text", textPromotional);

for(let i=0; i<productDetailData.rooms.length; i++){
    rooms += `<div class="div-rooms2">
                        <img src="product-img/rooms${[i]}.png" alt="" width="400" height="200">
                        <h5>${productDetailData.rooms[i].name}</h5>
                        <ul>
                            <li><img src="product-img/bag-1.svg" alt="">${productDetailData.rooms[i].price} sq ft</li>
                            <li><img src="product-img/pool-1.svg" alt="">Sleeps ${productDetailData.rooms[i].sleeps}</li>
                            <li><img src="product-img/like-1.svg" alt="">${productDetailData.rooms[i].beds}</li>
                        </ul>
                        <button onclick="location.href='/searchresult/checkout/check.html'">Reserve suite</button>
                </div>`
}

render("#cards-rooms", rooms);

check1 = '<ul>'
for(let i=0; i<checkoutData.policyItems.length; i++){
    check1 += `<li class="p-15">${checkoutData.policyItems[i]}</li>`
}
check1 += '</ul>'
render("#information-important", check1);

check2 = `<div class="hotel-info">
                    <img src="/searchresult/product-detail/product-img/img2.png" alt="" class="img2">
                <div class="etiqueta negro">
                    <h3 class="tamaño-18">${checkoutData.summaryCard.hotelName}</h3>
                </div>
                <div class="div-text">  
                    <div class="puntuacion gris">
                        <img src="/searchresult/result-img/stars.svg" alt="">
                        <p class="p-14">${checkoutData.summaryCard.rating} (${checkoutData.summaryCard.reviewsCount} Reviews)</p>
                    </div>
                    <p class="p-14 rojo margin">${checkoutData.summaryCard.policy}</p>
                    <p class="p-14 margin gris">Check in: ${checkoutData.summaryCard.checkIn}</p>
                    <p class="p-14 margin gris">Check out: ${checkoutData.summaryCard.checkOut}</p>
                    <p class="p-14 margin gris">${checkoutData.summaryCard.stayNights} night stay</p>

                </div>
            </div>`
render("#hotel-information", check2);

for(let i=0; i<checkoutData.priceDetails.items.length; i++){
    check3 += `<div class="room-price">
                <p>${checkoutData.priceDetails.items[i].description}</p>
                <p>$ ${checkoutData.priceDetails.items[i].amount}</p>
            </div>`
}

document.querySelector("#precio-js").textContent = checkoutData.priceDetails.currency + checkoutData.priceDetails.total

render("#precio-detalles", check3);

Mytrips = `<div class="etiqueta">
                <h2 class="negro">Lakeside Motel Warefront</h2>
            </div>
            <div class="div-text">
                <div class="div-a1texto">    
                    <div class="puntuacion">
                        <img src="/searchresult/result-img/stars.svg" alt="">
                        <p class="p-14 gris">${myTripsData.trips[0].rating} (${myTripsData.trips[0].reviewsCount} Reviews)</p>
                    </div>
                        <p class="p-14 rojo">${myTripsData.trips[0].policy}</p>
                        <p class="p-14 gris">Check in: ${myTripsData.trips[0].checkIn}</p>
                        <p class="p-14 gris">Check out: ${myTripsData.trips[0].checkOut}</p>
                        <p class="p-14 gris">${myTripsData.trips[0].stayNights} night stay</p>
                </div>

                <div class="div-precio">
                    <p class="p-14 gris">${myTripsData.trips[0].rooms} room ${myTripsData.trips[0].stayNights} days</p>
                    <div class="precio">
                        <img src="$${myTripsData.trips[0].oldPrice}.svg" alt="">
                        <h2>${myTripsData.trips[0].currency} ${myTripsData.trips[0].price}</h2>
                    </div>
                                    
                    <p class="p-14 gris">Includes taxes and fees</p>
                    <button>View trip details</button>
                </div>
            </div>`