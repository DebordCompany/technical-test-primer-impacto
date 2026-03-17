export class BalanceException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "BalanceException";
    }

    public static genericError() {
        return new BalanceException("An error occurred while fetching balance data.");
    }
}