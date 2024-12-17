<template>
    <!-- Header med meny och hero bild -->
    <header>
        <div>
            <!-- Ikon med länk samt Heading och subheading -->
            <div class="hero-body" id="heroBody">
                <!-- länk till startsidan från en ikon -->
                <RouterLink to="/" class="">
                    <img src="/src/assets/menu_icon.png" alt="logotyp med texten WP workout plan">
                </RouterLink>
                <p class="title">
                    THE WORKOUT PLAN
                </p>
                <p class="subtitle">
                    Planera din träningsvecka.
                </p>
            </div>
            <!-- Används som bakgrund till bannern -->
            <img src="/src/assets/img/scott-webb-unsplash.jpg" alt="Vältränad tjej som taggar till för att träna mer.">
        </div>
        <!-- Navigering hamburgermeny -->
        <nav class="navbar" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false"
                    data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <!-- Menyns länkar -->
            <div id="navbarBasicExample" class="navbar-menu">
                <ul class="navbar-start">
                    <li>
                        <RouterLink to="/" class="navbar-item"><i class="material-icons">home</i> Hem</RouterLink>
                    </li>

                    <li>
                        <RouterLink to="/workoutplan" class="navbar-item"><i
                                class="material-icons">perm_contact_calendar</i> WorkoutPlan</RouterLink>
                    </li>

                    <li>
                        <RouterLink to="/about" class="navbar-item"><i class="material-icons">info</i> Om</RouterLink>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
</template>

<script>

//Kod som följde med Bulma menyn för att läsa in och styra hamburgermenyn
document.addEventListener('DOMContentLoaded', () => {
    // Läser in alla "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Lägger till ett click event för var och en av dem
    $navbarBurgers.forEach(el => {
        el.addEventListener('click', () => {

            // Hämtar target från "data-target"
            const target = el.dataset.target;
            const $target = document.getElementById(target);

            // ändrar läge på "is-active" klassen
            el.classList.toggle('is-active');
            $target.classList.toggle('is-active');
        });
    });
});
</script>


<style scoped>
/* styling för att flytta hela orginal bannern ovanpå bannerbilden */ 
#heroBody {
    position: absolute;
    top: 50px;
    left: 50px;
}

#heroBody p {
    color: white;
}

/* Gör att bannern fungerar på små skärmar. */ 
@media only screen and (max-width: 700px) {

    #heroBody {
        top: 0;
        left: 0;
    }

    #heroBody img {
        width: 80px;
    }

    #heroBody p {
        width: 100%;
    }

}
</style>