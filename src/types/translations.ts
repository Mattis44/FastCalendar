export interface Translations {
    header: {
        month: string;
        today: string;
        addEvent: string;
    };
    addEvent: {
        title: string;
        icon: string;
        color: string;
        description: string;
        startDate: string;
        endDate: string;
        cancel: string;
        add: string;
    };
}

type Join<K, P> = K extends string | number
    ? P extends string | number
        ? `${K}.${P}`
        : never
    : never;

type Leaves<T> = T extends object
    ? {
          [K in keyof T]-?: T[K] extends object ? Join<K, Leaves<T[K]>> : K;
      }[keyof T]
    : never;

export type keyofDeep<T> = Leaves<T>;
