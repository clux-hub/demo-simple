export enum CommonErrorCode {
  common = 'common',
  unknown = 'unknown',
  notFound = 'notFound',
  unauthorized = 'unauthorized',
  forbidden = 'forbidden',
  redirect = 'redirect',
  refresh = 'refresh',
  authorizeExpired = 'authorizeExpired',
}
export class CustomError<Detail = any> {
  private httpCode: {[key: string]: string} = {
    '401': CommonErrorCode.unauthorized,
    '402': CommonErrorCode.authorizeExpired,
    '403': CommonErrorCode.forbidden,
    '404': CommonErrorCode.notFound,
    '300': CommonErrorCode.refresh,
    '301': CommonErrorCode.redirect,
    '302': CommonErrorCode.redirect,
  };

  public constructor(public code: string, public message: string, public detail?: Detail, public quiet?: boolean) {
    if (parseFloat(code)) {
      this.code = this.httpCode[code];
    }
  }
}
export class RedirectError extends CustomError {
  public constructor(url: string) {
    super(CommonErrorCode.redirect, '跳转中', url);
  }
}
export class UnauthorizedError extends CustomError {
  public constructor(redirect: boolean) {
    super(CommonErrorCode.unauthorized, '请登录', redirect);
  }
}
export class QuietError<Detail = any> extends CustomError<Detail> {
  public constructor(public code: string, public message: string, public detail?: Detail) {
    super(code, message, detail, true);
  }
}

export interface ErrorEntity<Detail = any> {
  code: string;
  message?: string;
  detail?: Detail;
}
