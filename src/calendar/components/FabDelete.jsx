import { useCalendarStore } from '../../hooks'

export const FabDelete = () => {

    const { startDeleteEvent, hasEventSelected } = useCalendarStore();

    const handleDelete = () => {
        startDeleteEvent();
    }

  return (
    <button 
        className="btn btn-danger fa-danger"
        onClick={ handleDelete }
        style={{ display: hasEventSelected ? 'block' : 'none' }}
        >
        <i className="fas fa-trash-alt"></i>
    </button>
  )
}
