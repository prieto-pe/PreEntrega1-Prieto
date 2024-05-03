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

    
    alert("Por favor, complete los siguientes datos para registrar a un alumno");
    
    listadoAlumnos.push(new Alumno(
        prompt("Nombre: "),
        prompt("Apellido: "),
        prompt("DNI: "),
        prompt("Fecha de Nacimiento: ")
    ));

    alert("Se ha registrado a " + listadoAlumnos[listadoAlumnos.length - 1].nombreCompleto + " con exito.");
    
    cantidadAlumnos = listadoAlumnos.length; // Actualizar cantidad de Alumnos
    listadoAlumnos.nombreCompleto.sort();

};

//// Poner nota a todos los alumnos de la clase (Materia, Valor de Evaluacion)
function calificarAlumnos() {
    
    let clase  = prompt("Clase en la que se evaluara: ")
    let evento = prompt("Evento a calificar: ")
    
    for (let i = 0; i <= cantidadAlumnos; i++) {

        alert("Calificara al alumno " + listadoAlumnos[i].nombreCompleto + ".");
        
        listadoAlumnos[i].agregarCalificacion(
            clase,
            evento,
            prompt("Calificacion del Evento (del 1 al 10): ") // Luego cambiar a listado con validacion de datos para evitar valores incorrectos
        )

        let calificacionAlumno = listadoAlumnos[i].calificacionesAlumno[length].calificacion
    
        if (calificacionAlumno >= 7 && calificacionAlumno <=10) {
            document.write("El alumno " + listadoAlumnos[i].nombreCompleto + " ha aprobado con: " + calificacionAlumno + "</br>");

        } else if (calificacionAlumno >= 1 && calificacionAlumno < 7){
            document.write("El alumno " + listadoAlumnos[i].nombreCompleto + " ha desaprobado con: " + calificacionAlumno + "</br>");

        } else {
            document.write("El alumno " + listadoAlumnos[i].nombreCompleto + " tuvo una nota que no es valida" + "</br>");
        };
    }

};

//// Tomar presente a los Alumnos 
function tomarPresente(){

// Sumar una clase nueva
cantidadClases.push(1)

alert("A continuacion marcara los presentes por alumno.")

for (let i = 0; i < cantidadAlumnos; i++) {

    let nombreCompletoAlumno = listadoAlumnos[i].nombreCompleto

    let estado = prompt("Alumno: " + nombreCompletoAlumno + ".\n0 - Ausente. \n1 - Presente.")

    listadoAlumnos[i].agregarPresente(estado)

}

// Terminar calculando el porcentaje de ausentes de la clase y con un filter por alumnos ausentes
let ausentes = listadoAlumnos.filter(ausente => ausente.presentesAlumno[length] == 0).map(ausente => "\n" + ausente.nombreCompleto)
let porcentaAusentes = (ausentes.length / cantidadAlumnos) * 100;

alert("En la clase de hoy hubo " + porcentaAusentes + "% de ausentes.");
alert("Los alumnos ausentes fueron:" + ausentes + ".");

}


////// APLICACION


const usarApp = parseInt(Number(prompt(
    "Elija cual opcion desea elegir:\n"+
    "1 - Registrar un Alumno Nuevo.\n" +
    "2 - Poner calificacion a los alumnos.\n"+
    "3 - Tomar presentes de la clase."
)));

switch (usarApp){

case (1):
    // Registrar un Alumno Nuevo
let registroNuevo = Number(prompt("¿Desea registrar un alumno nuevo? (1-Si) (2-No)"));
if(registroNuevo === 1){
    registrarAlumno();
} else {
    alert("No se registraron estudiantes nuevos/as");
};
    break

case (2):
    // Poner notas a los alumnos
    calificarAlumnos();
    break;

case (3):
    // Poner notas a los alumnos
    tomarPresente();
    break;

default:
    // Si el valor no es valido
    alert("El valor indicado no es valido.")
    break;

}
