type HttpError = {
  status: number;
  message: string;
};

export function isHttpError(error: unknown): error is HttpError {
  return (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    "message" in error &&
    typeof (error as HttpError).status === "number" &&
    typeof (error as HttpError).message === "string"
  );
}
