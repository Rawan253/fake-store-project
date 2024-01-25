
      async function fetchProductDetails() {
        let urlParams = new URLSearchParams(window.location.search);
        let productId = urlParams.get("id");
        

        try {
          const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
          const data = await response.json();
          $('#product-info').append(displayProductDetails(data));
        } catch (error) {
          console.log("Error:", error);
        }
      }

      fetchProductDetails();

      const displayProductDetails= (data) => 
        `<div class="container mt-5 product">
            <div class="row">
    <div class="col img">
        <img src="${data.image}" class="product--img" alt="">
    </div>
    <div class="col product--details">
        <h3>${data.title}</h3>
        <p><b>Description:  </b>${data.description}</p>
        <p><b>Category:  </b>${data.category}</p>
        <p><b>Price:  </b>${data.price}$</p>
        <p><b>Rating: </b>${data.rating.rate} <i class="fa-solid fa-star" style="color: #FFD43B;"></i></p>
    </div>
    </div>
    </div>`;
      