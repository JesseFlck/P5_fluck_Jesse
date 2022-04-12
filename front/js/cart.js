document.addEventListener('DOMContentLoaded', async () => {

    // Récupération des données du localStorage
    const cart = JSON.parse(localStorage.getItem('panier'))
    const cart__items = document.getElementById('cart__items')

    // Récupération des données de l'API + affichage du panier 
    if (cart)
    {
        let totalPrice = 0
        let totalArticle = 0
        for (productCart of cart) {
            const response = await fetch('http://localhost:3000/api/products/' + productCart.id)
            const data = await response.json()  
            createCart(data, productCart, cart__items)
            totalArticle = totalArticle + 1
            totalPrice = totalPrice + (data.price * productCart.quantity)
        }
        document.getElementById('totalQuantity').innerHTML = totalArticle
        document.getElementById('totalPrice').innerHTML = totalPrice
        console.log(totalPrice)
    }
    if (location.href.includes('panier') && (!cart || !cart.length))
    {
        cart__items.innerHTML +=`<h2 style="text-align:center">Le panier est vide</h2>`
    }
})

// Récupération de la quantité de produits
const select = document.querySelectorAll('.itemQuantity')
    
// Modification de la quantité du panier
/*select.forEach(productQuantity => {
    const element = productQuantity.closest('article')
    const data_id = element.dataset.id
    const data_color = element.dataset.color
    select.addEventListener('change', () => {
        const item = cart.find(item => item.id == data_id && item.color == data_color)
        item.quantity = +productQuantity.value
        localStorage.setItem('panier', JSON.stringify(cart))
        total(cart)
    })
    total(cart)
})*/

// Suppression des éléments du panier
const deleteItem = document.querySelectorAll('.deleteItem')

deleteItem.forEach(productDelete => {
    const element = productDelete.closest('article')
    const data_id = element.dataset.id
    const data_color = element.dataset.color

    productDelete.addEventListener('click', () => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cet élément ?')){
            element.parentNode.removeChild(element)
            cart.splice(cart.indexOf(cart.find(item => item.id === data_id && item.color === data_color)), 1)
            localStorage.setItem('panier', JSON.stringify(cart))
            alert('Le produit a été retiré du panier')
            window.location.reload()
        }
    })
})



// Affichage des produits
function createCart(products, productCart, cart__items) {
    
    if(!cart__items) return
    cart__items.innerHTML +=`
        <article class="cart__item" data-id="${products._id}" data-color="${productCart.color}">
            <div class="cart__item__img">
                <img src="${products.imageUrl}" alt="${products.altTxt}">
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>${products.name}</h2>
                    <p>${productCart.color}</p>
                    <p>${products.price}€</p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                        <p>Qté :  </p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productCart.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                    </div>
                </div>
            </div>
        </article>`
}

// Calcul du total
function total(cart) {
    let totalArticle = 0
    let totalPrice = 0
    for (const i of cart) {
        totalArticle += +parseInt(i.quantity)
        totalPrice += +parseInt(i.price) * +parseInt(i.quantity)
    }
    document.getElementById('totalQuantity').innerHTML = totalArticle
    document.getElementById('totalPrice').innerHTML = totalPrice
}





// Gestion du formulaire

//Récupération des éléments du formulaire
let form = document.querySelector(".cart__order__form");


// ******* PRENOM *******

form.firstName.addEventListener('change', function () {
    validFirstName(this);
})

// Fonction pour contrôler la validation via regexp
const validFirstName = (inputFirstName) => {

    // Création de la regexp pour le prénom
    let firstNameRegExp = new RegExp('^[a-zA-Z-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._\s -]*$', 'g');

    let testFirstName = firstNameRegExp.test(inputFirstName.value);

    let errorMessage = inputFirstName.nextElementSibling;

    if (testFirstName) {

    } else {
        errorMessage.innerText = 'Le prénom ne doit pas contenir de chiffre';
    }
};

// ******* NOM *******

form.lastName.addEventListener('change', function () {
    validLastName(this);
})

// Fonction pour contrôler la validation via regexp
const validLastName = (inputLastname) => {

    // Création de la regexp pour le nom
    let lastNameRegExp = new RegExp('^[a-zA-Z-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._\s -]*$', 'g');

    let testLastNameRegExp = lastNameRegExp.test(inputLastname.value);

    let errorMessage = inputLastname.nextElementSibling;

    if (testLastNameRegExp) {

    } else {
        errorMessage.innerText = 'Le nom ne doit pas contenir de chiffre';
    }
};


// ******* ADRESSE *******

form.address.addEventListener('change', function () {
    validAddress(this);
})

// Fonction pour contrôler la validation via regexp
const validAddress = (inputAddress) => {

    // Création de la regexp pour l'adresse
    let AdressRegExp = new RegExp('^[ a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._\s -]*$', 'g');

    let testAddressRegExp = AdressRegExp.test(inputAddress.value);

    let errorMessage = inputAddress.nextElementSibling;

    if (testAddressRegExp) {

    } else {
        errorMessage.innerText = 'Merci de renseigner une adresse valide.';
    }
};

// ******* VILLE *******

form.city.addEventListener('change', function () {
    validCity(this);
})

// Fonction pour contrôler la validation via regexp
const validCity = (inputCity) => {

    // Création de la regexp pour la ville
    let cityRegExp = new RegExp('^[ a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._\s -]*$', 'g');

    let testCityRegExp = cityRegExp.test(inputCity.value);

    let errorMessage = inputCity.nextElementSibling;

    if (testCityRegExp) {

    } else {
        errorMessage.innerText = `Merci de renseigner une ville valide`;
    }
};


// ******* EMAIL *******

form.email.addEventListener('change', function () {
    validEmailForm(this);
})

// Fonction pour contrôler la validation via regexp
const validEmailForm = (inputEmailForm) => {

    // Création de la regexp pour l'adresse mail
    let emailFormRegExp = new RegExp('^[a-zA-Z0-9ôöáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');

    let testEmailRegExp = emailFormRegExp.test(inputEmailForm.value);

    let errorMessage = inputEmailForm.nextElementSibling;

    if (testEmailRegExp) {

    } else {
        errorMessage.innerText = `Merci de renseigner une adresse mail valide`;
    }
}


 // ******* Passer la commande *******

 let firstName = document.getElementById("firstName");
 let lastName = document.getElementById("lastName");
 let address = document.getElementById("address");
 let city = document.getElementById("city");
 let email = document.getElementById("email");

 let submitBtn = document.getElementById('order');

 submitBtn.addEventListener("click", function (e) {
     e.preventDefault();

     const cart = JSON.parse(localStorage.getItem('panier'))
     let idProducts = []
     for (let i = 0; i < cart.length; i++) {
         idProducts.push(cart[i].id);
     }
     const orderId = {
         contact: {
             firstName: firstName.value,
             lastName: lastName.value,
             address: address.value,
             city: city.value,
             email: email.value,
         },
         products: idProducts,
     };


     const option = {
         method: 'POST',
         body: JSON.stringify(orderId),
         headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json'
         },
     };
     fetch(`http://localhost:3000/api/products/order`, option)
         .then((reponse) => reponse.json())
         .then((data) => {
             localStorage.clear();
             localStorage.setItem('orderId', data.orderId);

             window.location.href = 'confirmation.html';
         })
         .catch((err) => {
             alert();
         });
 });
