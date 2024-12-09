export interface EventInterface {
    id: string,
    title: string,
    start: string,
    end: string,
    allDay?: boolean,
    className?: string,
    backgroundColor?: string,
    borderColor?: string,
    textColor?: string,
    extendedProps?: {
        description?: string,
        location?: string
    }
}