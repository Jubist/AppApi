import { Http } from "@nativescript/core";

const API_URL = "http://10.0.2.2:5000/recipes"; // Remplace par ton IP si nécessaire

export default {
    async getRecipes() {
        return await Http.getJSON(API_URL);
    },

    async getRecipe(id) {
        return await Http.getJSON(`${API_URL}/${id}`);
    },

    async addRecipe(recipe) {
        return await Http.request({
            url: API_URL,
            method: "POST",
            content: JSON.stringify(recipe),
            headers: { "Content-Type": "application/json" }
        });
    },

    async updateRecipe(id, recipe) {
        try {
            const response = await Http.request({
                url: `${API_URL}/${id}`,
                method: "PUT",
                content: JSON.stringify(recipe),
                headers: { "Content-Type": "application/json" }
            });
            return response.content.toJSON();
        } catch (error) {
            console.error(`API Error (updateRecipe ${id}):`, error);
            throw error;
        }
    },

    async deleteRecipe(id) {
        return await Http.request({
            url: `${API_URL}/${id}`,
            method: "DELETE"
        });
    }
};
