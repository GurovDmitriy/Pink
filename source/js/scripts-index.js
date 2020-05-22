'use strict';

function cleanElemClass(index, elementCollect, activeClass) {
  for (let i = 0; i < elementCollect.length; i++) {
    if (elementCollect[index] !== elementCollect[i]
       && elementCollect[i].classList.contains(activeClass)) {
      elementCollect[i].classList.remove(activeClass);
    }
  }
}

const mainReview = document.querySelector('.main__review');
const btnsReview = mainReview.querySelectorAll('.btn-box__btn');
const blockReview = mainReview.querySelector('.review__inner-box');
const reviewsItem = mainReview.querySelectorAll('.review__item');
const btnMarkLeft = mainReview.querySelector('.btn-mark-1');
const btnMarkRight = mainReview.querySelector('.btn-mark-2');

for (let i = 0; i < btnsReview.length; i++) {
  btnsReview[i].onclick = function () {
    cleanElemClass(i, btnsReview, 'btn-box__btn--active');
    btnsReview[i].classList.add('btn-box__btn--active');
    slideReview(blockReview, i);
  };
}

function slideReview(element, position) {
  for (let i = 0; i < btnsReview.length; i++) {
    if (element.classList.contains(`review__inner-box--left-${i}x`) && i != position) {
      element.classList.remove(`review__inner-box--left-${i}x`);
    }
  }
  element.classList.add(`review__inner-box--left-${position}x`);
}

btnMarkRight.onclick = function () {
  for (let i = 0; i < reviewsItem.length - 1; i++) {
    if (blockReview.classList.contains(`review__inner-box--left-${i}x`)) {
      blockReview.classList.add(`review__inner-box--left-${++i}x`);
      blockReview.classList.remove(`review__inner-box--left-${--i}x`);
      btnsReview[++i].classList.add('btn-box__btn--active');
      cleanElemClass(i, btnsReview, 'btn-box__btn--active');
      break;
    }
  }
};

btnMarkLeft.onclick = function () {
  for (let i = reviewsItem.length - 1; i > 0; i--) {
    if (blockReview.classList.contains(`review__inner-box--left-${i}x`)) {
      blockReview.classList.add(`review__inner-box--left-${--i}x`);
      blockReview.classList.remove(`review__inner-box--left-${++i}x`);
      btnsReview[--i].classList.add('btn-box__btn--active');
      cleanElemClass(i, btnsReview, 'btn-box__btn--active');
      break;
    }
  }
};

const tableShell = document.querySelector('.main__table-shell');
const tablePrice = tableShell.querySelector('.table-price');
const btnsTablePrice = tableShell.querySelectorAll('.btn-box__btn');

for (let i = 0; i < btnsTablePrice.length; i++) {
  btnsTablePrice[i].onclick = function () {
    cleanElemClass(i, btnsTablePrice, 'btn-box__btn--active');
    btnsTablePrice[i].classList.add('btn-box__btn--active');
    slideTable(tablePrice, i);
  };
}

function slideTable(element, position) {
  for (let i = 0; i < btnsTablePrice.length; i++) {
    if (element.classList.contains(`main__table-price--left-${i}x`) && i !== position) {
      element.classList.remove(`main__table-price--left-${i}x`);
    }
  }
  element.classList.add(`main__table-price--left-${position}x`);
}

const pictureListImg = document.querySelectorAll('.pictures-list__img');
const pictureListImgFilter = document.querySelectorAll('.pictures-list__img-filter');

window.onscroll = function () {
  if (window.pageYOffset > 600) {
    pictureListAnimAdd(
      pictureListImg, 'pictures-list__img--active',
      pictureListImgFilter, 'pictures-list__img-filter--active',
    );
  } else {
    pictureListAnimDel(
      pictureListImg, 'pictures-list__img--active',
      pictureListImgFilter, 'pictures-list__img-filter--active',
    );
  }
};

function pictureListAnimAdd(elementsA, classNameA, elementsB, classNameB) {
  for (const element of elementsA) {
    element.classList.add(classNameA);
  }
  for (const element of elementsB) {
    element.classList.add(classNameB);
  }
}

function pictureListAnimDel(elementsA, classNameA, elementsB, classNameB) {
  for (const element of elementsA) {
    element.classList.remove(classNameA);
  }
  for (const element of elementsB) {
    element.classList.remove(classNameB);
  }
}
