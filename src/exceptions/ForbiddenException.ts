import BaseError from "./BaseError";

export default class ForbiddenException extends BaseError {
    constructor(message?: string | undefined, trace?: any) {
        super(message || 'Forbidden', 403, trace);
    }
}
