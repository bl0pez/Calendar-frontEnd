import { useDispatch, useSelector } from "react-redux"
import calendarApi from "../api/calendarApi";
import { convertEventsDate } from "../helpers";
import { onAddNewEvent, onSetActiveEvent, onUpdateEvent, onDeleteEvent, onLoadEvents } from "../store";

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

    const startLoadingEvents = async() => {
        try {
            
            const { data } = await calendarApi.get('/events');
            const events = convertEventsDate(data.eventos);
            dispatch( onLoadEvents(events));

        } catch (error) {
            console.log(error);
            console.log("Error al cargar los eventos");
        }
    }

    return {
        // Propiedades
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        // Metodos
        setActiveEvent,
        startDeleteEvent,
        startLoadingEvents,
        startSavingEvent,
    }

}
