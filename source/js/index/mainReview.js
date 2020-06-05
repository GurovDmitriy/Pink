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
    if (element.classList.contains(`review__inner-box--left-${i}x`) && i !== position) {
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
