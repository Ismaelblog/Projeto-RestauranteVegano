
//Menu
const menuButton = document.querySelector('.menu-button');
const menuDropdown = document.querySelector('.menu-dropdown');

menuButton.addEventListener('click', () => {
  if (menuDropdown.classList.contains('show')) {
    // Se o menu estiver visível, aciona o efeito de saída
    menuDropdown.style.opacity = '0';
    setTimeout(() => {
      menuDropdown.classList.remove('show');
      menuDropdown.style.opacity = '';
    }, 300);
  } else {
    // Se o menu estiver escondido, mostra o menu
    menuDropdown.classList.add('show');
  }
});

window.addEventListener('click', (event) => {
  if (!event.target.matches('.menu-button')) {
    if (menuDropdown.classList.contains('show')) {
      menuDropdown.style.opacity = '0';
      setTimeout(() => {
        menuDropdown.classList.remove('show');
        menuDropdown.style.opacity = '';
      }, 300);
    }
  }
});


//Botão de Topo.
document.getElementById('back-to-top').addEventListener('click', function(){
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Rola suavemente para o topo.
    });
});