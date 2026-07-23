// Server error types
export enum ServerErrorType {
  NOT_FOUND = '404',
  INTERNAL_SERVER_ERROR = '500',
  BAD_GATEWAY = '502',
  SERVICE_UNAVAILABLE = '503',
  GATEWAY_TIMEOUT = '504',
  OFFLINE = 'offline',
  GENERIC_ERROR = 'generic'
}

// Error response interface
export interface ErrorResponse {
  type: ServerErrorType;
  title: string;
  message: string;
  timestamp?: Date;
  status?: number;
  details?: string;
}

// Custom error classes
export class ServerError extends Error {
  public type: ServerErrorType;
  public status?: number;
  public details?: string;

  constructor(
    type: ServerErrorType,
    message: string,
    status?: number,
    details?: string
  ) {
    super(message);
    this.type = type;
    this.status = status;
    this.details = details;
    this.name = 'ServerError';
  }
}

export class NotFoundError extends ServerError {
  constructor(message: string = 'Resource not found', details?: string) {
    super(ServerErrorType.NOT_FOUND, message, 404, details);
    this.name = 'NotFoundError';
  }
}

export class InternalServerError extends ServerError {
  constructor(message: string = 'Internal server error', details?: string) {
    super(ServerErrorType.INTERNAL_SERVER_ERROR, message, 500, details);
    this.name = 'InternalServerError';
  }
}

export class BadGatewayError extends ServerError {
  constructor(message: string = 'Bad gateway', details?: string) {
    super(ServerErrorType.BAD_GATEWAY, message, 502, details);
    this.name = 'BadGatewayError';
  }
}

export class ServiceUnavailableError extends ServerError {
  constructor(message: string = 'Service unavailable', details?: string) {
    super(ServerErrorType.SERVICE_UNAVAILABLE, message, 503, details);
    this.name = 'ServiceUnavailableError';
  }
}

export class GatewayTimeoutError extends ServerError {
  constructor(message: string = 'Gateway timeout', details?: string) {
    super(ServerErrorType.GATEWAY_TIMEOUT, message, 504, details);
    this.name = 'GatewayTimeoutError';
  }
}

export class OfflineError extends ServerError {
  constructor(message: string = 'No internet connection', details?: string) {
    super(ServerErrorType.OFFLINE, message, undefined, details);
    this.name = 'OfflineError';
  }
}

// Error utility functions
export const createErrorResponse = (
  type: ServerErrorType,
  title?: string,
  message?: string,
  details?: string
): ErrorResponse => {
  return {
    type,
    title: title || getErrorTitle(type),
    message: message || getErrorMessage(type),
    timestamp: new Date(),
    status: getErrorStatus(type),
    details
  };
};

export const getErrorTitle = (type: ServerErrorType): string => {
  switch (type) {
    case ServerErrorType.NOT_FOUND:
      return 'Halaman Tidak Ditemukan';
    case ServerErrorType.INTERNAL_SERVER_ERROR:
      return 'Server Error';
    case ServerErrorType.BAD_GATEWAY:
      return 'Bad Gateway';
    case ServerErrorType.SERVICE_UNAVAILABLE:
      return 'Layanan Tidak Tersedia';
    case ServerErrorType.GATEWAY_TIMEOUT:
      return 'Request Timeout';
    case ServerErrorType.OFFLINE:
      return 'Tidak Ada Koneksi Internet';
    case ServerErrorType.GENERIC_ERROR:
    default:
      return 'Terjadi Kesalahan';
  }
};

export const getErrorMessage = (type: ServerErrorType): string => {
  switch (type) {
    case ServerErrorType.NOT_FOUND:
      return 'Maaf, halaman yang Anda cari tidak dapat ditemukan.';
    case ServerErrorType.INTERNAL_SERVER_ERROR:
      return 'Terjadi kesalahan pada server. Silakan coba lagi nanti.';
    case ServerErrorType.BAD_GATEWAY:
      return 'Server mengalami masalah saat mencoba memproses permintaan Anda.';
    case ServerErrorType.SERVICE_UNAVAILABLE:
      return 'Layanan sedang tidak tersedia saat ini. Silakan coba lagi nanti.';
    case ServerErrorType.GATEWAY_TIMEOUT:
      return 'Permintaan Anda terlalu lama diproses. Silakan coba lagi.';
    case ServerErrorType.OFFLINE:
      return 'Anda sedang offline. Harap periksa koneksi internet Anda.';
    case ServerErrorType.GENERIC_ERROR:
    default:
      return 'Terjadi kesalahan tak terduga. Silakan coba lagi.';
  }
};

export const getErrorStatus = (type: ServerErrorType): number | undefined => {
  switch (type) {
    case ServerErrorType.NOT_FOUND:
      return 404;
    case ServerErrorType.INTERNAL_SERVER_ERROR:
      return 500;
    case ServerErrorType.BAD_GATEWAY:
      return 502;
    case ServerErrorType.SERVICE_UNAVAILABLE:
      return 503;
    case ServerErrorType.GATEWAY_TIMEOUT:
      return 504;
    case ServerErrorType.OFFLINE:
    case ServerErrorType.GENERIC_ERROR:
    default:
      return undefined;
  }
};