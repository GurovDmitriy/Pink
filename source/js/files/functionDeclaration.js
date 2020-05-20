function cleanElemClass(index, elementCollect, activeClass) {
  for (let i = 0; i < elementCollect.length; i++) {
    if (elementCollect[index] != elementCollect[i] &&
       elementCollect[i].classList.contains(activeClass)) {
      elementCollect[i].classList.remove(activeClass);
    }
  }
}
