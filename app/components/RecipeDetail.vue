// RecipeDetail.vue
<template>
    <Page>
        <ActionBar title="Détails de la Recette">
            <NavigationButton text="Retour" android.systemIcon="ic_menu_back" @tap="$navigateBack" />
        </ActionBar>
        <ScrollView>
            <StackLayout class="detail-container">
                <ActivityIndicator :busy="isLoading" />

                <StackLayout :visibility="!isLoading ? 'visible' : 'collapse'">
                    <Label text="Nom de la recette" class="label-title" />
                    <TextField
                        v-model="editedRecipe.name"
                        class="input-field"
                        :isEnabled="isEditing"
                    />

                    <Label text="Ingrédients" class="label-title" />
                    <TextView
                        v-model="editedRecipe.ingredients"
                        class="input-field"
                        :isEnabled="isEditing"
                    />

                    <Label text="Instructions" class="label-title" />
                    <TextView
                        v-model="editedRecipe.instructions"
                        class="input-field"
                        :isEnabled="isEditing"
                    />

                    <Button
                        v-if="!isEditing"
                        text="Modifier"
                        @tap="startEditing"
                        class="btn-edit"
                    />

                    <StackLayout v-else>
                        <Button
                            text="Enregistrer"
                            @tap="saveRecipe"
                            class="btn-save"
                        />
                        <Button
                            text="Annuler"
                            @tap="cancelEditing"
                            class="btn-cancel"
                        />
                    </StackLayout>

                    <Button
                        text="Supprimer la recette"
                        @tap="confirmDelete"
                        class="btn-delete"
                    />
                </StackLayout>
            </StackLayout>
        </ScrollView>
    </Page>
</template>

<script>
import ApiService from "../services/api";
import { confirm } from "@nativescript/core/ui/dialogs";

export default {
    props: {
        recipe: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            editedRecipe: { ...this.recipe },
            isEditing: false,
            isLoading: false
        };
    },
    methods: {
        startEditing() {
            this.isEditing = true;
        },

        cancelEditing() {
            this.editedRecipe = { ...this.recipe };
            this.isEditing = false;
        },

        async saveRecipe() {
            if (!this.editedRecipe.name || !this.editedRecipe.ingredients || !this.editedRecipe.instructions) {
                alert("Veuillez remplir tous les champs.");
                return;
            }

            this.isLoading = true;
            try {
                await ApiService.updateRecipe(this.editedRecipe.id, this.editedRecipe);
                this.$emit('recipe-updated', this.editedRecipe);
                this.isEditing = false;
                alert("Recette mise à jour avec succès!");
            } catch (error) {
                console.error("Erreur lors de la mise à jour de la recette:", error);
                alert("Erreur lors de la mise à jour de la recette.");
            } finally {
                this.isLoading = false;
            }
        },

        async confirmDelete() {
            const result = await confirm({
                title: "Supprimer la recette",
                message: "Êtes-vous sûr de vouloir supprimer cette recette ?",
                okButtonText: "Supprimer",
                cancelButtonText: "Annuler"
            });

            if (result) {
                await this.deleteRecipe();
            }
        },

        async deleteRecipe() {
            this.isLoading = true;
            try {
                await ApiService.deleteRecipe(this.recipe.id);
                this.$emit('recipe-deleted', this.recipe.id);
                this.$navigateBack();
            } catch (error) {
                console.error("Erreur lors de la suppression de la recette:", error);
                alert("Erreur lors de la suppression de la recette.");
            } finally {
                this.isLoading = false;
            }
        }
    }
};
</script>

<style scoped>
.detail-container {
    padding: 20px;
}

.label-title {
    font-size: 18;
    margin-top: 15;
    margin-bottom: 5;
    color: #333;
    font-weight: bold;
}

.input-field {
    font-size: 16;
    padding: 10;
    margin-bottom: 15;
    border-width: 1;
    border-color: #ddd;
    border-radius: 4;
}

.btn-edit {
    margin-top: 20;
    background-color: #2196F3;
    color: white;
    font-size: 16;
    font-weight: bold;
}

.btn-save {
    margin-top: 20;
    background-color: #4CAF50;
    color: white;
    font-size: 16;
    font-weight: bold;
}

.btn-cancel {
    margin-top: 10;
    background-color: #9E9E9E;
    color: white;
    font-size: 16;
}

.btn-delete {
    margin-top: 30;
    background-color: #f44336;
    color: white;
    font-size: 16;
    font-weight: bold;
}
</style>
