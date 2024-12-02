export function validateInput(vorname: string, nachname: string, ausBeginn: string, ausEnde: string, stadt: string, abteilung: string, team: string, userPic: File): boolean {
    if (!vorname) {
        alert('Please enter a valid Vorname');
        return false;
    }
    if (!nachname) {
        alert('Please enter a valid Nachname');
        return false;
    }
    if (ausBeginn >= ausEnde) {
        alert('Ausbildungsbeginn can not be equal or after Ausbildungsende');
        return false;
    }
    if (!stadt) {
        alert('Please choose a Stadt');
        return false;
    }
    if (!abteilung) {
        alert('Please choose Abteilung');
        return false;
    }
    if (!team) {
        alert('Please choose a Team');
        return false;
    }
    if (!userPic) {
        alert('Please upload a user Picture');
        return false;
    }
    return true;
}