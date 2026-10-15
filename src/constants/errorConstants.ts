export const ERR_NETWORK_CONNECTION = (path: string) =>
  `Network error: Unable to connect to the server at ${path}. Please check your connection.`;
export const ERR_NETWORK_REQUEST_FAILED = "Network request failed.";
export const ERR_API_REQUEST_FAILED = "API request failed.";
export const ERR_AN_UNEXPECTED_ERROR_OCCURRED = "An unexpected error occurred.";
export const ERR_LOGIN_FAILED = "Login failed";
export const ERR_FAILED_TO_UPDATE_PROFILE = "Failed to update profile";
export const ERR_INVALID_EMAIL_OR_PASSWORD = "Invalid email or password.";
export const ERR_REGISTER_FAILED = "Failed to register user.";
export const ERR_AN_ERROR_OCCURRED = "An error occurred";
export const ERR_FETCH_USERS_LIST = (statusText: string) => `Error fetching users list: ${statusText}`;
export const ERR_FAILED_TO_FETCH_USER = "Failed to fetch user";
export const ERR_FAILED_TO_CREATE_USER = "Failed to create user";
export const ERR_FAILED_TO_UPDATE_USER = "Failed to update user";
export const ERR_FAILED_TO_DELETE_USER = "Failed to delete user";
export const ERR_FAILED_TO_FETCH_ALL_COURSES = "Failed to fetch All courses.";
export const ERR_FAILED_TO_FETCH_COURSE = "Failed to fetch course.";
export const ERR_FAILED_TO_CREATE_COURSE = "Failed to create course.";
export const ERR_FAILED_TO_UPDATE_COURSE = "Failed to update course.";
export const ERR_FAILED_TO_DELETE_COURSE = "Failed to delete course.";
export const ERR_FAILED_TO_DELETE_DEPARTMENT = "Failed to delete department.";
export const ERR_FAILED_TO_CREATE_DEPARTMENT = "Failed to create department.";
export const ERR_FAILED_TO_UPDATE_DEPARTMENT = "Failed to update department.";
export const ERR_FAILED_TO_FETCH_ALL_DEPARTMENTS = "Failed to fetch departments.";
export const ERR_FAILED_TO_FETCH_DEPARTMENT = "Failed to fetch department.";
export const ERR_FAILED_TO_FETCH_STUDENT = "Failed to fetch student.";
export const ERR_FAILED_TO_UPDATE_STUDENT = "Failed to update student.";
export const ERR_FAILED_TO_FETCH_STUDENT_COURSES = "Failed to fetch enrolled courses.";
export const ERR_FAILED_TO_FETCH_ALL_STUDENTS = "Failed to fetch all students.";
export const ERR_FAILED_TO_ENROLL_STUDENT = "Failed to enroll student in course.";
export const ERR_FAILED_TO_DELETE_STUDENT = "Failed to delete student.";
export const ERR_FAILED_TO_FETCH_ADMIN_DASHBOARD_STATS = "Failed to fetch admin dashboard statistics.";
export const ERR_FAILED_TO_FETCH_RECENT_STUDENTS = "Failed to fetch recent students.";

export const VALIDATION_LIMITS = {
  TEXT_MIN: 3,
  TEXT_MAX: 60,
  EMAIL_MIN: 3,
  EMAIL_MAX: 60,
  NAME_MIN: 3,
  NAME_MAX: 60,
  PASSWORD_MIN: 8,
  PASSWORD_MAX: 128,
  PHONE_MIN: 8,
  PHONE_MAX: 15,
  ZIP_CODE_MIN: 5,
  ZIP_CODE_MAX: 10,
} as const;

export const VALIDATION_MESSAGES = {
  // Required Messages
  FIELD_REQUIRED: (fieldName: string) => `${fieldName} is required`,
  NAME_REQUIRED: "Name is required",
  EMAIL_REQUIRED: "Email is required",
  PHONE_REQUIRED: "Phone number is required",
  DOB_REQUIRED: "Date of Birth is required",
  ROLE_REQUIRED: "Role is required",
  USER_TYPE_REQUIRED: "User Type is required",
  PASSWORD_REQUIRED: "Password is required",
  OLD_PASSWORD_REQUIRED: "Old password is required",
  NEW_PASSWORD_REQUIRED: "New password is required",
  CONFIRM_PASSWORD_REQUIRED: "Confirm password is required",
  PASSWORDS_MUST_MATCH: "Passwords must match",

  // Length Validation Messages (Templates & Specific)
  MIN_LENGTH: (fieldName: string, min: number) =>
    `${fieldName} must be at least ${min} characters`,
  MAX_LENGTH: (fieldName: string, max: number) =>
    `${fieldName} must not exceed ${max} characters`,
  EMAIL_MIN_LENGTH: `Email must be at least ${VALIDATION_LIMITS.EMAIL_MIN} characters`,
  EMAIL_MAX_LENGTH: `Email must not exceed ${VALIDATION_LIMITS.EMAIL_MAX} characters`,
  NAME_MIN_LENGTH: `First Name must be at least ${VALIDATION_LIMITS.NAME_MIN} characters`,
  NAME_MAX_LENGTH: `First Name must not exceed ${VALIDATION_LIMITS.NAME_MAX} characters`,
  LAST_NAME_MIN_LENGTH: `Last Name must be at least ${VALIDATION_LIMITS.NAME_MIN} characters`,
  LAST_NAME_MAX_LENGTH: `Last Name must not exceed ${VALIDATION_LIMITS.NAME_MAX} characters`,
  ADDRESS_MIN_LENGTH: `Address Line must be at least ${VALIDATION_LIMITS.TEXT_MIN} characters`,
  ADDRESS_MAX_LENGTH: `Address Line must not exceed ${VALIDATION_LIMITS.TEXT_MAX} characters`,
  COUNTRY_MIN_LENGTH: `Country must be at least ${VALIDATION_LIMITS.TEXT_MIN} characters`,
  COUNTRY_MAX_LENGTH: `Country must not exceed ${VALIDATION_LIMITS.TEXT_MAX} characters`,
  CITY_MIN_LENGTH: `City must be at least ${VALIDATION_LIMITS.TEXT_MIN} characters`,
  CITY_MAX_LENGTH: `City must not exceed ${VALIDATION_LIMITS.TEXT_MAX} characters`,
  STATE_MIN_LENGTH: `State must be at least ${VALIDATION_LIMITS.TEXT_MIN} characters`,
  STATE_MAX_LENGTH: `State must not exceed ${VALIDATION_LIMITS.TEXT_MAX} characters`,
  PASSWORD_MIN_LENGTH: `Password must be at least ${VALIDATION_LIMITS.PASSWORD_MIN} characters`,
  PASSWORD_MAX_LENGTH: `Password must not exceed ${VALIDATION_LIMITS.PASSWORD_MAX} characters`,

  // Format & Regex Messages
  FIELD_INVALID: (fieldName: string) => `Please enter a valid ${fieldName}`,
  EMAIL_INVALID: "Please enter a valid Email",
  PHONE_INVALID: "Enter a valid phone number",
  DOB_INVALID: "Please enter a valid Date of Birth",
  DOB_FUTURE: "Date of Birth cannot be in the future",
  DOB_MIN: "Date of Birth cannot be before 1900",
  ZIP_CODE_INVALID: "Please enter a valid Zip Code",
  LETTERS_AND_NUMBERS_ONLY: (fieldName: string) =>
    `${fieldName} should only contain letters and numbers`,
  ONLY_LETTERS_AND_NUMBERS: "Only letters and numbers allowed",
  ALPHANUMERIC_REQUIRED: (fieldName: string) =>
    `${fieldName} should contain at least one letter or number`,

  // Password Complexity Messages
  PASSWORD_UPPERCASE_REQUIRED: "Must include at least one uppercase letter",
  PASSWORD_LOWERCASE_REQUIRED: "Must include at least one lowercase letter",
  PASSWORD_NUMBER_REQUIRED: "Must include at least one number",
  PASSWORD_SPECIAL_REQUIRED: "Must include at least one special character",
  PASSWORD_REQUIREMENTS_NOT_MET:
    "Please meet all password requirements before submitting.",
} as const;
