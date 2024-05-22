const rendPlacas= 0.5
const precioPlacasTabique=6.2
const precioPlacasCielorraso=6.1

const rendSoleras= 0.4
const precioSolerasTabique=2.5
const precioSolerasCielorraso=2

const rendMontante= 1.2
const precioMontanteTabique=3.1
const precioMontanteCielorraso=2.5

const rendTornillos= 40
const precioTornillos=.04

const rendCinta= 3
const precioCinta=0.04

const rendMasilla= 1.8
const precioMasilla=2.1

const rendAislante= 1
const precioAislante=4

const resume__text = document.querySelector(".resume__text");
const resume__textPrice = document.querySelector(".resume__textPrice");
const resume__text2 = document.querySelector(".resume__text2");

const dolarApi =
    fetch('https://criptoya.com/api/dolar')
    .then(response => response.json())
    .then(dolar => { 
    let{blue} = dolar
    localStorage.setItem('dolar', JSON.stringify(blue))
    });

let precioBlue=JSON.parse(localStorage.getItem("dolar"))

//defino funciones constructoras
class MaterialesTabique {
    constructor(placas, solera, montante, tornillos, cinta, masilla, aislante){
        this.placas = placas;
        this.solera = solera;
        this.montante = montante;
        this.tornillos = tornillos;
        this.cinta = cinta;
        this.masilla = masilla;
        this.aislante = aislante;
    }
}
class MaterialesCielorraso {
    constructor(placas, solera, montante, tornillos, cinta, masilla){
        this.placas = placas;
        this.solera = solera;
        this.montante = montante;
        this.tornillos = tornillos;
        this.cinta = cinta;
        this.masilla = masilla;
    }
}

//defino arrays vacios
let materialesTabique= []
let materialesCielorraso= []

//condicionales para consultar el localStore
if(localStorage.getItem('MaterialesTabique')){
    materialesTabique = JSON.parse(localStorage.getItem('MaterialesTabique'))
}else {
    localStorage.setItem('MaterialesTabique', JSON.stringify(materialesTabique))
}

if(localStorage.getItem('MaterialesCielorraso')){
    materialesCielorraso = JSON.parse(localStorage.getItem('MaterialesCielorraso'))
}else {
    localStorage.setItem('MaterialesCielorraso', JSON.stringify(materialesCielorraso))
}

//defino la variable en el id del formulario html
let formulario = document.getElementById("idForm")

//Creo el evento de escucha para el formulario
formulario.addEventListener('submit',(event) => {
    event.preventDefault()

    sistemaElegido()
    formulario.reset()
})

//Creo las funciones dentro del formulario => donde se elige el sistema y a partir de ese dato se dirige a elegir el tipo de hormigon.
const sistemaElegido = () => {
    if(document.getElementById('btn-tabiqueInterior').checked){
        console.log("usted eligio tabique interno")
        tabiqueInterior()
    }
    else if(document.getElementById('btn-cielorraso').checked){
        console.log("usted eligio cielorraso")
        cielorraso()
    }
}

//Creo las funciones con swett alert para disminuir codigo.
function avisoAncho (){ Swal.fire({
    position: 'top-end',
    icon: 'warning',
    title: 'Usted no incluyo el ancho',
    showConfirmButton: false,
    timer: 1500
    })
}
function avisoLargo (){ Swal.fire({
    position: 'top-end',
    icon: 'warning',
    title: 'Usted no incluyo el largo',
    showConfirmButton: false,
    timer: 1500
    })
}

const tabiqueInterior= () =>{
//uso operador AND.
    let ancho = document.getElementById('ancho').value ;
    ancho.length === 0 && avisoAncho ()
    let largo = document.getElementById('largo').value;
    largo.length === 0 && avisoLargo ()

    let resultado1 = Math.ceil(placas(largo, ancho, rendPlacas))
    let resultado2 = Math.ceil(soleras(largo, ancho, rendSoleras))
    let resultado3 = Math.ceil(montante(largo, ancho, rendMontante))
    let resultado4 = Math.ceil(tornillos(largo, ancho, rendTornillos))
    let resultado5 = Math.ceil(cinta(largo, ancho, rendCinta))
    let resultado6 = Math.ceil(masilla(largo, ancho, rendMasilla))
    let resultado7 = Math.ceil(aislante(largo, ancho, rendAislante))
    
    resume__text.innerHTML = `<h2>Tabique Interior:</h2> <br> <p>Usted necesitara: <br>${ resultado1 } placas de 9,5mm <br>${ resultado2 } soleras de 35mm <br>${ resultado3 } montantes de 34mm <br>${ resultado4 } tornillos T1 <br>${ resultado5 } metros de cinta tramada <br>${ resultado6 } kg de masilla <br>${ resultado7 } m2 de lana de vidrio</p>`

//uso de dato de api()
    let resultado8 = Math.ceil((resultado1 * precioBlue * precioPlacasTabique)+(resultado2 * precioBlue * precioSolerasTabique)+(resultado3* precioBlue * precioMontanteTabique)+(resultado4* precioBlue * precioTornillos)+(resultado5 * precioBlue * precioCinta)+(resultado6* precioBlue * precioMasilla)+(resultado7 * precioBlue * precioAislante))

    resume__textPrice.innerHTML = `<p>El valor estimado es: $${ resultado8 } ARS</p>`
//Creo un array y lo guardo en el localStorage
    const valor = new MaterialesTabique(resultado1,resultado2,resultado3,resultado4,resultado5,resultado6,resultado7)
    materialesTabique.push(valor)
    localStorage.setItem('MaterialesTabique', JSON.stringify(materialesTabique))
}

const cielorraso = () =>{
//uso operador AND.
    let ancho = document.getElementById('ancho').value ;
    ancho.length === 0 && avisoAncho ()
    let largo = document.getElementById('largo').value;
    largo.length === 0 && avisoLargo ()

    let resultado1 = Math.ceil(placas(largo, ancho, rendPlacas))
    let resultado2 = Math.ceil(soleras(largo, ancho, rendSoleras))
    let resultado3 = Math.ceil(montante(largo, ancho, rendMontante))
    let resultado4 = Math.ceil(tornillos(largo, ancho, rendTornillos))
    let resultado5 = Math.ceil(cinta(largo, ancho, rendCinta))
    let resultado6 = Math.ceil(masilla(largo, ancho, rendMasilla))
    
    resume__text.innerHTML = `<h2>Cielorraso:</h2> <br> <p>Usted necesitara: <br>${ resultado1 } placas de 9,5mm <br>${ resultado2 } soleras de 35mm <br>${ resultado3 } montantes de 34mm <br>${ resultado4 } tornillos T1 <br>${ resultado5 } metros de cinta tramada <br>${ resultado6 } kg de masilla</p>`
    
//uso de dato de api()
    let resultado7 = Math.ceil((resultado1 * precioBlue * precioPlacasCielorraso)+(resultado2 * precioBlue * precioSolerasCielorraso)+(resultado3* precioBlue * precioMontanteCielorraso)+(resultado4* precioBlue * precioTornillos)+(resultado5 * precioBlue * precioCinta)+(resultado6* precioBlue * precioMasilla))

    resume__textPrice.innerHTML = `<p>El valor estimado es: $${ resultado7 } ARS</p>`
//Creo un array y lo guardo en el localStorage
    const valor = new MaterialesCielorraso(resultado1,resultado2,resultado3,resultado4,resultado5,resultado6)
    materialesCielorraso.push(valor)
    localStorage.setItem('MaterialesCielorraso', JSON.stringify(materialesCielorraso))
}

const placas = (largo, ancho, rendPlacas) => largo * ancho* rendPlacas;
const soleras = (largo, ancho, rendSoleras) => largo * ancho* rendSoleras;
const montante = (largo, ancho, rendMontante) => largo * ancho* rendMontante;
const tornillos = (largo, ancho, rendTornillos) => largo * ancho* rendTornillos;
const cinta = (largo, ancho, rendCinta) => largo * ancho* rendCinta;
const masilla = (largo, ancho, rendMasilla) => largo * ancho* rendMasilla;
const aislante = (largo, ancho, rendAislante) => largo * ancho* rendAislante;

//Creo el evento a partir del boton de historial => donde lee el localStorage y lo inserta al html
document.getElementById("btn-calcular2").addEventListener("click", resumenTotal)

let botonResumen = document.getElementById("btn-calcular2")

function resumenTotal () {
    let historial=JSON.parse( localStorage.getItem("MaterialesTabique"))
    historial.forEach (materialesTabique => {
        resume__text2.innerHTML += `
        <p>Tabique Interior
        <br>${materialesTabique.placas} placas de roca de yeso de 12,5mm
        <br>${materialesTabique.solera} soleras de 70mm
        <br>${materialesTabique.montante} montante de 69mm
        <br>${materialesTabique.tornillos} tornillos
        <br>${materialesTabique.cinta} cinta tramada
        <br>${materialesTabique.masilla} kg de masilla
        <br>${materialesTabique.aislante} m2 de lana de vidrio </p>
        `
    });
    let historial2=JSON.parse( localStorage.getItem("MaterialesCielorraso"))
    historial2.forEach (materialesCielorraso => {
        resume__text2.innerHTML += `
        <p>Cielorraso
        <br>${materialesCielorraso.placas} placas de roca de yeso de 9,5mm
        <br>${materialesCielorraso.solera} soleras de 35mm
        <br>${materialesCielorraso.montante} montante de 34mm
        <br>${materialesCielorraso.tornillos} tornillos
        <br>${materialesCielorraso.cinta} metros de cinta tramada
        <br>${materialesCielorraso.masilla} kg de masilla  </p>
        `
    });
}

//Creo el evento a partir del boton de borrar historial => donde remueve los datos del localStorage y elimina el html creado anteriormente
document.getElementById("btn-calcular3").addEventListener("click", borrarHistorial)
let botonBorrar = document.getElementById("btn-calcular3")

function borrarHistorial () {
    localStorage.removeItem ("MaterialesTabique")
    localStorage.removeItem ("MaterialesCielorraso")

    document.querySelector(".resume__text2").innerHTML = ""

    materialesCielorraso= []
    materialesTabique= []
    localStorage.setItem('MaterialesCielorraso', JSON.stringify(materialesCielorraso))
    localStorage.setItem('MaterialesTabique', JSON.stringify(materialesTabique))
}