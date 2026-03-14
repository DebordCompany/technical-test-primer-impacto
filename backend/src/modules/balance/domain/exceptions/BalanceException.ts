export class BalanceException extends Error {
    private constructor(message: string) {
        super(message);
        this.name = "BalanceException";
    }

    static failedToFetchBalanceData(): BalanceException {
        return new BalanceException(`Failed to fetch balance data from the external API.`);
    }
}