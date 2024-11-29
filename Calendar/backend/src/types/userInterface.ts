export interface UserInterface {
    ID?: number,
    AzubiKey: string,
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