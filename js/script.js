// console.log(`I'm connected`);

// Applying per MDN site https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
`use strict`;

// Variable to store form inputs
const form = document.querySelector("form");
const nameElement = document.querySelector(`#name`);
const emailElement = document.querySelector(`#email`);
const titleSelectElement = document.querySelector(`#title`);
const titleOptionElements = document.querySelectorAll(`#title option`);
const otherJobElement = document.querySelector(`#other-job-role`);
const designElement = document.querySelector(`#design`);
const colorElement = document.querySelector(`#color`);
const colorElements = document.querySelector(`#color`).children;
const jsPunsElements = document.querySelectorAll(`[data-theme="js puns"]`);
const heartJsElements = document.querySelectorAll(`[data-theme="heart js"]`);
const activitiesElement = document.querySelector('#activities');
const activitiesElements = document.querySelectorAll('#activities input');
const activitiesBoxElement = document.querySelector('#activities-box');
const activitiesCostElement = document.querySelector('#activities-cost');
const paymentElement = document.querySelector('#payment');
const creditCardElement = document.querySelector('#credit-card');
const ccNumElement = document.querySelector('#cc-num');
const zipElement = document.querySelector('#zip');
const cvvElement = document.querySelector('#cvv');
const paypalElement = document.querySelector('#paypal');
const bitcoinElement = document.querySelector('#bitcoin');
console.log(colorElements);

// Sets 'Name' input as focus on page load
nameElement.focus();

// Initialize "Total" to zero for cost and activities
let totalCost = 0;
let totalActivitiesChecked = 0;

// Hides the 'Other job role?' text field by default
otherJobElement.style.display = `none`;
// Triggers the 'Other job role?' text field when Other Job Role is selected
titleSelectElement.addEventListener(`change`, e => {
    for ( let i = 0; i < titleOptionElements.length; i++ ) {
        const titleValue = e.target.value;

        if ( titleValue === `other` ) {
            otherJobElement.style.display = `block`;
            otherJobElement.focus();
        } else {            
            otherJobElement.style.display = `none`;
        }
    }
});

// Disable "Color" selector by default
colorElement.disabled = true;

/**
 * Small function to remove repetitive code.
 * This either show/hide color options based on
 * "Design" type selected
 *
 * @param {object} selectionGroup - The list of objects to traverse
 * @param {text} displayType - display property to enable
 */  
const showColors = (selectionGroup, displayType) => {
    for ( let i = 0; i < selectionGroup.length; i++ ) {
        selectionGroup[i].style.display = displayType;
    }
}

designElement.addEventListener(`change`, e => {
    // Enable "Color" selector on "Design" selection
    colorElement.disabled = false;
    const designValue = e.target.value;
    // Hides all "Color" options by default
    showColors(colorElements, `none`);

    if ( designValue === `js puns` ) {
        showColors(jsPunsElements, `block`);
    } else {
        showColors(heartJsElements, `block`);
    }
});

activitiesElement.addEventListener('change', e => {
    const activityCheck = e.target;
    const activityValue = parseInt(e.target.getAttribute(`data-cost`));
    if ( activityCheck.checked ) {
        totalCost += activityValue;
        totalActivitiesChecked++;
    } else {        
        totalCost -= activityValue;
        totalActivitiesChecked--;
    }
    activitiesCostElement.innerHTML = `Total: $${totalCost}`;
});

activitiesElements.forEach((element) => {
    element.addEventListener('focus', e => element.parentElement.classList.add('focus'));

    element.addEventListener('blur', e => {
        const active = document.querySelector('.focus');
        if (active) active.classList.remove('focus');
    })
});

// Hides the PayPal and BitCoin text by default
paypalElement.style.display = `none`;
bitcoinElement.style.display = `none`;
// Sets the deafult selection to Credit Card
paymentElement.value = `credit-card`;

paymentElement.addEventListener('change', e => {
    creditCardElement.style.display = `none`;
    const paymentValue = e.target.value;
    if ( paymentValue === `paypal` ) {
        paypalElement.style.display = `block`;
        bitcoinElement.style.display = `none`;
    } else if ( paymentValue === `bitcoin` ) {
        paypalElement.style.display = `none`;
        bitcoinElement.style.display = `block`;
    } else {        
        creditCardElement.style.display = `block`;
        paypalElement.style.display = `none`;
        bitcoinElement.style.display = `none`;
    }
});

// Field validators
const validationPass = (element) => {
    element.parentElement.classList.add(`valid`);
    element.parentElement.classList.remove(`not-valid`);
    element.parentElement.lastElementChild.style.display = `none`;
}

const validationFail = (element) => {
    element.parentElement.classList.add(`not-valid`);
    element.parentElement.classList.remove(`valid`);
    element.parentElement.lastElementChild.style.display = `block`;
}

const nameValidator = () => {
    const nameIsValid = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(nameElement.value);  
    if ( nameIsValid ) {
      validationPass(nameElement);
    } else {
      validationFail(nameElement);
    }    
    return nameIsValid;
}

const emailValidator = () => {
    // Email RegEx borrowed from https://emailregex.com/
    const emailIsValid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(emailElement.value);
    if ( emailIsValid ) {
        validationPass(emailElement);
    } else {
        validationFail(emailElement);
    }    
    return emailIsValid;
}

const activitiesValidator = () => {
    const totalActivitiesIsValid = totalActivitiesChecked > 0;
    if ( totalActivitiesIsValid ) {
        validationPass(activitiesBoxElement);
    } else {
        validationFail(activitiesBoxElement);
    }
    return totalActivitiesIsValid;
}

const ccNumValidator = () => {
    // Email RegEx borrowed from https://emailregex.com/
    const ccNumIsValid = /^\d{13,16}$/i.test(ccNumElement.value);
    if ( ccNumIsValid ) {
        validationPass(ccNumElement);
    } else {
        validationFail(ccNumElement);
    }    
    return ccNumIsValid;
}

const zipValidator = () => {
    // Email RegEx borrowed from https://emailregex.com/
    const zipIsValid = /^\d{5}$/i.test(zipElement.value);
    if ( zipIsValid ) {
        validationPass(zipElement);
    } else {
        validationFail(zipElement);
    }    
    return zipIsValid;
}

const cvvValidator = () => {
    // Email RegEx borrowed from https://emailregex.com/
    const cvvIsValid = /^\d{3}$/i.test(cvvElement.value);
    if ( cvvIsValid ) {
        validationPass(cvvElement);
    } else {
        validationFail(cvvElement);
    }    
    return cvvIsValid;
}

form.addEventListener('submit', e => {

    if (!nameValidator()) {
      console.log('Invalid name prevented submission');
      e.preventDefault();
    }
  
    if (!emailValidator()) {
      console.log('Invalid email prevented submission');
      e.preventDefault();
    }
  
    if (!activitiesValidator()) {
      console.log('Invalid number of activities prevented submission');
      e.preventDefault();
    }
  
    if (!ccNumValidator()) {
      console.log('Invalid credit card number prevented submission');
      e.preventDefault();
    }
  
    if (!zipValidator()) {
      console.log('Invalid credit card number prevented submission');
      e.preventDefault();
    }
  
    if (!cvvValidator()) {
      console.log('Invalid credit card number prevented submission');
      e.preventDefault();
    }

});