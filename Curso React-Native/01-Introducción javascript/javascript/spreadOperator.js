// spread operator permite acceder un objeto y sacar copia de el.
// se utiliza con el ...

const person1 = {
    name: "Alejandro",
    age: 15,
};

const person2 = { ...person1, id: 123 };

console.log(person1);
console.log(person2);

///spread operation con un arreglo

const cities1 = ["Medellin", "Bogota", "Cali"];

const cities2 = ["Barranquilla", "Cartagena", "Santa Marta"];

console.log(cities1);
console.log(cities2);

const join = [...cities1, ...cities2];

console.log(join);


///Sirve para unir arreglos
