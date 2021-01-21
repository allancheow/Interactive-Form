# Interactive Form
 Treehouse Project 03


Form fields validation and conditional error messages:
Utilized addEventListner with "focusout" listener for events.
Source: 
    Element: focusout event
Site: 
    https://developer.mozilla.org/en-US/docs/Web/API/Element/focusout_event

Since focusout bubbles, I'm able to set a listener on the parent div of this checkbox group.
I used e.target to capture the HTML snippet and use each query variable to match the
field. If match, elementValidator will run to confirm validation.

e.target will pass in the input field as the user tabs out.
Switch statement will match this with variables created for use
in code. If match, run the validation function. Print out message 
if error.

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
}, false);



Same concept as above with focusout listener. Within this listener, I've looking for
any changes if the user leaves the set of checkboxes and then returns to update

activitiesBoxElement.addEventListener('focusout', e => {
    const checkBoxGroup = e.target.parentElement.parentElement;
    if ( (totalActivitiesChecked < 0 && checkBoxGroup !== activitiesBoxElement) || (totalActivitiesChecked > 0 && checkBoxGroup === activitiesBoxElement) ) {
        if (!activitiesValidator()) {
            console.log('Invalid number of activities selected prevented submission');
            e.preventDefault();
        }
    }    
});