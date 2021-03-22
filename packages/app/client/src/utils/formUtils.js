export const baseInputsProps = ({ name, id, label, formProps, htmlFor, fullWidth }) => (
  {
    name,
    id,
    label,
    onChange: formProps.handleChange,
    onBlur: formProps.handleBlur,
    hasError: Boolean(formProps.touched[name] && formProps.errors[name]),
    error: formProps.errors[name],
    fullWidth,
    htmlFor,
    value: formProps.values[name]
  }
)

export const checkboxWithLinks = ({links, ...props}) => ({...baseInputsProps(props), links})
