import { useRef, useState } from "react";

// Touch-Swipe als Alternative zu den "Kann ich"/"Kann ich noch nicht"-Buttons
// auf der obersten Karte im Stapel (Dashboard + Daily Learning nutzen beide
// dasselbe Kartenstapel-Muster, siehe .tageskarte in App.css) - links wischen
// = "Kann ich", rechts wischen = "Kann ich noch nicht" (gleiche Reihenfolge
// wie die beiden Buttons daneben). Reine touch-Events statt z.B. Mausklick+
// Drag, weil eine Maus KEINE touch-Events ausloest - Desktop-Nutzer merken
// davon nichts und bleiben ganz normal bei den Buttons, das Wischen ist
// automatisch nur auf Touch-Geraeten (Handy/Tablet) aktiv.
//
// Optik an Quizlet angelehnt (User-Wunsch, 08.09): waehrend des Ziehens
// faerbt sich ein Label über der Karte langsam ein (zeigt, in welche
// Richtung der Wisch gerade zaehlen wuerde), bei einem bestaetigten Wisch
// fliegt die Karte komplett aus dem Bild raus, BEVOR die naechste Karte
// erscheint - vorher wurde die Karte sofort durch die naechste ersetzt UND
// gleichzeitig zurueckgefedert, was wie ein Ruckler aussah.
const SCHWELLE = 80; // ab wieviel px seitlichem Versatz gilt der Wisch als Kann-ich/-noch-nicht
const MAX_ROTATION = 12; // Grad - Obergrenze fuer die Kippung, egal wie weit gezogen wird
const AUSFLUG_DISTANZ = 500; // px, wie weit die Karte beim Bestaetigen rausfliegt
const AUSFLUG_DAUER = 220; // ms - muss zur Transition unten passen

export function useKartenSwipe(kannIch, kannIchNicht) {
    // versatz liegt in einem Ref, NICHT in State - bei einem schnellen Wisch
    // feuern touchmove/touchend oft mehrfach im selben Tick, bevor React
    // ueberhaupt neu rendert. Ein State-Wert waere in onTouchEnd dann noch
    // der VERALTETE Stand von vor dem Wisch (Closure zeigt auf den Stand
    // beim letzten Render) - die Schwellen-Pruefung wuerde nie ausloesen. Ein
    // Ref wird dagegen SOFORT aktualisiert, unabhaengig vom Render-Zyklus.
    const versatzRef = useRef(0);
    const startX = useRef(null);
    // "ziehen" = Finger auf dem Screen, folgt 1:1 ohne Transition.
    // "fliegt" = Karte animiert nach draussen, Aufruf von kannIch()/
    // kannIchNicht() (und damit der Kartenwechsel) erst NACH der Animation.
    // "ruhe" = Ausgangszustand, mittig, keine Karte in Bewegung.
    const phaseRef = useRef("ruhe");
    const [, setRenderTick] = useState(0);

    function neuZeichnen() {
        setRenderTick((tick) => tick + 1);
    }

    function onTouchStart(event) {
        if (phaseRef.current === "fliegt") return; // waehrend die alte Karte noch rausfliegt, keinen neuen Zug annehmen
        startX.current = event.touches[0].clientX;
        phaseRef.current = "ziehen";
    }

    function onTouchMove(event) {
        if (startX.current === null) return;
        versatzRef.current = event.touches[0].clientX - startX.current;
        neuZeichnen();
    }

    function onTouchEnd() {
        if (startX.current === null) return;
        const versatz = versatzRef.current;
        startX.current = null;

        if (versatz > SCHWELLE || versatz < -SCHWELLE) {
            const nachRechts = versatz > 0;
            phaseRef.current = "fliegt";
            versatzRef.current = nachRechts ? AUSFLUG_DISTANZ : -AUSFLUG_DISTANZ;
            neuZeichnen();
            // Erst NACH der Ausflug-Animation die Karte wirklich wechseln -
            // sonst wuerde React sofort die naechste Karte an der (noch
            // ausgelenkten) Position einblenden und gleichzeitig zurueck-
            // federn, was wie ein Ruckler aussah (urspruenglicher Bug-Report).
            setTimeout(() => {
                if (nachRechts) {
                    kannIchNicht();
                } else {
                    kannIch();
                }
                phaseRef.current = "ruhe";
                versatzRef.current = 0;
                neuZeichnen();
            }, AUSFLUG_DAUER);
        } else {
            phaseRef.current = "ruhe";
            versatzRef.current = 0;
            neuZeichnen();
        }
    }

    const rotation = Math.max(-MAX_ROTATION, Math.min(MAX_ROTATION, versatzRef.current / 20));
    // Wie weit der aktuelle Wisch schon "auf dem Weg" zur Schwelle ist (0-1) -
    // steuert die Deckkraft des Feedback-Labels, waehrend des Ausflugs immer
    // voll sichtbar.
    const anteil = phaseRef.current === "fliegt" ? 1 : Math.min(Math.abs(versatzRef.current) / SCHWELLE, 1);

    return {
        handlers: { onTouchStart, onTouchMove, onTouchEnd },
        style: {
            // Ohne das hier versucht der Browser beim Ziehen zusaetzlich zu
            // unserer eigenen Logik noch seine eigene Touch-Geste (Scrollen/
            // Zurueck-Navigation) auf der Karte auszufuehren - fuehlte sich
            // beim Wisch nach RECHTS besonders stark an (ganze Seite
            // "rutschte" mit), war aber grundsaetzlich in beide Richtungen
            // moeglich. touch-action: none uebergibt dem Browser die
            // Kontrolle komplett an uns.
            touchAction: "none",
            transform: `translateX(${versatzRef.current}px) rotate(${rotation}deg)`,
            transition: phaseRef.current === "fliegt" ? `transform ${AUSFLUG_DAUER}ms ease-in` : phaseRef.current === "ruhe" ? "transform 0.25s ease" : "none",
        },
        // null, solange kaum gezogen wurde (< 15% der Schwelle) - sonst
        // waere schon bei einem winzigen Zittern ein Label zu sehen.
        label: anteil > 0.15 ? {
            text: versatzRef.current < 0 ? "Kann ich" : "Kann ich noch nicht",
            farbe: versatzRef.current < 0 ? "var(--php-success)" : "var(--php-danger)",
            deckkraft: anteil,
        } : null,
    };
}
