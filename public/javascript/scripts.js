$(function(){ // on document ready
    var baseUrl = 'http://localhost:3000',// TODO: Need to have this automatically based on dev or other environment
        url = window.location.href, // Get current page URL
        urlRemainder = url.replace(baseUrl,'');

    $('#c-contact-cards-container').on('click', '.show-hide-details', showOrHideDetails); // Toggles contact card details

    if(/^\/?contact\//.test(urlRemainder)){ // If user is on contact page, or contact/edit page
        $('#js-contact-edit-button').on('click',editContactDetails);
        $('#js-contact-update-button').on('click',saveContactDetails);
        $('#js-contact-update-cancel-button').on('click',cancelEditContactDetails);
    }

    // if(/^\/?$/.test(urlRemainder)){} // User is on homepage, i.e. urlRemainder is '' or '/'
});

// FUNCTIONS FOR PAGES DISPLAYING CONTACT CARDS ------------------------------------------------------------------------
// Toggle the visibility of the Notes field
function showOrHideDetails(event){
    event.preventDefault();
    var $link = $(event.target); // Get link element that was clicked
    var $details = $link.closest('.panel-body').find('.details');
    $details.toggleClass('hidden');
    if($link.text() === "Show details"){ // If details were hidden previously
        $link.text('Hide details');
    }else{
        $link.text('Show details');
    }
}

// CONTACT DETAILS PAGE FUNCTIONS --------------------------------------------------------------------------------------
// Edit contact details
function editContactDetails(event){
    event.preventDefault();
    toggleEditAndDetailViews();
}

// Cancel editing contact details
function cancelEditContactDetails(event){
    event.preventDefault();
    toggleEditAndDetailViews();
}

// Save details from contact form
function saveContactDetails(event){
    event.preventDefault();
    toggleEditAndDetailViews();
}

// Toggle visibility of edit and view details
function toggleEditAndDetailViews(){
    $('.js-details-view, .js-edit-view').toggleClass('hidden');
}