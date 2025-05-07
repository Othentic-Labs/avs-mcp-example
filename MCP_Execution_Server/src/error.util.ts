/**
 * Wraps async function execution with try/catch and consistent error logging
 * @param {Function} fn - Async function to execute
 * @param {string} errorMessage - Custom error message prefix
 * @returns {Promise<any>} - Result of the function or throws error
 */
export async function asyncHandler<T>(
  fn: () => Promise<T>,
  errorMessage: string
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    console.error(errorMessage, error);
    throw new Error(errorMessage);
  }
}