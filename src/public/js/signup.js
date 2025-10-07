$(document).on("focusout", ".form-input", function () {
  $(this).removeClass("active-field");
  if ($(this).val().length > 0) {
    $(this).addClass("active-field");
  }
});

jQuery(".form-input").on("focus", function (e) {
  $(this).addClass("active-field");
});



console.log('signup frontend javascript file');



function validateSignUpForm(){
    const memberNick = $('.member-nick').val();
    const memberPhone = $('.member-phone').val();
    const memberPassword = $('.member-password').val();
    const confirmPassword = $('.confirm-password').val();
    const memberEmail = $('.member-email').val();
    const memberAddress = $('.member-address').val();

    if(memberNick === '' || memberPhone === '' || memberPassword === '' || confirmPassword === '' || memberEmail === '' || memberAddress === '')
    {
        alert('All fields are required');
        return false;
    }

    if(memberPassword !== confirmPassword){
        alert('Passwords do not match, Please check again');
        return false;
    }

    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/

    if(!gmailRegex.test(memberEmail)){
        alert('Please enter a valid Gmail address (must end with @gmail.com)');
        return false;
    }
}