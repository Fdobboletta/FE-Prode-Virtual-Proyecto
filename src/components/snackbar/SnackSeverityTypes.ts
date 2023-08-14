const snackSeverity = {
  info: 'info',
  error: 'error',
  success: 'success',
  warning: 'warning',
} as const;

type SnackSeverityTypes = (typeof snackSeverity)[keyof typeof snackSeverity];

export { snackSeverity };

export type { SnackSeverityTypes };
