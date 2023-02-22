export function get_time_with_timezone(date_arg: Date): string {
    const userTime = date_arg.toLocaleTimeString('en-US', { timeZoneName: 'short', hour12: false });
    const timeZoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const timeZoneOffset = new Date().getTimezoneOffset();
    const timeZoneAbbr = timeZoneOffset < 0 ? '+' : '-';
    const timeZoneFormattedOffset = `${timeZoneAbbr}${Math.abs(Math.floor(timeZoneOffset / 60)).toString().padStart(2, '0')}:${Math.abs(timeZoneOffset % 60).toString().padStart(2, '0')}`;
    return `${userTime} (UTC${timeZoneFormattedOffset} ${timeZoneName})`;
}
