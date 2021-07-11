sap.ui.define([
    "com/sap/sct/idtm_ui/src/api/common",
    "sap/m/MessageToast",
], function (Common, MessageToast) {
    "use strict";

    var ENTITY_TABLE_CONTENT_URL = "/api/v1/entitycontent";

    return {
        getList: function(oParent, bAsync) {
            var sSuccessMessage = "Get Entity Table List Success";//this.getView().getModel("i18n").getResourceBundle().getText("IngredientGetListSuccessMessage");
            var sErrorMessage = "Get Entity Table List Error";//this.getView().getModel("i18n").getResourceBundle().getText("IngredientGetListSuccessMessage");

            return Common.AJAXRequest(
                oParent,
                Common.RequestTypes.GET,
                ENTITY_TABLE_CONTENT_URL,
                undefined,
                sErrorMessage,
                bAsync
            );
        },

        create: function (oEntityTable, bAsync) {
            var sSuccessMessage = "Create Entity Table Success";//this.getView().getModel("i18n").getResourceBundle().getText("IngredientGetListSuccessMessage");
            var sErrorMessage = "Create Entity Table Error";//this.getView().getModel("i18n").getResourceBundle().getText("IngredientGetListSuccessMessage");

            return Common.AJAXRequest.call(
                this,
                Common.RequestTypes.POST,
                ENTITY_TABLE_CONTENT_URL,
                oEntityTable,
                sErrorMessage,
                bAsync
            );
        },

        update: function (oEntityTable, bAsync) {
            var sSuccessMessage = "Update Entity Table Success";//this.getView().getModel("i18n").getResourceBundle().getText("IngredientGetListSuccessMessage");
            var sErrorMessage = "Update Entity Table Error";//this.getView().getModel("i18n").getResourceBundle().getText("IngredientGetListSuccessMessage");

            return Common.AJAXRequest.call(
                this,
                Common.RequestTypes.PUT,
                ENTITY_TABLE_CONTENT_URL + "/" + oEntityTable.id,
                oEntityTable,
                sErrorMessage,
                bAsync
            );
        },

        delete: function (nEntityTableId, bAsync) {
            var sSuccessMessage = "Delete Entity Table Success";//this.getView().getModel("i18n").getResourceBundle().getText("IngredientGetListSuccessMessage");
            var sErrorMessage = "Delete Entity Table Error";//this.getView().getModel("i18n").getResourceBundle().getText("IngredientGetListSuccessMessage");

            return Common.AJAXRequest.call(
                this,
                Common.RequestTypes.DELETE,
                ENTITY_TABLE_CONTENT_URL + "/" + nEntityTableId,
                undefined,
                sErrorMessage,
                bAsync
            );
        },

//        deleteList: function (aIngredientIdList, oModel, sPath, bAsync) {
//            var sSuccessMessage = "Delete Ingredient List Success";//this.getView().getModel("i18n").getResourceBundle().getText("IngredientGetListSuccessMessage");
//            var sErrorMessage = "Delete Ingredient List Error";//this.getView().getModel("i18n").getResourceBundle().getText("IngredientGetListSuccessMessage");
//
//            return Common.AJAXRequest.call(
//                this,
//                Common.RequestTypes.DELETE,
//                INGREDIENT_URL + "/deletelist",
//                aIngredientIdList,
//                function (oResponse) {
//                    onDeleteListSuccess(oResponse, oModel, sPath, sSuccessMessage);
//                }.bind(this),
//                sErrorMessage,
//                bAsync
//            );
//        }
    };
});
