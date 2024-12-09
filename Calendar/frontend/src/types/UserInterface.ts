import {Buffer} from '../components/main/AzubiCard.tsx'
export interface UserInterface {
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
    Bild?: Buffer
}