import * as ErrorMessages from '../../constants/errorConstants';
import { store } from '../../store/store';

export const extractApiErrorMessage = (data: unknown, defaultMessage: string = ErrorMessages.ERR_AN_ERROR_OCCURRED): string => {
  if (!data) return defaultMessage;
  if (typeof data === 'string') return data;
  if (data instanceof Error && data.message) return data.message;
  if (typeof data !== 'object') return defaultMessage;
  const payload = data as Record<string, unknown>;
  if (payload.errors && typeof payload.errors === 'object') {
    const errorMessages = Object.values(payload.errors as Record<string, unknown>)
      .flat()
      .filter((message): message is string => typeof message === 'string' && message.trim().length > 0);
    if (errorMessages.length > 0) return errorMessages.join(' ');
  }
  if (typeof payload.detail === 'string' && payload.detail.trim().length > 0) return payload.detail;
  if (typeof payload.message === 'string' && payload.message.trim().length > 0) return payload.message;
  if (typeof payload.error === 'string' && payload.error.trim().length > 0) return payload.error;
  if (typeof payload.title === 'string' && payload.title !== 'One or more validation errors occurred.' && payload.title !== 'Validation Error' && payload.title !== 'Bad Request' && payload.title !== 'Unauthorized') {
    return payload.title;
  }
  return defaultMessage;
};


