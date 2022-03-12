//#region RENDER FUNCTIONS

//Lister builder
function renderProductList(list = [], parentContainer) {
  parentContainer.innerHTML = '';
  parentContainer.innerHTML = list
    .map((product) => {
      const percentageOff = Math.ceil(
        ((product.price - product.sale_price) / product.price) * 100
      ).toFixed(2);

      const productOnSale = product?.sale_price !== undefined;

      const discountTagClass = productOnSale ? 'discount-tag' : 'hidden';
      const actualPriceClass = productOnSale ? 'actual-price' : 'hidden';

      const itemAddedOnWishlist = getWishList().some(
        (p) => p?.id == product.id
      );
      const buttonLabel = itemAddedOnWishlist ? 'Remove' : 'add to wishlist';
      const buttonClass = itemAddedOnWishlist
        ? 'card-button card-button--active'
        : 'card-button';
      const buttonIcon = itemAddedOnWishlist ? 'fa fa-remove' : 'fa fa-heart';

      return `<div class="product-card">
          <div class="product-image">
            <span class="${discountTagClass}">${percentageOff}% Off</span>
            <img src="${product.imageUrl}" class="product-thumb" alt="" />
  
            <button class="${buttonClass}" id="${
        product.id
      }"><span class="${buttonIcon}"></span><span>${buttonLabel}</span></button>
  
          </div>
          <div class="product-info">
            <h2 class="product-brand">😄${product.name}</h2>
            <p class="product-des">${product.descriptipon}</p>
            <span class="price">R${product?.sale_price || product.price}</span
            ><span class="${actualPriceClass}">R${product.price}</span>
          </div>
        </div>
  `;
    })
    .join('');
}

//Handler
function handleAddWishList(container, productList) {
  const buttons = container.querySelectorAll('button');

  buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const buttonId = button.id;

      const currentProduct = productList.find((p) => p.id == buttonId);

      console.log(`Someone is adding product ${buttonId} to wishlist`);
      console.log(currentProduct);

      toggleItemOnList(currentProduct, WISHLIST_STORE_KEY, getWishList());

      renderListUI();
      location.reload();

      setTimeout(() => {
        container.scrollIntoView();
      }, 500);
    });
  });
}

//#region Local Storage
const WISHLIST_STORE_KEY = 'will_ecommerce_wishlist';

function toggleItemOnList(current, listKey, staleList) {
  let _list = staleList || [];

  const alreadyExist = _list.some((p) => p?.id === current?.id);

  if (alreadyExist) {
    _list = _list.filter((p) => p.id !== current.id);
  } else {
    _list.push(current);
  }

  localStorage.setItem(listKey, JSON.stringify(_list));
}

function getWishList() {
  const store = localStorage.getItem(WISHLIST_STORE_KEY) || '[]';
  return JSON.parse(store);
}

//#endregion Local Storage

//#endregion RENDER FUNCTIONS

const bigSaleContainer = document.querySelector('#big-sale-container');
const newArrivalContainer = document.querySelector('#new-arrival-container');
const trendingContainer = document.querySelector('#trending-container');

const womenContainer = document.querySelector('#women-container');
const menContainer = document.querySelector('#men-container');
const kidsContainer = document.querySelector('#kids-container');
const accessoriesContainer = document.querySelector('#accessories-container');
const shoesContainer = document.querySelector('#shoes-container');

//Initial render onload
renderListUI();

handleAddWishList(bigSaleContainer, BIG_SALE_PRODUCTS);
handleAddWishList(newArrivalContainer, NEW_ARRIVAL_PRODUCTS);
handleAddWishList(trendingContainer, TRENDING_PRODUCTS);

handleAddWishList(womenContainer, WOMEN_PRODUCTS);
handleAddWishList(menContainer, MEN_PRODUCTS);
handleAddWishList(kidsContainer, KIDS_PRODUCTS);
handleAddWishList(accessoriesContainer, ACCESSORIES_PRODUCTS);
handleAddWishList(shoesContainer, SHOES_PRODUCTS);

function renderListUI() {
  console.log('Should rerender the UI');
  renderProductList(BIG_SALE_PRODUCTS, bigSaleContainer);
  renderProductList(NEW_ARRIVAL_PRODUCTS, newArrivalContainer);
  renderProductList(TRENDING_PRODUCTS, trendingContainer);

  renderProductList(WOMEN_PRODUCTS, womenContainer);
  renderProductList(MEN_PRODUCTS, menContainer);
  renderProductList(KIDS_PRODUCTS, kidsContainer);
  renderProductList(ACCESSORIES_PRODUCTS, accessoriesContainer);
  renderProductList(SHOES_PRODUCTS, shoesContainer);
}
