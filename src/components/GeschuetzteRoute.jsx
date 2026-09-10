import { Navigate } from "react-router-dom";

// Schuetzt eine Route vor Zugriff ohne Login: prueft, ob ein Token in
// localStorage liegt (dieselbe Quelle, die api.js fuer den Authorization-
// Header verwendet, siehe api.js). Fehlt er, wird sofort zu /login
// umgeleitet, statt die eigentliche Seite zu zeigen - die waere ohnehin
// leer/kaputt, weil jeder ihrer API-Calls ohne Token mit 401 fehlschlaegt.
// "replace" verhindert, dass die geschuetzte URL in der Browser-History
// bleibt (kein Zurueck-Button-Sprung zurueck auf die leere Seite).
function GeschuetzteRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default GeschuetzteRoute;
