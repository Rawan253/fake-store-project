$(document).ready(() => {
  fetchAllProducts();
  checkCartExist();

  $(document).on("click", ".save-btn", function () {
    let currentItemID = $(this).data("id");
    let itemPrice= $(`.item-price[data-id= "${currentItemID}"]`).data("price");
    addItemToCart(currentItemID, itemPrice);
  });
});

const fetchAllProducts = async () => {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const items = await res.json();

    items.map((item) => {
      if (item.category === "men's clothing")
        $("#men-container").append(cardForm(item.image, item.title, item.id, item.price));
      else if (item.category === "women's clothing")
        $("#women-container").append(cardForm(item.image, item.title, item.id, item.price));
    });
  } catch (err) {
    console.log("Error:", err);
  }
};

const cardForm = (img, title, id, price) =>
  `<div class="container">
  <div class="card" onclick="redirectToDetails(${id})">
    <div>
        <img src="${img}" class="card--img" alt=""/>
    </div>
    <div class="card-title">
        <p>${title}</p>
        <p class="item-price" data-id="${id}" data-price="${price}">${price}</p>
    </div>
</div>
<button class="save-btn" data-id="${id}">Add to Card</button>
</div>`;



const checkCartExist = () => {
  let cart = parse(localStorage.getItem("products"));

  if (!cart) {
    let cart = [];
    setCart(cart);
  }
};

const addItemToCart = (itemID, itemPrice) => {
  let cart = getCart();

  if (cart.length !== 0) {
    let itemFound = false;

        for (let item of cart) {
        if (item.id === itemID) {
            item.qty++;
            itemFound = true;
            break;
        }
        }

        if (!itemFound) {
        cart.push({
            id: itemID,
            qty: 1,
            price: itemPrice,
        });
        }
  } else {
    cart.push({
      id: itemID,
      qty: 1,
      price: itemPrice,
    });
  }

  setCart(cart);
};



let items = JSON.parse(localStorage.getItem("products"));

for(let item of items)
    console.log(item);



    
function redirectToDetails(id) {
  window.location.href = `/products.html?id=${id}`;
}

function getCart() {
  return parse(localStorage.getItem("products"));
}

function setCart(json) {
  localStorage.setItem("products", stringify(json));
}

function stringify(json) {
  return JSON.stringify(json);
}

function parse(str) {
  return JSON.parse(str);
}

function checkIDExists(cart, itemID) {
  cart.filter((item) => item.id === itemID);
  return cart.length;
}

function pushToArray(array, item) {
  array.push(item);
}

function updateQty(cart, itemID) {
  cart.map(function (item) {
    item.id === itemID && (item.qty = item.qty + 1);
  });
}
