import * as Yup from "yup";

export const SignUpSchema = Yup.object().shape({
  full_name: Yup.string()
    .min(3, "Full name must be at least 3 characters")
    .required("Full name is required"),

  user_name: Yup.string()
    .min(3, "Username too short")
    .required("Username is required"),

  email: Yup.string().email("Invalid email").required("Email is required"),

  phone: Yup.string().optional(),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),

  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Confirm your password"),

  termsAccepted: Yup.boolean().oneOf(
    [true],
    "You must accept the Terms & Conditions"
  ),
});

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export const PasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("New password is required"),

  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Confirm password is required"),
});

export const changePasswordValidationSchema = Yup.object().shape({
  current_password: Yup.string()
    .required("Current password is required")
    .min(8, "Current password must be at least 8 characters"),

  password: Yup.string()
    .required("New password is required")
    .min(8, "New password must be at least 8 characters"),

  password_confirmation: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
});
