// replaceText(document.body)

// function replaceText(element) {
//   if (element.hasChildNodes()) {
//     element.childNodes.forEach(replaceText)
//   } else if (element.nodeType === Text.TEXT_NODE) {
//     if (element.textContent.match(/coronavirus/gi)) {
//       const newElement = document.createElement('span')
//       newElement.innerHTML = element.textContent.replace(/(coronavirus)/gi, '<span class="rainbow">$1</span>')
//       element.replaceWith(newElement)
//     }
//   }
// }

// document.getElementsByClassName('shop_link')[0].click();
// document.getElementsByClassName('shop_link')[0].click();

let productName = "My Bloody Valentine";
let category = document.querySelectorAll("a[href$='sweatshirts']")[0];
let articles = [];
var step = 0;

function getProducts() {
  articles = document.querySelectorAll("article h1 a"); // wszystkie produkty
  getProduct(articles, productName).click();
}

const getProduct = function (articles, productName) {
  for (let i = 0; i < articles.length; i++) {
      if (articles[i].textContent.includes(productName)) {
          return articles[i];
      }
  }
}
category.click();
setTimeout(getProducts, 1000);

var addToBasket = document.getElementsByName('commit')[0];


  

setTimeout(()=>addToBasket.click(),500);
if (document.getElementsByClassName('sold-out')) {
  articles = document.querySelectorAll("ul li a");
}