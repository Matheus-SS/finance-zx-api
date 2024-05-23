export type Result<T, E> = { ok: true; value: T } | { ok: false; error: E | undefined};

export function Ok<T>(data: T): Result<T, never> {
  return { ok: true, value: data }
}

export function Err<E>(error?: E): Result<never, E> {
  return { ok: false, error }
}