import { data } from "./data.js";

const formatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  minimumFractionDigits: 0
});

const showData = (item) => {
  const showDiv = document.createElement("div");
  showDiv.className = "items";

  const img = document.createElement("img");
  img.className = "img";
  img.src = item.image;

  const title = document.createElement("p");
  title.className = "titleText";
  title.innerText = item.title;

  const price = document.createElement("b");
  price.className = "price";

  if (item.discountPrice) {
    const discountPercentage = Math.round((1 - (item.discountPrice / item.price)) * 100);
    const discountedPrice = item.discountPrice;

    price.innerHTML = ` 
      <span class="discountPrice">${formatter.format(discountedPrice)}</span>
      <span class="originalPrice">${formatter.format(item.price)}</span>
      <span class="discountPercentage">Diskon <b>${discountPercentage}%</b></span>
    `;
    
    price.querySelector(".originalPrice").style.textDecoration = "line-through";
  } else {
    price.innerHTML = `<span class="priceText"><p>${formatter.format(item.price)}</p></span>`;
  }

  const category = document.createElement("b");
  category.className = "category";
  category.innerHTML = `<span class="categoryText"><p>${item.category}</p></span>`;

  const button = document.createElement("button");
  button.className = "link";
  button.innerText = "Beli Sekarang";
  button.addEventListener("click", () => {
    window.location.href = item.link;
  });

  const rating = document.createElement("p");
  rating.className = "rating";
  rating.innerText = `${item.rating.rate} (${item.rating.count} reviews)`;

  showDiv.append(img, title, price, category, button);
  document.querySelector(".showDataMain").appendChild(showDiv);
};

for (const item of data) {
  showData(item);
}

const inputValue = document.getElementById('inputValue').addEventListener('keyup', (event) => {
  const inputText = event.target.value.toLowerCase();
  const allItems = document.querySelectorAll('.items');
  let error = true;

  for (const item of allItems) {
    const title = item.children[1].innerText.toLowerCase();
    const price = item.children[2].innerText.toLowerCase();
    const category = item.children[3].innerText.toLowerCase();

    if (title.includes(inputText) || price.includes(inputText) || category.includes(inputText)) {
      item.style.display = "block";
      error = false;
    } else {
      item.style.display = "none";
    }
  }

  if (error) {
    document.querySelector('.errorDiv').style.display = "block";
  } else {
    document.querySelector('.errorDiv').style.display = "none";
  }
});

const errorData = () => {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'errorDiv';

  const h1 = document.createElement('h1');
  h1.className = "errorHeading";
  h1.innerHTML = "Sorry, no results found!<br> Please check the spelling or try ing for something else";

  errorDiv.append(h1);
  document.getElementById('error').append(errorDiv);
  errorDiv.style.display = "none";
};

errorData();
