//supabase
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://oiyitodcscieoxokdobj.supabase.co";
let supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9peWl0b2Rjc2NpZW94b2tkb2JqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzNDU5MzksImV4cCI6MjA5MTkyMTkzOX0.9lNN7LXRRTkyXRwGgKAqk5va5NsdWtGJRfioBkMLx9M";
export const supabase = createClient(supabaseUrl, supabaseAnonKey);



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
async function renderSearchBar() {

  const { data, error } = await supabase
    .from("search_queries")
    .select("*")
    .single();

  if (error) {
    console.error("Error loading search config:", error);
    return;
  }

  let filas4 = "";

  filas4 += `
    <div class="input-item clase1">
      <span class="icon">
        <img src="/homepage/location.svg" alt="">
      </span>
      <input id="location" type="text" placeholder="${data.where_location}">
    </div>
  `;

  filas4 += `
    <div class="input-item clase2">
      <span class="icon">
        <img src="/homepage/calendar.svg" alt="">
      </span>
      <input id="checkin" type="text" placeholder="${data.checkin}">
    </div>
  `;

  filas4 += `
    <div class="input-item clase2">
      <span class="icon">
        <img src="/homepage/calendar.svg" alt="">
      </span>
      <input id="checkout" type="text" placeholder="${data.checkout}">
    </div>
  `;

  filas4 += `
    <div class="input-item clase3">
      <span class="icon">
        <img src="/homepage/user-square.svg" alt="">
      </span>
      <input id="guests" type="text" placeholder="${data.guests_adults} adults, ${data.guests_rooms} room">
    </div>
  `;

  filas4 += `
    <button onclick="location.href='/searchresult/result.html'">
      Search
    </button>
  `;

  render("#search-result", filas4);
}

renderSearchBar();


//Numero de resultados
async function cargarResultados() {

  const { data, error } = await supabase
    .from("searchresults")
    .select("*")
    .single();

  if (error) {
    console.error(error);
    return;
  }

  let resultado = "";
  resultado += data.total_results;

  render("#resultados-numero", resultado);

  let filtros1 = "";
  let filtros2 = "";
  let filtros3 = "";

  for (let i = 0; i < data.filters.budgetRanges.length; i++) {

    const item = data.filters.budgetRanges[i];

    filtros1 += `
      <li class="p-14">
        <label>
          <input type="checkbox">
          $${item.min} - $${item.max}
        </label>
        ${item.count}
      </li>
    `;
  }

  render("#filter-js", filtros1);

  for (let i = 0; i < data.filters.popularFilters.length; i++) {

    const item = data.filters.popularFilters[i];

    filtros2 += `
      <li class="p-14">
        <label>
          <input type="checkbox">
          ${item.label}
        </label>
        ${item.count}
      </li>
    `;
  }

  render("#filtro-lista", filtros2);

  for (let i = 0; i < data.filters.activities.length; i++) {

    const item = data.filters.activities[i];

    filtros3 += `
      <li class="p-14">
        <label>
          <input type="checkbox">
          ${item.label}
        </label>
        ${item.count}
      </li>
    `;
  }

  render("#filtro-actividades", filtros3);
}

cargarResultados();


//Resultados hoteles
async function cargarHoteles() {

  const { data, error } = await supabase
    .from("searchresults")
    .select("*")
    .single();

  if (error) {
    console.error(error);
    return;
  }

  let hotelesResult = "";

  for (let i = 0; i < data.results.length; i++) {

    const item = data.results[i];

    hotelesResult += `
      <div class="div-a1">

        <img src="/searchresult/result-img/${item.Img}" class="img8">

        <div class="div-a1texto-container">

          <div class="etiqueta">
            <h3>${item.name}</h3>`;

    if (item.badge) {

      if (item.badge.includes("15")) {
        hotelesResult += `
          <div class="fondo-rojo">
            <p>${item.badge}</p>
          </div>
        `;
      }

      if (item.badge.includes("30")) {
        hotelesResult += `
          <div class="fondo-naranja">
            <p>${item.badge}</p>
          </div>`;
      }
    }

    hotelesResult += `
          </div>

          <div class="div-text">

            <div class="div-a1texto">

              <div class="puntuacion">
                <img src="/searchresult/result-img/stars.svg">
                <p class="p-14 color-gris">
                  ${item.rating} (${item.reviewsCount} Reviews)
                </p>
              </div>

              <p class="p-13 color-gris margin">
                <b>${item.description?.split("\n")[0] || ""}</b>
              </p>

              <p class="p-13 color-gris">
                ${item.description?.split("\n")[1] || ""}
              </p>

              <button onclick="location.href='product-detail/product.html'">
                See availability
              </button>

            </div>

            <div class="div-precio">`;

    if (item.descount) {
      hotelesResult += `
        <div class="descuento">
          <p class="p-13">${item.descount}</p>
        </div>`;
    }

    hotelesResult += `
              <p class="p-14 color-gris">1 room 2 days</p>

              <div class="precio">`

    if (item.oldPrice) {
      hotelesResult += `<img src="/searchresult/result-img/${item.oldPrice}.svg" alt="">`;
    }

    hotelesResult +=`
                <h3>${item.pricePerNight}</h3>
              </div>

              <p class="p-14 color-gris">Includes taxes and fees</p>

            </div>

          </div>

        </div>

      </div>`;
  }

  render("#hoteles-resultados", hotelesResult);
}

cargarHoteles();


//Product info
async function cargarProductDetail() {

    const { data, error } = await supabase
        .from("productdetail")
        .select("*")
        .single();

    if (error) {
        console.error(error);
        return;
    }

    let productInfo = "";

    const overview = (data.hotel_info.hotel.overviewText || "").split("\n");

    productInfo += `
        <div class="div-a1texto">

            <h3 class="titulo-h3 tamaño-32">
                ${data.hotel_info.hotel.name}
            </h3>

            <div class="puntuacion">
                <img src="/searchresult/result-img/stars.svg" alt="" width="82" height="20">
                <p class="p-14 color-gris">
                    ${data.hotel_info.hotel.rating} 
                    (${data.hotel_info.hotel.reviewsCount} Reviews)
                </p>

            </div>

            <div class="location p-14">

                <img src="product-img/location.svg" alt="">

                <p class="p-13">
                    ${data.hotel_info.hotel.address}
                </p>

            </div>

        </div>

        <div class="information-div">

            <h4>Overview</h4>

            <div class="overview-text">

                <p>${overview[0] || ""}</p>
                <p>${overview[1] || ""}</p>
                <p>${overview[2] || ""}</p>

            </div>

            <hr class="hr-information">

            <div>

                <h4>Top facilities</h4>

                <div class="ul-top">

                    <ul>`;

    for (let i = 0; i < 3; i++) {

        productInfo += `<li>
                            <img 
                                src="product-img/${data.top_facilities[i].id}.svg" 
                                alt=""
                            >
                            ${data.top_facilities[i].label}
                        </li>`;
    }

    productInfo += `</ul><ul>`;

    for (let i = 3; i < data.top_facilities.length; i++) {

        productInfo += `<li>
                            <img 
                                src="product-img/${data.top_facilities[i].id}.svg" 
                                alt=""
                            >
                            ${data.top_facilities[i].label}
                        </li>`;
    }

    productInfo += `</ul>
                </div>
            </div>
        </div>`;

    render("#product-info", productInfo);


    let productInfo2 = "";

    productInfo2 += `<ul>`;

    for (let i = 0; i < data.explore_area.length; i++) {

        productInfo2 += `<li>
                            <img src="product-img/${i === 0 ? "plane.svg" : "bxs-map.svg"}" alt="">
                            ${data.explore_area[i].name}
                        </li>`;
    }

    productInfo2 += `</ul>`;

    productInfo2 += `<ul class="explore-area-time">`;

    for (let i = 0; i < data.explore_area.length; i++) {

        productInfo2 += `
            <li>
                ${data.explore_area[i].distance}
            </li>
        `;
    }

    productInfo2 += `</ul>`;

    render("#exploreArea", productInfo2);


    let resultado2 = "";

    resultado2 += `
        <div class="input-item clase2">

            <span class="icon">
                <img src="/homepage/calendar.svg" alt="">
            </span>

            <input id="checkin" type="text" placeholder="${data.checkin}">
        </div>`;

    resultado2 += `<div class="input-item clase2">
                    <span class="icon">
                        <img src="/homepage/calendar.svg" alt="">
                    </span>

                    <input id="checkout" type="text" placeholder="${data.checkout}">
                </div>`;

    resultado2 += `<div class="input-item clase3">

                    <span class="icon">
                        <img src="/homepage/user-square.svg" alt="">
                    </span>

                    <input id="guests" type="text" placeholder="${data.guests}">
                </div>`;

    resultado2 += `<button onclick="location.href='/searchresult/result.html'">
                        Check Availability
                    </button>`;

    render("#search-result2", resultado2);

    let textPromotional = "";

    const promo = (data.promoCard || "").split("\n"); 

    textPromotional += `
        <img
            src="/searchresult/result-img/principalblanco.svg"
            alt=""
            class="myplace-promotional"
        >
    `;

    textPromotional += `<p class="p-promotional">
                            <b class="blanco">
                                ${promo}
                            </b>
                        </p>`;

    render("#promotional-text", textPromotional);

    let rooms = "";

    for (let i = 0; i < data.rooms.length; i++) {

        rooms += `
            <div class="div-rooms2">

                <img
                    src="product-img/rooms${i}.png"
                    alt=""
                    width="400"
                    height="200"
                >

                <h5>
                    ${data.rooms[i].name}
                </h5>

                <ul>

                    <li>
                        <img src="product-img/bag-1.svg" alt="">
                        ${data.rooms[i].price}
                    </li>

                    <li>
                        <img src="product-img/pool-1.svg" alt="">
                        Sleeps ${data.rooms[i].sleeps}
                    </li>

                    <li>
                        <img src="product-img/like-1.svg" alt="">
                        ${data.rooms[i].beds}
                    </li>

                </ul>

                <button
                    onclick="location.href='/searchresult/checkout/check.html'"
                >
                    Reserve suite
                </button>

            </div>`;
    }

    render("#cards-rooms", rooms);
}

cargarProductDetail();


//Checkout
async function cargarCheckout() {
    const { data, error } = await supabase
        .from("checkout")
        .select("*")
        .single();

    if (error) {
        console.error(error);
        return;
    }

    // POLICY ITEMS
    let check1 = '<ul>';

    for (let i = 0; i < data.policy_items.length; i++) {
        check1 += `
            <li class="p-15">
                ${data.policy_items[i]}
            </li>
        `;
    }

    check1 += '</ul>';

    render("#information-important", check1);

    let check2 = `
        <div class="hotel-info">

            <img 
                src="/searchresult/product-detail/product-img/img2.png" 
                alt="" 
                class="img2"
            >

            <div class="etiqueta negro">
                <h3 class="tamaño-18">
                    ${data.hotel_name}
                </h3>
            </div>

            <div class="div-text">  

                <div class="puntuacion gris">
                    <img src="/searchresult/result-img/stars.svg" alt="">
                    <p class="p-14">
                        ${data.rating} (${data.reviews_count} Reviews)
                    </p>
                </div>

                <p class="p-14 rojo margin">
                    ${data.policy}
                </p>

                <p class="p-14 margin gris">
                    Check in: ${data.check_in}
                </p>

                <p class="p-14 margin gris">
                    Check out: ${data.check_out}
                </p>

                <p class="p-14 margin gris">
                    ${data.stay_nights} night stay
                </p>

            </div>

        </div>`;

    render("#hotel-information", check2);

    let check3 = '';

    for (let i = 0; i < data.price_items.length; i++) {

        check3 += `
            <div class="room-price">
                <p>${data.price_items[i].description}</p>
                <p>$ ${data.price_items[i].amount}</p>
            </div>`;
    }

    render("#precio-detalles", check3);

    const precio = document.querySelector("#precio-js");

    if (precio) {
        precio.textContent = data.currency + data.total;
    }
}

cargarCheckout();


async function cargarMyTrips() {

    const { data, error } = await supabase
        .from("mytrips")
        .select("*")
        .single();

    if (error) {
        console.error(error);
        return;
    }

    let Mytrips = `
        <div class="etiqueta">
            <h2 class="negro">${data.hotel_name}</h2>
        </div>

        <div class="div-text">

            <div class="div-a1texto">

                <div class="puntuacion">
                    <img src="/searchresult/result-img/stars.svg" alt="">
                    <p class="p-14 gris">
                        ${data.rating} (${data.reviews_count} Reviews)
                    </p>
                </div>

                <p class="p-14 rojo">
                    ${data.policy}
                </p>

                <p class="p-14 gris">
                    Check in: ${data.check_in}
                </p>

                <p class="p-14 gris">
                    Check out: ${data.check_out}
                </p>

                <p class="p-14 gris">
                    ${data.stay_nights} night stay
                </p>

            </div>

            <div class="div-precio">

                <p class="p-14 gris">
                    ${data.rooms} room ${data.stay_nights} days
                </p>

                <div class="precio">
                    <img src="/searchresult/result-img/$150.svg" alt="">
                    <h2>${data.currency}${data.price}</h2>
                </div>

                <p class="p-14 gris">
                    Includes taxes and fees
                </p>

                <button>
                    View trip details
                </button>

            </div>
        </div>`;

    render("#Mytrips-details", Mytrips);
}

cargarMyTrips();
