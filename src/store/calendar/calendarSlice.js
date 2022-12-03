import { createSlice } from "@reduxjs/toolkit";
import { addHours } from 'date-fns';

const tempEvent =   {
    _id: '1dadasda23',
    title: 'CUMPLEAÑOS DE JUAN',
    nostes: 'FELIZ CUM',
    start: new Date(),
    end: addHours(new Date(), 2),
    bgcolor: '#fafafa',
    user: {
      _id: '123',
      name: 'Juan',
    }
  }


export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        events: [
            tempEvent
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
        }
    }
});

export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } = calendarSlice.actions;