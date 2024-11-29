import {Buffer} from '../components/inner/UserCard.tsx'
export interface User {
    ID?: number,
    Azubikey: string,
    Vorname: string,
    Nachname: string,
    Ausbildungsbeginn: Date,
    Ausbildungsende: Date,
    Abteilung: string,
    Team: string,
    Bundesland: string,
    Standort: string,
    Bild?: Buffer | string | ArrayBuffer
}