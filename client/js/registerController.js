/**
 * Created by airlanggaputerapanigoro on 2/23/17.
 */
(function($){
    const registerBtn = $("#registerBtn");
    const registerPage = $("#registerPage");
    const footerArea = $("#footer-area");

    const mobileTextInput = $("#mobile-number");
    const emailTextInput = $("#email-input");

    const mobileNumberPopup = $("#mobile-phone-popup");
    const mobileNumberInput = $("#mobile-number");
 
    const firstNamePopUp = $("#first-name-popup");
    const firstNameInput = $("#first-name");
   
    const lastNamePopUp = $("#last-name-popup");
    const lastNameInput = $("#last-name");
   
    const emailPopUp = $("#email-popup");
    const emailInput = $("#email-input");
    

    registerBtn.click(async () => {
        let res = {error:null, result:null};
 
        res = checkRequiredFields();

        const formattedPhone = formatPhone(mobileTextInput.val());
        const phoneValidation = isPhoneFormatValid(formattedPhone);
        const emailValidation = validateEmail(emailTextInput.val());

        if(phoneValidation.error || emailValidation.error) {
            res.error = true;
        }

        if(res.error === null) {
            registerPage.addClass('disabled');
            res = await checkDataValidity();
        }
        
        if(res.error === null) {
            const birthDate = $("#birthdate-input");
            const gender = $("input[name='gender']:checked").val();
            const postData = {
                api: 'api/register',
                data: {
                    phoneNumber : mobileNumberInput.val(),
                    firstName   : firstNameInput.val(),
                    lastName    : lastNameInput.val(),
                    email       : emailInput.val(),
                    birthDate   : birthDate.val(),
                    gender      : gender
                },
            }
            res = await restAPI(postData.api, postData);
            if(res.error === null) {
                footerArea.removeClass('hidden');
            } else {
                registerPage.removeClass('disabled');
            }
        } else {
            registerPage.removeClass('disabled');
        }
        console.log(res);
    });

    mobileNumberInput.keyup(()=> {
        mobileNumberPopup.addClass('hidden');
    });

    firstNameInput.keyup(() => {
        firstNamePopUp.addClass('hidden');
    });

    lastNameInput.keyup(() => {
        lastNamePopUp.addClass('hidden');
    });

    emailInput.keyup(() => {
        emailPopUp.addClass('hidden');
    });

    var checkMobileNumberValidity = ()=> {
        let res = {error:null, result:true}
        return new Promise(async (resolve)=> {
            const phoneData = {
                api: 'api/validphone',
                data: {
                    phoneNumber : mobileNumberInput.val()
                },
            }
           
            res = await restAPI(phoneData.api, phoneData);
            if(!res.result) {
                res.error = true;
                res.result = 'Mobile number has been registered';
                mobileNumberPopup.html('Mobile number has been registered');
                mobileNumberPopup.removeClass("hidden");
            }
            resolve(res);
        });
    }

    var checkEmailValidity = () => {
        let res = {error:null, result:true}
        return new Promise(async (resolve)=> {
            const emailData = {
                api: 'api/validemail',
                data: {
                    email : emailInput.val()
                },
            }
           
            res = await restAPI(emailData.api, emailData);
            if(!res.result) {
                res.error = true;
                res.result = 'Email has been registered';
                emailPopUp.html('Email has been registered');
                emailPopUp.removeClass("hidden");
            }
            resolve(res);
        });
    }

    var isPhoneFormatValid = (phone) => {
        let format = /^[+][0-9]{9,}/;       
        let result = {error:null,result:null};
        if(!format.test(phone)) {
            mobileNumberPopup.html('Please enter valid Indonesia phone number');
            mobileNumberPopup.removeClass("hidden");
            result.error = true;
            result.result = "phone number is invalid";
        }
        return result;
    }

    var formatPhone = (phone) => {
        let formattedPhone = phone;
        if(formattedPhone.charAt(0) == '0'){
            formattedPhone = '+62'+phone.substring(1);
        }
        return formattedPhone;
    }

    var validateEmail = (email) => {
        let format = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let result = {error:null,result:null};
        if(!format.test(email)) {
            emailPopUp.html('Email format is invalid');
            emailPopUp.removeClass("hidden");
            result.error = true;
            result.result = "email format is invalid";
        }
        return result;
    }

    var checkRequiredFields = () => {
        let res = {error:null, result:null};
        const mobileNumberValue = mobileNumberInput.val();
        if(mobileNumberValue === '' || mobileNumberValue === null) {
            mobileNumberPopup.html('Indonesian mobile number is required');
            mobileNumberPopup.removeClass("hidden");
            res.error = true;
        }
        const firstNameValue = firstNameInput.val();
        if(firstNameValue === '' || firstNameValue === null) {
            firstNamePopUp.html('First Name is required');
            firstNamePopUp.removeClass("hidden");
            res.error = true;
        }
        const lastNameValue = lastNameInput.val();
        if(lastNameValue === '' || lastNameValue === null) {
            lastNamePopUp.html('Last Name is required');
            lastNamePopUp.removeClass("hidden");
            res.error = true;
        }
        const emailValue = emailInput.val();
        if(emailValue === '' || emailValue === null) {
            emailPopUp.html('Email is required');
            emailPopUp.removeClass("hidden");
            res.error = true;
        }
        return res;
    }

    var checkDataValidity = async () => {
        let res = {error:null, result:null};
        const mobileNumberUniqueness = await checkMobileNumberValidity();
        const emailUniqueness = await checkEmailValidity();
        if(mobileNumberUniqueness.error || emailUniqueness.error) {
            res.error = true;
        } 
        return res;
    }

    var restAPI = async (eventName, eventData) => {
        const postData = {
            api: eventName,
            data: eventData,
        }
       return httpRequest('http://localhost:8008/' + eventName, 'POST', 
            JSON.stringify(postData), [["Content-Type", "application/json;charset=UTF-8"]]
        )
        .catch(error => {
            return { error: error }
        });
    }

    
})(jQuery);