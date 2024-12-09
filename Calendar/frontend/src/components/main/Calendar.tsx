// @ts-ignore
import React, {useEffect, useRef, useState} from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {TerminInterface} from "../../types/terminInterface";
import {EventInterface} from "../../types/eventInterface";
import deLocale from '@fullcalendar/core/locales/de'
import ClickPopup from "./ClickPopup.tsx";
import {EventInput} from "@fullcalendar/core";


function Calendar() {
    const [termins, setTermins] = useState([]);
    const [eventInfo, setEventInfo] = useState(null);
    const [events, setEvents] = useState<EventInput[]>([]);
    const [showClickPopup, setShowClickPopup] = useState<boolean>(false);

    useEffect(() => {
        const scrollerElements = document.querySelectorAll('.fc-scroller');
        for (let i = 0; i < scrollerElements.length && i < 2; i++) {
            const element = scrollerElements[i] as HTMLElement;
            element.style.overflow = 'hidden';
        }
        const element1 = scrollerElements[2] as HTMLElement;
        element1.style.width = '1697px';

        const colHeader = document.querySelectorAll('.fc-col-header');
        const colHeaderEl = colHeader[0] as HTMLElement;
        colHeaderEl.style.width = '1681px';

        const ganztag = document.querySelectorAll('.fc-scrollgrid-sync-table');
        const ganztagEl = ganztag[0] as HTMLElement;
        ganztagEl.style.width = '1681px';

        const table1 = document.querySelector('.fc-timegrid-slots table') as HTMLElement;
        table1.style.width = '1681px';
        const table2 = document.querySelector('.fc-timegrid-cols table') as HTMLElement;
        table2.style.width = '1681px';

    }, []);

    const getTermins = async function () {
        await fetch('http://localhost:3010/api/termins/getAll')
            .then(res => res.json())
            .then(data => {
                setTermins(data)
            });
    }

    const showCreateTerminPopup = function () {
        const createTerminPopup: HTMLElement | null = document.getElementById('popupWindow2');
        // @ts-ignore
        createTerminPopup.style.display = 'block';
    }

    const updateClick = () => {
        setShowClickPopup(false);
    }

    const customButton = {
        text: "+ Neuer Termin",
        click: () => {
            showCreateTerminPopup();
        }
    }

    useEffect(() => {
        getTermins();
        const transformedEvents = termins.map((termin) => {
            if (
                termin.Azubi &&
                termin.Terminkey &&
                termin.Start &&
                termin.Ende &&
                termin.Bezeichnung
            ) {
                const event: EventInput = {
                    id: termin.Terminkey.toString(),
                    title:
                        termin.Vorname && termin.Nachname
                            ? `${termin.Bezeichnung} ${termin.Vorname} ${termin.Nachname}`
                            : `${termin.Bezeichnung}`,
                    start: '',
                    end: '',
                    extendedProps: {
                        description: termin.Bezeichnung,
                        location: termin.SerienterminID?.toString() || '',
                    },
                    className: 'event-font',
                };

                if (termin.Bezeichnung === 'Berufsschule') {
                    event.backgroundColor = '#e63939';
                }

                if (
                    termin.Ganztägig ||
                    new Date(termin.Ende).getDate() > new Date(termin.Start).getDate()
                ) {
                    event.allDay = true;
                    event.start = new Date(termin.Start).toISOString().split('T')[0];
                    const terminEndDate = new Date(termin.Ende);
                    terminEndDate.setDate(terminEndDate.getDate() + 1);
                    event.end = terminEndDate.toISOString().split('T')[0];
                } else {
                    event.allDay = false;
                    event.start = new Date(termin.Start).toISOString().split('.')[0];
                    event.end = new Date(termin.Ende).toISOString().split('.')[0];
                }

                return event;
            }
            return null;
        }).filter((e) => e !== null) as EventInput[];

        setEvents(transformedEvents);
    }, [termins]);

    // let eventsArray: EventInterface[] = [];
    // termins.map((termin: TerminInterface, i) => {
    //     if (termin.Azubi && termin.Terminkey && termin.Start && termin.Ende && termin.Bezeichnung) {
    //         let event: EventInterface = {
    //             id: '',
    //             title: '',
    //             start: '',
    //             end: '',
    //             extendedProps: {
    //                 description: '',
    //                 location: ''
    //             }
    //         };
    //
    //         event.id = termin.Terminkey.toString();
    //         if (termin.Vorname && termin.Nachname) {
    //             event.title = `${termin.Bezeichnung} ${termin.Vorname} ${termin.Nachname}`;
    //         } else {
    //             event.title = `${termin.Bezeichnung}`;
    //             event.extendedProps.description = `${termin.Bezeichnung}`;
    //         }
    //         if (termin.SerienterminID) {
    //             event.extendedProps.location = termin.SerienterminID.toString();
    //         }
    //
    //         if (termin.Bezeichnung === 'Berufsschule') {
    //             event.backgroundColor = '#e63939';
    //         }
    //         if (termin.Ganztägig || new Date(termin.Ende).getDate() > new Date(termin.Start).getDate()) {
    //             event.allDay = true
    //             event.start = new Date(termin.Start).toISOString().split('T')[0];
    //             const terminEndDate = new Date(termin.Ende);
    //             terminEndDate.setDate(terminEndDate.getDate() + 1);
    //             event.end = terminEndDate.toISOString().split('T')[0];
    //         } else {
    //             event.allDay = false
    //             event.start = new Date(termin.Start).toISOString().split('.')[0];
    //             event.end = new Date(termin.Ende).toISOString().split('.')[0];
    //         }
    //         event.className = 'event-font';
    //         eventsArray.push(event)
    //     }
    // })


    // useEffect(() => {
    //     getTermins();
    // }, [termins]);

    // @ts-ignore
    const handleEventClick = (info) => {
        setEventInfo(info.event);
        setShowClickPopup(true)
    };

    // @ts-ignore
    const handleEventDrop = (info) => {

        const {event} = info;

        // Update local state
        setEvents((prevEvents) =>
            prevEvents.map((evt) =>
                evt.id === event.id
                    ? {...evt, start: event.start?.toISOString(), end: event.end?.toISOString()}
                    : evt
            )
        );

        // const terminID = eventDropInfo.oldEvent.id;
        // const newStart = eventDropInfo.event.start.toISOString();
        // const newEnd = eventDropInfo.event.end.toISOString();
        //
        //
        // const newEvent = {
        //     id: terminID,
        //     newStart: newStart,
        //     newEnd: newEnd
        // }
        //
        // try {
        //     await fetch(`http://localhost:3010/api/termins/updateDraggedTermin`, {
        //         method: 'PUT',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify(newEvent)
        //     });
        // } catch (err) {
        //     console.error('Error:', err);
        //     console.log('An error occurred while creating the termin.');
        // }
    }

    return (
        <>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView={'timeGridWeek'}
                locale={deLocale}
                headerToolbar={{
                    start: 'prev next myCustomButton',
                    center: 'title',
                    end: 'today dayGridMonth timeGridWeek dayGridWeek timeGridDay'
                }}
                customButtons={{
                    myCustomButton: customButton
                }}
                events={events}
                nowIndicator={true}
                editable={true}
                droppable={true}
                selectable={false}
                selectMirror={true}
                // dateClick={{}}
                eventClick={handleEventClick}
                dayHeaderFormat={{weekday: 'long', month: 'short', day: 'numeric', omitCommas: false}}
                slotLabelFormat={{hour: '2-digit', minute: '2-digit', hour12: false}}
                firstDay={1}
                allDayText={"Ganzt."}
                scrollTime={"08:00:00"}
                height={'100%'}
                eventDrop={handleEventDrop}
            />
            {showClickPopup && eventInfo && (<ClickPopup eventInfo={eventInfo}
                                                         onClose={() => {
                                                             setShowClickPopup(false)
                                                         }}
                                                         updateClick={updateClick}/>)}
        </>
    )
}


export default Calendar;