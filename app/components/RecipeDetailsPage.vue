// RecipeDetailsPage.vue
<template>
    <Page>
        <ActionBar :title="recipe.name">
            <NavigationButton text="Retour" android.systemIcon="ic_menu_back" @tap="$navigateBack" />
        </ActionBar>

        <ScrollView>
            <StackLayout class="details-container">
                <!-- Titre de la recette -->
                <StackLayout class="section-container">
                    <Label text="Nom de la recette" class="section-title" />
                    <Label :text="recipe.name" class="section-content name" textWrap="true" />
                </StackLayout>

                <!-- Ingrédients -->
                <StackLayout class="section-container">
                    <Label text="Ingrédients" class="section-title" />
                    <Label :text="recipe.ingredients" class="section-content" textWrap="true" />
                </StackLayout>

                <!-- Instructions -->
                <StackLayout class="section-container">
                    <Label text="Instructions de préparation" class="section-title" />
                    <Label :text="recipe.instructions" class="section-content" textWrap="true" />
                </StackLayout>

                <!-- Boutons d'action -->
                <StackLayout class="actions-container">
                    <Button text="Modifier" @tap="modifyRecipe" class="btn btn-edit" />
                    <Button text="Supprimer" @tap="confirmDelete" class="btn btn-delete" />
                </StackLayout>
            </StackLayout>
        </ScrollView>
    </Page>
</template>

<script>
import { confirm } from "@nativescript/core/ui/dialogs";
import ApiService from "../services/api";

export default {
    props: {
        recipe: {
            type: Object,
            required: true
        }
    },
    methods: {
        async modifyRecipe() {
            // Naviguer vers la page de modification avec la recette actuelle
            this.$navigateTo(require("./RecipeForm.vue"), {
                props: {
                    recipe: this.recipe,
                    isEditing: true
                },
                handlers: {
                    'recipeUpdated': (updatedRecipe) => {
                        this.$emit('recipe-updated', updatedRecipe);
                        this.$navigateBack();
                    }
                }
            });
        },

        async confirmDelete() {
            const result = await confirm({
                title: "Supprimer la recette",
                message: "Voulez-vous vraiment supprimer cette recette ?",
                okButtonText: "Supprimer",
                cancelButtonText: "Annuler"
            });

            if (result) {
                this.deleteRecipe();
            }
        },

        async deleteRecipe() {
            try {
                await ApiService.deleteRecipe(this.recipe.id);
                this.$emit('recipe-deleted', this.recipe.id);
                this.$navigateBack();
            } catch (error) {
                console.error("Erreur lors de la suppression:", error);
                alert("Erreur lors de la suppression de la recette");
            }
        }
    }
};
</script>

<style scoped>
.details-container {
    padding: 20;
}

.section-container {
    margin-bottom: 20;
}

.section-title {
    font-size: 18;
    font-weight: bold;
    color: #333;
    margin-bottom: 8;
}

.section-content {
    font-size: 16;
    color: #666;
    padding: 8;
    background-color: #f8f8f8;
    border-radius: 4;
}

.name {
    font-size: 22;
    color: #2c3e50;
    font-weight: bold;
}

.actions-container {
    margin-top: 30;
}

.btn {
    margin: 8;
    padding: 12;
    font-size: 16;
    font-weight: bold;
    border-radius: 6;
}

.btn-edit {
    background-color: #2196F3;
    color: white;
}

.btn-delete {
    background-color: #f44336;
    color: white;
}
</style>
