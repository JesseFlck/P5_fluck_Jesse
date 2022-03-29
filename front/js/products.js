//Récupération de l'URL via la page courante
const str = window.location.href;
console.log(str);
const url = new URL(str);

// Récupération de l'ID de l'article
const idProduct = url.searchParams.get("id");
console.log(idProduct);


// Récupération de l'article depuis l'API
fetch("http://localhost:3000/api/products/" + idProduct)
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(showAPI) {
        const article = showAPI;
        console.table(article);

        let productImg = document.createElement("img");
        document.querySelector(".item__img").appendChild(productImg);
        productImg.src = article.imageUrl;
        productImg.alt = article.altTxt;

        let productName = document.getElementById('title');
        productName.innerHTML = article.name;

        let productPrice = document.getElementById('price');
        productPrice.innerHTML = article.price;

        let productDescription = document.getElementById('description');
        productDescription.innerHTML = article.description;

        for (let colors of article.colors){
            let productColors = document.createElement("option");
            document.querySelector("#colors").appendChild(productColors);
            productColors.value = colors;
            productColors.innerHTML = colors;
        }
    })
    .catch(function(error) {
        console.log(error);
    })
