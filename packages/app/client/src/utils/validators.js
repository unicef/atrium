export const validateEmail = (email) => {
  if (email) {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      return { email: 'Invalid value for email' }
    }

    return undefined
  }

  return { email: 'Email is required' }
}

export const validatePassword = (password) => {
  if (password) {
    const hasEightChars = password.length >= 8
    const hasUpperCaseChar = /([A-Z])/g.test(password)
    const hasNumberDigit = /\d/g.test(password)

    if (!hasEightChars) {
      return { password: 'Use at least eight characters' }
    }


    if (!hasUpperCaseChar) {
      return { password: 'Use at least one uppercase' }
    }

    if (!hasNumberDigit) {
      return { password: 'Use at least one number digit' }
    }

     return {}
  }

  return { password: 'Password is required' }
}

export const validateWebsite = website => {
  const real = /([-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*))/g.test(website)
  if (website && !real) {
    return { website: 'It is unreal website' }
  }
  return {}
}
export const validateConfirmPassword = (password, confirmPassword) => {
  if (password !== confirmPassword)
    return { confirmPassword: 'Passwords do not match' }
  return {}
}
