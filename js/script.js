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
console.log(heartJsElements);

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
designElement.addEventListener(`change`, e => {
    // Enable "Color" selector on "Design" selection
    colorElement.disabled = false;
    const designValue = e.target.value;
    for ( let i = 0; i < colorElements.length; i++ ) {
        colorElements[i].style.display = `none`;
    }
    if ( designValue === `js puns` ) {
        for ( let i = 0; i < jsPunsElements.length; i++ ) {
            jsPunsElements[i].style.display = `block`;
        }
    } else {
        for ( let i = 0; i < heartJsElements.length; i++ ) {
            heartJsElements[i].style.display = `block`;
        }
    }
});