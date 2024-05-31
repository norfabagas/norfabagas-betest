import BaseError from "./BaseError";

export default class UnauthorizedException extends BaseError {
    constructor(message?: string | undefined, trace?: any) {
        super(message || 'Unauthorized', 401, trace);
    }
}
