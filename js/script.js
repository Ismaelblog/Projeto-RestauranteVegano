
//Carroséis de Imagens.
const carouselSlide = document.querySelector('.carousel-slide');
const carouselImages = document.querySelectorAll('.carousel-slide img');

const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let counter = 1;
const size = carouselImages[0].clientWidth;

carouselSlide.style.transform = `translateX(${-size * counter}px)`;

nextBtn.addEventListener('click', () => {
  if (counter >= carouselImages.length - 1) return;
  carouselSlide.style.transition = "transform 0.4s ease-in-out";
  counter++;
  carouselSlide.style.transform = `translateX(${-size * counter}px)`;
});

prevBtn.addEventListener('click', () => {
  if (counter <= 0) return;
  carouselSlide.style.transition = "transform 0.4s ease-in-out";
  counter--;
  carouselSlide.style.transform = `translateX(${-size * counter}px)`;
});

carouselSlide.addEventListener('transitionend', () => {
  if (carouselImages[counter].id === 'lastClone') {
    carouselSlide.style.transition = "none";
    counter = carouselImages.length - 2;
    carouselSlide.style.transform = `translateX(${-size * counter}px)`;
  }
  if (carouselImages[counter].id === 'firstClone') {
    carouselSlide.style.transition = "none";
    counter = carouselImages.length - counter;
    carouselSlide.style.transform = `translateX(${-size * counter}px)`;
  }
});


//Botão de Topo.
document.getElementById('back-to-top').addEventListener('click', function(){
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Rola suavemente para o topo.
    });
});


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

