const commonProps = {
  type: 'text',
  borderColor:"white",
  borderColorFocus:"white",
  labelColor: "white"
}

const fields = [
  {
    name: 'subject',
    id: 'subjectInput',
    label: 'Subject',
    initialValue: '',
    htmlFor: 'subjectInput',
    placeholder: "Partnership",
    ...commonProps,
  },
  {
    name: 'message',
    id: 'messageInput',
    label: 'Message for Atrium team',
    initialValue: '',
    htmlFor: 'messageInput',
    placeholder: "Hello Atrium team",
    multiline: true,
    rows: 5,
    ...commonProps,
  },
  {
    name: 'fullName',
    id: 'nameInput',
    label: 'Full Name',
    initialValue: '',
    htmlFor: 'nameInput',
    placeholder: "Your name",
    ...commonProps,
  },
]

export default fields
