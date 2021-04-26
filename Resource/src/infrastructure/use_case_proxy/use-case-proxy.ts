export class UseCaseProxy<T> {
  constructor(private readonly useCase: T) {}
  public getInstance(): T {
    return this.useCase;
  }
}
