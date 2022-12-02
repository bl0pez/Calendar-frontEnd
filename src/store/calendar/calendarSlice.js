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
        }
    }
});

export const { onSetActiveEvent, onAddNewEvent } = calendarSlice.actions;