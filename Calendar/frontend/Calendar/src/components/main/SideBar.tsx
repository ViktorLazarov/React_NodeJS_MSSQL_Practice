// @ts-ignore
import "../../css/sideBar.css"

export const SideBar = () => {
    return (
        <>
            <aside className="main-sidebar">
                <a className={'homeLink'} href={'/home'}>Home</a>
                <a className={'calendarLink'} href={'/calendar'}>Calendar</a>
                <a className={'infoLink'} href={'/info'}>Informationen</a>
                <a className={'azubisLink'} href={'/azubis'}>Azubis</a>
            </aside>
        </>
    )
}