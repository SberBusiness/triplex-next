/**
 * Utility function to ensure CSS variables are loaded
 * This should be called in your application's entry point
 */
export const loadGlobalStyles = (): void => {
    // The CSS variables are imported via the main index.ts file
    // This function can be used to ensure styles are loaded if needed
    console.log("Triplex Next global styles loaded");
};

/**
 * Get CSS variable value
 * @param variableName - The CSS variable name
 * @returns The computed value of the CSS variable
 */
export const getCssVariable = (variableName: string): string => {
    return getComputedStyle(document.documentElement).getPropertyValue(variableName);
};
