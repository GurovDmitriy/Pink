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
