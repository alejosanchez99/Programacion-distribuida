 const getPokes = async() => {
     try {
         const pokes = await fetch("https://pokeapi.co/api/v2/pokemon")

         return await pokes.json();
     } catch (error) {
         console.log(error);
     }
 }

const pokes = getPokes().then(answer => console.log((answer)));

// El fetch te permite consurmir apis para obtener información