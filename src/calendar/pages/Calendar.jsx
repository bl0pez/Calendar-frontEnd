import { Calendar as BigCalendar, } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { CalendarEvent, CalendarModal, Navbar, FabAddNew, FabDelete } from '../';
import { localizer, getMessagesES } from '../../helpers';
import { useState } from 'react';
import { useUiStore, useCalendarStore, useAuthStore } from '../../hooks';
import { useEffect } from 'react';

export const Calendar = () => {

  const { user } = useAuthStore();
  const { openDateModal } = useUiStore();
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

  const eventStyleGetter = (event, start, end, isSelected ) => {
   
    const isMyEvent = (user.uid === event.user._id) || (user.uid === event.user.uid);
    
    const style = {
      backgroundColor: isMyEvent ? '#367CF7' : '#465660', 
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
    openDateModal();
  }

  const onSelectEvent = (event) => {
    setActiveEvent(event);
  }

  const onViewChange = (event) => {
    localStorage.setItem('lastView', event);
    setLastView(event);
  }

  useEffect(() => {
    startLoadingEvents();
  }, []);

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

        <CalendarModal />
        <FabAddNew />
        <FabDelete />

    </>
  )
}
