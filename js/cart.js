$(document).ready(() => {

  $(document).on("click", ".btn1", function () {
    let currentItemID = $(this).data("id");
    let itemPrice= $(`.item-price[data-id= "${currentItemID}"]`).data("price");
    minusFunction(currentItemID, itemPrice);
  });

  $(document).on("click", ".btn2", function () {
    let currentItemID = $(this).data("id");
    let itemPrice= $(`.item-price[data-id= "${currentItemID}"]`).data("price");
    plusFunction(currentItemID,  itemPrice);
  });
  
});

let items = JSON.parse(localStorage.getItem("products"));


  const fetchItemData = async(item) => {
    try {
      const res = await fetch(`https://fakestoreapi.com/products/${item.id}`);
      const data = await res.json();

      data.qty = item.qty;
      data.priceTotal = item.qty * item.price
     console.log(data);
      let { image, title, price, qty, id, priceTotal} = data;

      $(".cart-items").append(cardForm(image, title, price, qty, id, priceTotal));

    } catch (err) {
      console.log("Error: ", err);
    }
  }
for (let item of items) {
    fetchItemData(item);
}

const cardForm = (img, title, price, qty, id, priceTotal) =>
  `<div class="card">
        <div class="container">
            <div class="row">
                <div class="col img-container">
                    <img src="${img}" alt="clothes images for men and women" />
                </div>
                <div class="col info-container">
                    <h4>${title}</h4>
                    <p class="item-price" data-id="${id}" data-price="${price}">${price}/ 1pc</p>
                    <p class="total-item-price" id="${id}">${priceTotal}</p>
                    
                    <div class="edit-qty">
                        <button class="btn1" data-id="${id}">-</button>
                        <p class="quantity" id="qty-${id}">${qty}</p>
                        <button class="btn2" data-id="${id}">+</button>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

    

const updateQuantityDisplay = (itemId, newQty) => {
  $(`#qty-${itemId}`).text(newQty);
};
const updatePriceDisplay = (itemId, newPrice) => {
    $(`#${itemId}`).text(newPrice);
}

const plusFunction = (itemId, itemPrice) => {
  let cart = JSON.parse(localStorage.getItem("products"));

  for (let item of cart) {
    if (item.id === itemId) item.qty++;
  }

  localStorage.setItem("products", JSON.stringify(cart));
  updateQuantityDisplay(itemId, getItemQuantity(itemId));
  updatePriceDisplay(itemId, totalItemPrice(itemPrice, getItemQuantity(itemId)));
  updateTotalPrice();
  }

const minusFunction = (itemId, itemPrice) => {
  let cart = JSON.parse(localStorage.getItem("products"));

  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === itemId) {
      cart[i].qty--;

      if (cart[i].qty === 0){
        cart.splice(i, 1);
        $(`#qty-${itemId}`).closest('.card').remove();
      } 
    }
  }

  localStorage.setItem("products", JSON.stringify(cart));
  updateQuantityDisplay(itemId, getItemQuantity(itemId));
  updatePriceDisplay(itemId, totalItemPrice(itemPrice, getItemQuantity(itemId)));
  updateTotalPrice();
 
};

const getItemQuantity = (itemId) => {
  let cart = JSON.parse(localStorage.getItem("products"));
  let item = cart.find((item) => item.id === itemId);
  return item ? item.qty : 0;
};

const totalItemPrice =(price, quantity) => {
    let tot = price*quantity;
    return tot.toFixed(2);
}

const updateTotalPrice = () => {
    let cart = JSON.parse(localStorage.getItem("products"));
    var total=0; 
    for (let item of cart) {
      total += parseFloat(item.price * item.qty);
    }
    $(".total-cart-price").text(total);

}
