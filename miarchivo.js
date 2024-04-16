//////// Llevar notas de alumnos por clase
    
//// Variables Globales

let cantAlumnos = 5; //Cantidad de Alumnos en la clase

//// Funciones

// Pedir datos para ingresar un nuevo alumno
function datosEstudiante(){

    alert("Por favor, complete los siguientes datos para registrar a un alumno");
    let nombre = prompt("Nombre: ");
    let apellido = prompt("Apellido: ");
    const dni = Number(prompt("DNI: "));
    let nombrecompleto = nombre + " " + apellido;
    alert("Se ha registrado a " + nombrecompleto + " con DNI: " + dni + ".");

};

// Poner nota a todos los alumnos de la clase
function notasClase() {
    
    for (let i = 1; i <= cantAlumnos; i++) {
        alert("Calificara al alumno " + i + " en Matematicas"); // Luego cambiar para seleccionar la clase(ej: Literatura, ingles, etc)
        let notaAlumno = Number(prompt("Elija la nota del 1 al 10"));

        if (notaAlumno >= 7 && notaAlumno <=10) {
            document.write("El alumno " + i + " ha aprobado con: " + notaAlumno + "</br>");
        } else if (notaAlumno >= 1 && notaAlumno < 7){
            document.write("El alumno " + i + " ha desaprobado con: " + notaAlumno + "</br>");
        } else {
            document.write("El alumno " + i + " tuvo una nota que no es valida" + "</br>");
        };
        }

}

//// Usar Aplicacion para elegir que hacer dentro
let usarApp = parseInt(Number(prompt("Elija cual opcion desea elegir (1-Registrar un Alumno Nuevo) (2-Poner notas a los alumnos)")));

switch (usarApp){

case (1):
    // Registrar un Alumno Nuevo
let registroNuevo = Number(prompt("¿Desea registrar un alumno nuevo? (1-Si) (2-No)"));
if(registroNuevo === 1){
    datosEstudiante();
} else {
    alert("No se registraron estudiantes nuevos/as");
};
    break

case (2):
    // Poner notas a los alumnos
    notasClase();
    break

default:
    // Si el valor no es valido
    alert("El valor indicado no es valido.")
    break

}
