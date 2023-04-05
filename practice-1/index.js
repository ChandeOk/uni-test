const phoneInputElement = document.querySelector('#input-phone');
const button = document.querySelector('.form-button');
const form = document.querySelector('form');
const cancel = document.querySelector('.form-button-cancel');
const openForm = document.querySelector('.open-form-button');
document.querySelectorAll('input').forEach((el) => (el.value = ''));
const isValid = {
  name: false,
  email: false,
  direction: false,
  phone: false,
  logo: false,
};

// form.addEventListener('submit', (e) => {
//   e.preventDefault();
// });

openForm.addEventListener('click', function (e) {
  e.preventDefault();
  this.classList.toggle('hide');
  document.querySelector('.form-container').classList.toggle('hide');
});

phoneInputElement.addEventListener('input', function (e) {
  let inputValue = e.target.value;
  inputValue = inputValue
    .replace(/\D/g, '')
    .replace(/(\d{1})(\d{3})(\d{3})(\d{4})/, '+$1 ($2) $3-$4');
  e.target.value = inputValue;
  console.log(inputValue);
});

document.querySelectorAll('input').forEach((el) => {
  el.addEventListener('input', function (e) {
    const name = e.target.name;
    const valid = this.checkValidity();
    Object.assign(isValid, { [name]: valid });
    console.log(isValid);
    if (Object.values(isValid).every((el) => el === true))
      button.classList.remove('hide');
    else button.classList.add('hide');
  });
});

cancel.addEventListener('click', function (e) {
  e.preventDefault();
  e.target.offsetParent.classList.toggle('hide');
  openForm.classList.toggle('hide');
});
