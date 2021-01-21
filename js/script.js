// console.log(`I'm connected`);

// Applying per MDN site https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
`use strict`;

// Variable to store form inputs and elements
const form = document.querySelector(`form`);
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

// **********Page defaults**********
// Hides the 'Other job role?' text field by default
otherJobElement.style.display = `none`;
// Sets 'Name' input as focus on page load
nameElement.focus();
// Initialize "Total" to zero for cost and activities
let totalCost = 0;
let totalActivitiesChecked = 0;
// Disable "Color" selector by default
colorElement.disabled = true;
// Hides the PayPal and BitCoin text by default
paypalElement.style.display = `none`;
bitcoinElement.style.display = `none`;
// Sets the deafult selection to Credit Card
paymentElement.value = `credit-card`;

// RegEx assingment for validation
const nameRegEx = new RegExp(/^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/);
const emailRegEx = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, `i`);
const ccNumRegEx = new RegExp(/^\d{13,16}$/);
const zipRegEx = new RegExp(/^\d{5}$/);
const cvvRegEx = new RegExp(/^\d{3}$/);


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

/**
 * This either show/hide color group options
 * based on "Design" type selected
 *
 * @param {object} selectionGroup - The list of objects to traverse
 * @param {text} displayType - display property to enable
 */  
const showColorOptions = (selectionGroup, displayType) => {
    for ( let i = 0; i < selectionGroup.length; i++ ) {
        selectionGroup[i].style.display = displayType;
    }
}

designElement.addEventListener(`change`, e => {
    // Enable "Color" dropdown on any "Design" field selection
    colorElement.disabled = false;
    const designValue = e.target.value;
    // Hides all "Color" dropdown options by default
    showColorOptions(colorElements, `none`);
    if ( designValue === `js puns` ) {
        showColorOptions(jsPunsElements, `block`);
    } else {
        showColorOptions(heartJsElements, `block`);
    }
});

// Listener to calculate total cost and count number of checkbox for validation
activitiesElement.addEventListener('change', e => {
    const activityCheck = e.target;
    const activityValue = parseInt(activityCheck.getAttribute(`data-cost`));
    const activityTime = activityCheck.getAttribute(`data-day-and-time`);
    if ( activityCheck.checked ) {
        totalCost += activityValue;
        totalActivitiesChecked++;
    } else {        
        totalCost -= activityValue;
        totalActivitiesChecked--;
    }
    activitiesCostElement.innerHTML = `Total: $${totalCost}`;
    
    // For loop to determine the checked item and disable the duplicate time event
    for ( let i = 0; i < activitiesElements.length; i++) {
        if ( activitiesElements[i] !== activityCheck && activitiesElements[i].getAttribute(`data-day-and-time`) === activityTime ) {
            if( activityCheck.checked === true ) {
                activitiesElements[i].parentElement.classList.add(`disabled`);
                activitiesElements[i].disabled = true;
            } else {       
                activitiesElements[i].parentElement.classList.remove(`disabled`);
                activitiesElements[i].disabled = false;
            }
        }
    }
});

// Set focus styling on Activities when focused
// Code borrowed from Checkboxes warm ups
activitiesElements.forEach( element => {
    element.addEventListener('focus', e => element.parentElement.classList.add('focus'));
    element.addEventListener('blur', e => {
        const active = document.querySelector('.focus');
        if (active) active.classList.remove('focus');
    })
});


// Displays the corresponding payment message
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


/**
 * Function expression to set passed validation styling
 * for element with valid entry and hide error messaging
 *
 * @param {HTML element} element - Selected element
 */  
const validationPass = element => {
    element.parentElement.classList.add(`valid`);
    element.parentElement.classList.remove(`not-valid`);
    element.parentElement.lastElementChild.style.display = `none`;
}

/**
 * Function expression to set failed validation styling
 * for element with invalid entry and show error messaging
 * Update: Added additional messaging based on blank 
 * field value
 *
 * @param {HTML element} element - Selected element
 */   
const validationFail = element => {
    element.parentElement.classList.add(`not-valid`);
    element.parentElement.classList.remove(`valid`);
    element.parentElement.lastElementChild.style.display = `block`;
    if ( element === emailElement && emailElement.value === `` ) {
        element.nextElementSibling.innerHTML = `Email address cannot be blank`;
    } else if ( element === emailElement && emailElement.value !== `` ) {
        element.nextElementSibling.innerHTML = `Email address must be formatted correctly`;
    } else if ( element === ccNumElement && ccNumElement.value === `` ) {
        element.nextElementSibling.innerHTML = `Credit card number cannot be blank`;
    } else if ( element === ccNumElement && ccNumElement.value !== `` ) {
        element.nextElementSibling.innerHTML = `Credit card number must be between 13 - 16 digits`;
    } else if ( element === zipElement && zipElement.value === `` ) {
        element.nextElementSibling.innerHTML = `Zip Code cannot be blank`;
    } else if ( element === zipElement && zipElement.value !== `` ) {
        element.nextElementSibling.innerHTML = `Zip Code must be 5 digits`;
    } else if ( element === cvvElement && cvvElement.value === `` ) {
        element.nextElementSibling.innerHTML = `CVV cannot be blank`;
    } else if ( element === cvvElement && cvvElement.value !== `` ) {
        element.nextElementSibling.innerHTML = `CVV must be 3 digits`;
    }
}

/**
 * Function expression to set failed validation styling
 * for element with invalid entry
 *
 * @param {HTML element} elementName - Selected element
 * @param {RegEx} regExPattern - RegEx pattern used for test
 */  
const elementValidator = (elementName, regExPattern) => {
    const isValid = regExPattern.test(elementName.value); 
    if ( isValid ) {
      validationPass(elementName);
    } else {
      validationFail(elementName);
    }
    return isValid;
}

/**
 * Function expression to determine at least one 
 * activity has been selected
 *
 */  
const activitiesValidator = () => {
    const totalActivitiesIsValid = totalActivitiesChecked > 0;
    if ( totalActivitiesIsValid ) {
        validationPass(activitiesBoxElement);
    } else {
        validationFail(activitiesBoxElement);
    }
    return totalActivitiesIsValid;
}

form.addEventListener('submit', e => {

    if (!elementValidator(nameElement, nameRegEx)) {
      console.log('Invalid name prevented submission');
      e.preventDefault();
    }
  
    if (!elementValidator(emailElement, emailRegEx)) {
      console.log('Invalid email prevented submission');
      e.preventDefault();
    }
  
    if (!activitiesValidator()) {
      console.log('Invalid number of activities selected prevented submission');
      e.preventDefault();
    }
  
    if (!elementValidator(ccNumElement, ccNumRegEx)) {
      console.log('Invalid credit card number prevented submission');
      e.preventDefault();
    }
  
    if (!elementValidator(zipElement, zipRegEx)) {
      console.log('Invalid zip code prevented submission');
      e.preventDefault();
    }
  
    if (!elementValidator(cvvElement, cvvRegEx)) {
      console.log('Invalid cvv number prevented submission');
      e.preventDefault();
    }

});

// Utilize focusout event listener to find out of focused  
// input field and display appropiate error message
form.addEventListener('focusout', e => {
    // Switch statement to trigger corresponding error message
    switch (e.target) {
        case nameElement:            
            if (!elementValidator(nameElement, nameRegEx)) {
                console.log('Invalid name prevented submission');
                e.preventDefault();
            }
            break;
        
        case emailElement:
            if (!elementValidator(emailElement, emailRegEx)) {
            console.log('Invalid email prevented submission');
            e.preventDefault();
            }
            break;

        case activitiesBoxElement.lastElementChild.firstElementChild:  
            if (!activitiesValidator() && e.target.getAttribute(`name`) === `express` ) {
                console.log('Invalid number of activities selected prevented submission');
                e.preventDefault();
            }
            break;

        case ccNumElement:
            if (!elementValidator(ccNumElement, ccNumRegEx)) {
                console.log('Invalid credit card number prevented submission');
                e.preventDefault();
            }
            break;        
        
        case zipElement:
            if (!elementValidator(zipElement, zipRegEx)) {
            console.log('Invalid zip code prevented submission');
            e.preventDefault();
            }
            break;
        
        case cvvElement:
            if (!elementValidator(cvvElement, cvvRegEx)) {
            console.log('Invalid cvv number prevented submission');
            e.preventDefault();
            }
            break;
    }
});

// Second focusout event listener to find any updates made  
// in the checkbox fields and display appropiate error message
activitiesBoxElement.addEventListener('focusout', e => {
    const checkBoxGroup = e.target.parentElement.parentElement;
    if ( (totalActivitiesChecked < 0 && checkBoxGroup !== activitiesBoxElement) || (totalActivitiesChecked > 0 && checkBoxGroup === activitiesBoxElement) ) {
        if (!activitiesValidator()) {
            console.log('Invalid number of activities selected prevented submission');
            e.preventDefault();
        }
    }    
});