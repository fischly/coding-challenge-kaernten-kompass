<script setup lang="ts">

</script>

<template>
    <div class="min-h-screen bg-gray-50">
        <!-- Header -->
        <div class="bg-white border-b border-gray-200">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div class="flex justify-between items-center">
                    <NuxtLink to="/" class="flex items-center space-x-4">
                        <img src="/logo.svg" alt="Kärnten Kompass Logo" class="h-7 w-auto" />
                        <span class="text-lg font-semibold text-gray-900">Kärnten Kompass</span>
                    </NuxtLink>
                    <NuxtLink to="/" class="flex items-center space-x-4">
                        <span
                            class="text-primary hover:text-primary/80 transition-colors duration-200 text-sm cursor-pointer">
                            ← Zurück zur Startseite
                        </span>
                    </NuxtLink>
                </div>
            </div>
        </div>

        <!-- Main Content -->
        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 p-10">
            <div class="bg-white rounded-lg shadow-sm p-14">
                <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-2 text-center">Impressum</h1>
                <h2 class="text-xl font-bold text-gray-700 mb-8 text-center">(oder eher eine kleine Zusammenfassung der
                    Coding
                    Challenge)</h2>

                <div class="prose prose-gray [&_h4]:mt-8 mx-auto">
                    <h3>Zuallererst: Danke für's Anschauen meiner Coding Challenge! :)</h3>

                    <p>Da diese private Webseite ja nicht unter die Impressumspflicht fällt, will ich hier stattdessen
                        eine kleine Zusammenfassung zu meinen Gedanken und Entscheidungen bei der Coding Challenge
                        geben.</p>

                    Mein Hauptfokus bei der Challenge waren die folgenden Punkte:
                    <ol class=" list-inside marker:text-primary">
                        <li>Einheitliches und professionelles Design</li>
                        <li>Performance der Webseite</li>
                        <li>Responsive Design</li>
                    </ol>



                    <h4>1. Einheitliches und professionelles Design</h4>

                    <p>Bei jedem Projekt steht am Anfang die Namenssuche. Als erstes kam mir die Idee "kärnten.live" in
                        den Sinn, als Anspielung auf den "Kärnten - It's my life" Slogan. Da das aber eher an einen
                        Livestream o.Ä. erinnert, habe ich diese Idee gelassen und bin auf "Kärnten Kompass" gekommen -
                        ein Tool welches Menschen helfen soll, Veranstaltungen zu finden und damit in gewisserweise die
                        Richtung vorgibt.
                    </p>
                    <p>
                        Dann ging es auch gleich schon an die Logo-Erstellung. Inspiriert von <a
                            href="https://www.kaernten.at">kaernten.at</a>, habe ich das Kärnten-Logo benutzt und mit
                        einem "Kompass" versehen. Auch was Farben angeht, habe ich mich an die vorhandenene "Corporate
                        Identity" gehalten.
                    </p>
                    <p>
                        Danach habe ich die angegebene Veranstaltungs-API analysiert. Die Dokumentation dazu war zum
                        Glück sehr gut und durch eine "Semantic Web" Lehrveranstaltung auf der Universität war ich mit
                        den Konzepten wie JSON-LD und Ontologien schon vertraut.
                    </p>
                    <h4>2. Performance der Webseite</h4>
                    <p>
                        Nach der Analyse, habe ich mich entschieden, für eine möglichst performante Lösung, die Anzeige
                        der Event Liste nur Client-seitig abzufragen, ohne damit das Rendern der Seite zu blockieren (da
                        die API-Abfrage teilweise sehr lange dauern kann). Dadurch kann der statische Content der Seite
                        schnell geladen werden und der Benutzer sieht gleich eine interaktive, navigierbare Webseite.
                        Die Event Liste wird dann dynamisch geladen (während des Ladens werden animierte Platzhalter
                        angezeigt). <br> Um auch möglichst schnell Informationen zu einem Event zu bekommen, wird beim
                        Anzeigen der Event-Detail Seite zuerst die gecachte version der Übersicht verwendet (z.B. für
                        Titel, Beschreibung, Bild des Events). Das heißt, beim Klicken auf ein Event in der Übersicht
                        werden diese Informationen sofort angezeigt. Weitere Informationen (z.B. weitere Termine,
                        Veranstalter) werden im Hintergrund mit einem API-Request nachgeladen. Dadurch wirkt die Seite
                        besonders interaktiv.
                    </p>
                    <p>Ich habe versucht, die Daten der API möglichst vollständig und sinnvoll abzubilden. Auch wenn es
                        vermutlich nicht nötig war, habe ich eine kleine eigene API als Layer zwischen der
                        data.carinthia.com
                        API und der Webseite implementiert. So können allfällige Transformationen o.Ä. performant am
                        Server ausgeführt werden. Außerdem kann so das Caching der Daten selbst gesteuert werden und das
                        Authentification-Token wird nicht an den Client weitergegeben. Mit Nuxt ist das ja auch sehr
                        einfach möglich.</p>
                    <p>
                        Die Filter, die auf der Webseite dargestellt werden, werden an die API übergeben. Für den
                        Datumsfilter wurde eine Library (VCalendar) benutzt.
                    </p>
                    <h4>3. Responsive Design</h4>
                    <p>
                        Die gesamte Webseite ist "mobile-first" entwickelt. Das heißt, alle relevanten Elemente passen
                        sich an die Größe des Viewports an. Zum Beispiel, ändert sich die Spaltenanzahl der Event-Liste
                        auf kleineren Displays.
                    </p>



                    <h4>Offene Punkte</h4>
                    <p>
                        Da ich mir nicht zu viel Zeit für die Challenge nehmen wollte (ca. 2-3 Tage), sind einige
                        Punkte, die in einem
                        professionellen Produkt selbstverständlich wären, noch nicht umgesetzt worden.
                    </p>
                    <p>
                        Dazu zählen zum Beispiel:
                    </p>
                    <ul class="list-disc marker:text-primary">
                        <li><strong>Ausführliches Testing:</strong> Angefangen von Unit Tests für diverse
                            Utility-Funktionen bis hin zu E2E Tests mit Cypress.</li>
                        <li><strong>CI/CD:</strong> Da ich die Webseite auf meinem privaten Server hoste, benutze ich
                            nur sehr rudimentäre CI.</li>
                        <li><strong>SEO:</strong> Die grundlegenden meta-Tags sind vorhanden, aber diese könnten noch
                            verbessert werden. Zum Beispiel, könnte überlegt werden, ob und wie mehr Inhalt über SSR/SSG
                            geschickt werden kann um eine bessere Suchmaschinen Indexierung ohne große
                            Performance-Einbußen zu erreichen.</li>
                    </ul>

                    <h4>Abschließende Worte</h4>
                    <p>
                        Abschließend hoffe ich, dass Ihnen meine Lösung gefällt und sich mein Bemühen gelohnt hat.
                        Vielen Dank für Ihre Zeit!
                    </p>
                    <p>Felix Mitterer - <a href="fischly.dev">fischly.dev</a></p>

                    <p class="mt-3">Link zum Github Repository: <a
                            href="https://github.com/fischly/coding-challenge-kaernten-kompass">https://github.com/fischly/coding-challenge-kaernten-kompass</a>
                    </p>

                    <h4>Benutzte Medien</h4>
                    <p>Bilder im Kompass-Karussel:
                    <ul class="list-disc marker:text-primary">
                        <li>Pyramidenkogel: Von Gert Steinthaler - Wörthersee Tourismus GmbH, <a
                                href="https://creativecommons.org/licenses/by-sa/4.0"
                                title="Creative Commons Attribution-Share Alike 4.0">CC BY-SA 4.0</a>, <a
                                href="https://commons.wikimedia.org/w/index.php?curid=77713854">Link</a></li>
                        <li>Villacher Kirchtag: Von <a href="//commons.wikimedia.org/wiki/User:Naturpuur"
                                title="User:Naturpuur">Naturpuur</a> - <span class="int-own-work" lang="de">Eigenes
                                Werk</span>, <a href="https://creativecommons.org/licenses/by-sa/4.0"
                                title="Creative Commons Attribution-Share Alike 4.0">CC BY-SA 4.0</a>, <a
                                href="https://commons.wikimedia.org/w/index.php?curid=61602407">Link</a></li>
                        <li>Skifahrer: Image by <a
                                href="https://pixabay.com/users/up-free-427519/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=498473">Oleksandr
                                Pyrohov</a> from <a
                                href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=498473">Pixabay</a>
                        </li>
                        <li>Markt: Photo by Daniel Żabiński: <a
                                href="https://www.pexels.com/photo/vibrant-fresh-produce-market-in-vienna-austria-31781036/">Link</a>
                        </li>
                        <li>Nudeln: Image by <a
                                href="https://pixabay.com/users/zsolthubicska-4364871/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=2015132">Zsolt
                                Hubicska</a> from <a
                                href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=2015132">Pixabay</a>
                        </li>
                    </ul>
                    </p>

                    <p>
                        Fonts:
                    <ul class="list-disc marker:text-primary">
                        <li>NebulaSans: <a href="https://nebulasans.com">https://nebulasans.com</a></li>
                        <li>Caveat: <a
                                href="https://fonts.google.com/specimen/Caveat">https://fonts.google.com/specimen/Caveat</a>
                        </li>
                    </ul>
                    </p>
                </div>
            </div>
        </main>
    </div>
</template>