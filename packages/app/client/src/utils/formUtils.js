export const baseInputsProps = ({ name, id, label, formProps, htmlFor, fullWidth, ...props }) => (
  {
    name,
    id,
    label,
    onChange: formProps.handleChange,
    onBlur: formProps.handleBlur,
    error: Boolean(formProps.touched[name] && formProps.errors[name]),
    errorMessage: formProps.errors[name],
    fullWidth,
    htmlFor,
    value: formProps.values[name],
    ...props
  }
)
