module.exports = {
  email: {
    name: 'email',
    id:'emailInput',
    label:'Your email',
    initialValue: '',
    htmlFor: 'emailInput',
    type: 'email'
  },
  name: {
    name: 'name',
    id:'nameInput',
    label:'Name',
    initialValue: '',
    htmlFor: 'nameInput',
    type: 'text'
  },
  surname: {
    name: 'surname',
    id:'surnameInput',
    label:'Surname',
    initialValue: '',
    htmlFor: 'surnameInput',
    type: 'text'
  },
  password: {
    name: 'password',
    id:'passwordInput',
    label:'Password',
    initialValue: '',
    htmlFor: 'passwordInput',
    type: 'password'
  },
  termsCheckbox: {
    name: 'termsCheckbox',
    id:'termsCheckbox',
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
  }
}