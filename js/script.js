// console.log(`I'm connected`);

// Element selection
const nameElement = document.querySelector(`#name`);
const titleSelectElement = document.querySelector(`#title`);
const titleOptionElements = document.querySelectorAll(`#title option`);
const otherJobElement = document.querySelector(`#other-job-role`);
const designElement = document.querySelector(`#design`);
const colorElement = document.querySelector(`#color`);
const colorElements = document.querySelector(`#color`).children;
const jsPunsElements = document.querySelectorAll(`[data-theme="js puns"]`);
const heartJsElements = document.querySelectorAll(`[data-theme="heart js"]`);
const activitiesElement = document.querySelector('#activities');
const activitiesCostElement = document.querySelector('#activities-cost');
console.log(activitiesCostElement);

// Sets 'Name' input as focus on page load
nameElement.focus();

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

// Initialize "Total" to zero
let totalCost = 0;

activitiesElement.addEventListener('change', e => {
    const activityCheck = e.target;
    const activityValue = parseInt(e.target.getAttribute(`data-cost`));
    if ( activityCheck.checked ) {
        totalCost += activityValue;
    } else {        
        totalCost -= activityValue;
    }
    activitiesCostElement.innerHTML = `Total: $${totalCost}`;
});