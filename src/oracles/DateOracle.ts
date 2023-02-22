import { IOracle } from './_IOracle';
import { get_time_with_timezone } from "../scripts/timeUtils";

export class DateOracle implements IOracle {
    public name = 'DATE';
    public title = 'Current';
    public ttl = 1;

    public getData() {
        const date =
            new Date(/* TODO: @hejny Taking user date can be dangerous, use some remote time. */);

        return [
            {
                title: "UnixTimestamp",
                format: "Count of elapsed seconds since January 1st, 1970 at UTC",
                value: Math.floor(Date.now() / 1000).toString()
            },
            {
                title: 'Date',
                format: 'YYYY-MM-DD',
                value: `${date.getUTCFullYear()}-${(
                    '0' + date.getUTCMonth()
                ).slice(-2)}-${('0' + date.getUTCDate()).slice(-2)}`,
            },
            {
                title: 'Time',
                // format: 'HH:MM',
                // value: `${('0' + date.getUTCHours()).slice(-2)}:${(
                //     '0' + date.getUTCMinutes()
                // ).slice(-2)}:${('0' + date.getUTCSeconds()).slice(-2)}`,
                format: "24 hours format in user local timezone",
                value: get_time_with_timezone(date)
            },
        ];
    }
}
