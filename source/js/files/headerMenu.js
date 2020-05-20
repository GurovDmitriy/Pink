let headerNav = document.querySelector('.header__nav');
let burger = headerNav.querySelector('.burger');
let headerMenu = headerNav.querySelector('.header__menu');

burger.onclick = function() {
  burger.classList.toggle('burger--active');
  headerMenu.classList.toggle('header__menu--open');
  headerNav.classList.toggle('header__nav--open');
}
