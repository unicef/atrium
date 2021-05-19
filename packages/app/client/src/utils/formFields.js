module.exports = {
  email: {
    name: 'email',
    id: 'emailInput',
    label: 'Email',
    initialValue: '',
    htmlFor: 'emailInput',
    type: 'email'
  },
  name: {
    name: 'name',
    id: 'nameInput',
    label: 'Name',
    initialValue: '',
    htmlFor: 'nameInput',
    type: 'text'
  },
  surname: {
    name: 'surname',
    id: 'surnameInput',
    label: 'Surname',
    initialValue: '',
    htmlFor: 'surnameInput',
    type: 'text'
  },
  password: {
    name: 'password',
    id: 'passwordInput',
    label: 'Password',
    initialValue: '',
    htmlFor: 'passwordInput',
    type: 'password',
    showCriteria: true
  },
  termsCheckbox: {
    name: 'termsCheckbox',
    id: 'termsCheckbox',
    initialValue: false,
    contentPlacemet: 'flex-start',
    label: 'I agree to The Atrium Terms of service and Privacy Policy',
    links: [
      {
        to: '/',
        str: 'Terms of service',
        variant: 'body2'
      },
      {
        to: '/',
        str: 'Privacy Policy',
        variant: 'body2'
      }
    ],
    htmlFor: 'termsCheckbox',
    type: 'checkbox'
  },
  bio: {
    name: 'bio',
    id: 'bioInput',
    label: 'Bio',
    initialValue: '',
    htmlFor: 'bioInput',
    type: 'text'
  },
  role: {
    name: 'role',
    id: 'roleInput',
    label: 'Role',
    initialValue: '',
    htmlFor: 'roleInput',
    type: 'text'
  },
  organization: {
    name: 'organization',
    id: 'organizationInput',
    label: 'Organization',
    initialValue: '',
    htmlFor: 'organizationInput',
    type: 'text'
  },
  website: {
    name: 'website',
    id: 'websiteInput',
    label: 'Website',
    initialValue: '',
    htmlFor: 'websiteInput',
    type: 'text'
  },
  currentPassword: {
    name: 'currentPassword',
    id: 'currentPasswordInput',
    label: 'Current password',
    initialValue: '',
    htmlFor: 'currentPasswordInput',
    type: 'password'
  },
  confirmPassword: {
    name: 'confirmPassword',
    id: 'confirmPasswordInput',
    label: 'Confirm new password',
    initialValue: '',
    htmlFor: 'confirmPasswordInput',
    type: 'password'
  }
}
