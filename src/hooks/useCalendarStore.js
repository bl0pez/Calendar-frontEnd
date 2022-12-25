import { useDispatch, useSelector } from "react-redux"
import calendarApi from "../api/calendarApi";
import { onAddNewEvent, onSetActiveEvent, onUpdateEvent, onDeleteEvent } from "../store";

export const useCalendarStore = () => {
    
    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector(state => state.calendar);
    const { user } = useSelector(state => state.auth);

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent(calendarEvent) )
    }

    const startSavingEvent = async( calendarEvent ) => {
        if( calendarEvent._id ){
            //Actualizando evento
            dispatch(onUpdateEvent({...calendarEvent}));
        }else{

            //Mandamos la petición al backend para crear el evento
            const { _id } = calendarApi.post('/events', calendarEvent);

            //Creando evento
            dispatch(onAddNewEvent({ ...calendarEvent, _id, user }));
        }
    }

    const startDeleteEvent = () => {
        dispatch(onDeleteEvent());
    }

    return {
        // Propiedades
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        // Metodos
        setActiveEvent,
        startSavingEvent,
        startDeleteEvent,
    }

}
