import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import IDateProvider from './interfaces/IDateProvider';

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
  public compareInHours(startDate: Date, endDate: Date) {
    const endDateUtc = this.convertToUTC(endDate);
    const startDateUtc = this.convertToUTC(startDate);

    return dayjs(endDateUtc).diff(startDateUtc, 'hours');
  }

  public convertToUTC(date: Date) {
    return dayjs(date).utc().local().format();
  }

  public dateNow() {
    return dayjs().toDate();
  }

  public compareInDays(startDate: Date, endDate: Date) {
    const endDateUtc = this.convertToUTC(endDate);
    const startDateUtc = this.convertToUTC(startDate);

    return dayjs(endDateUtc).diff(startDateUtc, 'days');
  }

  public addDays(days: number) {
    return dayjs().add(days, 'days').toDate();
  }

  public addHours(hours: number) {
    return dayjs().add(hours, 'days').toDate();
  }

  public compareIfBefore(startDate: Date, endDate: Date) {
    return dayjs(startDate).isBefore(endDate);
  }
}

export default DayjsDateProvider;
