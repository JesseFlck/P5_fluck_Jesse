// Récupération des données du localStorage
let basket = localStorage.getItem('panier');
 
// Vérification qu'il ne soit pas vide
if (!basket) {
  console.log("Oups c'est vide");
  document.getElementById("cart__items").innerHTML = `<h3 style="text-align: center; margin-bottom: 50px;">Vous n'avez aucun article dans votre panier !</h3>`;
}
console.log(basket)
// conversion de la string en objet
let basketJSON = JSON.parse(basket);
 

// Création de la partie HTML où apparaissent les produits du panier




// Vérification des champs du formulaire
