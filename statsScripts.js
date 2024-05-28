// continue button function
const continueBtns = document.querySelectorAll('.confirm__continue-btn');
continueBtns.forEach((btn) => {
    btn.onclick = () => {
        // close the back-project menu
        document.querySelector('.back-project').style.display = 'none';
        // open thank you message
        document.querySelector('.thank-you-message').style.display = 'block';

        // get idNum from btn
        const idNum = btn.id.slice(-1);
        // get pledge amount from input with the right id
        const amount = Number(document.querySelector('#confirm__input-num' + idNum).value);
        // get the amount that was already backed
        let backedAmount = document.querySelector('#backed-amount').innerHTML;
        // convert string to a number
        backedAmount = backedAmount.substring(1);
        backedAmount = backedAmount.split(',').join('');
        backedAmount = Number(backedAmount);
        backedAmountNew = backedAmount + amount;

        // start animation increase backedAmountString
        let counter = 0;
        let amountIncreaser;

        amountIncreaser = setInterval(() => {
            counter++;
            console.log('hi Jolijn');

            if (counter === 3) {
                clearInterval(amountIncreaser);
            }
        }, 3000);

        // convert backedAmount to a string
        backedAmountString = backedAmountNew.toString();
        //place the ',' back
        backedAmountString = backedAmountString.slice(0, backedAmountString.length - 3) + ',' + backedAmountString.slice(-3);
        //place the $ back
        backedAmountString = '$' + backedAmountString;

        // update the DOM with the new backedAmount
        //document.querySelector('#backed-amount').innerHTML = backedAmountString;
    };
});
