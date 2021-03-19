export const validateEmail = (email) => {
  if (email) {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      return 'Invalid value for email'
    }

    return undefined
  } else {
    return 'Email is required'
  }
}