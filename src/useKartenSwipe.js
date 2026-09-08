import { useRef, useState } from "react";

// Touch-Swipe als Alternative zu den "Kann ich"/"Kann ich noch nicht"-Buttons
// auf der obersten Karte im Stapel (Dashboard + Daily Learning nutzen beide
// dasselbe Kartenstapel-Muster, siehe .tageskarte in php-design.css) -
// links wischen = "Kann ich", rechts wischen = "Kann ich noch nicht" (gleiche
// Reihenfolge wie die beiden Buttons daneben). Reine touch-Events statt z.B.
// Mausklick+Drag, weil eine Maus KEINE touch-Events ausloest - Desktop-Nutzer
// merken davon nichts und bleiben ganz normal bei den Buttons, das Wischen
// ist automatisch nur auf Touch-Geraeten (Handy/Tablet) aktiv.
const SCHWELLE = 80; // ab wieviel px seitlichem Versatz gilt der Wisch als Kann-ich/-noch-nicht

export function useKartenSwipe(kannIch, kannIchNicht) {
    // versatz liegt in einem Ref, NICHT in State - bei einem schnellen Wisch
    // feuern touchmove/touchend oft mehrfach im selben Tick, bevor React
    // ueberhaupt neu rendert. Ein State-Wert waere in onTouchEnd dann noch
    // der VERALTETE Stand von vor dem Wisch (Closure zeigt auf den Stand
    // beim letzten Render) - die Schwellen-Pruefung wuerde nie auslösen. Ein
    // Ref wird dagegen SOFORT aktualisiert, unabhaengig vom Render-Zyklus.
    // renderTick ist nur dazu da, React zum Neuzeichnen zu zwingen (fuer die
    // visuelle Verschiebung waehrend des Ziehens), der Zahlenwert selbst ist
    // irrelevant.
    const versatzRef = useRef(0);
    const startX = useRef(null);
    const [, setRenderTick] = useState(0);

    function onTouchStart(event) {
        startX.current = event.touches[0].clientX;
    }

    function onTouchMove(event) {
        if (startX.current === null) return;
        versatzRef.current = event.touches[0].clientX - startX.current;
        setRenderTick((tick) => tick + 1);
    }

    function onTouchEnd() {
        if (startX.current === null) return;
        const versatz = versatzRef.current;
        if (versatz > SCHWELLE) {
            kannIchNicht();
        } else if (versatz < -SCHWELLE) {
            kannIch();
        }
        startX.current = null;
        // Zuruecksetzen noetig, egal ob geswiped wurde oder nicht - sonst
        // haengt entweder die naechste Karte schon verschoben da, oder die
        // aktuelle springt nicht sauber in die Mitte zurueck.
        versatzRef.current = 0;
        setRenderTick((tick) => tick + 1);
    }

    return {
        handlers: { onTouchStart, onTouchMove, onTouchEnd },
        // Leichte Rotation je nach Richtung, wie beim "Wegwischen" einer
        // Karte - transition nur im Ruhezustand (versatz 0), sonst wuerde
        // sie dem Finger beim Ziehen leicht hinterherhinken.
        style: {
            transform: `translateX(${versatzRef.current}px) rotate(${versatzRef.current / 20}deg)`,
            transition: versatzRef.current === 0 ? "transform 0.25s ease" : "none",
        },
    };
}
