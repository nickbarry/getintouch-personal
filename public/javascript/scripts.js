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

// GENERAL-PURPOSE FUNCTIONS
// I'll move functions below up into this section as I start using them on other pages

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
function editContactDetails(){
    toggleEditAndDetailViews();
    toggleEditUrl();
    var formData = getDataFrom('detail');
    console.log(formData);
}

// Cancel editing contact details
function cancelEditContactDetails(){
    toggleEditAndDetailViews();
    toggleEditUrl();
}

// Save details from contact form
function saveContactDetails(){
    toggleEditAndDetailViews();
    toggleEditUrl();
    var formData = getDataFrom('form');
    console.log(formData);
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

// Returns an object with data from the form on the page, or from the corresponding details view of the page
function getDataFrom(source /* default: 'form' */){
    var collection;
    if('details' === source){
        collection = $('form .js-details-view');
    }else{ // source === 'form', or left blank
        collection = $('form .js-edit-view');
    }
    return toArray(collection).reduce(getElNameAndValue, {});
}

// Returns a key/value pair from an element, in format [element name]: [element value or text]
function getElNameAndValue(accumulator, el){
    var $el = $(el);
    accumulator[$el.attr('id')] =
        true === $el.is('input, textarea, select') // If el is an input element...
        ? $el.val()                              // ...get its val()...
        : $el.text();                            // ...or get its text(). Assign to the appropriate accumulator property
    return accumulator;
}

// Convert array-like object to array
function toArray(arrayLikeObj){
    return [].slice.call(arrayLikeObj);
}