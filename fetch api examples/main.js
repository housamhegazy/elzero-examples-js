let container = document.querySelector(".repos-container");
let repoCount = 0;

let url = "https://course-api.com/javascript-store-products";

function fetchAlbum() {
  fetch(url,{mode:'cors'})
    .then((Response) => Response.json())
    .then((album) => {
      repoCount = album.length;
      album.forEach((repo,index) => {
        const imgUrl = repo.fields.image[0].url;
        const title = repo.fields.image[0].filename;
        const width = repo.fields.image[0].width;
        const height = repo.fields.image[0].height;
        const company = repo.fields.company;
        const price = `$${repo.fields.price / 100}`;
        let name = repo.fields.name
        let colors = repo.fields.colors;
        console.log(repo.fields.colors);
          //maindiv
          let mainDiv = document.createElement("a");
          mainDiv.className = "photo-box";
          //pic
          let pic = document.createElement("img");
          pic.src = imgUrl;
          pic.className = "image";
          mainDiv.appendChild(pic);

          //title
          let titleEle = document.createElement("h3");
          let titleText = document.createTextNode(name);
          titleEle.appendChild(titleText);
          //price
          let priceEle = document.createElement("span");
          priceEle.className = "price";
          let priceText = document.createTextNode(price);
          priceEle.appendChild(priceText);
          mainDiv.appendChild(priceEle);

          mainDiv.appendChild(titleEle);
          container.appendChild(mainDiv);
          //onclick
          mainDiv.addEventListener("click",(e=>{
            e.preventDefault()
            //empty container
            container.innerHTML = "";
            console.log(e.target.src);
            //create product container
            let productContainer = document.createElement("div");
            productContainer.className = "product-container";
            // create button
            let buttonBack = document.createElement("a");
            buttonBack.href = "index.html"
            let buttonText = document.createTextNode("go back");
            buttonBack.appendChild(buttonText);
            productContainer.appendChild(buttonBack);
            // create img
            let img = document.createElement("img");
            img.src = e.target.src;
            productContainer.appendChild(img);
            container.appendChild(productContainer);
          }))
      });
    });
}
fetchAlbum();

function addEvent(ele){
    
}