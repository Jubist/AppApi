<template>
    <Page>
        <ActionBar title="Recettes" />
        <GridLayout rows="auto, *, auto">
            <!-- Formulaire d'ajout/modification de recette -->
            <StackLayout class="form-container" row="0">
                <TextField v-model="newRecipe.name" hint="Nom de la recette" class="input" />
                <TextField v-model="newRecipe.ingredients" hint="Ingrédients" class="input" />
                <TextField v-model="newRecipe.instructions" hint="Instructions" class="input" />

                <Button
                    v-if="!editMode"
                    text="Ajouter Recette"
                    @tap="addRecipe"
                    class="btn btn-primary"
                    :isEnabled="!isLoading"
                />
                <Button
                    v-else
                    text="Modifier Recette"
                    @tap="updateRecipe"
                    class="btn btn-warning"
                    :isEnabled="!isLoading"
                />
            </StackLayout>

            <!-- Indicateur de chargement -->
            <ActivityIndicator
                :busy="isLoading"
                rowSpan="2"
                class="activity-indicator"
            />

            <!-- Affichage de la liste des recettes -->
            <ListView
                :items="recipes"
                @itemTap="goToRecipe"
                row="1"
                class="recipe-list"
                :visibility="!isLoading ? 'visible' : 'collapse'"
            >
                <v-template>
                    <GridLayout columns="*, auto, auto" class="list-item">
                        <Label :text="item.name" class="list-item-label" col="0" />
                        <Button text="Modifier" @tap="() => editRecipe(item)" col="1" class="btn-edit" />
                        <Button text="Supprimer" @tap="() => confirmDelete(item)" col="2" class="btn-delete" />
                    </GridLayout>
                </v-template>
            </ListView>
        </GridLayout>
    </Page>
</template>

<script>
import ApiService from "../services/api";
import { confirm } from "@nativescript/core/ui/dialogs";

export default {
    data() {
        return {
            recipes: [],
            newRecipe: {
                id: null,
                name: "",
                ingredients: "",
                instructions: ""
            },
            editMode: false,
            isLoading: false
        };
    },
    methods: {
        async fetchRecipes() {
            this.isLoading = true;
            try {
                const response = await ApiService.getRecipes();
                // Utiliser Vue.set pour assurer la réactivité
                this.recipes = Array.isArray(response) ? [...response] : [];
            } catch (error) {
                console.error("Erreur lors de la récupération des recettes :", error);
                alert("Erreur lors du chargement des recettes");
            } finally {
                this.isLoading = false;
            }
        },

        async addRecipe() {
            if (!this.validateForm()) return;

            this.isLoading = true;
            try {
                const response = await ApiService.addRecipe(this.newRecipe);
                // Ajouter la nouvelle recette au début du tableau
                this.recipes.unshift(response);
                this.resetForm();
                alert("Recette ajoutée avec succès!");
            } catch (error) {
                console.error("Erreur lors de l'ajout de la recette :", error);
                alert("Erreur lors de l'ajout de la recette");
            } finally {
                this.isLoading = false;
            }
        },

        async confirmDelete(recipe) {
            const result = await confirm({
                title: "Supprimer la recette",
                message: `Voulez-vous vraiment supprimer "${recipe.name}" ?`,
                okButtonText: "Supprimer",
                cancelButtonText: "Annuler"
            });

            if (result) {
                await this.deleteRecipe(recipe.id);
            }
        },

        async deleteRecipe(recipeId) {
            this.isLoading = true;
            try {
                await ApiService.deleteRecipe(recipeId);
                // Mettre à jour le tableau recipes en retirant la recette supprimée
                this.recipes = this.recipes.filter(recipe => recipe.id !== recipeId);
                alert("Recette supprimée avec succès!");
            } catch (error) {
                console.error("Erreur lors de la suppression :", error);
                alert("Erreur lors de la suppression de la recette");
            } finally {
                this.isLoading = false;
            }
        },

        async updateRecipe() {
            if (!this.validateForm()) return;

            this.isLoading = true;
            try {
                const updatedRecipe = await ApiService.updateRecipe(this.newRecipe.id, this.newRecipe);
                // Mettre à jour la recette dans le tableau
                const index = this.recipes.findIndex(recipe => recipe.id === this.newRecipe.id);
                if (index !== -1) {
                    this.recipes.splice(index, 1, updatedRecipe);
                }
                this.resetForm();
                alert("Recette mise à jour avec succès!");
            } catch (error) {
                console.error("Erreur lors de la modification de la recette :", error);
                alert("Erreur lors de la modification de la recette");
            } finally {
                this.isLoading = false;
            }
        },

        validateForm() {
            if (!this.newRecipe.name || !this.newRecipe.ingredients || !this.newRecipe.instructions) {
                alert("Veuillez remplir tous les champs !");
                return false;
            }
            return true;
        },

        editRecipe(recipe) {
            this.newRecipe = { ...recipe };
            this.editMode = true;
        },

        resetForm() {
            this.newRecipe = { id: null, name: "", ingredients: "", instructions: "" };
            this.editMode = false;
        },

        async goToRecipe(event) {
            const selectedRecipe = this.recipes[event.index];
            this.$navigateTo(require("./RecipeDetailsPage.vue"), {
                props: {
                    recipe: selectedRecipe
                },
                handlers: {
                    'recipe-updated': (updatedRecipe) => {
                        const index = this.recipes.findIndex(r => r.id === updatedRecipe.id);
                        if (index !== -1) {
                            this.recipes = [
                                ...this.recipes.slice(0, index),
                                updatedRecipe,
                                ...this.recipes.slice(index + 1)
                            ];
                        }
                    },
                    'recipe-deleted': (recipeId) => {
                        this.recipes = this.recipes.filter(r => r.id !== recipeId);
                    }
                }
            });
        }
    },
    mounted() {
        this.fetchRecipes();
        // Rafraîchir la liste toutes les 30 secondes
        this.refreshInterval = setInterval(this.fetchRecipes, 30000);
    },
    beforeDestroy() {
        // Nettoyer l'intervalle lors de la destruction du composant
        if (this.refreshInterval) {
            clearInterval(this.refreshInterval);
        }
    }
};
</script>

<style scoped>
.form-container {
    padding: 15;
    background-color: #f5f5f5;
}

.input {
    margin-bottom: 10;
    border-width: 1;
    border-color: #ddd;
    padding: 10;
    border-radius: 4;
}

.recipe-list {
    height: 100%;
}

.list-item {
    padding: 15;
    background-color: white;
    border-bottom-width: 1;
    border-bottom-color: #eee;
}

.list-item-label {
    font-size: 16;
    color: #333;
}

.btn {
    margin: 5;
    padding: 10;
    border-radius: 4;
}

.btn-primary {
    background-color: #4CAF50;
    color: white;
}

.btn-warning {
    background-color: #FFC107;
    color: black;
}

.btn-edit {
    background-color: #2196F3;
    color: white;
    width: 80;
}

.btn-delete {
    background-color: #f44336;
    color: white;
    width: 80;
}

.activity-indicator {
    margin: 20;
}
</style>
