import React from "react";

// Utility function to render a component conditionally (mostly used for fallbacks here).
export function renderOptionalComponent<T extends object>(
    Component: React.ComponentType<T> | undefined,
    Fallback: React.ComponentType<T>,
    props: T,
) {
    const FinalComponent = Component ?? Fallback;
    return <FinalComponent {...props} />;
}
