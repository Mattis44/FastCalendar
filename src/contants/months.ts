export type MonthIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export type Month = {
    label: string;
    index: MonthIndex;
};

export const MONTHS: Month[] = [
    { label: "January", index: 0 },
    { label: "February", index: 1 },
    { label: "March", index: 2 },
    { label: "April", index: 3 },
    { label: "May", index: 4 },
    { label: "June", index: 5 },
    { label: "July", index: 6 },
    { label: "August", index: 7 },
    { label: "September", index: 8 },
    { label: "October", index: 9 },
    { label: "November", index: 10 },
    { label: "December", index: 11 },
];
