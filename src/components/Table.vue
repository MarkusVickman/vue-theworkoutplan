<!-- Stor komponent med tabell och formulär som hämtar och skickar data -->
<template>

    <!-- div som begränsar största storleken på "containern" -->
    <div class="table-container container mt-6">
        <!-- titel för komponenten -->
        <p class="title pl-2">Veckans träningsschema</p>

        <!-- tabell -->
        <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
            <tbody>
                <!-- tabellrad med header för varje kolumn. Styling görs för att indikera oklara rader -->
                <tr>
                    <th class="is-info">Övningar att göra</th>
                    <th class="is-info">Beskrivning</th>
                    <th class="is-info">Set x Rep</th>
                    <th class="is-info">Åtgärder</th>
                </tr>

                <!-- Loopar igenom arrayen med objekt rowDataToDo och skriver ut data till tabellen -->
                <tr v-for="item in rowDataToDo">
                    <th scope="row" class="has-background-info-light">{{ item.name }}</th>
                    <td>{{ item.description }}</td>
                    <td>{{ item.set + "x" + item.rep }}</td>

                    <!-- Ikoner som länkar till metoder -->
                    <td>
                        <i style="cursor: pointer" @click="$emit('apiDelete', item.id)" class="material-icons"
                            title="Ta bort inlägg">delete_forever</i>
                        <i style="cursor: pointer" @click="updatePost(item.id)" class="material-icons"
                            title="Uppdatera inlägg">create</i>
                        <i style="cursor: pointer" @click="markAsDone(item.id)" class="material-icons"
                            title="Klarmarkera">done</i>
                    </td>
                </tr>

                <!-- tabellrad med header för varje kolumn. Styling görs för att indikera klara rader -->
                <tr>
                    <th class="is-success">Genomförda övningar</th>
                    <th class="is-success">Beskrivning</th>
                    <th class="is-success">Set x Rep</th>
                    <th class="is-success">Åtgärder</th>
                </tr>

                <!-- Loopar igenom arrayen med objekt rowDataToDo och skriver ut data till tabellen -->
                <tr v-for="item in rowDataCompleted">
                    <th scope="row" class="has-background-success-light">{{ item.name }}</th>
                    <td>{{ item.description }}</td>
                    <td>{{ item.set + "x" + item.rep }}</td>

                    <!-- Ikoner som länkar till metoder -->
                    <td>
                        <i style="cursor: pointer" @click="$emit('apiDelete', item.id)" class="material-icons"
                            title="Ta bort inlägg">delete_forever</i>
                        <i style="cursor: pointer" @click="updatePost(item.id)" class="material-icons"
                            title="Uppdatera inlägg">create</i>
                        <i style="cursor: pointer" @click="markAsDone(item.id)" class="material-icons"
                            title="Bocka av">undo</i>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- Formulär för att skapa och uppdatera inlägg. Titeln ändra beroende på om det ska läggas till eller uppdateras -->
    <form class="container mt-6 p-5">
        <p class="title">{{ formTitle }}</p>

        <!-- Input som använder både ref och v-model -->
        <div class="field">
            <label class="label" for="name">Övning</label>
            <div class="control">
                <input class="input" type="text" placeholder="Text" id="name" name="name" ref="name" v-model="addName">
            </div>
        </div>

        <!-- Input som använder både ref och v-model -->
        <div class="field">
            <label class="label" for="description">Beskrivning</label>
            <div class="control">
                <input class="input" type="text" placeholder="Text" id="description" name="description"
                    ref="description" v-model="addDescription">
            </div>
        </div>

        <!-- Input som använder både ref och v-model -->
        <div class="field">
            <label class="label" for="set">Set</label>
            <div class="control">
                <input class="input" type="number" min="1" max="20" placeholder="Siffror" id="set" name="set" ref="set"
                    v-model="addSet">
            </div>
        </div>

        <!-- Input som använder både ref och v-model -->
        <div class="field">
            <label class="label" for="rep">Rep</label>
            <div class="control">
                <input class="input" type="number" min="1" max="100" placeholder="Siffror" id="rep" name="rep" ref="rep"
                    v-model="addRep">
            </div>
        </div>

        <!-- Tre knappar, en för lägg till, en för updatera och en för att avbryta uppdatering. -->
        <div class="field is-grouped">
            <div class="control">
                <button class="button is-link" @click.prevent="submitForm()" id="submitButton">Submit</button>
                <button class="button is-link" @click.prevent="updateForm()" id="updateButton"
                    style="display:none;">Uppdatera ID: {{ addId }}</button>
                <button class="button is-link" @click.prevent="stopUpdate()" id="stopUpdateButton"
                    style="display:none;">Avbryt</button>
            </div>
        </div>

        <!-- Används för att skriva ut alla meddelanden som gäller felande eller lyckade uppdateringar och ändringar till tabellen. -->
        <h2>{{ eventMessage }}</h2>
    </form>
</template>


<style scoped>
/* Styling av knappen för att avbryta uppdatering i tabellen. */
#stopUpdateButton {
    margin-left: 10px;
}

/* Styling i tabellkolumner för att text ska synas i darkmode */
.has-background-success-light,
.has-background-info-light {
    color: black;
}
</style>

<script>

//Importerar axios för hantera fetch-anrop
//import axios from 'axios';

//Export klassen
export default {
    name: "WorkoutTable",
    props: ['rowDataToDo', 'rowDataCompleted'],
    emits: ['getAll', 'apiGet', 'apiPost', 'apiPut', 'apiDelete'],

    //Data med arrayer för klara och oklara övningar samt data för individuella kolumner och object. Även variabler för meddelande och för att ändra titel på formuläret.
    data() {
        return {
            // rowDataToDo: [],
            // rowDataCompleted: [],
            addName: "",
            addDescription: "",
            addSet: 1,
            addRep: 1,
            addId: 999,
            postObj: {},
            eventMessage: "",
            formTitle: "Lägg till övning"
        };
    },

    //metoder
    methods: {

        //Metod som initierar apiAnrop 
        putPost(id, name1, description, set, rep, isCompleted) {
            return new Promise((resolve, reject) => {
                this.$emit('apiPut', id, name1, description, set, rep, isCompleted, (postObj) => {
                    //console.log(postObj);
                    resolve(postObj);

                });
            })
        },

        //Metod som initierar apiAnrop         
        postPost(name1, description, set, rep) {
            return new Promise((resolve, reject) => {
                this.$emit('apiPost', name1, description, set, rep, (postObj) => {
                    //console.log(postObj);
                    resolve(postObj);

                });
            })
        },

        //Metod som initierar apiAnrop 
        fetchPostObj(id) {
            return new Promise((resolve, reject) => {
                this.$emit('apiGet', id, (postObj) => {
                    //console.log(postObj);
                    resolve(postObj);

                });
            })
        },

        //metod för att markera ett inlägg till true eller false
        async markAsDone(id) {

            //Hämtar in data som också lagras i postObj[]
            this.postObj = await this.fetchPostObj(id);

            //Ändrar bool-värde på idCompleted
            let isCompleted;
            if (this.postObj.isCompleted) {
                isCompleted = false;
            } else {
                isCompleted = true;
            }

            //Lagrar in nya isCompleted bool-värdet
            await this.putPost(id, this.postObj.name, this.postObj.description, this.postObj.set, this.postObj.rep, isCompleted);
            this.ResetTable();
        },

        ResetTable() {
            this.$emit('getAll');
            this.emptyForm();
        },

        //Vid submit 
        async submitForm() {

            //Innan uppdatering kontrolleras alla inmatade värden
            let check = this.controlInput(this.$refs.name.value, this.$refs.description.value, this.$refs.set.value, this.$refs.rep.value);

            //utan fel så skickas värdena till en post api fetch-anrop
            if (check) {

                await this.postPost(this.$refs.name.value, this.$refs.description.value, parseInt(this.$refs.set.value), parseInt(this.$refs.rep.value));
                this.ResetTable();
            }
        },

        //Aktiveras vid tryck på penna ikonen i tabellen
        async updatePost(id) {

            //ändrar visningsläge för knappar i tabellen
            document.getElementById("updateButton").style.display = "inline";
            document.getElementById("stopUpdateButton").style.display = "inline";
            document.getElementById("submitButton").style.display = "none";

            //Ändrar rubrik i formuläret
            this.formTitle = "Uppdatera övning";

            //Hämtar ett object med data från fetch api
            this.postObj = await this.fetchPostObj(id);

            //Hämtar värderna och skriver ut dessa värden till formuläret
            this.addName = this.postObj.name;
            this.addDescription = this.postObj.description;
            this.addSet = this.postObj.set;
            this.addRep = this.postObj.rep;
            this.addId = this.postObj.id;
        },

        //Återställer formulär/tömmer det
        emptyForm() {
            this.addName = "";
            this.addDescription = "";
            this.addSet = 1;
            this.addRep = 1;
            this.addId = 999;
        },

        //Vid avbryten uppdatering i formuläret återställs knapparnas visningsläge och formuläret töms
        stopUpdate() {
            this.emptyForm();
            document.getElementById("updateButton").style.display = "none";
            document.getElementById("stopUpdateButton").style.display = "none";
            document.getElementById("submitButton").style.display = "inline";
        },

        //Kallas på från updatera knappen i formuläret
        async updateForm() {

            //Innan uppdatering kontrolleras alla inmatade värden
            let check = this.controlInput(this.addName, this.addDescription, this.addSet, this.addRep);

            //utan fel så skickas värdena till en put api fetch-anrop
            if (check) {
                await this.putPost(this.addId, this.addName, this.addDescription, parseInt(this.addSet), parseInt(this.addRep));

                //Återställer visningsläge för knappar till formuläret
                document.getElementById("updateButton").style.display = "none";
                document.getElementById("stopUpdateButton").style.display = "none";
                document.getElementById("submitButton").style.display = "inline";

                //ändrar rubrik till formuläret
                this.formTitle = "Lägg till övning";
                this.ResetTable();
            }
        },

        // Metod som kontrollar att inmatningar är korrekta från formuläret. Används både vill nya inlägg och vid uppdatering
        controlInput(nameTest, descriptionTest, setTest, repTest) {
            let testArr = [];
            let testBool = true;

            //Vid icke uppfyllda krav läggs ett felmeddelande till i arrayen med felmeddelanden och testBook blir false
            if (nameTest === "") {
                testArr.push("Felaktigt värde för Övning. ")
                testBool = false;
            }

            //Vid icke uppfyllda krav läggs ett felmeddelande till i arrayen med felmeddelanden och testBook blir false
            if (descriptionTest === "") {
                testArr.push("Felaktigt värde för Beskrivning. ")
                testBool = false;
            }

            //Vid icke uppfyllda krav läggs ett felmeddelande till i arrayen med felmeddelanden och testBook blir false
            if (setTest == "" || setTest == 0 || parseInt(setTest) === NaN) {
                testArr.push("Set får inte vara 0 eller innehålla bokstäver. ")
                testBool = false;
            }

            //Vid icke uppfyllda krav läggs ett felmeddelande till i arrayen med felmeddelanden och testBook blir false
            if (repTest == "" || repTest == 0 || parseInt(repTest) === NaN) {
                testArr.push("Rep får inte vara 0 eller innehålla bokstäver. ")
                testBool = false;
            }

            //Vid fel skrivs alla felmeddelanden ut till skärmen och false returneras
            let errorString = "";
            if (!testBool) {

                testArr.forEach(element => {
                    errorString = errorString + element;
                });
                this.eventMessage = errorString;

            }

            //utan fel returneras true
            return testBool
        },
    }
}

</script>
