import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2";
import calendarApi from "../api/calendarApi";
import { convertEventsDate } from "../helpers";
import { onAddNewEvent, onSetActiveEvent, onUpdateEvent, onDeleteEvent, onLoadEvents } from "../store";

export const useCalendarStore = () => {

    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector(state => state.calendar);
    const { user } = useSelector(state => state.auth);

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent))
    }

    const startSavingEvent = async (calendarEvent) => {
        try {

            if (calendarEvent._id) {

                //Mandamos la petición al backend para actualizar el evento
                await calendarApi.put(`/events/${calendarEvent._id}`, calendarEvent);

                //Actualizando evento
                dispatch(onUpdateEvent({ ...calendarEvent, user }));
                return;
            }

            //Mandamos la petición al backend para crear el evento
            const { _id } = calendarApi.post('/events', calendarEvent);

            //Creando evento
            dispatch(onAddNewEvent({ ...calendarEvent, _id, user }));
        } catch (error) {
            console.log(error);
            const err = error.response.data.message || "Error al ejecutar la acción"
            Swal.fire('Error', err, 'error');
        }

    }

    const startDeleteEvent = async() => {

        try {

            
                //Mandamos la petición al backend para eliminar el evento
                await calendarApi.delete(`/events/${activeEvent._id}`);

                //Eliminando evento
                dispatch(onDeleteEvent(activeEvent._id));
            

        } catch (error) {
            Swal.fire('Error', error.response.data.message || "Error al Eliminar el evento", 'error');
        }


    }

    const startLoadingEvents = async () => {
        try {

            const { data } = await calendarApi.get('/events');
            const events = convertEventsDate(data.eventos);
            dispatch(onLoadEvents(events));

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
