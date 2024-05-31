import BaseError from "./BaseError";

export default class NotFoundException extends BaseError {
    constructor(message?: string | undefined, trace?: any) {
        super(message || 'Not Found', 404, trace);
    }
}
