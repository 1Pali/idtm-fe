sap.ui.define([
    "com/sap/sct/idtm_ui/src/api/common",
    "com/sap/sct/idtm_ui/src/api/ingredient",
    "com/sap/sct/idtm_ui/src/api/recipe",
    "com/sap/sct/idtm_ui/src/api/ingredientType"
], function(
    Common,
    Ingredient,
    Recipe,
    IngredientType
) {
    "use strict";

    return {
        Common: Common,
        Ingredient: Ingredient,
        Recipe: Recipe,
        IngredientType: IngredientType
    };
});
