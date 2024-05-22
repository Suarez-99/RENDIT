//defino las variables
const rendCemento= 3
const precioCemento=4

const rendArena= 0.9
const precioArena=7.35

const rendRipio= 0.9
const precioRipio=5

const rendHormigonCimiento= 0.7
const rendHormigonBases= 0.9
const precioHormigon=44

const rendPiedraBolaCimiento= 0.30
const rendPiedraBolaBases= 0.10
const precioPiedraBola=3

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
class MaterialesBasesDeObra {
    constructor(cemento, arena, ripio, piedraBola){
        this.cemento = cemento;
        this.arena = arena;
        this.ripio = ripio;
        this.piedraBola = piedraBola;
    }
}
class MaterialesBasesElaborado {
    constructor(hormigon, piedraBola){
        this.hormigon = hormigon;
        this.piedraBola = piedraBola;
    }
}
class MaterialesCimientoDeObra {
    constructor(cemento, arena, ripio, piedraBola){
        this.cemento = cemento;
        this.arena = arena;
        this.ripio = ripio;
        this.piedraBola = piedraBola;
    }
}
class MaterialesCimientoElaborado {
    constructor(hormigon, piedraBola){
        this.hormigon = hormigon;
        this.piedraBola = piedraBola;
    }
}

//defino arrays vacios
let materialesB= []
let materialesBE= []
let materialesC= []
let materialesCE= []


//condicionales para consultar el localStore
if(localStorage.getItem('MaterialesB')){
    materiales = JSON.parse(localStorage.getItem('MaterialesB'))
}else {
    localStorage.setItem('MaterialesB', JSON.stringify(materialesB))
}

if(localStorage.getItem('MaterialesBE')){
    materialesBE = JSON.parse(localStorage.getItem('MaterialesBE'))
}else {
    localStorage.setItem('MaterialesBE', JSON.stringify(materialesBE))
}

if(localStorage.getItem('MaterialesC')){
    materialesC = JSON.parse(localStorage.getItem('MaterialesC'))
}else {
    localStorage.setItem('MaterialesC', JSON.stringify(materialesC))
}

if(localStorage.getItem('MaterialesCE')){
    materialesCE = JSON.parse(localStorage.getItem('MaterialesCE'))
}else {
    localStorage.setItem('MaterialesCE', JSON.stringify(materialesCE))
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
    if(document.getElementById('btn-bases').checked){
        console.log("usted eligio bases asiladas")
        bases()
    }
    else if(document.getElementById('btn-ciclopeo').checked){
        console.log("usted eligio cimiento ciclopeo")
        ciclopeo()
    }
}

//Creo las funciones dentro del formulario => donde se elige el tipo de hormigon y a partir de ese dato con las dimensiones calcula la cant de materiales necesarios.
const bases = () => {
    if(document.getElementById('btn-deObra').checked){
        console.log("usted eligio hormigon de Obra")
        basesDeObra()
    }
    else if(document.getElementById('btn-elaborado').checked){
        console.log("usted eligio hormigon elaborado")
        basesDeElaborado()
    }
}

const ciclopeo = () => {
    if(document.getElementById('btn-deObra').checked){
        console.log("usted eligio hormigon de Obra")
        ciclopeoDeObra()
    }
    else if(document.getElementById('btn-elaborado').checked){
        console.log("usted eligio hormigon elaborado")
        ciclopeoElaborado()
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
function avisoAncho (){ Swal.fire({
    position: 'top-end',
    icon: 'warning',
    title: 'Usted no incluyo el ancho',
    showConfirmButton: false,
    timer: 1500
    })
}

const basesDeObra = () =>{
//uso operador AND.
    let alto = document.getElementById('alto').value ;
    alto.length === 0 && avisoAlto ()
    let ancho = document.getElementById('ancho').value;
    ancho.length === 0 && avisoAncho ()
    let largo = document.getElementById('largo').value;
    largo.length === 0 && avisoLargo ()

    let resultado1 = Math.ceil(cemento(alto, largo, ancho, rendCemento))
    let resultado2 = Math.ceil(arena(alto, largo, ancho, rendArena))
    let resultado3 = Math.ceil(ripio (alto, largo, ancho, rendRipio))
    let resultado4 = Math.ceil(piedrabolaBases (alto, largo, ancho, rendPiedraBolaBases))
    
    resume__text.innerHTML = `<h2>Bases Aisladas:</h2> <br> <p>Usted necesitara: <br>${ resultado1 } bolsas de cemento <br>${ resultado2 } m3 de arena <br>${ resultado3 } m3 de ripio <br>${ resultado4 } m3 de piedra bola</p>`

//uso de dato de api()
    let resultado5 = Math.ceil((resultado1 * precioBlue * precioCemento)+(resultado2 * precioBlue * precioArena)+(resultado3 * precioBlue * precioRipio)+(resultado4 * precioBlue * precioPiedraBola))

    resume__textPrice.innerHTML = `<p>El valor estimado es: $${ resultado5 } ARS</p>`
//Creo un array y lo guardo en el localStorage
    const valor = new MaterialesBasesDeObra(resultado1,resultado2,resultado3,resultado4)
    materialesB.push(valor)
    localStorage.setItem('MaterialesB', JSON.stringify(materialesB))
}

const basesDeElaborado = () =>{
//uso operador AND.
    let alto = document.getElementById('alto').value ;
    alto.length === 0 && avisoAlto ()
    let ancho = document.getElementById('ancho').value;
    ancho.length === 0 && avisoAncho ()
    let largo = document.getElementById('largo').value;
    largo.length === 0 && avisoLargo ()

    let resultado1 = Math.ceil(hormigonBases (alto, largo, ancho, rendHormigonBases))
    let resultado2 = Math.ceil(piedrabolaBases(alto, largo, ancho, rendPiedraBolaBases))
    
    resume__text.innerHTML = `<h2>Bases Aisladas:</h2> <br> <p>Usted necesitara: <br>${ resultado1 } m3 de hormigon elaborado <br>${ resultado2 } m3 de piedra bola</p>`
    
//uso de dato de api()
    let resultado3 = Math.ceil((resultado1 * precioBlue * precioHormigon)+(resultado2 * precioBlue * precioPiedraBola))

    resume__textPrice.innerHTML = `<p>El valor estimado es: $${ resultado3 } ARS</p>`
//Creo un array y lo guardo en el localStorage
    const valor = new MaterialesBasesElaborado(resultado1,resultado2)
    materialesBE.push(valor)
    localStorage.setItem('MaterialesBE', JSON.stringify(materialesBE))
}
const ciclopeoDeObra =() =>{
//uso operador AND.
    let alto = document.getElementById('alto').value;
    alto.length === 0 && avisoAlto ()
    let ancho = document.getElementById('ancho').value;
    ancho.length === 0 && avisoAncho ()
    let largo = document.getElementById('largo').value;
    largo.length === 0 && avisoLargo ()

    let resultado1 = Math.ceil( cemento(alto, largo, ancho, rendCemento))
    let resultado2 = Math.ceil(arena(alto, largo, ancho, rendArena))
    let resultado3 = Math.ceil(ripio (alto, largo, ancho, rendRipio))
    let resultado4 = Math.ceil(piedrabolaCimiento(alto,largo,ancho, rendPiedraBolaCimiento))
    resume__text.innerHTML = `<h2>Cimiento Ciclopeo:</h2> <br> <p>Usted necesitara: <br>${ resultado1 } bolsas de cemento <br>${ resultado2 } m3 de arena <br>${ resultado3 } m3 de ripio <br>${ resultado4 } m3 de piedra bola </p>`

//uso de dato de api()
    let resultado5 = Math.ceil((resultado1 * precioBlue * precioCemento)+(resultado2 * precioBlue * precioArena)+(resultado3 * precioBlue * precioRipio)+(resultado4 * precioBlue * precioPiedraBola))

    resume__textPrice.innerHTML = `<p>El valor estimado es: $${ resultado5 } ARS</p>`
//Creo un array y lo guardo en el localStorage
    const valor = new MaterialesCimientoDeObra(resultado1,resultado2,resultado3,resultado4)
    materialesC.push(valor)
    localStorage.setItem('MaterialesC', JSON.stringify(materialesC))
}

const ciclopeoElaborado =() =>{
//uso operador AND.
    let alto = document.getElementById('alto').value;
    alto.length === 0 && avisoAlto ()
    let ancho = document.getElementById('ancho').value;
    ancho.length === 0 && avisoAncho ()
    let largo = document.getElementById('largo').value;
    largo.length === 0 && avisoLargo ()

    let resultado1 = Math.ceil(hormigonCimiento(alto,largo,ancho, rendHormigonCimiento))
    let resultado2 = Math.ceil(piedrabolaCimiento(alto,largo,ancho, rendPiedraBolaCimiento))
    resume__text.innerHTML = `<h2>Cimiento Ciclopeo:</h2> <br> <p>Usted necesitara: <br>${ resultado1 } m3 de hormigon elaborado <br>${ resultado2 } m3 de piedra bola </p>`
    
//uso de dato de api()
    let resultado3 = Math.ceil((resultado1 * precioBlue * precioHormigon)+(resultado2 * precioBlue * precioPiedraBola))

    resume__textPrice.innerHTML = `<p>El valor estimado es: $${ resultado3 } ARS</p>`
//Creo un array y lo guardo en el localStorage
    const valor = new MaterialesCimientoElaborado(resultado1,resultado2)
    materialesCE.push(valor)
    localStorage.setItem('MaterialesCE', JSON.stringify(materialesCE))
}

const hormigonBases = (alto, largo, ancho, rendHormigonBases) => alto * largo * ancho * rendHormigonBases;
const hormigonCimiento = (alto, largo, ancho, rendHormigonCimiento) => alto * largo * ancho * rendHormigonCimiento;
const piedrabolaBases = (alto, largo, ancho, rendPiedraBolaBases) => alto * largo * ancho * rendPiedraBolaBases;
const piedrabolaCimiento = (alto, largo, ancho, rendPiedraBolaCimiento) => alto * largo * ancho * rendPiedraBolaCimiento;
const cemento = (alto, largo, ancho, rendCemento) => alto * largo * ancho * rendCemento;
const arena = (alto, largo, ancho, rendArena) => alto * largo * ancho * rendArena;
const ripio = (alto, largo, ancho, rendRipio) => alto * largo * ancho * rendRipio;

//Creo el evento a partir del boton de historial => donde lee el localStorage y lo inserta al html
document.getElementById("btn-calcular2").addEventListener("click", resumenTotal)

let botonResumen = document.getElementById("btn-calcular2")

function resumenTotal () {
    let historial=JSON.parse( localStorage.getItem("MaterialesB"))
    historial.forEach (materiales => {
        resume__text2.innerHTML += `
        <p>BASE AISLADA 
        <br>${materiales.cemento} bolsas de cemento
        <br>${materiales.arena} m3 de arena
        <br>${materiales.ripio} m3 de ripio
        <br>${materiales.piedraBola} m3 de ripio</p>
        `
    });
    let historial2=JSON.parse( localStorage.getItem("MaterialesBE"))
    historial2.forEach (materialesBE => {
        resume__text2.innerHTML += `
        <p>BASE AISLADA 
        <br>${materialesBE.hormigon} m3 de hormigon
        <br>${materialesBE.piedraBola} m3 de piedraBola</p
        `
    });
    let historial3=JSON.parse( localStorage.getItem("MaterialesC")) 
    historial3.forEach(materialesC => {
        resume__text2.innerHTML += `
        <p>CIMIENTO CICLOPEO 
        <br>${materialesC.cemento} bolsas de cemento
        <br>${materialesC.arena} m3 de arena
        <br>${materialesC.ripio} m3 de ripio
        <br>${materialesC.piedraBola} m3 de ripio</p>
        `
    });
    let historial4=JSON.parse( localStorage.getItem("MaterialesCE"))
    historial4.forEach (materialesCE => {
        resume__text2.innerHTML += `
        <p>CIMIENTO CICLOPEO 
        <br>${materialesCE.hormigon} m3 de hormigon
        <br>${materialesCE.piedraBola} m3 de piedraBola</p
        `
    });
}

//Creo el evento a partir del boton de borrar historial => donde remueve los datos del localStorage y elimina el html creado anteriormente
document.getElementById("btn-calcular3").addEventListener("click", borrarHistorial)
let botonBorrar = document.getElementById("btn-calcular3")

function borrarHistorial () {
    localStorage.removeItem ("MaterialesB")
    localStorage.removeItem ("MaterialesBE")
    localStorage.removeItem ("MaterialesC")
    localStorage.removeItem ("MaterialesCE")

    document.querySelector(".resume__text2").innerHTML = ""

    materialesB=[]
    materialesBE=[]
    materialesC=[]
    materialesCE=[]

    localStorage.setItem('MaterialesB', JSON.stringify(materialesB))
    localStorage.setItem('MaterialesBE', JSON.stringify(materialesBE))
    localStorage.setItem('MaterialesC', JSON.stringify(materialesC))
    localStorage.setItem('MaterialesCE', JSON.stringify(materialesCE))
}











/*
const precioMaterialesCiclopeoElaborado = () => {
    fetch('../json/materiales.json')
    .then(response => response.json())
    .then(stockMateriales => {
        sessionStorage.setItem('MaterialesJson', JSON.stringify(stockMateriales.find ((precioMateriales)=>
            precioMateriales.nombre == "Hormigon elaborado"
        )))
        sessionStorage.setItem('MaterialesJson2', JSON.stringify(stockMateriales.find ((precioMateriales)=>
        precioMateriales.nombre == "Piedra bola"   
        )))
    })
}
*/