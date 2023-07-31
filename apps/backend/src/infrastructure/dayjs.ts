import dayjs, { Dayjs } from 'dayjs';

import isYesterday from 'dayjs/plugin/isYesterday';
import isToday from 'dayjs/plugin/isToday';
import isTomorrow from 'dayjs/plugin/isTomorrow';
import updateLocale from 'dayjs/plugin/updateLocale';
import dayOfYear from 'dayjs/plugin/dayOfYear';

dayjs.extend(isYesterday);
dayjs.extend(isToday);
dayjs.extend(isTomorrow);

dayjs.extend(updateLocale);
dayjs.updateLocale('en', {
	weekStart: 1,
});

dayjs.extend(dayOfYear);

export default dayjs;
export { Dayjs };
