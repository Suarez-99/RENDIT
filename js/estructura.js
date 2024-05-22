//defino las variables
const rendCemento= 3
const precioCemento=4

const rendArena= 0.9
const precioArena=7.35

const rendRipio= 0.9
const precioRipio=5

const precioHierro=0.5

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
class MaterialesEstructura {
    constructor(cemento, arena, ripio, hierro){
        this.cemento = cemento;
        this.arena = arena;
        this.ripio = ripio;
        this.hierro = hierro;
    }
}

//defino arrays vacios
let materialesEstructura= []


//condicionales para consultar el localStore
if(localStorage.getItem('MaterialesEstructura')){
    materialesEstructura = JSON.parse(localStorage.getItem('MaterialesEstructura'))
}else {
    localStorage.setItem('MaterialesEstructura', JSON.stringify(materialesEstructura))
}

//defino la variable en el id del formulario html
let formulario = document.getElementById("idForm")

//Creo el evento de escucha para el formulario
formulario.addEventListener('submit',(event) => {
    event.preventDefault()

    estructura()
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
function avisoCantidad (){ Swal.fire({
    position: 'top-end',
    icon: 'warning',
    title: 'Usted no incluyo el cantidad',
    showConfirmButton: false,
    timer: 1500
    })
}
function avisoSeparacion (){ Swal.fire({
    position: 'top-end',
    icon: 'warning',
    title: 'Usted no incluyo la separacion',
    showConfirmButton: false,
    timer: 1500
    })
}
const estructura = () =>{
//uso operador AND.
    let alto = document.getElementById('alto').value ;
    alto.length === 0 && avisoAlto ()
    let ancho = document.getElementById('ancho').value;
    ancho.length === 0 && avisoAncho ()
    let largo = document.getElementById('largo').value;
    largo.length === 0 && avisoLargo ()

    let cantidad = document.getElementById('cantidad').value;
    cantidad.length === 0 && avisoCantidad ()
    let armadura = document.getElementById('diametroPpal').value
    
    let altoH = document.getElementById('altoH').value ;
    alto.length === 0 && avisoAlto ()
    let anchoE = document.getElementById('anchoE').value;
    ancho.length === 0 && avisoAncho ()
    let separacion = document.getElementById('separacion').value;
    ancho.length === 0 && avisoSeparacion ()   
    let estribo = document.getElementById('diametroEstribo').value

    let resultado1 = Math.ceil(cemento(alto, largo, ancho, rendCemento))
    let resultado2 = Math.ceil(arena(alto, largo, ancho, rendArena))
    let resultado3 = Math.ceil(ripio (alto, largo, ancho, rendRipio))
    let resultado4 = hierro (altoH, largo, anchoE, estribo,separacion,armadura,cantidad).toFixed(2)
    
    resume__text.innerHTML = `<h2>ESTRUCTURA DE H° ARMADO:</h2> <br> <p>Usted necesitara: <br>${ resultado1 } bolsas de cemento <br>${ resultado2 } m3 de arena <br>${ resultado3 } m3 de ripio <br>${ resultado4 } kg de hierro</p>`

//uso de dato de api()
    let resultado5 = Math.ceil((resultado1 * precioBlue * precioCemento)+(resultado2 * precioBlue * precioArena)+(resultado3 * precioBlue * precioRipio)+(resultado4 * precioBlue * precioHierro))

    resume__textPrice.innerHTML = `<p>El valor estimado es: $${ resultado5 } ARS</p>`
//Creo un array y lo guardo en el localStorage
    const valor = new MaterialesEstructura(resultado1,resultado2,resultado3,resultado4)
    materialesEstructura.push(valor)
    localStorage.setItem('MaterialesEstructura', JSON.stringify(materialesEstructura))
}

const cemento = (alto, largo, ancho, rendCemento) => alto * largo * ancho * rendCemento;
const arena = (alto, largo, ancho, rendArena) => alto * largo * ancho * rendArena;
const ripio = (alto, largo, ancho, rendRipio) => alto * largo * ancho * rendRipio;
const hierro = (altoH, largo, anchoE, estribo,separacion,armadura,cantidad) => (((altoH*2)+(anchoE*2)+0.05)*(largo/separacion)*(estribo))+((armadura)*cantidad*largo)

//Creo el evento a partir del boton de historial => donde lee el localStorage y lo inserta al html
document.getElementById("btn-calcular2").addEventListener("click", resumenTotal)

let botonResumen = document.getElementById("btn-calcular2")

function resumenTotal () {
    let historial=JSON.parse( localStorage.getItem("MaterialesEstructura"))
    historial.forEach (materialesEstructura => {
        resume__text2.innerHTML += `
        <p>ESTRUCTURA DE H° ARMADO 
        <br>${materialesEstructura.cemento} bolsas de cemento
        <br>${materialesEstructura.arena} m3 de arena
        <br>${materialesEstructura.ripio} m3 de ripio
        <br>${materialesEstructura.hierro} kg de hierro</p>
        `
    });
}

//Creo el evento a partir del boton de borrar historial => donde remueve los datos del localStorage y elimina el html creado anteriormente
document.getElementById("btn-calcular3").addEventListener("click", borrarHistorial)
let botonBorrar = document.getElementById("btn-calcular3")

function borrarHistorial () {
    localStorage.removeItem ("MaterialesEstructura")

    document.querySelector(".resume__text2").innerHTML = ""

    materialesEstructura=[]
    localStorage.setItem('MaterialesEstructura', JSON.stringify(materialesEstructura))
}