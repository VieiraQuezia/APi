async function fetchPokemon() {
    const pokemonName = document.getElementById("pokemonName").value.trim();
    if (!pokemonName) {
        document.getElementById("errorMessage").textContent = "Por favor, digite o nome ou ID de um Pokémon";
        document.getElementById("errorMessage").style.display = "block";
        return
    }
    document.getElementById("errorMessage").style.display = "none"
    document.getElementById("loadingMessage").style.display = "block"


try{
    const response = await fetch(`http://localhost:3000/pokemon/${pokemonName.toLowerCase()}`);
    if (!response.ok) throw new Error ("Pokémon não encontrado.");

    const data = await response.json();

    document.getElementById("pokemonInfo").style.display = "block";
    document.getElementById("pokemonTitle").textContent = data.name;
    document.getElementById("pokemonImage").src = data.image;
    document.getElementById("pokemonImage").alt = `Imagem de ${data.name}`;
    document.getElementById("pokemonHeight").textContent = data.height;
    document.getElementById("pokemonWeight").textContent = data.weight;
    document.getElementById("pokemonAbilities").textContent = data.abilities;
    document.getElementById("pokemonTypes").textContent = data.types;
}catch (error) {
    document.getElementById("errorMessage").textContent = error.message;
    document.getElementById("errorMessage").style.display = "block";
    document.getElementById("pokemonInfo").style.display = "none";
} finally {
    document.getElementById("loadingMessage").style.display = "none";
} }