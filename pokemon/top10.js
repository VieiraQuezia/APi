async function fecthTop10Pokemon() {
    const pokemonListElement = document.getElementById('pokemonList')

    if (!pokemonListElement) {
        document.getElementById("loadingMessage").style.display = "block";
        return;
    }
    document.getElementById("loadingMessage").style.display = "block";


     for (let i =20; i <=29; i++){
        try{
            const response = await fetch(`http://localhost:3000/pokemon/${i}`)

            
            
                if (!response.ok)  throw new Error ('Pokemon não encontrado')                          

                const data = await response.json()


                
                const pokemonCard = document.createElement('nav')
                pokemonCard.className = 'pokemon-Card'

                const pokeomnImage = document.createElement('img')
                pokeomnImage.src = data.image
                pokeomnImage.alt = `Imagem de ${data.name}`
                pokeomnImage.className = 'pokemon-image'

                const pokemonName = document.createElement('h3')
                pokemonName.textContent = data.name

                const pokemonTypes = document.createElement('p')
                pokemonTypes.textContent = `Tipos: ${data.types}`


                pokemonCard.appendChild(pokeomnImage)
                pokemonCard.appendChild(pokemonName)
                pokemonCard.appendChild(pokemonTypes)

                pokemonListElement.appendChild(pokemonCard)
         }

   
   
       

    catch (error){
    document.getElementById('errorMensagem').textContent = error.message
    document.getElementById('errorMensagem').style.display = 'block'
    
    } 
 finally {
        document.getElementById("loadingMessage").style.display = "none";
    }
    
}

}

fecthTop10Pokemon()