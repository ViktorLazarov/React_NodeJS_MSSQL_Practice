export async function getStandort(azubiKey: string): Promise<string> {
    console.log(azubiKey)
    try {
        const response = await fetch(`http://localhost:3010/api/azubis/getStandort/${azubiKey}`);
        const data = await response.json();
        if (data.ok) {
            return data.Standort
        } else {
            return null
        }
    } catch (error) {
        console.error('Error fetching Standort:', error);
        throw error;
    }
}

