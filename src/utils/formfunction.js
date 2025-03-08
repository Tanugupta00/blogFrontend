


export function validateEmail(email){
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;

    if (email.match(validRegex)) {
        return true;
    } else {
        return false;
    }
}


export function validatePassword(password){
    const validRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (password?.length < 8) {
        return false;
    } else if (password.match(validRegex)){
        return true;
    }else{
        return false;
    }
}

