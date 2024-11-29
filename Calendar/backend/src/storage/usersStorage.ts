import {UserInterface} from "../types/userInterface";

export let usersStorage = [
    {
        azubiKey : 'vik-laz',
        vorname: 'Viktor',
        nachname: 'Lazarov',
        ausbildungsbeginn: new Date('2024-11-01'),
        ausbildungsende: new Date('2024-11-30'),
        abteilung: 'entwicklung',
        team: 'FiBu',
        bundesland: 'RP',
        standort: 'Koblenz'
    },
    {
        azubiKey : 'vik2-laz2',
        vorname: 'Viktor2',
        nachname: 'Lazarov2',
        ausbildungsbeginn: new Date('2024-11-01'),
        ausbildungsende: new Date('2024-11-30'),
        abteilung: 'entwicklung2',
        team: 'FiBu',
        bundesland: 'RP',
        standort: 'Koblenz'
    },
    {
        azubiKey : 'vik3-laz3',
        vorname: 'Viktor3',
        nachname: 'Lazarov3',
        ausbildungsbeginn: new Date('2024-11-01'),
        ausbildungsende: new Date('2024-11-30'),
        abteilung: 'entwicklung3',
        team: 'FiBu',
        bundesland: 'RP',
        standort: 'Koblenz'
    }
    ,
    {
        azubiKey : 'vik3-laz3',
        vorname: 'Viktor3',
        nachname: 'Lazarov3',
        ausbildungsbeginn: new Date('2024-11-01'),
        ausbildungsende: new Date('2024-11-30'),
        abteilung: 'entwicklung3',
        team: 'FiBu',
        bundesland: 'RP',
        standort: 'Koblenz'
    }
]

module.exports = { usersStorage };