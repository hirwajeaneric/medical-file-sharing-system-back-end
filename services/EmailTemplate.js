class EmailTemplate {
    constructor (email, subject, text){
        this._email = email;
        this._subject = subject;
        this._text = text;
    }

    get email() {
        return this._email;
    }

    get subject() {
        return this._subject;
    }

    get text() {
        return this._text;
    }

    set email(newEmail){
        this._email = newEmail; 
    }

    set subject(newSubject){
        this._email = newSubject; 
    }

    set text(newText){
        this._text = newText; 
    }
}

module.exports = EmailTemplate;