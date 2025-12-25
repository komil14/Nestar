 export enum Message {
  /* =========================
     GENERAL
  ========================== */
  SOMETHING_WENT_WRONG = 'Something went wrong!',
  NO_DATA_FOUND = 'No data found!',
  BAD_REQUEST = 'Bad request!',
  NOT_ALLOWED_REQUEST = 'Not allowed request!',
  OPERATION_FAILED = 'Operation failed!',

  /* =========================
     CRUD
  ========================== */
  CREATE_FAILED = 'Create failed!',
  UPDATE_FAILED = 'Update failed!',
  REMOVE_FAILED = 'Remove failed!',
  UPLOAD_FAILED = 'Upload failed!',

  /* =========================
     AUTH / SECURITY
  ========================== */
  NOT_AUTHENTICATED = 'You are not authenticated. Please login first!',
  TOKEN_NOT_EXIST = 'Bearer token is not provided!',
  TOKEN_EXPIRED = 'Token has expired!',
  INVALID_TOKEN = 'Invalid token!',
  ACCESS_DENIED = 'Access denied!',
  ONLY_SPECIFIC_ROLES_ALLOWED = 'Access allowed only for specific roles!',
  BLOCKED_USER = 'You have been blocked!',

  /* =========================
     USER / MEMBER
  ========================== */
  NO_MEMBER_NICK = 'No member found with that nickname!',
  USER_NOT_FOUND = 'User not found!',
  SELF_SUBSCRIPTION_DENIED = 'Self subscription is denied!',
  DUPLICATE_EMAIL = 'Email already exists!',
  DUPLICATE_NICKNAME = 'Nickname already exists!',

  /* =========================
     AUTH INPUT
  ========================== */
  WRONG_PASSWORD = 'Wrong password, try again!',
  INVALID_CREDENTIALS = 'Invalid credentials!',
  PASSWORD_TOO_SHORT = 'Password is too short!',
  PASSWORD_MISMATCH = 'Passwords do not match!',

  /* =========================
     VALIDATION
  ========================== */
  REQUIRED_FIELDS_MISSING = 'Required fields are missing!',
  INVALID_INPUT = 'Invalid input provided!',
  INVALID_ID = 'Invalid ID format!',

  /* =========================
     FILE / UPLOAD
  ========================== */
  PROVIDE_ALLOWED_FORMAT = 'Please provide jpg, jpeg, or png images only!',
  FILE_TOO_LARGE = 'Uploaded file is too large!',
  FILE_REQUIRED = 'File is required!',

  /* =========================
     SERVER
  ========================== */
  SERVICE_UNAVAILABLE = 'Service temporarily unavailable!',
  DATABASE_ERROR = 'Database error occurred!',
}