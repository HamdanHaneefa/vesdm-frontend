import { useState } from 'react';

export const validators = {
  // Email validation
  email: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) return 'Email is required';
    if (!emailRegex.test(value)) return 'Invalid email address';
    return '';
  },

  // Phone validation
  phone: (value) => {
    const phoneRegex = /^[0-9]{10}$/;
    if (!value) return 'Phone number is required';
    if (!phoneRegex.test(value.replace(/\D/g, ''))) return 'Phone number must be 10 digits';
    return '';
  },

  // Required field validation
  required: (value, fieldName = 'This field') => {
    if (!value || (typeof value === 'string' && !value.trim())) {
      return `${fieldName} is required`;
    }
    return '';
  },

  // Minimum length validation
  minLength: (value, min, fieldName = 'This field') => {
    if (!value) return '';
    if (value.length < min) {
      return `${fieldName} must be at least ${min} characters`;
    }
    return '';
  },

  // Maximum length validation
  maxLength: (value, max, fieldName = 'This field') => {
    if (!value) return '';
    if (value.length > max) {
      return `${fieldName} must not exceed ${max} characters`;
    }
    return '';
  },

  // Password validation
  password: (value) => {
    if (!value) return 'Password is required';
    if (value.length < 8) return 'Password must be at least 8 characters';
    if (!/[A-Z]/.test(value)) return 'Password must contain at least one uppercase letter';
    if (!/[a-z]/.test(value)) return 'Password must contain at least one lowercase letter';
    if (!/[0-9]/.test(value)) return 'Password must contain at least one number';
    return '';
  },

  // Confirm password validation
  confirmPassword: (value, password) => {
    if (!value) return 'Please confirm your password';
    if (value !== password) return 'Passwords do not match';
    return '';
  },

  // URL validation
  url: (value) => {
    if (!value) return '';
    try {
      new URL(value);
      return '';
    } catch {
      return 'Invalid URL';
    }
  },

  // Number validation
  number: (value, fieldName = 'This field') => {
    if (!value) return '';
    if (isNaN(value)) return `${fieldName} must be a number`;
    return '';
  },

  // Range validation
  range: (value, min, max, fieldName = 'This field') => {
    if (!value) return '';
    const num = Number(value);
    if (num < min || num > max) {
      return `${fieldName} must be between ${min} and ${max}`;
    }
    return '';
  },

  // Date validation
  date: (value, fieldName = 'Date') => {
    if (!value) return `${fieldName} is required`;
    const date = new Date(value);
    if (isNaN(date.getTime())) return 'Invalid date';
    return '';
  },

  // Age validation (based on date of birth)
  age: (value, minAge, maxAge = 100) => {
    if (!value) return 'Date of birth is required';
    const today = new Date();
    const birthDate = new Date(value);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age < minAge) return `You must be at least ${minAge} years old`;
    if (age > maxAge) return `Age cannot exceed ${maxAge} years`;
    return '';
  },

  // Alphanumeric validation
  alphanumeric: (value, fieldName = 'This field') => {
    if (!value) return '';
    if (!/^[a-zA-Z0-9]+$/.test(value)) {
      return `${fieldName} can only contain letters and numbers`;
    }
    return '';
  },

  // Select validation (for dropdowns)
  select: (value, fieldName = 'Please select an option') => {
    if (!value || value === '' || value === 'default') {
      return fieldName;
    }
    return '';
  },

  // Checkbox validation
  checkbox: (value, message = 'This field must be checked') => {
    if (!value) return message;
    return '';
  },

  // File validation
  file: (file, allowedTypes = [], maxSizeMB = 5) => {
    if (!file) return 'Please select a file';
    
    // Check file type
    if (allowedTypes.length > 0) {
      const fileType = file.type;
      if (!allowedTypes.includes(fileType)) {
        return `File type must be one of: ${allowedTypes.join(', ')}`;
      }
    }
    
    // Check file size
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSizeMB) {
      return `File size must not exceed ${maxSizeMB}MB`;
    }
    
    return '';
  },

  // Aadhaar validation (Indian ID)
  aadhaar: (value) => {
    if (!value) return 'Aadhaar number is required';
    const cleanValue = value.replace(/\s/g, '');
    if (!/^\d{12}$/.test(cleanValue)) {
      return 'Aadhaar number must be 12 digits';
    }
    return '';
  },

  // PAN validation (Indian Tax ID)
  pan: (value) => {
    if (!value) return 'PAN number is required';
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value.toUpperCase())) {
      return 'Invalid PAN format';
    }
    return '';
  },
};

// Form validation hook
export const useFormValidation = (initialValues, validationRules) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validate = (fieldName, value) => {
    const rules = validationRules[fieldName];
    if (!rules) return '';

    for (const rule of rules) {
      const error = rule(value);
      if (error) return error;
    }
    return '';
  };

  const handleChange = (fieldName, value) => {
    setValues(prev => ({ ...prev, [fieldName]: value }));
    
    if (touched[fieldName]) {
      const error = validate(fieldName, value);
      setErrors(prev => ({ ...prev, [fieldName]: error }));
    }
  };

  const handleBlur = (fieldName) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }));
    const error = validate(fieldName, values[fieldName]);
    setErrors(prev => ({ ...prev, [fieldName]: error }));
  };

  const validateAll = () => {
    const newErrors = {};
    const newTouched = {};
    
    Object.keys(validationRules).forEach(fieldName => {
      newTouched[fieldName] = true;
      const error = validate(fieldName, values[fieldName]);
      if (error) newErrors[fieldName] = error;
    });

    setTouched(newTouched);
    setErrors(newErrors);
    
    return Object.keys(newErrors).length === 0;
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAll,
    reset,
    setValues,
  };
};

export default validators;
