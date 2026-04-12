# Skill: Form Validation

**Use when:** Adding or editing the application form.

## Pattern
- Validate on `submit` event — prevent default, check fields, show inline errors.
- Required fields: show error message below the input with class `.field-error`.
- Email: use regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`.
- On success: hide form, show a thank-you message element.
- Do not rely solely on HTML5 `required` — add JS validation for UX consistency.
