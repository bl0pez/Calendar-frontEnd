import Modal from 'react-modal';
import DatePicker, { registerLocale } from 'react-datepicker';
import { addHours, differenceInSeconds } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';

import { useCalendarStore, useUiStore } from '../../hooks';

registerLocale('es', es);

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

const initialFormValues = {
    title: '',
    notes: '',
    start: new Date(),
    end: addHours(new Date(), 2),
}

export const CalendarModal = () => {

    const { isDateModalOpen, closeDateModal } = useUiStore();
    const { activeEvent, startSavingEvent } = useCalendarStore();
    const [formValues, setFormValues] = useState(initialFormValues);
    const [ formSubmit, setFormSubmit ] = useState(false);

    const titleClass = useMemo(() => {

        if(!formSubmit) return '';

        return (formValues.title.length > 0)
        ? 'is-valid'
        : 'is-invalid';


    }, [formValues.title, formSubmit]);

    useEffect(() => {
        if(activeEvent !== null) {
            setFormValues({...activeEvent});
        }


    }, [activeEvent]);

    const onInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value,
        });
    }

    const onDateChange = (event, changing) => {
        setFormValues({
            ...formValues,
            [changing]: event,
        });
    }


    const onSubmitForm = async(event) => {
        event.preventDefault();
        setFormSubmit(true);

        const difference = differenceInSeconds(formValues.end, formValues.start);

        if(isNaN(difference) || difference <= 0) {
            Swal.fire('Error', 'La fecha de fin debe ser mayor a la fecha de inicio', 'error');
            return;
        }
        
        if(formValues.title.trim().length < 2) {
            return;
        }

        await startSavingEvent(formValues);
        closeDateModal();
        setFormSubmit(false);
        
    }

    return (
        <Modal
            isOpen={isDateModalOpen}
            style={customStyles}
            onRequestClose={closeDateModal}
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
        >
            <h1> Nuevo evento </h1>
            <hr />
            <form 
                onSubmit={onSubmitForm}
                className="container">

                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label>
                    <DatePicker 
                        selected={formValues.start}
                        className="form-control"
                        onChange={(event) => onDateChange(event, 'start')}
                        dateFormat="Pp"
                        showTimeSelect
                        locale="es"
                        timeCaption='Hora'
                    />
                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>
                    <DatePicker
                        minDate={formValues.start}
                        selected={formValues.end}
                        className="form-control"
                        onChange={(event) => onDateChange(event, 'end')}
                        dateFormat="Pp"
                        showTimeSelect
                        locale="es"
                        timeCaption='Hora'
                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={`form-control ${titleClass}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={formValues.title}
                        onChange={onInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={formValues.notes}
                        onChange={onInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}
