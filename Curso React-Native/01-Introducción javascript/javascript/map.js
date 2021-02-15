const getPokes = async() => {
    try {
        const result = await fetch("https://pokeapi.co/api/v2/pokemon");
        const pokes = await result.json();
        const namesPokes = pokes.results.map(poke => poke.name);
        return namesPokes;
    } catch (error) {
        console.log(error);
    }
}

const result = getPokes().then(answer => console.log((answer)));

// Map permite obtener los valores seleccionados de un objeto, en este caso obtiene
// los nombres de los pokemones