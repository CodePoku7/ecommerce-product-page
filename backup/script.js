"use strict";

const cart = document.querySelector(".cart-indicator");
const toggleCart = document.querySelector(".shopping-cart-lightbox");
const images = ["images/fullimages"];
const addCart = document.querySelector(".btn--regular");
const cartItem = document.querySelector(".cart-item-container");
const cartEmpty = document.querySelector(".cart-empty");
const cartIcon = document.querySelector(".cart-count");
const itemContainer = document.querySelector(".cart-item-container");
const checkout = document.querySelector(".btn--cart");
const popupOpen = document.querySelector(".main-image");
const lightBox = document.querySelector(".main-product-preview-container");
const overlay = document.querySelector(".overlay");
const closeLightBox = document.querySelector(".close-preview");
const btnLeft = document.querySelector(".btn-preview--left");
const btnRight = document.querySelector(".btn-preview--right");

const btnPlus = document.querySelector(".btn--plus");
const btnMinus = document.querySelector(".btn--minus");
let counter = document.querySelector(".counter-number");

let itemsInCart = 0;
let countervalue = 1;
let productPrice = 250;
let productDiscount = 0.5;
let productPriceTotal = 0;

const togCart = function () {
  if (toggleCart.classList.contains("hidden")) {
    toggleCart.classList.remove("hidden");
    console.log("removed");
  } else {
    toggleCart.classList.add("hidden");
  }
};

cart.addEventListener("click", togCart);

popupOpen.addEventListener("click", openPopup);

closeLightBox.addEventListener("click", closePopup);

addCart.addEventListener("click", addToCart);

btnPlus.addEventListener("click", counterAdd);
btnMinus.addEventListener("click", counterDecrease);

btnLeft.addEventListener("click", imageLeft);
btnRight.addEventListener("click", imageRight);

/******** */
/* Main product gallery */
/******** */
const productImg = document.getElementById("mainImg");
const productImgThumb = document.querySelectorAll(".product-img-thumb");

productImgThumb.forEach((img) => img.addEventListener("click", imgChange));

function imgChange(e) {
  productImg.src = e.target.src;
}

/*************************** */
/* Lightbox product gallery */
/*************************** */

const lightboxProductImg = document.querySelector(".lightbox-main-image");
let lightboxProductImgThumb = document.querySelectorAll(".lightbox-thumb");

lightboxProductImgThumb.forEach((img) =>
  img.addEventListener("click", lightboxImgChange)
);

function lightboxImgChange(e) {
  lightboxProductImg.src = e.target.src;
}

let galleryIndex = 1;
showGallery(galleryIndex);

function imageLeft(n) {
  showGallery((galleryIndex += n));
}

function imageRight(i) {
  showGallery((galleryIndex += i));
}

function showGallery(i) {
  let n;
  const gallery = document.querySelectorAll(
    ".main-product-preview-gallery img"
  );
  let lightboxProductImgThumb = document.querySelectorAll(".lightbox-thumb");

  if (i > gallery.length) {
    galleryIndex = 1;
  }
  if (i < 1) {
    galleryIndex = gallery.length;
  }
  for (n = 0; n < gallery.length; n++) {
    galleryIndex[n].style.display = "none";
  }
  for (n = 0; n < lightboxProductImgThumb.length; n++) {
    lightboxProductImgThumb[n].className = lightboxProductImgThumb[
      n
    ].className.replace(" active", "");
  }
  gallery[galleryIndex - 1].style.display = "block";
  lightboxProductImgThumb[galleryIndex - 1].className += " active";
}

/******************** */
/*COUNTER*/
/******************* */

function counterAdd() {
  setCounter(1);
  console.log(countervalue);

  counter.value = countervalue;
}

function counterDecrease() {
  setCounter(-1);

  counter.value = countervalue;
}

function setCounter(value) {
  if (countervalue + value > 0) {
    countervalue += value;
    counter.innerHTML = countervalue;
  }
}

function addToCart() {
  // cart empty - Add hidden to item cointainer and add your cart is empty
  if (cartItem.classList.contains("hidden")) {
    cartItem.classList.remove("hidden");
  }
  itemsInCart += countervalue;

  const productHTMLElement = `
            <img
              class="cart-item-img"
              src="images/image-product-1-thumbnail.jpg"
            />
            <div class="cart-item-description">
              <h3 class="cart-item-heading-tertiary">
                Fall Limited Edition Sneakers
              </h3>
              <span class="cart-item-price">$${
                productPrice * productDiscount
              }</span>
              <span class="cart-item-count">x ${itemsInCart}</span>
              <span class="cart-item-final-price">$${
                productPrice * productDiscount * itemsInCart
              }</span>
            </div>
            <img
              class="cart-item-delete"
              alt="Delete icon"
              src="images/icon-delete.svg"
            />
 
  
  
  
  `;

  itemContainer.innerHTML = productHTMLElement;

  cartUpdate();
  console.log(itemsInCart);

  const cartDelete = document.querySelector(".cart-item-delete");
  cartDelete.addEventListener("click", itemDelete);
}

function cartUpdate() {
  cartIconUpdate();
  cartEmptymsg();
  cartCheckoutButton();
}

function cartIconUpdate() {
  cartIcon.textContent = itemsInCart;
  if (itemsInCart == 0) {
    if (!cartIcon.classList.contains("hidden")) {
      cartIcon.classList.add("hidden");
    }
  } else {
    cartIcon.classList.remove("hidden");
  }
}

function cartEmptymsg() {
  if (itemsInCart == 0) {
    if (cartEmpty.classList.contains("hidden")) {
      cartEmpty.classList.remove("hidden");
    }
  } else {
    if (!cartEmpty.classList.contains("hidden")) {
      cartEmpty.classList.add("hidden");
    }
  }
}

function cartCheckoutButton() {
  if (itemsInCart == 0) {
    if (!checkout.classList.contains("hidden")) {
      checkout.classList.add("hidden");
    }
  } else {
    checkout.classList.remove("hidden");
  }
}

function itemDelete() {
  itemsInCart--;
  cartUpdate();

  const itemLink = document.querySelector(".cart-item-count");
  const totalAmountLink = document.querySelector(".cart-item-final-price");
  itemLink.innerHTML = itemsInCart;
  totalAmountLink.innerHTML = `$${
    productPrice * productDiscount * itemsInCart
  }`;

  if (itemsInCart == 0) {
    if (!cartItem.classList.contains("hidden")) {
      cartItem.classList.add("hidden");
    } else {
      cartItem.classList.remove("hidden");
    }
  }
}

function openPopup() {
  if (
    (lightBox.classList.contains("hidden"),
    overlay.classList.contains("hidden"))
  ) {
    lightBox.classList.remove("hidden"), overlay.classList.remove("hidden");
  } else {
  }
}

function closePopup() {
  if (
    (!lightBox.classList.contains("hidden"),
    !overlay.classList.contains("hidden"))
  ) {
    lightBox.classList.add("hidden"), overlay.classList.add("hidden");
  } else {
  }
}