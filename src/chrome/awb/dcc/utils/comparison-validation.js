import { DIALOG_MESSAGES } from '@/constants/dialog';

/** Allowed characters for comparison name: alphanumeric, spaces, hyphens, underscores. */
const COMPARISON_NAME_REGEX = /^[a-zA-Z0-9\s\-_]+$/;

/**
 * Validates comparison name: required, allowed characters, and uniqueness.
 * @param {Array} allComparisons - List of existing comparisons (each with .name)
 * @param {string} text - Candidate name
 * @param {string|null} [currentName] - Current name when editing (skips duplicate check if unchanged)
 * @returns {{ validate: boolean, errorMsg: string }}
 */
export function validateComparisonName(allComparisons, text, currentName = null) {
  if (!text) {
    return { validate: false, errorMsg: DIALOG_MESSAGES.ERROR_MSG_REQUIRED };
  }

  const trimmedText = text.trim();

  if (currentName && (currentName === text || (currentName || '').trim() === trimmedText)) {
    return { validate: true, errorMsg: '' };
  }

  if (!COMPARISON_NAME_REGEX.test(text)) {
    return { validate: false, errorMsg: DIALOG_MESSAGES.ERROR_MSG_COMPARISON_NAME };
  }

  const isDuplicate = (allComparisons || []).some((item) => {
    const existingTrimmed = (item.name || '').trimStart().trimEnd();
    return existingTrimmed === trimmedText;
  });

  if (isDuplicate) {
    return { validate: false, errorMsg: DIALOG_MESSAGES.ERROR_MSG_COMPARISON_EXIST };
  }

  return { validate: true, errorMsg: '' };
}

/**
 * Returns true when saved filter selection represents applied-but-unsaved filters
 * (id is null and either name or filter values are present).
 * @param {Object|null} savedFilterSelection - { id, name?, filters? }
 * @returns {boolean}
 */
export function hasMeaningfulUnsavedFilters(savedFilterSelection) {
  if (!savedFilterSelection || savedFilterSelection.id !== null) {
    return false;
  }
  if (savedFilterSelection.name && String(savedFilterSelection.name).trim() !== '') {
    return true;
  }
  const filters = savedFilterSelection.filters;
  if (filters && typeof filters === 'object' && !Array.isArray(filters)) {
    return Object.values(filters).some((val) => val != null && val !== '' && val !== '""');
  }
  return false;
}
