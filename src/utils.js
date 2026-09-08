// Kleine, seitenuebergreifende Helfer ohne eigenen fachlichen Zuhause (kein
// API-Aufruf, keine Komponente). Bisher nur die Fortschrittsbalken-Logik, die
// urspruenglich in ProfilPage.jsx lag und jetzt auch fuer das Ranking-
// Profil-Popup (SpielerProfilPopup.jsx) gebraucht wird - statt sie ein
// zweites Mal zu tippen, an einer Stelle gepflegt.

// Rails liefert Prozentwerte manchmal als String statt Zahl (z.B. bei
// Decimal-Spalten) - Number(...) erzwingt eine echte Zahl. || 0 faengt
// zusaetzlich undefined/NaN ab. Danach auf [0, 100] geklemmt, damit ein
// kaputter/ungewoehnlicher Wert weder die Balkenbreite noch die Farbe
// durcheinanderbringt - beide nutzen jetzt denselben, sicheren Wert.
export function prozentSicher(wert) {
    const zahl = Number(wert) || 0;
    return Math.min(Math.max(zahl, 0), 100);
}

// Kein Rot/Ampel-Schema (wirkte zu aggressiv) - stattdessen eine sanfte
// Einfaerbung, die zwischen Lila (App-Akzentfarbe) und Gruen interpoliert.
// 0% = reines Lila, 100% = reines Gruen, dazwischen linear gemischt.
export function farbeFuerProzent(prozent) {
    const anteil = prozentSicher(prozent) / 100;
    const lila = [170, 59, 255];
    const gruen = [34, 197, 94];
    const [r, g, b] = lila.map((start, i) => Math.round(start + (gruen[i] - start) * anteil));
    return `rgb(${r}, ${g}, ${b})`;
}
