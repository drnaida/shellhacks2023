export const genericSavingToast = {
  loading: 'Saving changes...',
  success() { return 'Changes submitted.' },
  error(e: Error) { return `Failed to save: ${e}` }
}

export const questionRegeneratedToast = {
  loading: 'Regenerating the question...',
  success() { return 'Question was regenerated.' },
  error(e: Error) { return `Failed to regenerate: ${e}` }
}

export const editExamToast = {
  loading: 'Saving changes...',
  success() { return 'Questions were updated.' },
  error(e: Error) { return `Failed to update: ${e}` }
}

export const createExamToast = {
  loading: 'Saving changes...',
  success() { return 'Exam was created.' },
  error(e: Error) { return `Failed to update: ${e}` }
}

export const answersCheckedToast = {
  loading: 'Checking answers...',
  success() { return 'Answeres were checked.' },
  error(e: Error) { return `Failed to update: ${e}` }
}
