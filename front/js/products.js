// récupération de la page du produit mentionné dans l'URL

let id = (new URL(window.location).searchParams.get("id"));

fetch("http://localhost:3000/api/products/" + id)
    
.then(function(res){
    if (res.ok){
        return res.json();
    }
})


// Affichage du produit et de ses options avec interpolation de variables

.then((product) => {
    document.querySelector(".item__img").insertAdjacentHTML("afterbegin", `<img src="${product.imageUrl}" alt="${product.altTxt}">`);
    document.querySelector("#title").insertAdjacentHTML("afterbegin", `${product.name}`);
    document.querySelector("#price").insertAdjacentHTML("afterbegin", `${product.price}`);
    document.querySelector("#description").insertAdjacentHTML("afterbegin", `${product.description}`);
    for (let selectColor of product.colors) {
        document.querySelector("#colors").innerHTML += `<option value="${selectColor}">${selectColor}</option>`
    };
});