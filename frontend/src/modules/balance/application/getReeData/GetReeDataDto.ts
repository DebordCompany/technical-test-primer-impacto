export class GetReeDataDto {
    private constructor(
        private readonly primitives: {
            startDate: string | null,
            endDate: string | null
        }
    ) { }

    public static fromPrimitives(primitives: { startDate: string | null, endDate: string | null }) {
        return new GetReeDataDto(primitives);
    }

    public getStartDate() {
        return this.primitives.startDate;
    }

    public getEndDate() {
        return this.primitives.endDate;
    }
}