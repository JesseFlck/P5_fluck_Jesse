// Récupération de la page du produit mentionné dans l'URL

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



// Création d'une constante pour le bouton "ajouter au panier"

const addToCart = document.getElementById('addToCart')

// Création du panier

let basketArray = [];


// Récupération des éléments du produit au clic grâce à un événement

addToCart.addEventListener('click', function(e){
    // conditions pour quantité etc
    

    // Données à récupérer
    let basket = {
        id: id,
        color: document.getElementById('colors').value,
        quantity: document.getElementById('quantity').value,
    };

    if(basket.color == [] || basket.quantity <= 0 || basket.quantity >= 100){
        alert('Merci de renseigner une couleur et une quantité entre 0 et 100 !')
    }
    else{
        console.log('ok')

        // On vérifie si le panier existe déjà
        if (localStorage.getItem('panier') == null || localStorage.getItem('panier') == []){
            basketArray.push(basket)
            localStorage.setItem('panier', JSON.stringify(basketArray))
        // Si oui on récupère le tableau existant
        } else {
            let storageCart = JSON.parse(localStorage.getItem('panier'))
            let productExists = false
            // On vérifie si un produit avec le même id et la même couleur existe déjà
            for (element of storageCart){
                if (element.id == basket.id && element.color == basket.color){
                    productExists = true;
                    // Si oui on met à jour la quantité du produit
                    element.quantity = parseInt(basket.quantity) + parseInt(element.quantity)
                }
            }
            if (productExists){
                localStorage.setItem('panier', JSON.stringify(storageCart))
            } else {
                storageCart.push(basket)
                localStorage.setItem('panier', JSON.stringify(storageCart))
            }
        }
    }
    console.log(basket)
    console.log(localStorage.getItem('panier'))
});
