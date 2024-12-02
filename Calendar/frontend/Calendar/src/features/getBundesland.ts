export function getBundesland(stadt: string): string {
    let bundesland: string = '';
    if (stadt === 'Koblenz') {
        bundesland = 'RP';
    } else if (stadt === 'Oberessendorf') {
        bundesland = 'BW';
    } else if (stadt === 'Siegen') {
        bundesland = 'NW';
    }
    return bundesland;
}