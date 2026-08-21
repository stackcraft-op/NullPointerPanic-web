import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { profilSpeichern } from "../api";

function ProfilBearbeitenPage ({profilDaten, setProfilDaten}){
    const navigate = useNavigate();
    async  function speichern() {
        try{
            await profilSpeichern(profilDaten);
            navigate("/profil");
        }
        catch(fehler){
            console.log(fehler.message);
        }
        
    }

    function zurueck() {
        navigate("/profil");
    }
    return (
        <div>
            <Navbar/>
            <h1>Profil Bearbeiten</h1>

            <input
                type = "text"
                value={profilDaten.vorname}
                onChange={(event) => setProfilDaten({...profilDaten,vorname:event.target.value})}
                placeholder="Vorname"
                />
            <input 
                type = "text"
                value={profilDaten.nachname}
                onChange={(event)=> setProfilDaten({...profilDaten,nachname:event.target.value})}
                placeholder="Nachname"
                />
            <select
                value={profilDaten.fachbereich}
                onChange={(event)=> setProfilDaten({...profilDaten,fachbereich:event.target.value})}>
                <option value="">Fachbereich auswählen</option>
                <option value="FISI">Systemintegration</option>
                <option value="FIAE">Anwendungsentwicklung</option>
                </select>
            <input type="text"
                value={profilDaten.stadt}
                onChange={(event)=>setProfilDaten({...profilDaten,stadt:event.target.value})}
                placeholder="Stadt"/>
            <input
                type="text"
                value={profilDaten.bundesland}
                onChange={(event) => setProfilDaten({ ...profilDaten, bundesland: event.target.value })}
                placeholder="Bundesland"
                />
            <button onClick={()=> zurueck()}>Zurück</button>
            <button onClick={()=> speichern()}>Speichern</button>
        </div>
    )
}
export default ProfilBearbeitenPage;