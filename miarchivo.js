////////// Objetivo: Llevar las estadisticas de los alumnos en una clase
    

////// VARIABLES GLOBALES


let listadoAlumnos = []; // Listado de alumnos registrados
let cantidadAlumnos = listadoAlumnos.length; // Cantidad de Alumnos en la clase


////// CLASES Y METODOS


//// Clase de Alumnos
class Alumno {

    constructor(nombre, apellido, dni, fechaNacimiento){

        this.nombre          = nombre
        this.apellido        = apellido
        this.dni             = Number(dni)
        this.fechaNacimiento = fechaNacimiento

        this.nombreCompleto           = nombre + " " + apellido
        this.calificacionesAlumno     = []

    }

    //Agregar Calificacion
    agregarCalificacion(clase, evento, calificacion) {

        this.calificacionesAlumno.push({clase, evento, calificacion})

    }

}


////// OBJETOS


// Alumnos para testear funciones
listadoAlumnos.push(new Alumno("Juan","Perez", 42775658, "01/10/2000"));
listadoAlumnos.push(new Alumno("Pablo", "Gonzalez", 42775658, "11/11/2000"));
listadoAlumnos.push(new Alumno("Yesica", "Diaz", 43775658, "09/02/2001"));
listadoAlumnos.push(new Alumno("Martina", "Lopez", 42775658, "05/07/2000"));
listadoAlumnos.push(new Alumno("Diego", "Aguilar", 43775658, "27/01/2001"));

cantidadAlumnos = listadoAlumnos.length;

////// FUNCIONES


////// tostify para mostrar alertas

function mostrarTostify(mensajeTostify) {
Toastify({
    text: mensajeTostify,
    duration: 3000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "top",
    position: "left", 
    stopOnFocus: true,
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    onClick: function(){}
  }).showToast()
};

//// Pedir datos para ingresar un nuevo alumno y guardar en Array

function registrarAlumno(){

    let formularioRegistrarAlumno = document.getElementById("registrarAlumno-form");
    formularioRegistrarAlumno.addEventListener("submit", completarFormulario);

    document.getElementById("calificarAlumnos-btn").style.display = "none";
    document.getElementById("contenedor").style.display = "none";
    
    function completarFormulario(e) {

        e.preventDefault();

        let nombreAlumno = document.getElementById("nombreAlumno").value;
        let apellidoAlumno = document.getElementById("apellidoAlumno").value;
        let dniAlumno = document.getElementById("dniAlumno").value;
        let fechaNacimientoAlumno = document.getElementById("fechaNacimientoAlumno").value;

        listadoAlumnos.push(new Alumno(
            nombreAlumno,
            apellidoAlumno,
            dniAlumno,
            fechaNacimientoAlumno
        ));


    // Mensaje al finalizar el registro
    mostrarTostify("Se ha registrado a " + listadoAlumnos[listadoAlumnos.length - 1].nombreCompleto + " con exito.")

    cantidadAlumnos = listadoAlumnos.length; // Actualiza cantidad de Alumnos
    

    formularioRegistrarAlumno.removeEventListener("submit", completarFormulario);

    }

    formularioRegistrarAlumno.addEventListener("submit", ocultarFormulario);

    //Ocultar Formulario y cambiar color al boton
    function ocultarFormulario(e) {

        e.preventDefault();

        document.getElementById("registrarAlumno-form").reset();
        document.getElementById("formularioRegistrarAlumno").style.display = "none";

        document.getElementById("calificarAlumnos-btn").style.display = "block";
        document.getElementById("contenedor").style.display = "block";

        button1.style.cssText =
    "background-color: gray; color: white; border: none; padding: .5em; border-radius: 5px;";
    }

};

//// Poner nota a todos los alumnos de la clase

function calificarAlumnos() {
    
    const botonSeleccionarMateria = document.querySelector("#seleccionarEvento-btn");

    document.getElementById("registrarAlumno-btn").style.display = "none";
    document.getElementById("contenedor").style.display = "none";

    // Boton para seleccionar la Materia y el evento
    botonSeleccionarMateria.onclick = () => {

        //Seleccionar la Materia de la clase
        let select = document.getElementById("materia-slct");
        let materia = select.options[select.selectedIndex].text

        //Nombre del evento de la materia
        let evento = document.getElementById("nombreEvento").value;

        //ocultar los inputs para poner la informacion de la materia y evento
        document.getElementById("materia-slct").style.display = "none";
        document.getElementById("nombreEvento").style.display = "none";
        document.getElementById("materiaLabel").innerText = materia
        document.getElementById("eventoLabel").innerText = evento
        botonSeleccionarMateria.style.display = "none";

        //poner informacion de la materia y evento en el sessionStorage para usarlo al finalizar la calificacion
        sessionStorage.setItem("materia", materia);
        sessionStorage.setItem("evento", evento);

    }

let calificacionesJSON = [];
let ordenAlumno = 0;

function mostrarAlumno() {
    // Mostrar el nombre del alumno actual a calificar
    let nombreAlumnoACalificar = listadoAlumnos[ordenAlumno].nombreCompleto;
    document.getElementById("nombreAlumnoNota").innerText = "Alumno: " + nombreAlumnoACalificar + ".";
}

function calificarAlumno() {
    // Obtener el valor de la calificación del alumno actual
    let calificacionAlumno = document.getElementById("nota").value;
    const nombreAlumnoACalificar = listadoAlumnos[ordenAlumno].nombreCompleto;
    
    const estado = calificacionAlumno == 0 ? "Ausente" :
                   calificacionAlumno < 7 ? "Reprobado" : "Aprobado";

        // Guardar los datos calificados
        calificacionesJSON.push({
            materia: sessionStorage.getItem("materia"),
            evento: sessionStorage.getItem("evento"),
            nombreAlumno: nombreAlumnoACalificar,
            calificacion: calificacionAlumno,
            estado: estado
        });

    // mensaje por alumno calificado
    mostrarTostify(listadoAlumnos[ordenAlumno].nombreCompleto + " " + estado + ".");

    // Limpiar el campo de la nota para el próximo alumno
    document.getElementById("nota").value = "";

    // Incrementar el índice del alumno
    ordenAlumno++;

    // Verificar si quedan alumnos por calificar
    if (ordenAlumno < listadoAlumnos.length) {
        mostrarAlumno();
    } else {
        //simulador con console log que se envio en formato JSON a una base de datos
        console.log(JSON.stringify(calificacionesJSON));

        sessionStorage.removeItem("materia");
        sessionStorage.removeItem("evento");

        //Ocultar Formulario y cambiar color al boton
        document.getElementById("calificarAlumnos-form").reset();
        document.getElementById("formularioCalificarAlumnos").style.display = "none";
        document.getElementById("registrarAlumno-btn").style.display = "block";
        document.getElementById("contenedor").style.display = "block";

        button2.style.cssText =
        "background-color: gray; color: white; border: none; padding: .5em; border-radius: 5px;";

        //mensaje con informacion de los alumnos calificados
        Swal.fire({
            title: "Se envio la informacion al servidor",
            text: calificacionesJSON.length + " alumnos han sido calificados.",
            icon: "success"
          });

    }

    }

    const botonCalificarAlumno = document.querySelector("#calificarAlumno-btn");

    // Inicializar mostrando el primer alumno
    mostrarAlumno();

    // Pasar al siguiente alumno al hacer clic en el botón
    botonCalificarAlumno.onclick = calificarAlumno;

}

  //Funcion para seleccionar la nota del Alumno
  addEventListener("load",inicio,false);

  function inicio() {
      document.getElementById("nota").addEventListener("change",cambioDeNota,false);
  }

  function cambioDeNota() {    
      document.getElementById("notas").innerHTML=document.getElementById("nota").value;
  }


//////// APLICACION


////// Botones de HTML

//// Boton Registrar Alumno
const button1 = document.querySelector("#registrarAlumno-btn");

button1.onclick = () => {

  button1.style.cssText =
    "background-color: green; color: white; border: none; padding: .5em; border-radius: 5px;";

    document.getElementById("formularioRegistrarAlumno").style.display = "block";
    registrarAlumno();

};


//// Boton Calificar Alumnos
const button2 = document.querySelector("#calificarAlumnos-btn");

button2.onclick = () => {

  button2.style.cssText =
    "background-color: green; color: white; border: none; padding: .5em; border-radius: 5px;";

    document.getElementById("formularioCalificarAlumnos").style.display = "block";
    calificarAlumnos();
    
};


////// Objeto visible al ingresar a la pagina

//// Ver Clima por ubicacion - API

window.addEventListener('load', ()=> {

    let lon
    let lat

    let temperaturaValor = document.getElementById('temperatura-valor')  
    let temperaturaDescripcion = document.getElementById('temperatura-descripcion')  
    
    let ubicacion = document.getElementById('ubicacion')  
    let iconoAnimado = document.getElementById('icono-animado') 

    let vientoVelocidad = document.getElementById('viento-velocidad') 


    if(navigator.geolocation){
       navigator.geolocation.getCurrentPosition( posicion => {

           lon = posicion.coords.longitude
           lat = posicion.coords.latitude

           //ubicación por ciudad
           const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=88e75334bee175e56c4d4deb43850fbf`

           fetch(url)
            .then( response => { return response.json()})
            .then( data => {
                
                let temp = Math.round(data.main.temp - 273.15)

                temperaturaValor.textContent = `${temp} ° C`

                let desc = data.weather[0].description
                temperaturaDescripcion.textContent = desc.toUpperCase()
                ubicacion.textContent = data.name
                
                vientoVelocidad.textContent = `${data.wind.speed} m/s`

                //iconos animados
                switch (data.weather[0].main) {
                    case 'Thunderstorm':
                      iconoAnimado.src='animated/thunder.svg'
                      break;
                    case 'Drizzle':
                      iconoAnimado.src='animated/rainy-2.svg'
                      break;
                    case 'Rain':
                      iconoAnimado.src='animated/rainy-7.svg'
                      break;
                    case 'Snow':
                      iconoAnimado.src='animated/snowy-6.svg'
                      break;                        
                    case 'Clear':
                        iconoAnimado.src='animated/day.svg'
                      break;
                    case 'Atmosphere':
                      iconoAnimado.src='animated/weather.svg'
                        break;  
                    case 'Clouds':
                        iconoAnimado.src='animated/cloudy-day-1.svg'
                        break;  
                    default:
                      iconoAnimado.src='animated/cloudy-day-1.svg'
                  }

            })
            .catch( error => {
                console.log(error)
            })
       })
          
    }
})
