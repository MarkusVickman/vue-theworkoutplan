<template>
    <!-- Section som är en props som används för struktur och styling i TheWelcome komponenten -->
    <section class="container section">
        <h1 class="title">{{ title }}</h1>
        <p class="subtitle">{{ subtitle }}</p>
        <p>{{ text }}</p>
    </section>
</template>

<script>
//Export klass med props
export default {
    name: "Section",
    props: ['title', 'subtitle', 'text']
}
</script>