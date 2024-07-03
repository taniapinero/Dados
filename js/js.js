// Declarar la variable tipo array que guardará las puntuaciones
let puntuaciones=[0,0];
let ronda=1;
const numRondas=5;
let rondaActual=1;


// Creamos un array que guardará los resultados de cada jugador en cada ronda
let lanzamientoJugador1=[];
let lanzamientoJugador2=[];


// Tenemos que escuchar los eventos que el usuario pulse sobre esos botones
// Cuando la función es llamada desde un evento no se le coloca los ()
document.querySelector("#lanzar-j1").addEventListener("click", lanzarDadosJugador1); 
document.querySelector("#lanzar-j2").addEventListener("click", lanzarDadosJugador2);


// Crear una función para mostrar la imagen del dado
function crearImagenDado(valor) {  // Este valor lo va a dar el Random
    let img=document.createElement("img"); //En el HTML crea una imagen
    img.src=`img/${valor}.png`; // Va a salir una foto del 1 al 6 dependiendo del valor que haya salido arriba (que solo van a ser del 1 al 6)
    img.alt=`Dado ${valor}`; // Esto también se puede poner así -> img.setAtribute("alt", `Dado${valor}`)

    return img; // Devuelve el valor a quien lo llama
}


//Declaro la función de lanzar dados
function lanzarDadosJugador1() {
    if (rondaActual>numRondas) return; // No hará más partidas porque se ha alcanzado el límite

    //Generar el valor del dado 1 del jugador 1
    let dado1=Math.floor(Math.random()*6+1); //.floor redondea
    let dado2=Math.floor(Math.random()*6+1);
    lanzamientoJugador1.push([dado1,dado2]);

    //Deshabilitar uno de los botones 
    document.querySelector("#lanzar-j1").disabled=true;
    document.querySelector("#lanzar-j2").disabled=false;

    actualizarRondaHTML(rondaActual,dado1,dado2, "jugador1");
}

function lanzarDadosJugador2() {
    if (rondaActual>numRondas) return; // No hará más partidas porque se ha alcanzado el límite

    //Generar el valor del dado 1 del jugador 1
    let dado1=Math.floor(Math.random()*6+1); //.floor redondea
    let dado2=Math.floor(Math.random()*6+1);
    lanzamientoJugador2.push([dado1,dado2]);

    //Deshabilitar el otro boton como arriba
    document.querySelector("#lanzar-j1").disabled=false;
    document.querySelector("#lanzar-j2").disabled=true;

    actualizarRondaHTML(rondaActual,dado1,dado2, "jugador2");

    rondaActual++; // Se incrementa la ronda
}

function actualizarRondaHTML(ronda, dado1, dado2, jugador) {
    let rondaDiv=document.querySelector(`#ronda-${ronda}`);
    if(!rondaDiv){
        rondaDiv=document.createElement("div");

        rondaDiv.classList.add("ronda"); // <- Esto es para añadirle clases al div
        rondaDiv.className=("ronda");
        //rondaDiv.className("ronda") es lo mismo que la línea anterior, pero solo agrega una clase
      
        rondaDiv.setAttribute("id", `ronda-${ronda}`);
        rondaDiv.innerHTML=`
        <h3>Ronda ${ronda} </h3>
        <div class="dados" id="dados-ronda-${ronda}"> 
            <div id="jugador1-ronda-${ronda}"> </div>
            <div id="jugador2-ronda-${ronda}"> </div>
        </div>`;

        document.querySelector("#rondas").appendChild(rondaDiv);
    }
    //Buscar del HTML lo que hemos creado en el bloque anterior (jugador1-ronda1)... etc
    let jugadorDiv=document.querySelector(`#${jugador}-ronda-${ronda}`);
    jugadorDiv.innerHTML="";

    // Creamos los dados en el HTML con el valor que nos ha dado los dados
    jugadorDiv.appendChild(crearImagenDado(dado1));
    jugadorDiv.appendChild(crearImagenDado(dado2));

    let suma=dado1+dado2;
    // Operador ternario
    jugadorDiv.innerHTML+=`<p> Jugador ${jugador===`jugador1`?1:2} : ${suma} </p>`;

}


document.querySelector("#terminar").addEventListener("click", ()=>{
    // Crear una salida para indicar el ganador
    for (let i = 0; i < numRondas; i++) {
        let sumaJugador1=lanzamientoJugador1[i]?lanzamientoJugador1[i][0]+lanzamientoJugador1[i][1]:0;
        let sumaJugador2=lanzamientoJugador2[i]?lanzamientoJugador2[i][0]+lanzamientoJugador2[i][1]:0;

        if (sumaJugador1>sumaJugador2) {
            puntuaciones[0]++;
        }else if(sumaJugador2>sumaJugador1){
            puntuaciones[1]++;
        }
    }

    // Determinar el ganador
    let ganador=determinarGanador();

    let puntuacionesHTML=`
    <h3>Puntuaciones acumuladas</h3>
    <p>Jugador 1 ➡️ ${puntuaciones[0]}</p>
    <p>Jugador 2 ➡️ ${puntuaciones[1]}</p>
    <h3>Ganador: ${ganador}</h3>`;

    // Le damos salida en el HTML
    document.querySelector("#puntuaciones").innerHTML=puntuacionesHTML;

    // Deshabilitar los botones para que no se sigan pulsando
    document.querySelector("#lanzar-j1").disabled=true;
    document.querySelector("#lanzar-j2").disabled=true;
    document.querySelector("#terminar").disabled=true;
})

function determinarGanador() {
    if (puntuaciones[0]>puntuaciones[1]) {
        return "Jugador 1";
    }else if (puntuaciones[1]>puntuaciones[0]){
        return "Jugador 2";
    }else{
        return "Empate";
    }
}

