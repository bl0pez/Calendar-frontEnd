import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onSetActiveEvent, onUpdateEvent } from "../store";

export const useCalendarStore = () => {
    
    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector(state => state.calendar);

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent(calendarEvent) )
    }

    const startSavingEvent = async( calendarEvent ) => {
        if( calendarEvent._id ){
            //Actualizando evento
            dispatch(onUpdateEvent({...calendarEvent}));
        }else{
            //Creando evento
            dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }));
        }
    }

    return {
        // Propiedades
        events,
        activeEvent,

        // Metodos
        setActiveEvent,
        startSavingEvent,
    }

}
