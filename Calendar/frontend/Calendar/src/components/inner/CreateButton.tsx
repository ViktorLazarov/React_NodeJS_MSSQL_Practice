// @ts-ignore
import '../../css/createButton.css'

function showCreatePopup(): void{
    const createPopup:HTMLElement | null = document.getElementById('createPopup');
    // @ts-ignore
    createPopup.style.display = 'block';
}

export function CreateButton() {
    return (
        <button className={"create-btn"} onClick={showCreatePopup}>+</button>
    )
}