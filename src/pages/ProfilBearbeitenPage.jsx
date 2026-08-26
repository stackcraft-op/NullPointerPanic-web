import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { profilSpeichern, holeProfil } from "../api";
import { useEffect } from "react";

function ProfilBearbeitenPage ({profilDaten, setProfilDaten}){
    const navigate = useNavigate();

    // Beim Öffnen der Seite automatisch die echten, gespeicherten Profildaten
    // des eingeloggten Nutzers laden (nicht in einer Klick-Funktion, weil es
    // von selbst beim Öffnen passieren soll - dafür ist useEffect da).
    useEffect(() => {
        holeProfil().then((daten) => {
            setProfilDaten({
                vorname: daten.first_name || "",
                nachname: daten.last_name || "",
                fachbereich: daten.specialization || "",
                stadt: daten.city || "",
                bundesland: daten.state || "",
            });
        });
    }, []);

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
            <select
                value={profilDaten.bundesland}
                onChange={(event) => setProfilDaten({ ...profilDaten, bundesland: event.target.value })}>
                <option value="">Bundesland auswählen</option>
                <option value="Baden-Württemberg">Baden-Württemberg</option>
                <option value="Bayern">Bayern</option>
                <option value="Berlin">Berlin</option>
                <option value="Brandenburg">Brandenburg</option>
                <option value="Bremen">Bremen</option>
                <option value="Hamburg">Hamburg</option>
                <option value="Hessen">Hessen</option>
                <option value="Mecklenburg-Vorpommern">Mecklenburg-Vorpommern</option>
                <option value="Niedersachsen">Niedersachsen</option>
                <option value="Nordrhein-Westfalen">Nordrhein-Westfalen</option>
                <option value="Rheinland-Pfalz">Rheinland-Pfalz</option>
                <option value="Saarland">Saarland</option>
                <option value="Sachsen">Sachsen</option>
                <option value="Sachsen-Anhalt">Sachsen-Anhalt</option>
                <option value="Schleswig-Holstein">Schleswig-Holstein</option>
                <option value="Thüringen">Thüringen</option>
            </select>

            <button onClick={()=> zurueck()}>Zurück</button>
            <button onClick={()=> speichern()}>Speichern</button>
        </div>
    )
}
export default ProfilBearbeitenPage;