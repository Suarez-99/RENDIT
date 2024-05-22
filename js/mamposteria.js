//defino las variables
const rendCementoSoga= 0.24
const rendCementoPanderete= 0.12
const rendCementoBloque= 0.08
const precioCemento=4

const rendArenaSoga= 0.07
const rendArenaPanderete= 0.04
const rendArenaBloque= 0.02
const precioArena=7.35

const rendCalSoga= 0.24 
const rendCalPanderete= 0.12
const rendCalBloque= 0.08
const precioCal=4.2

const rendLadrillosSoga= 40
const rendLadrillosPanderete= 18
const precioLadrillo=0.17

const rendBloque= 12
const precioBloque=0.6

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
class MaterialesMuroSoga {
    constructor(ladrillos, cemento, arena, cal){
        this.ladrillos = ladrillos;
        this.cemento = cemento;
        this.arena = arena;
        this.cal = cal;
    }
}
class MaterialesMuroPanderete {
    constructor(ladrillos, cemento, arena, cal){
        this.ladrillos = ladrillos;
        this.cemento = cemento;
        this.arena = arena;
        this.cal = cal;
    }
}
class MaterialesMuroBloque {
    constructor(bloque, cemento, arena){
        this.bloque = bloque;
        this.cemento = cemento;
        this.arena = arena;
    }
}

//defino arrays vacios
let materialesMSoga= []
let materialesMPanderete= []
let materialesMBloque= []

//condicionales para consultar el localStore
if(localStorage.getItem('materialesMSoga')){
    materialesMSoga = JSON.parse(localStorage.getItem('materialesMSoga'))
}else {
    localStorage.setItem('materialesMSoga', JSON.stringify(materialesMSoga))
}

if(localStorage.getItem('materialesMPanderete')){
    materialesMPanderete = JSON.parse(localStorage.getItem('materialesMPanderete'))
}else {
    localStorage.setItem('materialesMPanderete', JSON.stringify(materialesMPanderete))
}

if(localStorage.getItem('materialesMBloque')){
    materialesMBloque = JSON.parse(localStorage.getItem('materialesMBloque'))
}else {
    localStorage.setItem('materialesMBloque', JSON.stringify(materialesMBloque))
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
    if(document.getElementById('btn-ladrillonSoga').checked){
        console.log("usted eligio muro de ladrillo soga")
        muroSoga()
    }
    else if(document.getElementById('btn-ladrillonPanderete').checked){
        console.log("usted eligio muro de ladrillo panderete")
        muroPanderete()
    }
    else if(document.getElementById('btn-bloqueHormigon').checked){
        console.log("usted eligio muro de bloque de hormigon")
        muroBloqueHormigon()
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
function avisoAberturas (){ Swal.fire({
    position: 'top-end',
    icon: 'warning',
    title: 'Usted no incluyo todos los datos de aberturas',
    showConfirmButton: false,
    timer: 1500
    })
}

const muroSoga = () =>{
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

    let resultado1 = Math.ceil(ladrillosSoga(alto, largo, rendLadrillosSoga,cantidadAbertura,altoAbertura,largoAbertura))
    let resultado2 = Math.ceil(cementoSoga(alto, largo, rendCementoSoga,cantidadAbertura,altoAbertura,largoAbertura))
    let resultado3 = Math.ceil(arenaSoga(alto, largo, rendArenaSoga,cantidadAbertura,altoAbertura,largoAbertura))
    let resultado4 = Math.ceil(calSoga(alto, largo, rendCalSoga,cantidadAbertura,altoAbertura,largoAbertura))
    
    resume__text.innerHTML = `<h2>Muro de ladrillo en soga:</h2> <br> <p>Usted necesitara: <br>${ resultado1 } ladrillos <br>${ resultado2 } bolsas de cemento <br>${ resultado3 } m3 de arena <br>${ resultado4 } bolsas de cal</p>`

//uso de dato de api()
    let resultado5 = Math.ceil((resultado1 * precioBlue * precioLadrillo)+(resultado2 * precioBlue * precioCemento)+(resultado3 * precioBlue * precioArena)+(resultado4 * precioBlue * precioCal))

    resume__textPrice.innerHTML = `<p>El valor estimado es: $${ resultado5 } ARS</p>`
//Creo un array y lo guardo en el localStorage
    const valor = new MaterialesMuroSoga(resultado1,resultado2,resultado3,resultado4)
    materialesMSoga.push(valor)
    localStorage.setItem('materialesMSoga', JSON.stringify(materialesMSoga))
}

const muroPanderete = () =>{
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

    let resultado1 = Math.ceil(ladrillosPanderete(alto, largo, rendLadrillosPanderete,cantidadAbertura,altoAbertura,largoAbertura))
    let resultado2 = Math.ceil(cementoPanderete(alto, largo, rendCementoPanderete,cantidadAbertura,altoAbertura,largoAbertura))
    let resultado3 = Math.ceil(arenaPanderete(alto, largo, rendArenaPanderete,cantidadAbertura,altoAbertura,largoAbertura))
    let resultado4 = Math.ceil(calPanderete(alto, largo, rendCalPanderete,cantidadAbertura,altoAbertura,largoAbertura))
    
    resume__text.innerHTML = `<h2>Muro de ladrillo en panderete:</h2> <br> <p>Usted necesitara: <br>${ resultado1 } ladrillos <br>${ resultado2 } bolsas de cemento <br>${ resultado3 } m3 de arena <br>${ resultado4 } bolsas de cal</p>`
    
//uso de dato de api()
    let resultado5 = Math.ceil((resultado1 * precioBlue * precioLadrillo)+(resultado2 * precioBlue * precioCemento)+(resultado3 * precioBlue * precioArena)+(resultado4 * precioBlue * precioCal))

    resume__textPrice.innerHTML = `<p>El valor estimado es: $${ resultado5 } ARS</p>`
//Creo un array y lo guardo en el localStorage
    const valor = new MaterialesMuroPanderete(resultado1,resultado2,resultado3,resultado4)
    materialesMPanderete.push(valor)
    localStorage.setItem('materialesMPanderete', JSON.stringify(materialesMPanderete))
}
const muroBloqueHormigon =() =>{
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

    let resultado1 = Math.ceil(bloques(alto, largo, rendBloque,cantidadAbertura,altoAbertura,largoAbertura))
    let resultado2 = Math.ceil(cementoBloque(alto, largo, rendCementoBloque,cantidadAbertura,altoAbertura,largoAbertura))
    let resultado3 = Math.ceil(arenaBloque(alto, largo, rendArenaBloque,cantidadAbertura,altoAbertura,largoAbertura))
    
    resume__text.innerHTML = `<h2>Muro de bloques de hormigon:</h2> <br> <p>Usted necesitara: <br>${ resultado1 } bloques de hormigon <br>${ resultado2 } bolsas de cemento <br>${ resultado3 } m3 de arena</p>`
    
//uso de dato de api()
    let resultado5 = Math.ceil((resultado1 * precioBlue * precioBloque)+(resultado2 * precioBlue * precioCemento)+(resultado3 * precioBlue * precioArena))

    resume__textPrice.innerHTML = `<p>El valor estimado es: $${ resultado5 } ARS</p>`
//Creo un array y lo guardo en el localStorage
    const valor = new MaterialesMuroBloque(resultado1,resultado2,resultado3)
    materialesMBloque.push(valor)
    localStorage.setItem('materialesMBloque', JSON.stringify(materialesMBloque))
}

const ladrillosSoga = (alto, largo, rendLadrillosSoga,cantidadAbertura,altoAbertura,largoAbertura) => ((alto*largo)-(cantidadAbertura*altoAbertura*largoAbertura))*rendLadrillosSoga;
const cementoSoga = (alto, largo, rendCementoSoga,cantidadAbertura,altoAbertura,largoAbertura) => ((alto*largo)-(cantidadAbertura*altoAbertura*largoAbertura)*rendCementoSoga);
const arenaSoga = (alto, largo, rendArenaSoga,cantidadAbertura,altoAbertura,largoAbertura) => ((alto*largo)-(cantidadAbertura*altoAbertura*largoAbertura)*rendArenaSoga);
const calSoga = (alto, largo, rendCalSoga,cantidadAbertura,altoAbertura,largoAbertura) => ((alto*largo)-(cantidadAbertura*altoAbertura*largoAbertura)*rendCalSoga);


const ladrillosPanderete = (alto, largo, rendLadrillosPanderete,cantidadAbertura,altoAbertura,largoAbertura) => ((alto*largo)-(cantidadAbertura*altoAbertura*largoAbertura))*rendLadrillosPanderete;
const cementoPanderete = (alto, largo, rendCementoPanderete,cantidadAbertura,altoAbertura,largoAbertura) => ((alto*largo)-(cantidadAbertura*altoAbertura*largoAbertura))*rendCementoPanderete;
const arenaPanderete = (alto, largo, rendArenaPanderete,cantidadAbertura,altoAbertura,largoAbertura) => ((alto*largo)-(cantidadAbertura*altoAbertura*largoAbertura))*rendArenaPanderete;
const calPanderete = (alto, largo, rendCalPanderete,cantidadAbertura,altoAbertura,largoAbertura) => ((alto*largo)-(cantidadAbertura*altoAbertura*largoAbertura))*rendCalPanderete;

const bloques = (alto, largo, rendBloque,cantidadAbertura,altoAbertura,largoAbertura) => ((alto*largo)-(cantidadAbertura*altoAbertura*largoAbertura)*rendBloque);
const cementoBloque = (alto, largo, rendCementoBloque,cantidadAbertura,altoAbertura,largoAbertura) => ((alto*largo)-(cantidadAbertura*altoAbertura*largoAbertura))*rendCementoBloque;
const arenaBloque = (alto, largo, rendArenaBloque,cantidadAbertura,altoAbertura,largoAbertura) => ((alto*largo)-(cantidadAbertura*altoAbertura*largoAbertura)*rendArenaBloque);

//Creo el evento a partir del boton de historial => donde lee el localStorage y lo inserta al html
document.getElementById("btn-calcular2").addEventListener("click", resumenTotal)

let botonResumen = document.getElementById("btn-calcular2")

function resumenTotal () {
    let historial=JSON.parse( localStorage.getItem("materialesMSoga"))
    historial.forEach (materialesMSoga => {
        resume__text2.innerHTML += `
        <p>Muro en soga
        <br>${materialesMSoga.ladrillos} ladrillos
        <br>${materialesMSoga.cemento} bolsas de cemento
        <br>${materialesMSoga.arena} m3 de arena
        <br>${materialesMSoga.cal} bolsas de cal</p>
        `
    });
    let historial2=JSON.parse( localStorage.getItem("materialesMPanderete"))
    historial2.forEach (materialesMPanderete => {
        resume__text2.innerHTML += `
        <p>Muro en panderete
        <br>${materialesMPanderete.ladrillos} ladrillos
        <br>${materialesMPanderete.cemento} bolsas de cemento
        <br>${materialesMPanderete.arena} m3 de arena
        <br>${materialesMPanderete.cal} bolsas de cal</p>
        `
    });
    let historial3=JSON.parse( localStorage.getItem("materialesMBloque")) 
    historial3.forEach(materialesMBloque => {
        resume__text2.innerHTML += `
        <p>Muro de bloque de hormigon 
        <br>${materialesMBloque.ladrillos} ladrillos
        <br>${materialesMBloque.cemento} bolsas de cemento
        <br>${materialesMBloque.arena} m3 de arena
        `
    });
}

//Creo el evento a partir del boton de borrar historial => donde remueve los datos del localStorage y elimina el html creado anteriormente
document.getElementById("btn-calcular3").addEventListener("click", borrarHistorial)
let botonBorrar = document.getElementById("btn-calcular3")

function borrarHistorial () {
    localStorage.removeItem ("materialesMSoga")
    localStorage.removeItem ("materialesMPanderete")
    localStorage.removeItem ("materialesMBloque")

    document.querySelector(".resume__text2").innerHTML = ""

    materialesMSoga=[]
    materialesMPanderete=[]
    materialesMBloque=[]
    localStorage.setItem('materialesMSoga', JSON.stringify(materialesMSoga))
    localStorage.setItem('materialesMPanderete', JSON.stringify(materialesMPanderete))
    localStorage.setItem('materialesMBloque', JSON.stringify(materialesMBloque))
}