import React from 'react';
import ErrorPage from './ErrorPage';
import { ServerErrorType } from './ErrorTypes';

interface ServerErrorProps {
  error?: Error | null;
  status?: number;
  title?: string;
  message?: string;
  showReloadButton?: boolean;
  onReload?: () => void;
}

const ServerError: React.FC<ServerErrorProps> = ({
  error,
  status,
  title,
  message,
  showReloadButton = true,
  onReload
}) => {
  // Determine error type based on status code
  const getErrorType = (): ServerErrorType => {
    if (status) {
      switch (status) {
        case 404:
          return ServerErrorType.NOT_FOUND;
        case 500:
          return ServerErrorType.INTERNAL_SERVER_ERROR;
        case 502:
          return ServerErrorType.BAD_GATEWAY;
        case 503:
          return ServerErrorType.SERVICE_UNAVAILABLE;
        case 504:
          return ServerErrorType.GATEWAY_TIMEOUT;
        default:
          return ServerErrorType.GENERIC_ERROR;
      }
    }
    
    // If no status code, determine based on error properties
    if (error?.name === 'TypeError' && (error as any).message.includes('fetch')) {
      return ServerErrorType.OFFLINE;
    }
    
    return ServerErrorType.GENERIC_ERROR;
  };

  const errorType = getErrorType();

  return (
    <ErrorPage
      type={errorType}
      title={title}
      message={message}
      showReloadButton={showReloadButton}
      onReload={onReload}
    />
  );
};

export default ServerError;