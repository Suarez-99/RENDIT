const rendCementoAlivianada= 0.5
const rendCementoMacisa= 6
const precioCemento=4

const rendArenaAlivianada= 0.075
const rendArenaMacisa= 0.9
const precioArena=7.35

const rendRipioAlivianada= 0.075
const rendRipioMacisa= 0.9
const precioRipio=5

const precioVigueta=10.1

const precioElementoLosa=2

const rendMalla6= 1.1
const precioMalla6=187.4

const rendHormigonAlivianada= 0.085
const rendHormigonMacisa= 1
const precioHormigon=44

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

class MaterialesLosaAlivianadaDeObra {
    constructor(cemento, arena, ripio, malla, vigueta,elementoLosa){
        this.cemento = cemento;
        this.arena = arena;
        this.ripio = ripio;
        this.malla = malla;
        this.vigueta = vigueta;
        this.elementoLosa = elementoLosa;
    }
}
class MaterialesLosaAlivianadaElaborado {
    constructor(hormigon, malla, vigueta,elementoLosa){
        this.hormigon = hormigon;
        this.malla = malla;
        this.vigueta = vigueta;
        this.elementoLosa = elementoLosa;
    }
}
class MaterialesLosaArmadaDeObra {
    constructor(cemento, arena, ripio, malla){
        this.cemento = cemento;
        this.arena = arena;
        this.ripio = ripio;
        this.malla = malla;
    }
}
class MaterialesLosaArmadaElaborado {
    constructor(hormigon, malla){
        this.hormigon = hormigon;
        this.malla = malla;
    }
}

//defino arrays vacios
let materialesAlivianada= []
let materialesAlivianadaE= []
let materialesArmada= []
let materialesArmadaE= []


//condicionales para consultar el localStore
if(localStorage.getItem('materialesAlivianada')){
    materialesAlivianada = JSON.parse(localStorage.getItem('materialesAlivianada'))
}else {
    localStorage.setItem('materialesAlivianada', JSON.stringify(materialesAlivianada))
}

if(localStorage.getItem('materialesAlivianadaE')){
    materialesAlivianadaE = JSON.parse(localStorage.getItem('materialesAlivianadaE'))
}else {
    localStorage.setItem('materialesAlivianadaE', JSON.stringify(materialesAlivianadaE))
}

if(localStorage.getItem('materialesArmada')){
    materialesArmada = JSON.parse(localStorage.getItem('materialesArmada'))
}else {
    localStorage.setItem('materialesArmada', JSON.stringify(materialesArmada))
}

if(localStorage.getItem('materialesArmadaE')){
    materialesArmadaE = JSON.parse(localStorage.getItem('materialesArmadaE'))
}else {
    localStorage.setItem('materialesArmadaE', JSON.stringify(materialesArmadaE))
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
    if(document.getElementById('btn-losaAlivianada').checked){
        console.log("usted eligio losa alivianada")
        losaAlivianada()
    }
    else if(document.getElementById('btn-losaMacisa').checked){
        console.log("usted eligio losa de hormigon armado")
        losaArmada()
    }
}

//Creo las funciones dentro del formulario => donde se elige el tipo de hormigon y a partir de ese dato con las dimensiones calcula la cant de materiales necesarios.
const losaAlivianada = () => {
    if(document.getElementById('btn-deObra').checked){
        console.log("usted eligio hormigon de Obra")
        alivianadaDeObra()
    }
    else if(document.getElementById('btn-elaborado').checked){
        console.log("usted eligio hormigon elaborado")
        alivianadaElaborado()
    }
}

const losaArmada = () => {
    if(document.getElementById('btn-deObra').checked){
        console.log("usted eligio hormigon de Obra")
        macisaDeObra()
    }
    else if(document.getElementById('btn-elaborado').checked){
        console.log("usted eligio hormigon elaborado")
        macisaElaborado()
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

const alivianadaDeObra = () =>{
//uso operador AND.
    let ancho = document.getElementById('ancho').value;
    ancho.length === 0 && avisoAncho ()
    let largo = document.getElementById('largo').value;
    largo.length === 0 && avisoLargo ()

    let resultado1 = Math.ceil(cementoAlivianada(largo, ancho, rendCementoAlivianada))
    let resultado2 = Math.ceil(arenaAlivianada(largo, ancho, rendArenaAlivianada))
    let resultado3 = Math.ceil(ripioAlivianada (largo, ancho, rendRipioAlivianada))
    let resultado4 = Math.ceil(malla (largo, ancho, rendMalla6))
    let resultado5 = Math.ceil(vigueta (ancho))
    let resultado6 = Math.ceil(elementoLosa (ancho, largo))
    
    resume__text.innerHTML = `<h2>Bases Aisladas:</h2> <br> <p>Usted necesitara: <br>${ resultado1 } bolsas de cemento <br>${ resultado2 } m3 de arena <br>${ resultado3 } m3 de ripio <br>${ resultado4 } mallas del 6 <br>${ resultado5 } viguetas de ${largo} metros de largo<br>${ resultado6 } losetas</p>`

//uso de dato de api()
    let resultado7 = Math.ceil((resultado1 * precioBlue * precioCemento)+(resultado2 * precioBlue * precioArena)+(resultado3 * precioBlue * precioRipio)+(resultado4 * precioBlue * precioMalla6)+(resultado5 * precioBlue * precioVigueta)+(resultado6 * precioBlue * precioElementoLosa))

    resume__textPrice.innerHTML = `<p>El valor estimado es: $${ resultado7 } ARS</p>`
//Creo un array y lo guardo en el localStorage
    const valor = new MaterialesLosaAlivianadaDeObra(resultado1,resultado2,resultado3,resultado4,resultado5,resultado6)
    materialesAlivianada.push(valor)
    localStorage.setItem('materialesAlivianada', JSON.stringify(materialesAlivianada))
}

const alivianadaElaborado = () =>{
//uso operador AND.
    let ancho = document.getElementById('ancho').value;
    ancho.length === 0 && avisoAncho ()
    let largo = document.getElementById('largo').value;
    largo.length === 0 && avisoLargo ()

    let resultado1 = Math.ceil(hormigonAlivianada (largo, ancho, rendHormigonAlivianada))
    let resultado2 = Math.ceil(malla (largo, ancho, rendMalla6))
    let resultado3 = Math.ceil(vigueta (ancho))
    let resultado4 = Math.ceil(elementoLosa (ancho, largo))

    resume__text.innerHTML = `<h2>Bases Aisladas:</h2> <br> <p>Usted necesitara: <br>${ resultado1 } m3 de hormigon elaborado <br>${ resultado2 } mallas del 6 <br>${ resultado3 } viguetas de ${largo} metros de largo<br>${ resultado4 } losetas</p>`
    
//uso de dato de api()
    let resultado5 = Math.ceil((resultado1 * precioBlue * precioHormigon)+(resultado2 * precioBlue * precioMalla6)+(resultado3 * precioBlue * precioVigueta)+(resultado4 * precioBlue * precioElementoLosa))

    resume__textPrice.innerHTML = `<p>El valor estimado es: $${ resultado5 } ARS</p>`
//Creo un array y lo guardo en el localStorage
    const valor = new MaterialesLosaAlivianadaElaborado(resultado1,resultado2,resultado3,resultado4)
    materialesAlivianadaE.push(valor)
    localStorage.setItem('materialesAlivianadaE', JSON.stringify(materialesAlivianadaE))
}
const macisaDeObra =() =>{
//uso operador AND.
    let alto = document.getElementById('alto').value;
    alto.length === 0 && avisoAlto ()
    let ancho = document.getElementById('ancho').value;
    ancho.length === 0 && avisoAncho ()
    let largo = document.getElementById('largo').value;
    largo.length === 0 && avisoLargo ()

    let resultado1 = Math.ceil(cementoMacisa(alto, largo, ancho, rendCementoMacisa))
    let resultado2 = Math.ceil(arenaMacisa(alto, largo, ancho, rendArenaMacisa))
    let resultado3 = Math.ceil(ripioMacisa (alto, largo, ancho, rendRipioMacisa))
    let resultado4 = Math.ceil(malla (alto, largo, ancho, rendMalla6))
    resume__text.innerHTML = `<h2>Cimiento Ciclopeo:</h2> <br> <p>Usted necesitara: <br>${ resultado1 } bolsas de cemento <br>${ resultado2 } m3 de arena <br>${ resultado3 } m3 de ripio <br>${ resultado4 } mallas </p>`

//uso de dato de api()
    let resultado5 = Math.ceil((resultado1 * precioBlue * precioCemento)+(resultado2 * precioBlue * precioArena)+(resultado3 * precioBlue * precioRipio)+(resultado4 * precioBlue * precioMalla6))

    resume__textPrice.innerHTML = `<p>El valor estimado es: $${ resultado5 } ARS</p>`
//Creo un array y lo guardo en el localStorage
    const valor = new MaterialesLosaArmadaDeObra(resultado1,resultado2,resultado3,resultado4)
    materialesArmada.push(valor)
    localStorage.setItem('materialesArmada', JSON.stringify(materialesArmada))
}

const macisaElaborado =() =>{
//uso operador AND.
    let alto = document.getElementById('alto').value;
    alto.length === 0 && avisoAlto ()
    let ancho = document.getElementById('ancho').value;
    ancho.length === 0 && avisoAncho ()
    let largo = document.getElementById('largo').value;
    largo.length === 0 && avisoLargo ()

    let resultado1 = Math.ceil(hormigonMacisa (alto, largo, ancho, rendHormigonMacisa))
    let resultado2 = Math.ceil(malla (alto, largo, ancho, rendMalla6))

    resume__text.innerHTML = `<h2>Cimiento Ciclopeo:</h2> <br> <p>Usted necesitara: <br>${ resultado1 } m3 de hormigon elaborado <br>${ resultado2 } mallas </p>`
    
//uso de dato de api()
    let resultado3 = Math.ceil((resultado1 * precioBlue * precioHormigon)+(resultado2 * precioBlue * precioMalla6))

    resume__textPrice.innerHTML = `<p>El valor estimado es: $${ resultado3 } ARS</p>`
//Creo un array y lo guardo en el localStorage
    const valor = new MaterialesLosaArmadaElaborado(resultado1,resultado2)
    materialesArmadaE.push(valor)
    localStorage.setItem('materialesArmadaE', JSON.stringify(materialesArmadaE))
}

const cementoAlivianada = (largo, ancho, rendCementoAlivianada) =>largo * ancho * rendCementoAlivianada;
const arenaAlivianada = (largo, ancho, rendArenaAlivianada) => largo * ancho * rendArenaAlivianada;
const ripioAlivianada = (largo, ancho, rendRipioAlivianada) =>largo * ancho * rendRipioAlivianada;
const malla = (largo, ancho, rendMalla6) =>largo * ancho * rendMalla6;
const vigueta = (ancho) => (ancho/0.5)+0.6 ;
const elementoLosa = (ancho, largo) => ((ancho * largo*8)+0.9) ;

const hormigonAlivianada = (largo, ancho, rendHormigonAlivianada) =>largo * ancho * rendHormigonAlivianada;

const cementoMacisa = (alto, largo, ancho, rendCementoMacisa) => alto * largo * ancho * rendCementoMacisa;
const arenaMacisa = (alto, largo, ancho, rendArenaMacisa) => alto * largo * ancho * rendArenaMacisa;
const ripioMacisa = (alto, largo, ancho, rendRipioMacisa) => alto * largo * ancho * rendRipioMacisa;

const hormigonMacisa = (alto, largo, ancho, rendHormigonMacisa) => alto * largo * ancho * rendHormigonMacisa;

//Creo el evento a partir del boton de historial => donde lee el localStorage y lo inserta al html
document.getElementById("btn-calcular2").addEventListener("click", resumenTotal)

let botonResumen = document.getElementById("btn-calcular2")

function resumenTotal () {
    let historial=JSON.parse( localStorage.getItem("materialesAlivianada"))
    historial.forEach (materialesAlivianada => {
        resume__text2.innerHTML += `
        <p>Losa alivianada
        <br>${materialesAlivianada.cemento} bolsas de cemento
        <br>${materialesAlivianada.arena} m3 de arena
        <br>${materialesAlivianada.ripio} m3 de ripio
        <br>${materialesAlivianada.malla} mallas
        <br>${materialesAlivianada.vigueta} viguetas
        <br>${materialesAlivianada.elementoLosa} losetas</p>
        `
    });
    let historial2=JSON.parse( localStorage.getItem("materialesAlivianadaE"))
    historial2.forEach (materialesAlivianadaE => {
        resume__text2.innerHTML += `
        <p>Losa alivianada
        <br>${materialesAlivianadaE.hormigon} m3 de hormigon
        <br>${materialesAlivianadaE.malla} mallas
        <br>${materialesAlivianadaE.vigueta} viguetas
        <br>${materialesAlivianadaE.elementoLosa} losetas</p>
        `
    });
    let historial3=JSON.parse( localStorage.getItem("materialesArmada")) 
    historial3.forEach(materialesArmada => {
        resume__text2.innerHTML += `
        <p>Losa armada 
        <br>${materialesArmada.cemento} bolsas de cemento
        <br>${materialesArmada.arena} m3 de arena
        <br>${materialesArmada.ripio} m3 de ripio
        <br>${materialesArmada.malla} mallas</p>
        `
    });
    let historial4=JSON.parse( localStorage.getItem("materialesArmadaE"))
    historial4.forEach (materialesArmadaE => {
        resume__text2.innerHTML += `
        <p>Losa armada 
        <br>${materialesArmadaE.hormigon} m3 de hormigon
        <br>${materialesArmadaE.malla} mallas</p
        `
    });
}

//Creo el evento a partir del boton de borrar historial => donde remueve los datos del localStorage y elimina el html creado anteriormente
document.getElementById("btn-calcular3").addEventListener("click", borrarHistorial)
let botonBorrar = document.getElementById("btn-calcular3")

function borrarHistorial () {
    localStorage.removeItem ("materialesAlivianada")
    localStorage.removeItem ("materialesAlivianadaE")
    localStorage.removeItem ("materialesArmada")
    localStorage.removeItem ("materialesArmadaE")

    document.querySelector(".resume__text2").innerHTML = ""

    materialesAlivianada=[]
    materialesAlivianadaE=[]
    materialesArmada=[]
    materialesArmadaE=[]

    localStorage.setItem('materialesArmadaE', JSON.stringify(materialesAlivianada))
    localStorage.setItem('materialesArmadaE', JSON.stringify(materialesAlivianadaE))
    localStorage.setItem('materialesArmadaE', JSON.stringify(materialesArmada))
    localStorage.setItem('materialesArmadaE', JSON.stringify(materialesArmadaE))
}