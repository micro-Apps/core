export class InitError extends Error {
    // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
    constructor(message: string) {
        super(message);
        this.name = 'initError';
    }
}