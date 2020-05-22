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
