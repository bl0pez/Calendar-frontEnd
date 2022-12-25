import { parseISO } from "date-fns"

/**
 * 
 * @param {*} events - Array de eventos
 * @returns - Array de eventos con las fechas convertidas a Date
 */
export const convertEventsDate = (events = []) => {
  return events.map((event) => {
    //Mutamos el objeto para que tenga las fechas en formato Date
    event.end = parseISO(event.end);
    event.start = parseISO(event.start);

    return event;

  })
}
