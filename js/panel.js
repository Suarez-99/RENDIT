//defino las variables
const rendAislante= 1
const precioAislante=6

const rendCemento= 0.24
const precioCemento=4

const rendArena= 0.07
const precioArena=7.35

const rendMalla= 1.1
const precioMalla=4.2

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
class PanelEPS{
    constructor(aislante, cemento, arena, malla){
        this.aislante = aislante;
        this.cemento = cemento;
        this.arena = arena;
        this.malla = malla;
    }
}

//defino arrays vacios
let materialesPanel= []


//condicionales para consultar el localStore
if(localStorage.getItem('materialesPanel')){
    materialesPanel = JSON.parse(localStorage.getItem('materialesPanel'))
}else {
    localStorage.setItem('materialesPanel', JSON.stringify(materialesPanel))
}

//defino la variable en el id del formulario html
let formulario = document.getElementById("idForm")

//Creo el evento de escucha para el formulario
formulario.addEventListener('submit',(event) => {
    event.preventDefault()

    panelEPS()
    formulario.reset()
})

//Creo las funciones con swett alert para disminuir codigo.
function avisoAlto (){ Swal.fire({
    position: 'top-end',
    icon: 'warning',
    title: 'Usted no incluyo el alto',
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
function avisoAncho (){ Swal.fire({
    position: 'top-end',
    icon: 'warning',
    title: 'Usted no incluyo el ancho',
    showConfirmButton: false,
    timer: 1500
    })
}
function avisoAberturas (){ Swal.fire({
    position: 'top-end',
    icon: 'warning',
    title: 'Usted no incluyo todos los datos de aberturas',
    showConfirmButton: false,
    timer: 1500
    })
}

const panelEPS = () =>{
//uso operador AND.
    let alto = document.getElementById('alto').value ;
    alto.length === 0 && avisoAlto ()
    let largo = document.getElementById('largo').value;
    largo.length === 0 && avisoLargo ()
    let cantidadAbertura = document.getElementById('cantidadAbertura').value;
    cantidadAbertura.length === 0 && avisoAberturas ()
    let altoAbertura = document.getElementById('altoAbertura').value;
    altoAbertura.length === 0 && avisoAberturas ()
    let largoAbertura = document.getElementById('largoAbertura').value;
    largoAbertura.length === 0 && avisoAberturas ()

    let resultado1 = Math.ceil(aislante(alto, largo, rendAislante,cantidadAbertura,altoAbertura,largoAbertura))
    let resultado2 = Math.ceil(cemento(alto, largo, rendCemento,cantidadAbertura,altoAbertura,largoAbertura))
    let resultado3 = Math.ceil(arena(alto, largo, rendArena,cantidadAbertura,altoAbertura,largoAbertura))
    let resultado4 = Math.ceil(malla(alto, largo, rendMalla,cantidadAbertura,altoAbertura,largoAbertura))
    
    resume__text.innerHTML = `<h2>Panel EPS:</h2> <br> <p>Usted necesitara: <br>${ resultado1 } m2 de poliestireno expandido <br>${ resultado2 } bolsas de cemento <br>${ resultado3 } m3 de arena <br>${ resultado4 } mallas del 4</p>`

//uso de dato de api()
    let resultado5 = Math.ceil((resultado1 * precioBlue * precioAislante)+(resultado2 * precioBlue * precioCemento)+(resultado3 * precioBlue * precioArena)+(resultado4 * precioBlue * precioMalla))

    resume__textPrice.innerHTML = `<p>El valor estimado es: $${ resultado5 } ARS</p>`
//Creo un array y lo guardo en el localStorage
    const valor = new PanelEPS(resultado1,resultado2,resultado3,resultado4)
    materialesPanel.push(valor)
    localStorage.setItem('materialesPanel', JSON.stringify(materialesPanel))
}

const aislante = (alto, largo, rendAislante,cantidadAbertura,altoAbertura,largoAbertura) => ((alto*largo)-(cantidadAbertura*altoAbertura*largoAbertura))*rendAislante;
const cemento = (alto, largo, rendCemento,cantidadAbertura,altoAbertura,largoAbertura) => ((alto*largo)-(cantidadAbertura*altoAbertura*largoAbertura)*rendCemento);
const arena = (alto, largo, rendArena,cantidadAbertura,altoAbertura,largoAbertura) => ((alto*largo)-(cantidadAbertura*altoAbertura*largoAbertura)*rendArena);
const malla = (alto, largo, rendMalla,cantidadAbertura,altoAbertura,largoAbertura) => ((alto*largo)-(cantidadAbertura*altoAbertura*largoAbertura)*rendMalla);

//Creo el evento a partir del boton de historial => donde lee el localStorage y lo inserta al html
document.getElementById("btn-calcular2").addEventListener("click", resumenTotal)

let botonResumen = document.getElementById("btn-calcular2")

function resumenTotal () {
    let historial=JSON.parse( localStorage.getItem("materialesPanel"))
    historial.forEach (materialesPanel => {
        resume__text2.innerHTML += `
        <p>Panel EPS
        <br>${materialesPanel.aislante} m2 de poliestireno expandido
        <br>${materialesPanel.cemento} bolsas de cemento
        <br>${materialesPanel.arena} m3 de arena
        <br>${materialesPanel.malla} mallas</p>
        `
    });
}

//Creo el evento a partir del boton de borrar historial => donde remueve los datos del localStorage y elimina el html creado anteriormente
document.getElementById("btn-calcular3").addEventListener("click", borrarHistorial)
let botonBorrar = document.getElementById("btn-calcular3")

function borrarHistorial () {
    localStorage.removeItem ("materialesPanel")

    document.querySelector(".resume__text2").innerHTML = ""

    materialesPanel= []
    localStorage.setItem('materialesPanel', JSON.stringify(materialesPanel))
}