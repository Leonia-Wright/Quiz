function validateForm() {
    let errors = [];
    
    let resp1 = document.forms['quiz_form']['resp1'].value,
        resp2 = document.forms['quiz_form']['resp2'].value,
        resp3 = document.forms['quiz_form']['resp3'].value,
        resp4 = document.forms['quiz_form']['resp4'].value,
        resp5 = document.forms['quiz_form']['resp5'].value,
        resp6 = document.forms['quiz_form']['resp6'].value,
        resp7 = document.querySelectorAll('input[name="resp7"]:checked'),
        resp8 = document.forms['quiz_form']['resp8'].value;
    
    if ( resp1 === '' ) {
        errors.push( 'Enter a choice for question 1.' );
    }
    
    if ( resp2 === '' ) {
        errors.push( 'Enter a choice for question 2.' );
    }
    
    if ( resp3 === '' ) {
        errors.push( 'Enter a choice for question 3.' );
    }
    
    if ( resp4 === '' ) {
        errors.push( 'Enter a choice for question 4.' );
    }
    
    if ( resp5 === '' ) {
        errors.push( 'Enter a choice for question 5.' );
    }
    
    if ( resp6 === '' ) {
        errors.push( 'Enter a choice for question 6.' );
    }
    
    if ( resp7.length === 0 ) {
        errors.push( 'Pick at least 1 item for question 7.' );
    }
    
    if ( resp8 === '' ) {
        //errors.push( 'resp8' );
    }
    
    if( errors.length !== 0 ) {
        let err_msg = errors.toString().replace(/,/g,"\n");
        alert( err_msg );
        return false;
    } else {
        document.querySelector('form').submit();
        alert('Thank you for your feedback!');
    }
}

function saveDynamicDataToFile() {
    let form = document.querySelector( 'form' ),
        data = serializeFormData( form );
    let blob = new Blob( [data],
        { type: "text/plain;charset=utf-8" } );
    saveAs( blob, "quizResponse.txt" );
}

function serializeFormData( form ) {
    let field, s = [];
    if ( typeof form == 'object' && form.nodeName == "FORM" ) {
        let len = form.elements.length;
        for ( i = 0; i < len; i++ ) {
            field = form.elements[i];
            if ( field.name && !field.disabled && field.type != 'file' && field.type != 'reset' && field.type != 'submit' && field.type != 'button' ) {
                if ( field.type == 'select-multiple' ) {
                    for ( j = form.elements[i].options.length - 1; j >= 0; j-- ) {
                        if ( field.options[j].selected )
                            s[s.length] = encodeURIComponent( field.name ) + "=" + encodeURIComponent( field.options[j].value );
                    }
                } else if ( (field.type != 'checkbox' && field.type != 'radio') || field.checked ) {
                    s[s.length] = encodeURIComponent( field.name ) + "=" + encodeURIComponent( field.value );
                }
            }
        }
    }
    return s.join( '&' ).replace( /%20/g, ' ' ).replace( /&/g, "\n" ).replace( /%26/g, '&' );
}