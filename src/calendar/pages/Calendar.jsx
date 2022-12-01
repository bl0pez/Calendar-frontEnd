import { Calendar as BigCalendar, } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { CalendarEvent, Navbar } from '../';
import { addHours } from 'date-fns';
import { localizer, getMessagesES } from '../../helpers';
import { useState } from 'react';

const events = [
  {
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
]

export const Calendar = () => {

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

  const eventStyleGetter = (event, start, end, isSelected ) => {
   
    
    const style = {
      backgroundColor: '#367CF7',
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
      color: 'white',
    }

    return {
      style,
    }

  }

  const onDoubleClick = (event) => {

  }

  const onSelectEvent = (event) => {

  }

  const onViewChange = (event) => {
    localStorage.setItem('lastView', event);
  }

  return (
    <>
      <Navbar />

        <BigCalendar
          culture='es'
          localizer={localizer}
          events={events}
          defaultView={lastView}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 'calc(100vh - 80px )' }}
          messages={getMessagesES()}
          eventPropGetter={ eventStyleGetter }
          components={{
            event: CalendarEvent,
          }}
          onDoubleClickEvent={ onDoubleClick }
          onSelectEvent={ onSelectEvent }
          onView={ onViewChange }
        />


    </>
  )
}
