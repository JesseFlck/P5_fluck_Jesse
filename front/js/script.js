// Récupération des données de l'API

fetch("http://localhost:3000/api/products")
    .then(function(res) {
        if (res.ok){
            return res.json();
        }
    })
    .then(function(showAPI) {
        const articles = showAPI;
        console.table(articles);



        // Boucle 1 article par index
        for (let article in articles) {

            // Liens dynamiques
            let productUrl = document.createElement("a");
            document.querySelector(".items").appendChild(productUrl);
            productUrl.href = 'product.html?id=' + showAPI[article]._id;

            // Articles dynamiques
            let productArticle = document.createElement("article");
            productUrl.appendChild(productArticle);

            // Images dynamiques
            let productImg = document.createElement("img");
            productArticle.appendChild(productImg);
            productImg.src= showAPI[article].imageUrl;
            productImg.alt= showAPI[article].altTxt;

            // Nom de l'article dynamique
            let productName = document.createElement("h3");
            productArticle.appendChild(productName);
            productName.classList = "productName";
            productName.innerHTML = showAPI[article].name;

            // Description de l'article
            let productDescription = document.createElement("p");
            productArticle.appendChild(productDescription);
            productDescription.classList = "productDescription";
            productDescription.innerHTML = showAPI[article].description;
        }
    })
    .catch(function(error) {
        console.log(error);
    })