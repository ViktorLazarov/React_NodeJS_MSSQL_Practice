export interface User {
    ID: number,
    azubiKey: string,
    vorname: string,
    nachname: string,
    ausbildungsbeginn: Date,
    ausbildungsende: Date,
    abteilung: string,
    team: string,
    bundesland: string,
    standort: string,
    Bild: Buffer
}