import { createSlice } from "@reduxjs/toolkit";

// import { addHours } from 'date-fns';

// const tempEvent =   {
//     _id: '1dadasda23',
//     title: 'CUMPLEAÑOS DE JUAN',
//     nostes: 'FELIZ CUM',
//     start: new Date(),
//     end: addHours(new Date(), 2),
//     bgcolor: '#fafafa',
//     user: {
//       _id: '123',
//       name: 'Juan',
//     }
//   }


export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        isLoadingEvents: true,
        events: [
            // tempEvent
        ],
        activeEvent: null
    },
    reducers: {
        onSetActiveEvent: (state, action) => {
            state.activeEvent = action.payload;
        },
        onAddNewEvent: (state, action) => {
            state.events.push(action.payload);
            state.activeEvent = null;
        },
        onUpdateEvent: (state, action) => {
            //Regresa un nuevo arreglo con los eventos actualizados
            state.events = state.events.map(
                e => (e._id === action.payload._id) ? action.payload : e
            );
        },
        onDeleteEvent: (state) => {
            if( state.activeEvent ){
                state.events = state.events.filter( event => event._id !== state.activeEvent._id);
                state.activeEvent = null;
            }
        },
        onLoadEvents: (state, action) => {
            //Eventos cargados desde la base de datos
            state.isLoadingEvents = false;
            //Recorremos los eventos que vienen del payload
            action.payload.forEach(event => {
                //some retorna true si la condición se cumple
                const exists = state.events.some( dbEvent => dbEvent._id === event._id );
                //Si no existe el evento en el state, lo agregamos
                if( !exists ){
                    state.events.push(event);
                }
            });

        },
        onLogoutCalendar: (state) => {
                state.isLoadingEvents = true,
                state.events = [
                    // tempEvent
                ],
                state.activeEvent = null
        }
    }
});

export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent,  onLoadEvents, onLogoutCalendar } = calendarSlice.actions;