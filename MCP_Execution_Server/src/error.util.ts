/**
 * Wraps async function execution with try/catch and consistent error logging
 * @param {Function} fn - Async function to execute
 * @param {string} errorMessage - Custom error message prefix
 * @returns {Promise<any>} - Result of the function or throws error
 */
export async function asyncHandler(fn: any, errorMessage: any) {
    try {
      return await fn();
    } catch (error: any) {
      console.error(`${errorMessage}:`, error);
      throw new Error(`${errorMessage}: ${error.message || 'Unknown error'}`);
    }
  }