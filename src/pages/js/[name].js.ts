import type { APIRoute, GetStaticPaths } from 'astro';
import { maengel } from '../../data/maengel';

// Mängelfassung: ein großes, nicht verkleinertes Slider-Skript, das im Kopf jeder Seite den Aufbau blockiert und beim
// Start rechnet. Die Seite nutzt es nicht; so etwas bleibt oft von einem alten Theme übrig. Nur im Build mit MAENGEL=1.
export const getStaticPaths = (() => (maengel ? [{ params: { name: 'slider' } }] : [])) satisfies GetStaticPaths;

const effekt = (i: number) => `
  /**
   * Übergangseffekt ${i}: blendet die aktuelle Folie aus und die nächste ein.
   * Wird nur genutzt, wenn der Slider mit der Option effekt: ${i} gestartet wird.
   */
  Slider.prototype.effekt${i} = function (aktuell, naechste, dauer) {
    var schritte = Math.max(1, Math.round(dauer / 16));
    var start = Date.now();
    var self = this;
    function schritt() {
      var anteil = Math.min(1, (Date.now() - start) / dauer);
      aktuell.style.opacity = String(1 - anteil);
      naechste.style.opacity = String(anteil);
      aktuell.style.transform = 'translateX(' + (-anteil * ${(i % 7) + 3}) + '%)';
      naechste.style.transform = 'translateX(' + ((1 - anteil) * ${(i % 5) + 2}) + '%)';
      if (anteil < 1) { self.timer = setTimeout(schritt, 16); } else { self.ende(aktuell, naechste, schritte); }
    }
    schritt();
  };
`;

const code = `/*!
 * Slider 2.4.1 – Bildergalerie mit Übergangseffekten
 * Dieses Skript wird auf allen Seiten geladen.
 */
(function () {
  'use strict';

  function Slider(element, optionen) {
    this.element = element;
    this.optionen = optionen || {};
    this.index = 0;
    this.timer = null;
  }

  Slider.prototype.ende = function (aktuell, naechste) {
    aktuell.classList.remove('aktiv');
    naechste.classList.add('aktiv');
  };
${Array.from({ length: 900 }, (_, i) => effekt(i + 1)).join('')}
  // Effekte beim Start vorbereiten: rechnet für jeden Effekt eine Tabelle mit Zwischenwerten
  var tabellen = [];
  for (var e = 0; e < 900; e++) {
    var tabelle = [];
    for (var s = 0; s < 6000; s++) {
      tabelle.push(Math.sin(s / 6000 * Math.PI) * Math.cos(e / 900 * Math.PI) + Math.sqrt(s + e));
    }
    tabellen.push(tabelle);
  }
  Slider.tabellen = tabellen;

  window.Slider = Slider;
})();
`;

export const GET: APIRoute = () => new Response(code, { headers: { 'Content-Type': 'text/javascript; charset=utf-8' } });
