import BaseError from "./BaseError";

export default class BadRequestException extends BaseError {
    constructor(message?: string | undefined, trace?: any) {
        super(message || 'Bad Request', 400, trace);
    }
}
