// place pledge from beginning to end function
const continueBtns = document.querySelectorAll('.confirm__continue-btn');
continueBtns.forEach((btn) => {
    btn.onclick = () => {
        // get idNum from btn
        const idNum = btn.id.slice(-1);
        // get pledge amount from input with the right id
        const amount = Number(document.querySelector('#confirm__input-num' + idNum).value);
        // get the minimum value for the pledge
        const minValue = Number(document.querySelector('#confirm__input-num' + idNum).dataset.minValue);
        // get the selected card
        const card = document.querySelector('#pledge-card' + idNum);

        // If the minimum value is smaller then the given pledge amount continue placing the pledge
        if (minValue <= amount) {
            // remove selected class from pledge card
            card.classList.remove('pledge-card--selected');
            card.style.borderColor = '#d8d8d8';
            document.querySelector('#pledge-card__radio-btn' + idNum).classList.remove('pledge-card__radio-btn--selected');
            document.querySelector('#confirm' + idNum).style.maxHeight = '0px';

            // remove any error message in case needed
            document.getElementById('confirm__input-num' + idNum).style.borderColor = 'rgb(172, 172, 172)';
            document.getElementById('error-message' + idNum).style.display = 'none';

            // close the back-project menu
            document.querySelector('.back-project').style.display = 'none';

            // open thank you message
            document.querySelector('.thank-you-message').style.display = 'block';
            let counter = 0;
            let backedAmount = getBackedAmount();

            // check if the got it button was clicked for animation
            document.querySelector('.thank-you-message__btn').onclick = function () {
                // close the thanks support window
                closeThanksSupport();

                // start the animations one after another
                animationBackedAmountString(counter, backedAmount, amount, animationProgressBar);

                // remove one product from the total products left in the advertisements
                const totalProductsElement = document.getElementById('pledge-card__number' + idNum);
                let totalProducts = totalProductsElement ? document.getElementById('pledge-card__number' + idNum).innerHTML : null;

                if (idNum !== '1') {
                    totalProducts = Number(totalProducts) - 1;
                    document.getElementById('pledge-card__number' + idNum).innerHTML = totalProducts;
                    document.getElementById('adds-card__number' + idNum).innerHTML = totalProducts;
                }
                // if there are no products left mark advertisement as sold
                if (totalProducts == 0) {
                    // addscard
                    document.getElementById('adds-card' + idNum).classList.add('adds-card--sold-out');
                    document.getElementById('link-pledge-card' + idNum).classList.add('adds-card-btn--sold-out');
                    document.getElementById('link-pledge-card' + idNum).innerHTML = 'Out of Stock';

                    //pledgecard
                    document.getElementById('pledge-card' + idNum).classList.add('pledge-card--sold-out');
                }

                // check if the thank you screen was clicked by checking the counter after 15 min
                let closeThanksSupportChecker;
                if (counter === 0) {
                    closeThanksSupportChecker = setTimeout(() => {
                        // add amount automatic en close thank you screen
                        closeThanksSupport();
                        backedAmount += amount;
                        updateDOMAmount(backedAmount);
                        updateDOMProgressBar(backedAmount);
                        updateDOMBacker();
                        clearTimeout(closeThanksSupportChecker);
                    }, 300000);
                }
            };
        }

        // If the minimum value is larger then the given pledge amount break out of placing the pledge en give a error
        if (minValue > amount) {
            // show the error message
            document.getElementById('confirm__input-num' + idNum).style.borderColor = 'red';
            document.getElementById('error-message' + idNum).style.display = 'block';
        }
    };
});
function closeThanksSupport() {
    document.querySelector('.thank-you-message').style.display = 'none';
    // remove no scroll from homepage
    document.querySelector('.page-wrapper').classList.toggle('page-wrapper--no-scroll');
}
function getBackedAmount() {
    // get the amount that was already backed
    let backedAmount = document.querySelector('#backed-amount').innerHTML;
    // convert string to a number
    backedAmount = backedAmount.substring(1);
    backedAmount = backedAmount.split(',').join('');
    backedAmount = Number(backedAmount);
    return backedAmount;
}
function animationBackedAmountString(counter, backedAmount, amount, callback) {
    let amountIncreaser;
    amountIncreaser = setInterval(() => {
        counter += 1;
        backedAmount += 1;
        updateDOMAmount(backedAmount);

        if (counter === amount) {
            clearInterval(amountIncreaser);
            callback(counter, backedAmount, amount);
        }
    }, 20);
}
function animationProgressBar(counter, backedAmount, amount) {
    // reset backedAmount to previous amount
    backedAmount - amount;
    counter = 0;
    let progressBarIncreaser;
    // start animation progress bar
    progressBarIncreaser = setInterval(() => {
        counter += 1;
        backedAmount += 1;
        updateDOMProgressBar(backedAmount);

        if (counter === amount) {
            clearInterval(progressBarIncreaser);
            updateDOMBacker();
        }
    }, 20);
}
function updateDOMAmount(backedAmount) {
    // convert backedAmount to a string
    let backedAmountString = backedAmount.toString();
    //place the ',' back
    backedAmountString = backedAmountString.slice(0, backedAmountString.length - 3) + ',' + backedAmountString.slice(-3);
    //place the $ back
    backedAmountString = '$' + backedAmountString;
    // update the DOM with the new backedAmount
    document.querySelector('#backed-amount').innerHTML = backedAmountString;
}
function updateDOMProgressBar(backedAmount) {
    //calculate procentage of backedAmount
    let percentage = (100 / 100000) * backedAmount;
    document.querySelector('.stats-card__progress-bar').style.width = `${percentage}%`;
}
function updateDOMBacker() {
    // get amount of all the backers
    let backersAmount = document.querySelector('#backers-amount').innerHTML;
    // convert string to a number
    backersAmount = backersAmount.split(',').join('');
    backersAmount = Number(backersAmount);
    //  add one backer to the amount
    backersAmount++;
    // convert backersAmount to a string
    let backersAmountString = backersAmount.toString();
    //  place the ',' back
    backersAmountString = backersAmountString.slice(0, backersAmountString.length - 3) + ',' + backersAmountString.slice(-3);
    // update the DOM with the new backersAmount
    document.querySelector('#backers-amount').innerHTML = backersAmountString;
}

// amount of days checker
dayjs.extend(dayjs_plugin_duration);

function activateCountdown(element, dateString) {
    const targetDate = dayjs(dateString);
    const now = dayjs();
    const duration = dayjs.duration(targetDate.diff(now));
    element.innerHTML = Math.floor(duration.asDays());
}

activateCountdown(document.getElementById('countdownNum'), '2024-07-27');
