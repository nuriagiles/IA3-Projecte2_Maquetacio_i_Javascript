import {destinacionsDestacades} from './js/destinacionsDestacades.js';
import {hotelsPopulars} from './js/hotelsPopulars.js';
import {ofertes} from './js/ofertes.js';

//Homepage
let filas = '';

//Destinacion 
for (let i = 0; i < destinacionsDestacades.length; i++) {
    filas += `
        <div>
            <img src="/${destinacionsDestacades[i].imatgeUrl}" alt="">
            <h3 class="tamaño-20">${destinacionsDestacades[i].nom}</h3>
            <p class="p-14">${destinacionsDestacades[i].propietatsCount} properties</p>
        </div>
    `;
}

document.querySelector("#seccion2-destinacion").innerHTML = filas;

let filas2 = ''
//Ofertas
for(let i = 0; i<ofertes.length; i++){
    filas2 += `
        <div>
            <img src="/${ofertes[i].imatgeUrl}" alt="">
            <div class="div-texto3">    
                <h3 class="tamaño-20">${ofertes[i].titol}</h3>
                <p class="p-16">${ofertes[i].descripcio}</p>
            </div>
        </div>
    `;
}

document.querySelector("#seccion3-ofertes").innerHTML = filas2

let filas3 = ''
//Hoteles
for(let i = 0; i<hotelsPopulars.length; i++){
    filas3 += `
        <div>
            <img src="/${hotelsPopulars[i].imatgeUrl}" alt="">
            <h3 class="tamaño-20">${hotelsPopulars[i].nom}</h3>
            <p class="p-14">${hotelsPopulars[i].propietatsCount} properties</p>
        </div>
    `;
}
document.querySelector("#seccion4-hoteles").innerHTML = filas3