export const generateYears = (
    start: number = 1900,
    end: number = new Date().getFullYear() + 50
): number[] => {
    const years: number[] = [];
    for (let year = start; year <= end; year++) {
        years.push(year);
    }
    return years;
};

export type CalendarCell = {
  date: Date | null;
  day?: number;
  isCurrentMonth: boolean;
};

export const getCalendarGrid = (year: number, month: number): CalendarCell[] => {
  const result: CalendarCell[] = [];

  const firstDayOfMonth = new Date(year, month, 1);
  const weekdayOfFirst = firstDayOfMonth.getDay();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < weekdayOfFirst; i++) {
    result.push({ date: null, isCurrentMonth: false });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    result.push({ date, day, isCurrentMonth: true });
  }

  while (result.length < 42) {
    result.push({ date: null, isCurrentMonth: false });
  }

  return result;
};
