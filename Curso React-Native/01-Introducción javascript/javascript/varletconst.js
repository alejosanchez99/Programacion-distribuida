//const//let//var

var name = 'Alejandro'; 
//Con var (No se utiliza) permite re asignar diferentes tipos de valores
//Var no es tipado

name = 12;

console.log(name);

let ageCat = 12;
ageCat=15;
//Con let permite re asignar valores a age

console.log(ageCat);

const person = {
    namePerson: 'Alejo',
    age: 12
};

console.log(person);

person.namePerson = 'Daniel';
person.age = 34;

console.log(person);

//Las constantes solo permiten asignar un valor, pero se pueden modificar las 
//propiedades del objeto

