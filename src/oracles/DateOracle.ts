import { IOracle } from './_IOracle';
import { get_time_with_timezone, get_local_date_from_timestamp } from "../scripts/timeUtils";

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
                value: Math.floor(date.getTime() / 1000).toString()
            },
            {
                title: 'Date',
                format: 'YYYY-MM-DD',
                value: get_local_date_from_timestamp(Math.floor(date.getTime() / 1000)),
            },
            {
                title: 'Time',
                format: "24 hours format in user local timezone",
                value: get_time_with_timezone(date)
            },
        ];
    }
}
