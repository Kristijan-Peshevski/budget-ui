interface FieldValidationError {
  field: string

  message: string
}

interface ErrorResponse {
  message?: string

  fieldErrors?: FieldValidationError[]
}

interface LoginResponse {
  token: string
}

interface RegistrationRequest {
  firstName: string

  lastName: string

  email: string

  password: string
}

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080"

export class ApiError extends Error {
  fieldErrors: FieldValidationError[]

  constructor(message: string, fieldErrors: FieldValidationError[] = []) {
    super(message)

    this.name = "ApiError"

    this.fieldErrors = fieldErrors
  }
}

const request = async <T,>(
  path: string,

  options: RequestInit,
): Promise<T> => {
  let response: Response

  try {
    response = await fetch(`${API_URL}${path}`, {
      ...options,

      headers: {
        "Content-Type": "application/json",

        ...options.headers,
      },
    })
  } catch {
    throw new ApiError(
      "Серверот не е достапен. Проверете ја мрежната конекција и обидете се повторно.",
    )
  }

  if (!response.ok) {
    let errorResponse: ErrorResponse = {}

    try {
      errorResponse = ((await response.json()) as ErrorResponse)
    } catch {
      throw new ApiError("Настана неочекувана грешка. Обидете се повторно.")
    }

    const fieldMessage = errorResponse.fieldErrors

      ?.map((error) => error.message)

      .filter(Boolean)

      .join(" ")

    throw new ApiError(
      fieldMessage || errorResponse.message || "Барањето не може да се заврши.",

      errorResponse.fieldErrors,
    )
  }

  return (await response.json()) as T
}

export const loginUser = (email: string, password: string) =>
  request<LoginResponse>("/api/auth/login", {
    body: JSON.stringify({ email, password }),

    method: "POST",
  })

export const registerUser = (payload: RegistrationRequest) =>
  request("/api/auth/register", {
    body: JSON.stringify(payload),

    method: "POST",
  })
