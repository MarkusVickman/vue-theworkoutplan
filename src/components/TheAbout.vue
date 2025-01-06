<template>
<!-- vanlig section med lite styling -->
    <section class="container section">
        <h1 class="title">Om webbplatsen</h1>
        <p class="subtitle">En kursuppgift om Vue.JS</p>
        <p>Den här webbplatsen är en deluppgift i kursen DT192G - Fullstacks-utveckling med ramverk. Uppgiften gick ut
            på att skapa en Vue.Js applikation om ett intresse. Webbplatsen ska innehålla bland annat:</p>

        <ul class="fix-list">
            <li>Webbplatsen ska bestå av 3 sidor.</li>
            <li>Stor headerbild</li>
            <li>Vue.Js routing</li>
            <li>Komponentspecifik CSS</li>
            <li>Ska innehålla props, emits, reaktiv-data, two-way-binding</li>
            <li>Responsiv design</li>
        </ul>
    </section>

    <!-- vanlig section med lite styling -->
    <section class="container section">
        <h1 class="title">Vue.JS</h1>
        <p class="subtitle">Ett frontend-ramverk för single page applikationer</p>
        <p>När jag startade upp mitt första Vue-projekt var mitt första intryck att det såg relalivt lätt ut. Jag
            förstod ungefär hur vyer och och routes var tänka att användas.
            Jag hade dock svårt att förstå hur komponenternas JavaScript skulle användas och jag lyckades inte alls
            arbeta mot DOM. Jag ogillar kur dokumentationen är skriven och strukturerad för Vue. För mig var den ofta
            ganska obegriplig.</p>
        <p>När "bitarna" började falla på plats och när jag började förstå hur "export default"-klassen skulle användas
            kunde jag skapa en väldigt behaglig app med ändå relativt lite kod.
            Det gick lätt att skriva ut till webbsidan även om viss manupulation av dynamiskt innehåll var svårt jämfört
            med vanlig JavaScript till en vanlig icke virutuell DOM.</p>
            <p>Jag upplever att det ändå är ganska
            svårt att lära sig nya funktioner i Vue.Js just på grund av dess dokumentation som jag ogillar. Det ska
            också nämnas att mycket går att lösa på olika sätt när man arbetar med Vue.Js vilket gör det lite
            obegripligt men
            samtidigt väldigt anpassningsbart. </p>
    </section>
</template>

<!-- Styling av punktlista -->
<style scoped>
.fix-list {
    list-style: initial;
    padding: 30px 0 30px 50px;
    font-size: 0.9rem;
}

p {
    margin-bottom: 10px;
}
</style>