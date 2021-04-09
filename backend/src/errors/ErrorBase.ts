class ErrorBase extends Error {
  private errorCode: number;
  private httpStatusCode: number;

  constructor(message: string, errorCode: number, httpStatusCode: number) {
    super(message);

    this.errorCode = errorCode;
    this.httpStatusCode = httpStatusCode;
  }

  public getMessage(): string {
    return this.message;
  }

  public getErrorCode(): number {
    return this.errorCode;
  }

  public getHttpStatusCode(): number {
    return this.httpStatusCode;
  }
}

export default ErrorBase;
