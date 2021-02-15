 const getPokes = async() => {
     try {
         const result = await fetch("https://pokeapi.co/api/v2/pokemon")

         return result.json();
     } catch (error) {
         console.log(error);
     }
 }

const result = getPokes().then(answer => console.log((answer)));

// El fetch te permite consurmir apis para obtener información