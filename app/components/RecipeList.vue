

<template>
    <Page>
        <ActionBar title="Recettes" />
        <GridLayout rows="*, auto">
            <!-- Liste des recettes -->
            <ListView for="recipe in recipes" @itemTap="goToRecipe" row="0">
                <v-template>
                    <GridLayout columns="*, auto" class="list-item">
                        <Label :text="recipe.name" class="list-item-label" col="0" />
                        <Button text="❌" @tap="deleteRecipe(recipe.id)" col="1" class="delete-btn" />
                    </GridLayout>
                </v-template>
            </ListView>

            <!-- Bouton pour ajouter une nouvelle recette -->
            <Button text="➕ Ajouter une recette" @tap="goToForm" row="1" class="btn-add" />
        </GridLayout>
    </Page>
</template>

<script>
import ApiService from "../services/api";
import RecipeDetail from "./RecipeDetail.vue";
import RecipeForm from "./RecipeForm.vue";

export default {
    data() {
        return {
            recipes: []
        };
    },
    methods: {
        async fetchRecipes() {
            try {
                this.recipes = await ApiService.getRecipes();
            } catch (error) {
                console.error("Erreur lors de la récupération des recettes :", error);
            }
        },

        goToRecipe(args) {
            const selectedRecipe = this.recipes[args.index];
            this.$navigateTo(RecipeDetail, { props: { recipe: selectedRecipe } });
        },

        goToForm() {
            this.$navigateTo(RecipeForm);
        },

        async deleteRecipe(id) {
            try {
                await ApiService.deleteRecipe(id);
                this.fetchRecipes();
            } catch (error) {
                console.error("Erreur lors de la suppression :", error);
            }
        }
    },
    mounted() {
        this.fetchRecipes();
    }
};
</script>

<style scoped>
.list-item-label {
    font-size: 18px;
    padding: 10px;
}
.btn-add {
    font-size: 16px;
    margin: 10px;
}
</style>
