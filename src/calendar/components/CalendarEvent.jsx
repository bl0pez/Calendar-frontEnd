export const CalendarEvent = ({ event }) => {

    const { title, notes, user } = event;

  return (
    <>
        <span className="font-weight-bold">
            {title}</span>
        <br />
        <span className="font-weight-bold">
            <i className="far fa-user mr-2"></i>
            {user.name}
        </span>
    </>
  )
}
