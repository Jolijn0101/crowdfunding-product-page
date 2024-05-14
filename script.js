// mobile menu function

const menuIcon = document.querySelector('.menu-icon');
const mobileMenu = document.querySelector('.mobile-menu');
const menuCard = document.querySelector('.mobile-menu__card');

menuIcon.onclick = function () {
    menuIcon.classList.toggle('openmenu');
    mobileMenu.classList.toggle('mobile-menu--open');
    menuCard.classList.toggle('mobile-menu__card--open');
};
