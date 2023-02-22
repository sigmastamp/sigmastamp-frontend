export function get_time_with_timezone(date_arg: Date): string {
	const userTime = date_arg.toLocaleTimeString('en-US', { timeZoneName: 'short', hour12: false });
	const timeZoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;
	const timeZoneOffset = new Date().getTimezoneOffset();
	const timeZoneAbbr = timeZoneOffset < 0 ? '+' : '-';
	const timeZoneFormattedOffset = `${timeZoneAbbr}${Math.abs(Math.floor(timeZoneOffset / 60)).toString().padStart(2, '0')}:${Math.abs(timeZoneOffset % 60).toString().padStart(2, '0')}`;
	return `${userTime} (UTC${timeZoneFormattedOffset} ${timeZoneName})`;
}

//unixtimestamp in seconds not in miliseconds as is default timestamp in js
export function get_time_with_timezone_from_timestamp(unixtimestamp: number): string {
	return get_time_with_timezone(new Date(unixtimestamp * 1000));
}

//unixtimestamp in seconds not in miliseconds as is default timestamp in js
export function get_local_date_from_timestamp(unixtimestamp: number): string{
	const date = new Date(unixtimestamp * 1000);
	return `${date.getFullYear()}-${('0' + date.getMonth()).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;
}
