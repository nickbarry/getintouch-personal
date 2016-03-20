$(function(){
    $('#contact-cards-container').on('click', '.show-hide-details', showOrHideDetails);
});

function showOrHideDetails(event){
    event.preventDefault();
    var $link = $(event.target); // Get link element that was clicked
    var details = $link.closest('.panel-body').find('.details');
    details.toggleClass('hidden');
    if($link.text() === "Show details"){ // If details were hidden previously
        $link.text('Hide details');
    }else{
        $link.text('Show details');
    }
}