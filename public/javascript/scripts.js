$(function(){ // on document ready
    var urlArr = window.location.href.split('/'); // Split current page URL up into an array, e.g. ['http:', '', 'www.getintou.ch', 'contact', 'noch3no83hni8onc8']

    $('#c-contact-cards-container').on('click', '.show-hide-details', showOrHideDetails); // Toggles contact card details

    if('contact' === urlArr[3]){ // If user is on contact/[contact_id] page, or contact/[contact_id]/edit page
        if('edit' === urlArr[5]) toggleEditAndDetailViews(); // If on edit page, reveal edit view
        $('#js-contact-edit-button').on('click',editContactDetails);
        $('#js-contact-update-button').on('click',saveContactDetails);
        $('#js-contact-update-cancel-button').on('click',cancelEditContactDetails);
    }
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
    event.preventDefault(); // TODO: Get rid of these once I move buttons out of form, right?
    toggleEditAndDetailViews();
    toggleEditUrl();
}

// Cancel editing contact details
function cancelEditContactDetails(event){
    event.preventDefault();
    toggleEditAndDetailViews();
    toggleEditUrl();
}

// Save details from contact form
function saveContactDetails(event){
    event.preventDefault();
    toggleEditAndDetailViews();
    toggleEditUrl();
}

// Toggle visibility of edit and view details
function toggleEditAndDetailViews(){
    $('.js-details-view, .js-edit-view').toggleClass('hidden');
}

// Toggle '/edit' in current url, without reloading the page
function toggleEditUrl(){
    var urlArr = window.location.href.split('/'); // Split current page URL up into an array, e.g. ['http:', '', 'www.getintou.ch', 'contact', 'noch3no83hni8onc8']
    if('edit' === urlArr[urlArr.length-1]){ // If user is on the 'edit' version of a page
        urlArr.length--; // Delete the 'edit' from the urlArr
        history.pushState(null, $('#js-nameFull').text(), urlArr.join('/')); // TODO: Can I do a relative link that just goes up a directory, like '/..'?
    }else{
        urlArr[urlArr.length] = 'edit'; // Add 'edit' to the urlArr
        history.pushState(null, $('#js-nameFull').text() + ' - Edit', urlArr.join('/')); // TODO: Can I do a relative link that just goes up a directory, like '/..'?
    }
}