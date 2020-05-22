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
