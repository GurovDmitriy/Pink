let form = document.querySelector('.form');
let input = form.querySelectorAll('.input-text__input, .input-email__input, .input-tel__input');
let error = form.querySelectorAll('.form__error');
let modalError = document.querySelector('.main-form__modal');
let modalErrorBtn = modalError.querySelector('.modal__btn');
let modalCoplete = document.querySelector('.main-form__modal-complete');
let modalCompleteBtn = modalCoplete.querySelector('.modal__btn');

modalErrorBtn.onclick = function() {
  modalError.classList.remove('main-form__modal--open');
}

modalCompleteBtn.onclick = function() {
  modalCoplete.classList.remove('main-form__modal-complete--open');
}

for (let i = 0; i < input.length; i++) {
  input[i].addEventListener('input', function() {
    checkValid(input[i], error[i]);
  });
}

form.addEventListener('submit', function(evt) {
  for (let i = 0; i < input.length; i++) {
    if (input[i].validity.patternMismatch || input[i].validity.valueMissing) {
      error[i].className = 'form__error form__error--active';
      evt.preventDefault();
      modalError.classList.add('main-form__modal--open');
    } else {
      false;
    }
  }
  if (!modalError.classList.contains('main-form__modal--open')) {
    modalCoplete.classList.add('main-form__modal-complete--open');
  }
});

function checkValid(inputCheck, errorCheck) {
  if (!inputCheck.validity.patternMismatch) {
    errorCheck.className = 'form__error';
  } else {
    errorCheck.className = 'form__error form__error--active';
  }
}

let textAreaBox = document.querySelector('.form__fieldset-comment-inner');
let textArea = textAreaBox.querySelector('.comment');
let maxLeng = 1000;

let message = document.createElement('span');
message.textContent = `Максимум 1000 символов, осталось - ${maxLeng}`;
message.style.display ='block';
message.style.padding ='10px';
textAreaBox.appendChild(message);

textArea.addEventListener('input', function() {
  checkTextArea(textArea.value.length);
});

function checkTextArea(len) {
  message.textContent = `Максимум 1000 символов, осталось - ${maxLeng - len}`;
  if (maxLeng - len < 300) {
    message.style.backgroundColor ='#d22856';
    message.style.color ='#ffffff';
  } else {
    message.style.backgroundColor ='transparent';
    message.style.color ='#283645';
  }
}
