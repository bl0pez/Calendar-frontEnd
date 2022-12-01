import { Calendar as BigCalendar, } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { Navbar } from '../components/Navbar';
import { addHours } from 'date-fns';
import { localizer, getMessagesES } from '../../helpers';

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

  const eventStyleGetter = (event, start, end, isSelected ) => {
    
  }

  return (
    <>
      <Navbar />

      <div>
        <BigCalendar
          culture='es'
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 'calc(100vh - 80px )' }}
          messages={getMessagesES()}
          eventPropGetter={ eventStyleGetter }
        />
      </div>

    </>
  )
}
