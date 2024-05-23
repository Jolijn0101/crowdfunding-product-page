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

        // if card was already selected, remove selected class and exit function
        if (card.classList.contains('pledge-card--selected')) {
            card.classList.remove('pledge-card--selected');
            card.style.borderColor = '#d8d8d8';
            document.querySelector('#pledge-card__radio-btn' + idNum).classList.remove('pledge-card__radio-btn--selected');
            document.querySelector('#confirm' + idNum).style.height = '0px';
            return;
        }

        //check if there is already a pledge-card selected, remove selected class
        pledgeCard.forEach((x) => {
            const xidNum = x.id.slice(-1);
            if (x.classList.contains('pledge-card--selected')) {
                x.classList.remove('pledge-card--selected');
                x.style.borderColor = '#d8d8d8';
                document.querySelector('#pledge-card__radio-btn' + xidNum).classList.remove('pledge-card__radio-btn--selected');
                document.querySelector('#confirm' + xidNum).style.height = '0px';
            }
        });

        // give the card a selected class
        card.classList.add('pledge-card--selected');
        card.style.borderColor = 'hsl(176, 50%, 47%)';
        document.querySelector('#pledge-card__radio-btn' + idNum).classList.add('pledge-card__radio-btn--selected');
        document.querySelector('#confirm' + idNum).style.height = '148px';
    };
}

// open Back this project
const OpenBackProjectBtn = document.querySelector('.BackProjectBtn');
OpenBackProjectBtn.onclick = () => {
    document.querySelector('.back-project').style.display = 'block';
};

// close Back this project
const CloseBackProjectBtn = document.querySelector('.back-project__close-icon');
CloseBackProjectBtn.onclick = () => {
    document.querySelector('.back-project').style.display = 'none';
    // remove all selected classes from pledge cards
    pledgeCard.forEach((card) => {
        card.classList.remove('pledge-card--selected');
        card.style.borderColor = '#d8d8d8';
        document.querySelector('#pledge-card__radio-btn' + card.id.slice(-1)).classList.remove('pledge-card__radio-btn--selected');
        document.querySelector('#confirm' + card.id.slice(-1)).style.height = '0px';
    });
};

// close thank you for your support
const CloseThanksSupport = document.querySelector('.thank-you-message__btn');
CloseThanksSupport.onclick = () => {
    document.querySelector('.thank-you-message').style.display = 'none';
};

// select reward function
const selectButtons = document.querySelectorAll('.select-reward-btn');
selectButtons.forEach((selectBtn) => {
    selectBtn.onclick = () => {
        const card = document.getElementById(selectBtn.id.slice(5));
        // if offer isn't available break out of function
        if (card.classList.contains('pledge-card--sold-out')) {
            return;
        }
        // open menu
        document.querySelector('.back-project').style.display = 'block';
        // give the right selector class to the offer
        card.classList.add('pledge-card--selected');
        card.style.borderColor = 'hsl(176, 50%, 47%)';
        document.querySelector('#pledge-card__radio-btn' + card.id.slice(-1)).classList.add('pledge-card__radio-btn--selected');
        document.querySelector('#confirm' + card.id.slice(-1)).style.height = '148px';
    };
});

// continue button function
const continueBtns = document.querySelectorAll('.confirm__continue-btn');
continueBtns.forEach((btn) => {
    btn.onclick = () => {
        // close the back-project menu
        document.querySelector('.back-project').style.display = 'none';
        // open thank you message
        document.querySelector('.thank-you-message').style.display = 'block';
    };
});
