export enum HTTPCODES {
    OK = 200,
    CREATED = 201,
    NOT_MODIFIED = 304,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500
}

export enum MESSAGE {
    SOMETHING_WENT_WRONG = "Something went wrong",
    NO_DATA_FOUND = "No data found",
    CREAT_FAILED = "Create failed",
    UPDATE_FAILED = "Update failed",

    USED_MEMBER_NICK = "Already used Phone or Nick",
    USED_MEMBER_PHONE = "This memberPhone is already in use",
    BLOCKED_USER = "You have been blocked, contact restaurant",
    WRONG_PASSWORD = "Wrong password",
    NOT_AUTHENTICARTED = " YOU ARE NOT AUTHENTICATED, PLEASE LOGIN",
    TOKEN_CREATION_FAILED = "Token creation error",
    INVALID_CODE = 'Invalid or expired code please check again!'
     
}

class Errors extends Error {
    public code: HTTPCODES;
    public message: MESSAGE;

    static standart = {
        code: HTTPCODES.INTERNAL_SERVER_ERROR,
        message: MESSAGE.SOMETHING_WENT_WRONG,
    }

    constructor(statusCode: HTTPCODES, statusMessage: MESSAGE) {
        super();
        this.code = statusCode;
        this.message = statusMessage;
        ;
    }

}

export default Errors;