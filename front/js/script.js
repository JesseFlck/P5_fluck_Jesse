// Récupération des données de l'API

fetch("http://localhost:3000/api/products/")

.then(function(res){
    if(res.ok){
        return res.json();
    }
})


// Création de chaque élément des produits avec interpolation de variables

.then((products) => {
    for (let product of products){
        document.querySelector("#items").innerHTML += ` <a href="./product.html?id=${product._id}">
        <article>
          <img src="${product.imageUrl}" alt="${product.altTxt}">
          <h3 class="productName">${product.name}</h3>
          <p class="productDescription">${product.description}</p>
        </article>
      </a> `
    }
})


.catch(function(error) {
    alert(error);
})
