import { useState, useCallback } from 'react';
import { ServerErrorType, ServerError } from './ErrorTypes';

interface UseErrorHandlerResult {
  error: ServerError | null;
  setError: (error: ServerError | null) => void;
  clearError: () => void;
  handleError: (error: any) => void;
}

export const useErrorHandler = (): UseErrorHandlerResult => {
  const [error, setError] = useState<ServerError | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const handleError = useCallback((error: any) => {
    // Handle different types of errors
    if (error instanceof ServerError) {
      setError(error);
    } else if (error instanceof Error) {
      // Convert generic errors to server errors
      let serverError: ServerError;
      
      if (error.message.includes('404') || error.message.toLowerCase().includes('not found')) {
        serverError = new ServerError(ServerErrorType.NOT_FOUND, error.message);
      } else if (error.message.includes('500') || error.message.toLowerCase().includes('server error')) {
        serverError = new ServerError(ServerErrorType.INTERNAL_SERVER_ERROR, error.message);
      } else if (error.message.toLowerCase().includes('network error') || 
                 error.message.toLowerCase().includes('fetch') ||
                 error.message.toLowerCase().includes('connection')) {
        serverError = new ServerError(ServerErrorType.OFFLINE, error.message);
      } else {
        serverError = new ServerError(ServerErrorType.GENERIC_ERROR, error.message);
      }
      
      setError(serverError);
    } else {
      // Handle non-error objects
      setError(new ServerError(ServerErrorType.GENERIC_ERROR, String(error)));
    }
  }, []);

  return {
    error,
    setError,
    clearError,
    handleError
  };
};