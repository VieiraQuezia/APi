const express = require("express"); // Express é usado para criar o servidor e definir as rotas
const axios = require("axios"); // Axios é usado para fazer requisições HTTP externas
const cors = require("cors");  // CORS é utilizado para permitir requisições de origens diferentes

const app = express(); // Criação do aplicativo Express
const PORT = 3000; // Define a porta em que o servidor irá rodar

// Habilita o CORS para permitir requisições de origens diferentes (importante para front-end e back-end em servidores separados)
app.use(cors());

 // Rota para buscar dados de um Pokémon pelo nome
// O parâmetro 'name' será extraído da URL (ex: /POKEMON/pikachu)

app.get("/POKEMON/:name", async (req, res) => { //requisção e resultado - async: pode ser usada ao criar uma função convencional.
    const pokemonName = req.params.name;

    // Cria a URL para consultar a API pública do Pokémon (PokeAPI) utilizando o nome do Pokémon
    try { //coloca o código que você acha que pode causar um problema.
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

        // Realiza a requisição GET para buscar dados do Pokémon
        const response = await axios.get(url) //A função axios.get retorna uma Promise, por isso usamos 'await' para esperar a resposta

        // Obtém os dados do Pokémon a partir da resposta da API
        const pokemon = response.data

        // Formatar os dados para a resposta JSON // Formata os dados que serão retornados na resposta
        const pokemonData = {
            name: pokemon.name,
            height: pokemon.height / 10, // Convertendo para metros
            weight: pokemon.weight / 10, // Convertendo para kg
            abilities: pokemon.abilities.map((hab) => hab.ability.name).join(", "),
            types: pokemon.types.map((type) => type.type.name).join(", "),
            image: pokemon.sprites.front_default, // URL da imagem do pokémon
        }

        // Retorna os dados em JSON
        res.json(pokemonData);
     }catch (error) { // Se ocorrer um erro durante a requisição ou processamento, o código entra aqui
        
            // Trata erros de requisição ou outros problemas
            res.status(500).json({ error: "Erro ao buscar dados do pokémon" })
        }
    });

    // Inicia o servidor // Inicia o servidor na porta definida
 app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`) // Informa que o servidor está rodando e escutando requisições
 });