export const genericSavingToast = {
  loading: 'Saving changes...',
  success() { return 'Saved changes.' },
  error(e: Error) { return `Failed to save: ${e}` }
}
