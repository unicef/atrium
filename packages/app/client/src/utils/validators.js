export const validateEmail = ({ email }) => {
  if (email) {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      return { email: 'Invalid value for email' }
    }

    return {}
  } else {
    return { email: 'Email is required' }
  }
}