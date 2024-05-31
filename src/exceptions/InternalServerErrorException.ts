import BaseError from "./BaseError";

export default class InternalServerErrorException extends BaseError {
    constructor(message?: string | undefined, trace?: any) {
        super(message || 'Internal Server Error', 500, trace);
    }
}
