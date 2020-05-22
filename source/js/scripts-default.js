'use strict';

const headerNav = document.querySelector('.header__nav');
const burger = headerNav.querySelector('.burger');
const headerMenuBox = headerNav.querySelector('.header__menu-box');
const headerMenu = headerNav.querySelector('.header__menu');

burger.onclick = function () {
  if (burger.classList.contains('burger--active')) {
    burger.classList.toggle('burger--disactive');
  } else {
    burger.classList.add('burger--active');
  }
  headerMenuBox.classList.toggle('header__menu-box--open');
  headerNav.classList.toggle('header__nav--open');
  headerMenu.classList.toggle('header__menu--open');
};
