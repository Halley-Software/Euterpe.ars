export class PreviousIsNullError extends Error {
  public constructor(message: string, cause?: string) {
    super(message, { cause: cause || "List is empty" })
  }
}