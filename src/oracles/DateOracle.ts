import { IOracle } from './_IOracle';

export class DateOracle implements IOracle {
    public name = 'DATE';
    public title = 'Current';
    public ttl = 1;

    public getData() {
        const date =
            new Date(/* TODO: @hejny Taking user date can be dangerous, use some remote time. */);

        return [
            {
                title: 'Date',
                format: 'YYYY-MM-DD',
                value: `${date.getUTCFullYear()}-${(
                    '0' + date.getUTCMonth()
                ).slice(-2)}-${('0' + date.getUTCDate()).slice(-2)}`,
            },
            {
                title: 'Time',
                format: 'HH:MM',
                value: `${('0' + date.getUTCHours()).slice(-2)}:${(
                    '0' + date.getUTCMinutes()
                ).slice(-2)}:${('0' + date.getUTCSeconds()).slice(-2)}`,
            },
        ];
    }
}
