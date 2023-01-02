import { menuArray } from "/data.js";

const cardDetails = document.getElementById("card-details");
const form = document.getElementById("form");
const ordersSec = document.getElementById("orders-sec");

let orders = [];
let counter = 0;

document.addEventListener("click", function (e) {
  if (e.target.dataset.add) {
    handleItemAdd(e.target.dataset.add);
  } else if (e.target.dataset.remove) {
    handleItemRemove(e.target.dataset.remove);
  } else if (e.target.id === "complete-btn") {
    completeOrder();
  }
});

function handleItemAdd(itemId) {
  const targetItemObj = menuArray.filter(function (addItem) {
    return addItem.id === Number(itemId);
  })[0];
  orders.push(targetItemObj);
  counter++;
  renderOrders();
}

function handleItemRemove(itemId) {
  delete orders[itemId];
  counter--;
  console.log(counter);
  renderOrders();
  if (counter === 0) {
    resetTem();
  }
}

function completeOrder() {
  cardDetails.style.display = "block";
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const payFormData = new FormData(form);
  const name = payFormData.get("name");

  const inputs = document.querySelectorAll("input");
  for (let input of inputs) {
    input.value = ``;
  }
  orders = [];
  cardDetails.style.display = "none";
  ordersSec.innerHTML = `
  <p class="order-notification">Thanks, ${name}! Your order is on its way!</p>`;
});

function getItemsHTML() {
  let itemsHTML = ``;
  menuArray.forEach(function (item) {
    let ingredientsHTML = ``;

    item.ingredients.forEach(function (ingredient, index) {
      if (index === item.ingredients.length - 1) {
        ingredientsHTML += ingredient + ".";
      } else {
        ingredientsHTML += ingredient + ", ";
      }
    });
    itemsHTML += `
          <div class="item">
            <span class="item-emoji">${item.emoji}</span>
            <div class="item-desc">
              <p class="item-name">${item.name}</p>
              <p class="item-ingredients">${ingredientsHTML}</p>
              <p class="item-price">$${item.price}</p>
            </div>
            <button class="btn add-btn" data-add=${item.id}>+</button>
          </div>
        `;
  });

  return itemsHTML;
}

function renderItems() {
  document.getElementById("items").innerHTML = getItemsHTML();
}

renderItems();

function renderOrders() {
  let total = 0;
  let ordersHTML = ``;
  let ordersBodyHTML = ``;

  if (orders.length > 0) {
    orders.forEach(function (order, index) {
      total += order.price;
      ordersHTML += `
              <div class="added-item">
                <p class="item-name">${order.name}</p>
                <p class="remove-tag" data-remove=${index}>remove</p>
                <p class="added-item-price">$${order.price}</p>
              </div>
        `;
    });

    ordersBodyHTML = `
          <div class="orders-inner">
            <h2>Your order</h2>
            <div class="added-items">
                ${ordersHTML}
            </div>
            <div class="total-price-area">
              <p class="total-price">Total Price:</p>
              <p class="added-item-price">$${total}</p>
            </div>
            <button id="complete-btn" class="btn complete-order-btn">Complete order</button>
          </div>
    `;
    ordersSec.innerHTML = ordersBodyHTML;
  }
}

function resetTem() {
  ordersSec.innerHTML = ``;
}

// import { menuArray } from "/data.js";

// const body = document.querySelector("body");
// const cardDetails = document.getElementById("card-details");
// const form = document.getElementById("form");
// const ordersSec = document.getElementById("orders-sec");

// let orders = [];

// document.addEventListener("click", function (e) {
//   if (e.target.dataset.add) {
//     handleItemAdd(e.target.dataset.add);
//   } else if (e.target.dataset.remove) {
//     handleItemRemove(e.target.dataset.remove);
//   } else if (e.target.id === "complete-btn") {
//     completeOrder();
//   }
// });

// function handleItemAdd(itemId) {
//   const targetItemObj = menuArray.filter(function (addItem) {
//     return addItem.id === Number(itemId);
//   })[0];
//   orders.push(targetItemObj);
//   renderOrders();
// }

// function handleItemRemove(itemId) {
//   delete orders[itemId];
//   renderOrders();
// }

// function completeOrder() {
//   cardDetails.style.display = "block";
// }

// form.addEventListener("submit", function (e) {
//   e.preventDefault();
//   const payFormData = new FormData(form);
//   const name = payFormData.get("name");

//   const inputs = document.querySelectorAll("input[type='text']");
//   for (let input of inputs) {
//     input.value = ``;
//   }

//   orders = [];
//   cardDetails.style.display = "none";
//   ordersSec.innerHTML = `
//   <p class="order-notification">Thanks, ${name}! Your order is on its way!</p>

//   `;
// });

// function getItemsHTML() {
//   let itemsHTML = ``;
//   menuArray.forEach(function (item) {
//     let ingredientsHTML = ``;

//     item.ingredients.forEach(function (ingredient, index) {
//       if (index === item.ingredients.length - 1) {
//         ingredientsHTML += ingredient + ".";
//       } else {
//         ingredientsHTML += ingredient + ", ";
//       }
//     });
//     itemsHTML += `
//           <div class="item">
//             <span class="item-emoji">${item.emoji}</span>
//             <div class="item-desc">
//               <p class="item-name">${item.name}</p>
//               <p class="item-ingredients">${ingredientsHTML}</p>
//               <p class="item-price">$${item.price}</p>
//             </div>
//             <button class="btn add-btn" data-add=${item.id}>+</button>
//           </div>
//         `;
//   });

//   return itemsHTML;
// }

// function renderItems() {
//   document.getElementById("items").innerHTML = getItemsHTML();
// }

// renderItems();

// function renderOrders() {
//   let total = 0;
//   let ordersHTML = ``;
//   let ordersBodyHTML = ``;

//   if (orders.length > 0) {
//     orders.forEach(function (order, index) {
//       total += order.price;
//       ordersHTML += `
//               <div class="added-item">
//                 <p class="item-name">${order.name}</p>
//                 <p class="remove-tag" data-remove=${index}>remove</p>
//                 <p class="added-item-price">$${order.price}</p>
//               </div>
//         `;
//     });

//     ordersBodyHTML = `
//           <div class="orders-inner">
//             <h2>Your order</h2>
//             <div class="added-items">
//                 ${ordersHTML}
//             </div>
//             <div class="total-price-area">
//               <p class="total-price">Total Price:</p>
//               <p class="added-item-price">$${total}</p>
//             </div>
//             <button id="complete-btn" class="btn complete-order-btn">Complete order</button>
//           </div>
//     `;
//     ordersSec.innerHTML = ordersBodyHTML;
//   }
// }

// function renderOrders() {
//   let total = 0;
//   let ordersHTML = ``;
//   if (orders.length > 0) {
//     orders.forEach(function (order) {
//       total += order.price;
//       ordersHTML += `
//         <div class="orders-inner">
//             <h2>Your order</h2>
//             <div class="added-items">
//               <div class="added-item">
//                 <p class="item-name">${order.name}</p>
//                 <p class="remove-tag"}>remove</p>
//                 <p class="added-item-price">$${order.price}</p>
//             </div>
//             <div class="total-price-area">
//               <p class="total-price">Total Price:</p>
//               <p class="added-item-price">$${total}</p>
//             </div>
//             <button class="btn complete-order-btn">Complete order</button>
//         </div>
//         `;
//     });
//     document.getElementById("orders-sec").innerHTML = ordersHTML;
//   }
// }
