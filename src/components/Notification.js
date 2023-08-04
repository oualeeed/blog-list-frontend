const Notification = ({ notification, type }) => {
  if ( notification === '' ) return null
  return (
    <div className={`notification ${type}`} >
      { notification }
    </div>
  )

}

export default Notification
