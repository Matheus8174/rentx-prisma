class AppError {
  constructor(
    public readonly status = 400,
    public readonly title: string,
    public readonly detail: string
  ) {}
}

export default AppError;
