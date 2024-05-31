export default class BaseError extends Error {
    public readonly name: string;
    public readonly message: string;
    public readonly status: number;
    public readonly trace: any;

    constructor(message: string, status: number, trace?: any) {
        super(message);

        Object.setPrototypeOf(this, new.target.prototype);
        
        this.name = this.constructor.name;
        this.message = message;
        this.status = status;
        this.trace = trace || {};
    }
}
