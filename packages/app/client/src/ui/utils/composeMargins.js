const composeMargins = ({ mt, mb, mr, ml }) => ({
  marginTop: mt || 0,
  marginBottom: mb || 0,
  marginRight: mr || 0,
  marginLeft: ml || 0
})

export default composeMargins
