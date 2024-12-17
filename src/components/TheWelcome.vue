<script setup>
import Section from '../components/WidgetProps.vue';
</script>

<template>

  <!-- vanlig section med lite styling -->
  <section class="container section">
    <h1 class="title">Träning</h1>
    <p class="subtitle">Ett hälsosamt intresse</p>
    <p>Även om träning ser olika ut för olika personer så är träning aktiviteter som utförs med syfte att bibehålla
      eller utöka sina förmågor. The Workout Plan syftar på fysiskträning och det kan leda till:
    </p>
    <ul class="fix-list">
      <li>Ökad struktur i vardagen</li>
      <li>Mer energi och ork</li>
      <li>Bättre hållning</li>
      <li>Förbättrade hälsomarkörer</li>
      <li>Styrkeökningar</li>
      <li>Ändrad kroppskomposition</li>
      <li>Skadeförebyggande</li>
    </ul>
    <p>
      Träning kan även ha negativa effeker som exempel:
    </p>
    <ul class="fix-list">
      <li>Tidskrävande</li>
      <li>Kan ge skador</li>
    </ul>
  </section>

  <!-- vanlig section med lite styling -->
  <section class="container section">
    <h1 class="title">The Workout Plan</h1>
    <p class="subtitle">Din träningsvecka</p>
    <p>Här kan du planera din träningsvecka. Det går att lägga till övningar som är tänkta att slutföra samma vecka. När
      en övning är klar går den att klarmarkera. När alla övningar i tabellen är slutförda är din träningsvecka slut.
    </p>
  </section>

<!-- Skriver ut information till skärmen med hjälp av props. Propsen innehåller titel, subtitle och text med styling -->
  <Section title="Widget area" subtitle="Widget area för Vue props" text='Denna Widget area för props kan ta emot text i form av "text", "subtitle" och "title".' />

</template>

<!-- Styling av punktlista -->
<style scoped>
.fix-list {
  list-style: initial;
  padding: 30px 0 30px 50px;
  font-size: 0.9rem;
}
</style>