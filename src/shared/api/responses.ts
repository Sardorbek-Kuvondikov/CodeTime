import { NextResponse } from "next/server";

export type ApiSuccess<T> = {
  ok: true;
  data: T;
  message?: string;
};

export type ApiError = {
  ok: false;
  error: {
    message: string;
    fieldErrors?: Record<string, string>;
  };
};

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

export function successResponse<T>(
  data: T,
  message = "Request completed successfully",
  status = 200,
) {
  return NextResponse.json<ApiSuccess<T>>({ ok: true, data, message }, { status });
}

export function errorResponse(
  message: string,
  status = 400,
  fieldErrors?: Record<string, string>,
) {
  return NextResponse.json<ApiError>(
    {
      ok: false,
      error: {
        message,
        ...(fieldErrors ? { fieldErrors } : {}),
      },
    },
    { status },
  );
}
