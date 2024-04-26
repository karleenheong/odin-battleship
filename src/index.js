import './style.css';

function component() {
  const element = document.createElement('div');

  element.textContent = 'HELLO BITCH';
  element.classList.add('hello');

  return element;
}

document.body.appendChild(component());
