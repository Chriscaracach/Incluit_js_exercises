/**
 * !=======================================
 * !Estamos llegando a la finalización del curso de Javascript Vanilla
 * !y vamos a realizar un repaso de los temas vistos mediante un ejercicio
 * !integrador conectadonos con Api...
 *
 * !Para eso deberas realizar las siguientes consignas siguiendo las buenas practicas vistas en clase
 * !y utilizando todo el conocimiento aprendido en clases anteriores...
 *
 * * ...
 *
 * !Comencemos.
 * !===========================================
 */

/**
 * *=====================================
 * *            PRIMERA  PARTE
 * *-------------------------------------
 */

/**
 * Vamos a trabajar con PokeApi. La Api de Pokemon.
 * ? 1) Almacenar la base url en una constante.
 */

const BASE_URL = "https://pokeapi.co/api/v2";

/**
 * ? 2) Crear la configuración de un fetch para ejecutar en una consola del navegador.
 */

const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};

/**
 * ? 3) Realizar una busqueda de los primeros 20 pokemones
 */

let searchPokemons = async () => {
  const firstTwentyPokemons = await fetch(BASE_URL + "/pokemon", options).then(
    (res) => res.json
  );
  return firstTwentyPokemons;
};

/**
 * ? 4) Buscar al pokemon 'Charmander', armar un objeto literal con las siguientes propiedades de este pokemon:
 *      id, name, tipo y almenos 2 movimientos
 *       Luego mostrar por consola
 */

let searchCharmander = async () => {
  let charmanderData = {};
  const getPokemons = await fetch(BASE_URL, options)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      let charmander = data.results.find((item) => item.name === "charmander");

      fetch(charmander.url, options)
        .then((res) => res.json())
        .then((data) => {
          charmanderData = {
            id: data.id,
            name: data.name,
            type: data.types[0].type.name,
            moves: [data.moves[0].move, data.moves[1].move],
          };
        });
    })
    .catch((err) => console.log(err));
  return charmanderData;
};

/**
 * ? 5) Obtener la cadena de evoluciones de Charmander
 */

let getCharmanderEvolutions = async () => {
  const evolutions = await fetch(BASE_URL + "/evolution-chain/2", options)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return [
        data.chain.evolves_to[0].species,
        data.chain.evolves_to[0].evolves_to[0].species,
      ];
    })
    .catch((err) => console.log(err));
  return evolutions;
};

/**
 * *=====================================
 * *            SEGUNDA  PARTE
 * *-------------------------------------
 */

/**
 * ? 6) Indicar cual es el id del tipo psiquico. Armar un objeto con las características que consideres importantes del tipo electrico
 */

let getIdFromPsyType = async () => {
  const id = await fetch(BASE_URL + "/type", options)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      let results = data.results;
      let psyType = results.find((item) => item.name === "psychic");
      return results.indexOf(psyType);
    })
    .catch((err) => console.log(err));
  return id;
};

let getImportantDataFromElectric = async () => {
  const important = await fetch(BASE_URL + "/type/electric", options)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      let pokemonsNames = [];
      data.pokemon.forEach((poke) => {
        pokemonsNames.push(poke.pokemon.name);
      });
      let importantData = {
        name: data.name,
        pokemons: pokemonsNames,
        no_damage_to: data.damage_relations.no_damage_to,
        double_damage_to: data.damage_relations.double_damage_to,
      };
      return importantData;
    })
    .catch((err) => console.log(err));
  return important;
};

/**
 * ? 7) Indicar cuantos pokemons electricos hay, y crear objetos literales con alguna descripción de 5 de estos pokemons electricos
 */

let getTotalElectricAndDescriptions = async () => {
  let totalElectric = 0;
  const descriptions = await fetch(BASE_URL + "/type/electric", options)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      total = data.pokemon.length;

      const elecPokemons = [];
      for (let i = 0; i < 5; i++) {
        fetch(
          data.pokemon[Math.floor(Math.random() * total) + 1].pokemon.url,
          options
        )
          .then((res) => res.json())
          .then((pokedata) => {
            elecPokemons.push({
              name: pokedata.name,
              mainType: pokedata.types[0].type.name,
            });
          })
          .catch((err) => console.log(err));
      }
      return elecPokemons;
    })
    .catch((err) => console.log(err));
  return { total: totalElectric, descriptions: descriptions };
};

/**
 * ? 8) Que hay de particular en la especie del pokemon Lugia
 */

let getUniqueDataFromLugia = async () => {
  const lugiaUniqueData = await fetch(BASE_URL + "/pokemon/lugia", options)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      let speciesUrl = data.species.url;
      const uniqueData = {};
      fetch(speciesUrl, options)
        .then((res) => res.json())
        .then((data) => {
          uniqueData = { isLegendary: data.is_legendary };
        });
      return uniqueData;
    })
    .catch((err) => console.log(err));
  return lugiaUniqueData;
};
