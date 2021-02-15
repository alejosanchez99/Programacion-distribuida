const getPokeByName = async(pokeName) => {
    try {
        const result = await fetch("https://pokeapi.co/api/v2/pokemon");
        const pokes = await result.json();
        return pokes.results.filter(poke => poke.name === pokeName);
    } catch (error) {
        console.log(error);
    }
}

const result = getPokeByName("bulbasaur").then(answer => console.log((answer)));

// Map permite filtrar una colección de datos en este caso estamos filtrando en 
// todos los pokemos que sean iguales a bulbasaur.