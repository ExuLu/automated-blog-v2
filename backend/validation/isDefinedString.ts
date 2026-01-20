export const isDefinedString = (
  envVariable: string | undefined,
): envVariable is string => {
  return envVariable !== undefined && !!envVariable.trim();
};
