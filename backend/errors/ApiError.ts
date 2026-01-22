export default class ApiError extends Error {
  code: string;

  constructor(code: string) {
    super();
    this.code = code;
  }
}
