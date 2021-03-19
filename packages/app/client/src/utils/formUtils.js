export const textInputsProps = ({ name, id, label, formProps, htmlFor, fullWidth }) => (
  {
    name,
    id,
    label,
    onChange: formProps.handleChange,
    onBlur: formProps.handleBlur,
    onFocus: () => formProps.errors[name] && formProps.setErrors({ [name]: undefined }),
    error: formProps.touched[name] && formProps.errors[name],
    fullWidth,
    htmlFor
  }
)