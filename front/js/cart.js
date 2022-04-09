document.addEventListener('DOMContentLoaded', async () => {

    // Récupération des données du localStorage
    const cart = JSON.parse(localStorage.getItem('panier'))
    const cart__items = document.getElementById('cart__items')

    // Récupération des données de l'API + affichage du panier
    const response = await fetch('http://localhost:3000/api/products/')
    const data = await response.json()   
    if (cart)
    {
        cart.forEach(productCart => {
            const key = Object.values(data).find(product => product._id == productCart.id)
            createCart(key, productCart, cart__items)
        })
    }
    if (location.href.includes('panier') && (!cart || !cart.length))
    {
        cart__items.innerHTML +=`<h2 style="text-align:center">Le panier est vide</h2>`
    }

    // Récupération de la quantité de produits
    const select = document.querySelectorAll('.itemQuantity')
    
    // Modification de la quantité du panier
    select.forEach(productQuantity => {
        const element = productQuantity.closest('article')
        const data_id = element.dataset.id
        const data_color = element.dataset.color
        productQuantity.addEventListener('change', () => {
            const item = cart.find(item => item.id == data_id && item.color == data_color)
            item.quantity = +productQuantity.value
            localStorage.setItem('panier', JSON.stringify(cart))
            total(cart)
        })
        total(cart)
    })

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
        totalArticle += +i.quantity
    }
    document.getElementById('totalQuantity').innerHTML = totalArticle
}
