import { addHours } from 'date-fns';
import { useCalendarStore, useUiStore } from '../../hooks'

export const FabAddNew = () => {

    const { openDateModal } = useUiStore();
    const { setActiveEvent } = useCalendarStore();

    const handleClickNew = () => {
        setActiveEvent({
            title: '',
            notes: '',
            start: new Date(),
            bgColor: '#367CF7',
            end: addHours(new Date(), 2),
            user:{
                _id: '123',
                name: 'bryan'
            }
        });
        openDateModal();
    }

  return (
    <button 
        className="btn btn-primary fab"
        onClick={ handleClickNew }
        >
        <i className="fas fa-plus"></i>
    </button>
  )
}
