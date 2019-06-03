const form = document.querySelector('.body');
const email = document.querySelector('input[name=email]');
const name = document.querySelector('.input[name=name]');
const type1 = document.getElementById('type1');
const type2 = document.getElementById('type2');
const basic = document.querySelector('.input[name=basic]');
const other = document.querySelector('input[name=other');
function emailCheck(e) {
  if (email.value === '') {
    document.getElementById('input1').style.background = 'pink';
    document.getElementById('input1').style.borderBottom = '0.1px solid red';
    document.getElementById('necessary1').style.color = 'red';
    document.getElementById('content1').style.background = 'pink';
    e.preventDefault();
    return false;
  } return true;
}
function nameCheck(e) {
  if (name.value === '') {
    document.getElementById('input2').style.background = 'pink';
    document.getElementById('input2').style.borderBottom = '0.1px solid red';
    document.getElementById('necessary2').style.color = 'red';
    document.getElementById('content2').style.background = 'pink';
    e.preventDefault();
    return false;
  } return true;
}
function typeCheck(e) {
  if (!type1.checked && !type2.checked) {
    document.getElementById('necessary3').style.color = 'red';
    document.getElementById('content3').style.background = 'pink';
    e.preventDefault();
    return false;
  } return true;
}
function basicCheck(e) {
  if (basic.value === '') {
    document.getElementById('input4').style.background = 'pink';
    document.getElementById('input4').style.borderBottom = '0.1px solid red';
    document.getElementById('necessary4').style.color = 'red';
    document.getElementById('content4').style.background = 'pink';
    e.preventDefault();
    return false;
  } return true;
}
form.addEventListener('submit', (e) => {
  if (emailCheck(e)) {
    if (nameCheck(e)) {
      if (typeCheck(e)) {
        if (basicCheck(e)) {
          console.log(`email: ${email.value}`);
          console.log(`暱稱: ${name.value}`);
          console.log(`選項一: ${type1.checked}`);
          console.log(`選項二: ${type2.checked}`);
          console.log(`資料: ${basic.value}`);
          console.log(`其他: ${other.value}`);
          alert('submit');
        }
      }
    }
  }
});
