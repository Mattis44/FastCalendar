export interface DataState {
    loading?: boolean;
    error?: Error | null;
}

export interface Components {
    loading?: React.ComponentType;
    error?: React.ComponentType<{ error: Error }>;
}