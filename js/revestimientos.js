const rendCementoRevoque= 0.15
const rendCementoEnlucido= 0.03
const precioCemento=4

const rendArenaRevoque= 0.04
const rendArenaEnlucido= 0.03
const precioArena=7.35

const rendCalEnlucido= 0.12
const precioCalSublime=3.3

const rendPintura= 0.2
const precioLatex=4.5

const rendEnduido= 0.3
const precioEnduido=2

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
class MaterialesRevoque {
    constructor(cemento, arena){
        this.cemento = cemento;
        this.arena = arena;
    }
}
class MaterialesEnlucido {
    constructor(cemento, arena, cal){
        this.cemento = cemento;
        this.arena = arena;
        this.cal = cal;
    }
}
class MaterialesPintura {
    constructor(latex, enduido){
        this.latex = latex;
        this.enduido = enduido;
    }
}

//defino arrays vacios
let materialesR= []
let materialesE= []
let materialesP= []

//condicionales para consultar el localStore
if(localStorage.getItem('MaterialesR')){
    materialesR = JSON.parse(localStorage.getItem('MaterialesR'))
}else {
    localStorage.setItem('MaterialesR', JSON.stringify(materialesR))
}

if(localStorage.getItem('MaterialesE')){
    materialesE = JSON.parse(localStorage.getItem('MaterialesE'))
}else {
    localStorage.setItem('MaterialesE', JSON.stringify(materialesE))
}

if(localStorage.getItem('MaterialesP')){
    materialesP = JSON.parse(localStorage.getItem('MaterialesP'))
}else {
    localStorage.setItem('MaterialesP', JSON.stringify(materialesP))
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
    if(document.getElementById('btn-revoqueGrueso').checked){
        console.log("usted eligio revoque grueso")
        revoque()
    }
    else if(document.getElementById('btn-enlucido').checked){
        console.log("usted eligio enlucido")
        enlucido()
    }
    else if(document.getElementById('btn-pintura').checked){
        console.log("usted eligio pintura")
        pintura()
    }
}

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

const revoque = () =>{
//uso operador AND.
    let alto = document.getElementById('alto').value ;
    alto.length === 0 && avisoAlto ()
    let largo = document.getElementById('largo').value;
    largo.length === 0 && avisoLargo ()

    let resultado1 = Math.ceil(cementoRevoque(alto, largo, rendCementoRevoque))
    let resultado2 = Math.ceil(arenaRevoque(alto, largo, rendArenaRevoque))
    
    resume__text.innerHTML = `<h2>Revoque Grueso:</h2> <br> <p>Usted necesitara: <br>${ resultado1 } bolsas de cemento <br>${ resultado2 } m3 de arena  </p>`

//uso de dato de api()
    let resultado3 = Math.ceil((resultado1 * precioBlue * precioCemento)+(resultado2 * precioBlue * precioArena))

    resume__textPrice.innerHTML = `<p>El valor estimado es: $${ resultado3 } ARS</p>`
//Creo un array y lo guardo en el localStorage
    const valor = new MaterialesRevoque(resultado1,resultado2)
    materialesR.push(valor)
    localStorage.setItem('MaterialesR', JSON.stringify(materialesR))
}

const enlucido = () =>{
//uso operador AND.
    let alto = document.getElementById('alto').value ;
    alto.length === 0 && avisoAlto ()
    let largo = document.getElementById('largo').value;
    largo.length === 0 && avisoLargo ()

    let resultado1 = Math.ceil(cementoEnlucido (alto, largo, rendCementoEnlucido))
    let resultado2 = Math.ceil(arenaEnlucido(alto, largo, rendArenaEnlucido))
    let resultado3 = Math.ceil(cal(alto, largo, rendCalEnlucido))
    
    resume__text.innerHTML = `<h2>Enlucido fino:</h2> <br> <p>Usted necesitara: <br>${ resultado1 }  bolsas de cemento <br>${ resultado2 } m3 de arena <br>${ resultado3 } bolsas de cal sublime</p>`
    
//uso de dato de api()
    let resultado4 = Math.ceil((resultado1 * precioBlue * precioCemento)+(resultado2 * precioBlue * precioArena)+(resultado3 * precioBlue * precioCalSublime))

    resume__textPrice.innerHTML = `<p>El valor estimado es: $${ resultado4 } ARS</p>`
//Creo un array y lo guardo en el localStorage
    const valor = new MaterialesEnlucido(resultado1,resultado2,resultado3)
    materialesE.push(valor)
    localStorage.setItem('MaterialesE', JSON.stringify(materialesE))
}
const pintura =() =>{
//uso operador AND.
    let alto = document.getElementById('alto').value;
    alto.length === 0 && avisoAlto ()
    let largo = document.getElementById('largo').value;
    largo.length === 0 && avisoLargo ()

    let resultado1 = Math.ceil( pinturaLatex(alto, largo, rendPintura))
    let resultado2 = Math.ceil(enduido(alto, largo, rendEnduido))

    resume__text.innerHTML = `<h2>Cimiento Ciclopeo:</h2> <br> <p>Usted necesitara: <br>${ resultado1 } litros de pintura <br>${ resultado2 } kg de enduido </p>`

//uso de dato de api()
    let resultado3 = Math.ceil((resultado1 * precioBlue * precioLatex)+(resultado2 * precioBlue * precioEnduido))

    resume__textPrice.innerHTML = `<p>El valor estimado es: $${ resultado3 } ARS</p>`
//Creo un array y lo guardo en el localStorage
    const valor = new MaterialesPintura(resultado1,resultado2)
    materialesP.push(valor)
    localStorage.setItem('MaterialesP', JSON.stringify(materialesP))
}

const cementoRevoque = (alto, largo, rendCementoRevoque) => alto * largo* rendCementoRevoque;
const arenaRevoque = (alto, largo, rendArenaRevoque) => alto * largo* rendArenaRevoque;
const cementoEnlucido = (alto, largo, rendCementoEnlucido) => alto * largo* rendCementoEnlucido;
const arenaEnlucido = (alto, largo, rendArenaEnlucido) => alto * largo* rendArenaEnlucido;
const cal = (alto, largo, rendCalEnlucido) => alto * largo* rendCalEnlucido;
const pinturaLatex = (alto, largo, rendPintura) => alto * largo* rendPintura;
const enduido = (alto, largo, rendEnduido) => alto * largo* rendEnduido;

//Creo el evento a partir del boton de historial => donde lee el localStorage y lo inserta al html
document.getElementById("btn-calcular2").addEventListener("click", resumenTotal)

let botonResumen = document.getElementById("btn-calcular2")

function resumenTotal () {
    let historial=JSON.parse( localStorage.getItem("MaterialesR"))
    historial.forEach (materialesR => {
        resume__text2.innerHTML += `
        <p>Revoque Grueso 
        <br>${materialesR.cemento} bolsas de cemento
        <br>${materialesR.arena} m3 de arena
        `
    });
    let historial2=JSON.parse( localStorage.getItem("MaterialesE"))
    historial2.forEach (materialesE => {
        resume__text2.innerHTML += `
        <p>Enlucido
        <br>${materialesE.cemento} bolsas de cemento
        <br>${materialesE.arena} m3 de arena
        <br>${materialesE.cal} bolsas de cal
        `
    });
    let historial3=JSON.parse( localStorage.getItem("MaterialesP")) 
    historial3.forEach(materialesP => {
        resume__text2.innerHTML += `
        <p>Pintura 
        <br>${materialesP.latex} litros de pintura
        <br>${materialesP.enduido} kg de enduido
        `
    });
}

//Creo el evento a partir del boton de borrar historial => donde remueve los datos del localStorage y elimina el html creado anteriormente
document.getElementById("btn-calcular3").addEventListener("click", borrarHistorial)
let botonBorrar = document.getElementById("btn-calcular3")

function borrarHistorial () {
    localStorage.removeItem ("MaterialesR")
    localStorage.removeItem ("MaterialesE")
    localStorage.removeItem ("MaterialesP")

    document.querySelector(".resume__text2").innerHTML = ""

    materialesR= []
    materialesE= []
    materialesP= []

    localStorage.setItem('MaterialesR', JSON.stringify(materialesR))
    localStorage.setItem('MaterialesE', JSON.stringify(materialesE))
    localStorage.setItem('MaterialesP', JSON.stringify(materialesP))
}