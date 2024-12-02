// @ts-ignore
import './pagesCSS/homePage.css'
import {SideBar} from "../components/main/SideBar.tsx";
import {Footer} from "../components/main/Footer.tsx";
import {Header} from "../components/main/Header.tsx";

function HomePage() {
    return (
        <>
            <div className={"main"}>

                <div className={"home-sidebar"}>
                    <SideBar/>
                </div>
                <div className={"left-side-container"}>
                    <Header/>
                    <div className={"content"}>

                        <div className={"left.content"}>

                            <h1>
                                Guten Morgen!

                                <br/>

                                Hier sind die letzten Updates:

                                <br/>


                            </h1>

                            <div className={"news.field1"}>

                                <div className={"x"}>
                                    <img width={'40px'} height={'40px'} src={"../src/assets/mps_logo.png"}
                                         alt={"user picture"}/>
                                </div>

                                <div className={"whole.thing"}>
                                    <div className={"news.Popup"}>
                                        <h2>mps verdoppelt Gewinn in Q3</h2>
                                        <h3>Jetzt</h3>
                                    </div>
                                    <div className={'news-content'}>
                                        <p> Lorem Ipsum jsojkdfh sadf sdaf sdf sdg s daf sda gf sdagf rerewrerw rewr
                                            werwer werewr werewr gfdg gffg gfg gfdggfg fdsfds dsfdsf sfdgghgh grgt
                                            fwerffrgrg </p>
                                    </div>

                                </div>
                            </div>

                            <div className={"news.field1"}>

                                <div className={"x"}>
                                    <img width={'40px'} height={'40px'} src={"../src/assets/mps_logo.png"}
                                         alt={"user picture"}/>
                                </div>

                                <div className={"whole.thing"}>
                                    <div className={"news.Popup"}>

                                        <h2>Geburtstag</h2>
                                        <h3>7 min</h3>

                                    </div>

                                    <p> Lorem Ipsum jsojkdfh sadf sdaf sdf sdg s daf sda gf sdagf </p>
                                    <p className="anzeigen"> mehr anzeigen</p>

                                </div>
                            </div>

                            <div className={"news.field1"}>

                                <div className={"x"}>
                                    <img width={'40px'} height={'40px'} src={"../src/assets/mps_logo.png"}
                                         alt={"user picture"}/>
                                </div>

                                <div className={"whole.thing"}>
                                    <div className={"news.Popup"}>

                                        <h2>Neuer Mitarbeiter</h2>
                                        <h3>12 min</h3>

                                    </div>

                                    <p> Lorem Ipsum jsojkdfh sadf sdaf sdf sdg s daf sda gf sdagf </p>
                                    <p className={"anzeigen"}> mehr anzeigen</p>

                                </div>
                            </div>

                        </div>

                        <div className={"right.content"}>

                            <h1 className={"ueber-uns"}>Über mps </h1>
                            <div className={"news.field2"}>
                                <p><img src={"../src/assets/mps_logo.png"} alt={"mps-logo"} id={'mps-logo-about'}/>
                                    <b>Seit 40 Jahren Know-how im Public Sector </b>
                                    <br/> Die mps public solutions gmbh hat sich auf IT-Lösungen für öffentliche
                                    Verwaltungen und auf die
                                    Beratung für soziale Einrichtungen und Staatsanwaltschaften spezialisiert. Neben den
                                    Kommunen unterstützen
                                    wir Einrichtungen wie Krankenhäuser und Reha-Fachkliniken durch den konsequenten
                                    Einsatz modernster
                                    IT-Lösungen dabei, Prozesse zu optimieren, Ressourcen effizient einzusetzen und
                                    Kosten einzusparen.
                                    Das Unternehmen wurde vor 40 Jahren in Koblenz gegründet und ist heute einer der
                                    führenden Anbieter im
                                    Public Sector. Das Leistungsspektrum umfasst dabei sowohl Software als auch
                                    Beratungskonzepte für Kommunen,
                                    öffentliche und soziale Gesellschaften. Bundesweit, sowie in Österreich, der Schweiz
                                    und weiteren
                                    europäischen und außereuropäischen Ländern arbeiten fast 3.000 kommunale
                                    Verwaltungen und soziale Betriebe
                                    mit Lösungen von mps und seiner Tochterunternehmen! </p>
                            </div>

                            <div className="news.field2">
                                <p><img src="../src/assets/hompage_mps.jpg" alt={"mps-team-photo"}
                                        id={"mps-team-photo"}/>
                                    <b>Deutschlandweit präsent – mit engem Kontakt zum Kunden</b>
                                    <br/>mps bietet ein deutschlandweites Support-Netz und legt hohen Wert auf dessen
                                    hervorragende Qualität.
                                    Rückgrat dieser Organisation sind 5 Niederlassungen in Deutschland: neben dem
                                    Hauptsitz in Koblenz ist mps
                                    in Oberessendorf (Baden-Württemberg), Siegen, Bedburg (Nordrhein-Westfalen), und
                                    unserer Hauptstadt Berlin
                                    vertreten. Ergänzt werden diese Niederlassungen durch zahlreiche Support- und
                                    Vertriebsstützpunkte im
                                    gesamten Bundesgebiet. So kann die intensive Betreuung und Beratung der kommunalen
                                    Verwaltungen und Betriebe
                                    vor Ort lückenlos garantiert werden.</p>
                            </div>

                            <div className="news.field2">
                                <p><b>Offen für die Zukunft</b><br/>Langjährige Erfahrung im Public Sector,
                                    zielgerichtete Wachstumsstrategien
                                    und die Partnerschaft mit Microsoft garantieren Leistungsstärke und
                                    Zukunftssicherheit der
                                    mps-Komplettlösungen.<br/><br/><b>Wir verstehen Verwaltung!</b></p></div>
                        </div>
                    </div>
                </div>

                <Footer/>
            </div>

        </>
    )
}


export default HomePage;
