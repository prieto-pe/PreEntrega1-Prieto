////////// Objetivo: Llevar las estadisticas de los alumnos en una clase
    

////// VARIABLES GLOBALES


let listadoAlumnos = []; // Listado de alumnos registrados
let cantidadAlumnos = listadoAlumnos.length; // Cantidad de Alumnos en la clase
let cantidadClases = [] // Cantidad de clases (1 es presente, 0 es ausente)


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
        this.presentesAlumno          = []

    }

    //Agregar Calificacion
    agregarCalificacion(clase, evento, calificacion) {

        this.calificacionesAlumno.push({clase, evento, calificacion})

    } 

    agregarPresente(estado) {

        this.presentesAlumno.push(estado)

    } 

    // Calcular el promedio de las calificaciones del Alumno

    // Calcular Cantidad de Presentes en porcentaje a la cantidad de clases. De ser menor a 70% pone "AUSENTE"

    // 
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


//// Pedir datos para ingresar un nuevo alumno y guardar en Array

function registrarAlumno(){

    let formularioRegistrarAlumno = document.getElementById("registrarAlumno-form");
    formularioRegistrarAlumno.addEventListener("submit", completarFormulario);
    
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

    alert("Se ha registrado a " + listadoAlumnos[listadoAlumnos.length - 1].nombreCompleto + " con exito.");
    cantidadAlumnos = listadoAlumnos.length; // Actualiza cantidad de Alumnos
    

    formularioRegistrarAlumno.removeEventListener("submit", completarFormulario);

    }

    formularioRegistrarAlumno.addEventListener("submit", ocultarFormulario);

    //Ocultar Formulario y cambiar color al boton
    function ocultarFormulario(e) {

        e.preventDefault();

        document.getElementById("registrarAlumno-form").reset();
        document.getElementById("formularioRegistrarAlumno").style.display = "none";

        button1.style.cssText =
    "background-color: gray; color: white; border: none; padding: .5em; border-radius: 5px;";
    }

};

//// Poner nota a todos los alumnos de la clase (Materia, Valor de Evaluacion)

function calificarAlumnos() {
    
    const botonSeleccionarMateria = document.querySelector("#seleccionarEvento-btn");

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

    // Limpiar el campo de la nota para el próximo alumno
    document.getElementById("nota").value = "";

    // Incrementar el índice del alumno
    ordenAlumno++;

    // Verificar si quedan alumnos por calificar
    if (ordenAlumno < listadoAlumnos.length) {
        mostrarAlumno();
    } else {
        //simulador con alert que se envio en formato JSON a una base de datos
        alert(JSON.stringify(calificacionesJSON));
        sessionStorage.removeItem("materia");
        sessionStorage.removeItem("evento");

        //Ocultar Formulario y cambiar color al boton
        document.getElementById("calificarAlumnos-form").reset();
        document.getElementById("calificarAlumnos-form").style.display = "none";

        button2.style.cssText =
        "background-color: gray; color: white; border: none; padding: .5em; border-radius: 5px;";

        //avisar que finalizo el evento
        document.getElementById("finEvento").innerText = "Todos los alumnos fueron calificados. Evento Finalizado."
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

//// Tomar presente a los Alumnos //// cambiar para que sea compatible con el DOM
// function tomarPresente(){

// // Sumar una clase nueva
// cantidadClases.push(1)

// alert("A continuacion marcara los presentes por alumno.")

// for (let i = 0; i < cantidadAlumnos; i++) {

//     let nombreCompletoAlumno = listadoAlumnos[i].nombreCompleto

//     let estado = prompt("Alumno: " + nombreCompletoAlumno + ".\n0 - Ausente. \n1 - Presente.")

//     listadoAlumnos[i].agregarPresente(estado)

// }

// // Terminar calculando el porcentaje de ausentes de la clase y con un filter por alumnos ausentes
// let ausentes = listadoAlumnos.filter(ausente => ausente.presentesAlumno[length] == 0).map(ausente => "\n" + ausente.nombreCompleto)
// let porcentaAusentes = (ausentes.length / cantidadAlumnos) * 100;

// alert("En la clase de hoy hubo " + porcentaAusentes + "% de ausentes.");
// alert("Los alumnos ausentes fueron:" + ausentes + ".");

// }


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


//// Boton Calificar Alumno
const button2 = document.querySelector("#calificarAlumnos-btn");

button2.onclick = () => {

  button2.style.cssText =
    "background-color: green; color: white; border: none; padding: .5em; border-radius: 5px;";

    document.getElementById("formularioCalificarAlumnos").style.display = "block";
    calificarAlumnos();
    
};
