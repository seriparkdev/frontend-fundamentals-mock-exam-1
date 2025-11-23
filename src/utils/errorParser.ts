import { isHttpError } from 'tosslib';

interface ErrorData {
  code: string;
  message: string;
}

const ERROR_MESSAGES: Record<number, string> = {
  400: '잘못된 요청입니다. 입력값을 확인해주세요.',
  401: '인증이 필요합니다. 로그인 후 다시 시도해주세요.',
  403: '접근 권한이 없습니다.',
  404: '요청한 리소스를 찾을 수 없습니다.',
  500: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
};

export const parseError = (error: unknown): ErrorData => {
  if (isHttpError(error)) {
    const status = error.status;
    return {
      code: `${status}`,
      message: ERROR_MESSAGES[status] || '알 수 없는 오류가 발생했습니다.',
    };
  }

  if (error instanceof Error) {
    return {
      code: 'ERROR',
      message: error.message,
    };
  }

  return {
    code: 'ERROR',
    message: '알 수 없는 오류가 발생했습니다.',
  };
};
