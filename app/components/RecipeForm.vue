

<template>
    <Page>
        <ActionBar title="Ajouter une Recette" />
        <StackLayout class="form-container">
            <TextField v-model="recipe.name" hint="Nom de la recette" />
            <TextField v-model="recipe.ingredients" hint="Ingrédients (séparés par des virgules)" />
            <TextField v-model="recipe.instructions" hint="Instructions" />

            <Button text="Enregistrer" @tap="submitRecipe" class="btn-save" />
            <Button text="Annuler" @tap="$navigateBack()" class="btn-cancel" />
        </StackLayout>
    </Page>
</template>

<script>
import ApiService from "../services/api";

export default {
    data() {
        return {
            recipe: {
                name: "",
                ingredients: "",
                instructions: ""
            }
        };
    },
    methods: {
        async submitRecipe() {
            if (!this.recipe.name || !this.recipe.ingredients || !this.recipe.instructions) {
                alert("Veuillez remplir tous les champs.");
                return;
            }

            try {
                await ApiService.addRecipe(this.recipe);
                this.$navigateBack();
            } catch (error) {
                console.error("Erreur lors de l'ajout de la recette :", error);
            }
        }
    }
};
</script>

<style scoped>
.form-container {
    padding: 20px;
}
.btn-save {
    background-color: green;
    color: white;
}
.btn-cancel {
    background-color: red;
    color: white;
}
</style>
