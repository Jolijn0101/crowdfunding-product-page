// page wrapper function
function pageWrapperFunction() {
    document.querySelector('.page-wrapper').classList.toggle('page-wrapper--no-scroll');
}

// mobile menu function
const menuIcon = document.querySelector('.menu-icon');
const mobileMenu = document.querySelector('.mobile-menu');
const menuCard = document.querySelector('.mobile-menu__card');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('openmenu');
    mobileMenu.classList.toggle('mobile-menu--open');
    menuCard.classList.toggle('mobile-menu__card--open');
};

// Bookmark function
const bookmarkIcon = document.querySelector('.btn-bookmark');
bookmarkIcon.onclick = () => {
    bookmarkIcon.classList.toggle('btn-bookmark--checked');
    document.querySelector('.btn-bookmark__svg').classList.toggle('btn-bookmark__svg--checked');

    const bookmarkLabel = document.querySelector('.btn-bookmark__label');
    if (bookmarkIcon.classList.contains('btn-bookmark--checked')) {
        bookmarkLabel.style.color = 'var(--Dark-cyan)';
        bookmarkLabel.innerHTML = 'Bookmarked';
    } else {
        bookmarkLabel.style.color = 'var(--Dark-gray)';
        bookmarkLabel.innerHTML = 'Bookmark';
    }
};

// open Back this project
const OpenBackProjectBtn = document.querySelector('.BackProjectBtn');
OpenBackProjectBtn.onclick = () => {
    document.querySelector('.back-project').style.display = 'block';
    // add no scroll too homepage
    pageWrapperFunction();
};

// close Back this project
const CloseBackProjectBtn = document.querySelector('.back-project__close-icon');
CloseBackProjectBtn.onclick = () => {
    // remove all selected classes from pledge cards
    pledgeCard.forEach((card) => {
        card.classList.remove('pledge-card--selected');
        card.style.borderColor = '#d8d8d8';
        document.querySelector('#pledge-card__radio-btn' + card.id.slice(-1)).classList.remove('pledge-card__radio-btn--selected');
        document.querySelector('#confirm' + card.id.slice(-1)).style.maxHeight = '0px';
    });
    // remove no scroll from homepage
    pageWrapperFunction();

    document.querySelector('.back-project').style.display = 'none';
};

// pledge-card function
const pledgeCard = document.querySelectorAll('.pledge-card');

pledgeCard.forEach(addPledge);

function addPledge(card) {
    card.onclick = function (e) {
        const idNum = card.id.slice(-1);
        // if the product is out of stock exit function
        if (card.classList.contains('pledge-card--sold-out')) {
            return;
        }

        // if the continue btn was clicked, exit function
        if (e.target.classList.contains('confirm__continue-btn')) {
            return;
        }

        // if the input for the pledge amount was clicked, exit function
        if (e.target.classList.contains('confirm__input-num') || e.target.classList.contains('confirm__input-num-container')) {
            return;
        }

        // if card was already selected, remove selected class and exit function
        if (card.classList.contains('pledge-card--selected')) {
            card.classList.remove('pledge-card--selected');
            card.style.borderColor = '#d8d8d8';
            document.querySelector('#pledge-card__radio-btn' + idNum).classList.remove('pledge-card__radio-btn--selected');
            document.querySelector('.confirm').style.transition = 'transition: max-height 0.2s ease-in;';
            document.querySelector('#confirm' + idNum).style.maxHeight = '0px';
            return;
        }

        //check if there is already a pledge-card selected, remove selected class
        pledgeCard.forEach((x) => {
            const xidNum = x.id.slice(-1);
            if (x.classList.contains('pledge-card--selected')) {
                x.classList.remove('pledge-card--selected');
                x.style.borderColor = '#d8d8d8';
                document.querySelector('#pledge-card__radio-btn' + xidNum).classList.remove('pledge-card__radio-btn--selected');
                document.querySelector('.confirm').style.transition = 'transition: max-height 0.2s ease-in;';
                document.querySelector('#confirm' + xidNum).style.maxHeight = '0px';
            }
        });

        // give the card a selected class
        card.classList.add('pledge-card--selected');
        card.style.borderColor = 'hsl(176, 50%, 47%)';
        document.querySelector('#pledge-card__radio-btn' + idNum).classList.add('pledge-card__radio-btn--selected');
        document.querySelector('#confirm' + idNum).style.maxHeight = '500px';
    };
}

// select reward function
const selectButtons = document.querySelectorAll('.select-reward-btn');
selectButtons.forEach((selectBtn) => {
    selectBtn.onclick = () => {
        const card = document.getElementById(selectBtn.id.slice(5));
        // if offer isn't available break out of function
        if (selectBtn.innerHTML === 'Out of Stock') {
            return;
        }
        // open menu
        document.querySelector('.back-project').style.display = 'block';
        // give the right selector class to the offer
        card.classList.add('pledge-card--selected');
        card.style.borderColor = 'hsl(176, 50%, 47%)';
        document.querySelector('#pledge-card__radio-btn' + card.id.slice(-1)).classList.add('pledge-card__radio-btn--selected');
        document.querySelector('#confirm' + card.id.slice(-1)).style.maxHeight = '500px';

        // add no scroll too homepage
        pageWrapperFunction();
    };
});
