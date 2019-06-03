const cal = document.querySelector('.btn');
const output = document.querySelector('.output');
let save = 0;
let opsave = '';
let opbool = true;
let pointCheck = false;
function ac(e) {
  if (e.target.className === 'ac') {
    output.innerText = '0';
    opsave = '';
    save = 0;
  }
}
function clickBtn(e) {
  if (e.target.className === 'number') {
    if (output.innerText !== '0' && opbool) {
      output.innerText += e.target.innerText;
    } else {
      output.innerText = e.target.innerText;
      opbool = true;
    }
  } else if (e.target.className === 'point') {
    pointCheck = false;
    for (let i = 0; i < output.innerText.length; i += 1) {
      if (output.innerText[i] === '.') {
        pointCheck = true;
      }
    } if (!pointCheck) {
      output.innerText += '.';
    }
  }
}

function op(e) {
  if (e.target.className === 'operator') {
    save = Number(output.innerText);
    opbool = false;
    switch (e.target.id) {
      case 'plus':
        opsave = '+';
        break;
      case 'minus':
        opsave = '-';
        break;
      case 'mult':
        opsave = '×';
        break;
      case 'division':
        opsave = '÷';
        break;
      default:
        break;
    }
  }
}
function equal(e) {
  if (e.target.className === 'equal') {
    switch (opsave) {
      case '+':
        output.innerText = save + Number(output.innerText);
        break;
      case '-':
        output.innerText = save - Number(output.innerText);
        break;
      case '×':
        output.innerText = save * Number(output.innerText);
        break;
      case '÷':
        output.innerText = save / Number(output.innerText);
        break;
      default:
        break;
    }
  }
}
cal.addEventListener('click', (e) => {
  clickBtn(e);
  ac(e);
  equal(e);
  op(e);
});
