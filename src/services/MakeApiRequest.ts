import { API_BASE_URL } from "../constants/apiConstants";
import * as ErrorMessages from "../constants/errorConstants";
import { extractApiErrorMessage } from "../utils/helpers/helperUtils";

const getErrorMessage = (
  error: unknown,
  fallback: string = ErrorMessages.ERR_AN_UNEXPECTED_ERROR_OCCURRED,
): string => {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  if (
    error &&
    typeof error === "object" &&
    "message" in error &&
    typeof (error as Record<string, unknown>).message === "string"
  ) {
    return (error as Record<string, unknown>).message as string;
  }
  return fallback;
};

const makeApiRequest = async (
  path: string,
  config: RequestInit = {},
): Promise<Response> => {
  const { store } = await import("../store/store");
  const { logout } = await import("../store/slices/authSlice");
  const baseUrl: string = API_BASE_URL;
  const jwtToken: string = store.getState()?.auth?.user?.token || "";
  const headers = new Headers(config.headers);
  if (jwtToken && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${jwtToken}`);
  }
  const url = `${baseUrl}${path}`;
  let response: Response;
  try {
    response = await fetch(url, {
      ...config,
      headers,
      mode: "cors",
    });
  } catch (fetchError: unknown) {
    if (fetchError instanceof Error) {
      if (fetchError.name === "AbortError") {
        throw fetchError;
      }
      // Handle standard network offline / connection refusal
      throw new Error(ErrorMessages.ERR_NETWORK_CONNECTION(path));
    }
    throw new Error(
      getErrorMessage(fetchError, ErrorMessages.ERR_NETWORK_REQUEST_FAILED),
    );
  }
  const isPublicEndpoint = path === "/auth/login" || path === "/auth/signup";
  if (response.status === 401 && !isPublicEndpoint) {
    store.dispatch(logout());
    window.location.href = "/";
  }
  if (!response.ok) {
    const error = await response.json()
    throw new Error(
      extractApiErrorMessage(error, `Request failed (${response.status})`),
    );
  }
  return response;
};

export default makeApiRequest;
