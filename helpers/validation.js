export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateCustomer = (data, isUpdate = false) => {
  const errors = [];

  if (!isUpdate) {
    if (!data.firstName || data.firstName.trim().length === 0) {
      errors.push("First name is required");
    }
    if (!data.lastName || data.lastName.trim().length === 0) {
      errors.push("Last name is required");
    }
    if (!data.email) {
      errors.push("Email is required");
    }
    if (!data.password || data.password.length < 6) {
      errors.push("Password must be at least 6 characters");
    }
  }

  if (data.email && !validateEmail(data.email)) {
    errors.push("Invalid email format");
  }

  if (data.age !== undefined && (data.age < 0 || data.age > 150)) {
    errors.push("Age must be between 0 and 150");
  }

  return errors;
};

export const validateBook = (data) => {
  const errors = [];

  if (!data.bookName || data.bookName.trim().length === 0) {
    errors.push("Book name is required");
  }

  if (data.pages !== undefined && (isNaN(data.pages) || data.pages < 1)) {
    errors.push("Pages must be a positive number");
  }

  return errors;
};

export const validateAuthor = (data) => {
  const errors = [];

  if (!data.firstName || data.firstName.trim().length === 0) {
    errors.push("First name is required");
  }

  if (!data.lastName || data.lastName.trim().length === 0) {
    errors.push("Last name is required");
  }

  if (data.email && !validateEmail(data.email)) {
    errors.push("Invalid email format");
  }

  return errors;
};
