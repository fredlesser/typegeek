( function( $, History, undefined ) {

	if ( !History.enabled ) {
		return false;
	}

	var $wrap = $( "#wrap" );

	$('nav').on( "click", ".menu__item", function( event ) {

		event.preventDefault();
    $("#toggle").attr('checked', false);
    $('.curtain').addClass('in');
    $('.post').removeClass('in');
		$('#wrap').removeClass('slide');
    setTimeout(function(){
      $('.curtain').removeClass('in');
      $('.post').addClass('in');
    }, 2000);

		if ( window.location === this.href ) {
			return;
		}

		var pageTitle = ( this.title ) ? this.title : this.textContent;
			pageTitle = ( this.getAttribute( "rel" ) === "home" ) ? pageTitle : pageTitle + " — Acme";

		History.pushState( null, pageTitle, this.href );

	} );

	History.Adapter.bind( window, "statechange", function() {

		var state = History.getState();

		$.get( state.url, function( res ) {
			$.each( $( res ), function( index, elem ) {
				
				if ( $wrap.selector !== "#" + elem.id ) {
					return;
				}

				$wrap
					.html( $( elem ).html() )
					.promise()
						.done( function( res ) {

							if ( typeof ga === "function" && res.length !== 0 ) { // Make sure the new content is added, and the 'ga()' method is available.
								ga('set', { 
									page: window.location.pathname,
									title: state.title
								});
								ga('send', 'pageview');
							}
							$('#toggle').change(function(){
						    if($(this).is(":checked")) {
						        $('#wrap').addClass("slide");
						    } else {
						        $('#wrap').removeClass("slide");
						    }
							});
						} );
			} );
		} );
	} );
} )( jQuery, window.History );

$(document).ready(function() {
	$('#toggle').change(function(){
		if($(this).is(":checked")) {
				$('#wrap').addClass("slide");
		} else {
				$('#wrap').removeClass("slide");
		}
	});
});