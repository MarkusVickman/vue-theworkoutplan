<template>
    <!-- Skriver ut information till skärmen med hjälp av props. Propsen innehåller titel, subtitle och text med styling -->
    <WorkoutTable :rowDataToDo="rowDataToDo" :rowDataCompleted="rowDataCompleted" @getAll="getAll" @apiGet="apiGet"
        @apiPost="apiPost" @apiPut="apiPut" @apiDelete="apiDelete" />

</template>

<script>
import WorkoutTable from '../components/Table.vue';
import axios from 'axios';

export default {
    name: 'WorkoutData',
    components: {
        WorkoutTable
    },
    //Data med arrayer för klara och oklara övningar samt data för individuella kolumner och object. Även variabler för meddelande och för att ändra titel på formuläret.
    data() {
        return {
            rowDataToDo: [],
            rowDataCompleted: [],
        };
    },

    //Vid app start hämtas data och skrivs ut till tabellen
    mounted() {
        this.getAll();
    },

    //metoder
    methods: {

        //Hämtar alla inlägg från api
        getAll() {
            axios.get('https://mackes-nest-js-api-1050979898493.europe-north1.run.app/api')
                .then((response) => {

                    // Skapar 2 arrayer där ena lagrar avklarade inlägg och den andra oklara inlägg
                    let arrNotCompleted = [];
                    let arrCompleted = [];
                    response.data.forEach(element => {
                        if (element.isCompleted == false) {

                            arrNotCompleted.push(element)
                        }
                        if (element.isCompleted == true) {
                            arrCompleted.push(element)
                        }
                    });

                    //Inläggen skrivs sedan över till klassens arrayer
                    this.rowDataToDo = arrNotCompleted;
                    this.rowDataCompleted = arrCompleted;
                })

                //Vid fel skrivs felet ut i konsollen samt skriver ut ett meddelande till skärmen
                .catch((error) => {
                    console.log(error);
                    this.eventMessage = "Inga träningsinlägg hittades.";
                })
        },

        //Hämtar ett inlägg med id
        async apiGet(id, callback) {
            await axios.get(`https://mackes-nest-js-api-1050979898493.europe-north1.run.app/api/${id}`)
                .then((response) => {
                    //lagrar in datan till ett object i klassen
                    const postObj = response.data;
                    callback(postObj);
                })

                //Vid fel skrivs felet ut i konsollen samt skriver ut ett meddelande till skärmen
                .catch((error) => {
                    console.log(error);
                    this.eventMessage = `Inlägg med id ${id} hittades inte`;
                })
        },

        //Post till api för att lägga till inlägg. Tar in alla värden som objekten innehåller.
        async apiPost(name1, description, set, rep, callback) {
            //Post request under uppbyggnad
            await axios.post('https://mackes-nest-js-api-1050979898493.europe-north1.run.app/api/', {
                "name": name1,
                "description": description,
                "set": set,
                "rep": rep
            })
                .then((response) => {

                    //Vid fel skrivs felet ut i konsollen samt skriver ut ett meddelande till skärmen
                    this.eventMessage = `Inlägg ${name1} är sparat.`;
                    //lagrar in datan till ett object i klassen
                    const postObj = `Inlägg ${name1} är sparat.`;
                    callback(postObj);
                })

                //Vid fel skrivs felet ut i konsollen samt skriver ut ett meddelande till skärmen
                .catch((error) => {
                    console.log(error);
                    this.eventMessage = `Inlägg ${name1} gick inte att spara.`;
                    reject(error);
                });
        },

        //Put till api för att uppdatera inlägg. Tar in alla värden som objekten innehåller.
        async apiPut(id, name1, description, set, rep, isCompleted, callback) {
            await axios.put(`https://mackes-nest-js-api-1050979898493.europe-north1.run.app/api/${id}`, {
                "name": name1,
                "description": description,
                "set": set,
                "rep": rep,
                "isCompleted": isCompleted
            })
                .then((response) => {

                    //Skriver ut meddelande till skärmen samt uppdaterar tabellen och nollställer formuläret
                    const postObj = `Inlägg ${name1} med id ${id} är uppdaterat.`;
                    callback(postObj);
                })

                //Vid fel skrivs felet ut i konsollen samt skriver ut ett meddelande till skärmen
                .catch((error) => {
                    console.log(error);
                    this.eventMessage = `Inlägg med id ${id} gick inte att uppdatera.`;
                    return false;
                })
        },

        //Delete request med id
        apiDelete(id) {
            axios.delete(`https://mackes-nest-js-api-1050979898493.europe-north1.run.app/api/${id}`)
                .then((response) => {

                    //Skriver ut meddelande till skärmen samt uppdaterar tabellen
                    this.eventMessage = `Id ${id} är borttaget.`;
                    this.getAll();
                })

                //Vid fel skrivs felet ut i konsollen samt skriver ut ett meddelande till skärmen
                .catch((error) => {
                    console.log(error);
                    this.eventMessage = `Id ${id} gick inte att ta bort.`;
                })
        }
    }
}

</script>
