import { IOracle } from './_IOracle';

export class DateOracle implements IOracle<{ date: string; time: string }> {
    public name = 'DATE';
    public title = 'Current';
    public ttl = 1;

    public dataTitles = { date: 'date', time: 'time' };

    public getData() {
        const date = new Date(/* TODO: Taking user date can be dangerous, use some remote time. */);
        return {
            date: `${date.getUTCFullYear()}-${('0' + date.getUTCMonth()).slice(
                -2,
            )}-${('0' + date.getUTCDate()).slice(-2)}`,
            time: `${('0' + date.getUTCHours()).slice(-2)}:${(
                '0' + date.getUTCMinutes()
            ).slice(-2)}:${('0' + date.getUTCSeconds()).slice(-2)}`,
        };
    }
}
