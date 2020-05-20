'use strict';

function cleanElemClass(index, elementCollect, activeClass) {
  for (let i = 0; i < elementCollect.length; i++) {
    if (elementCollect[index] != elementCollect[i] &&
       elementCollect[i].classList.contains(activeClass)) {
      elementCollect[i].classList.remove(activeClass);
    }
  }
}

let headerNav = document.querySelector('.header__nav');
let burger = headerNav.querySelector('.burger');
let headerMenu = headerNav.querySelector('.header__menu');

burger.onclick = function() {
  burger.classList.toggle('burger--active');
  headerMenu.classList.toggle('header__menu--open');
  headerNav.classList.toggle('header__nav--open');
}

let mainReview = document.querySelector('.main__review');
let btnsReview = mainReview.querySelectorAll('.btn-box__btn');
let blocksReview = mainReview.querySelectorAll('.review__item');

for (let i = 0; i < btnsReview.length; i++) {
  btnsReview[i].onclick = function() {
    cleanElemClass(i, btnsReview, 'btn-box__btn--active');
    btnsReview[i].classList.add('btn-box__btn--active');
    cleanElemClass(i, blocksReview, 'review__item--show');
    blocksReview[i].classList.add('review__item--show');
  }
}

let tableShell = document.querySelector('.main__table-shell');
let tablePrice = tableShell.querySelector('.table-price');
let btnsTablePrice = tableShell.querySelectorAll('.btn-box__btn');

for (let i = 0; i < btnsTablePrice.length; i++) {
  btnsTablePrice[i].onclick = function() {
    cleanElemClass(i, btnsTablePrice, 'btn-box__btn--active');
    btnsTablePrice[i].classList.add('btn-box__btn--active');
    slideTable(tablePrice, i);
  }
}

function slideTable(element, position) {
  for (let i = 0; i < 3; i++) {
    if (element.classList.contains(`main__table-price--left-${(i)}x`) && i != position) {
      element.classList.remove(`main__table-price--left-${i}x`);
    }
  }
  element.classList.add(`main__table-price--left-${position}x`);
}

