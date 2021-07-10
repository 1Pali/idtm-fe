sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/mvc/Controller",
    "com/sap/sct/idtm_ui/src/util/util"
], function (JSONModel, Controller, Util) {
    "use strict";

    return Controller.extend("com.sap.sct.idtm_ui.src.detail.entityTableConfiguration.components.body.sections.picture.Picture", {
        onInit: function () {

        },

        handleUploadComplete: function (oEvent) {
            var oDataModel = this.getView().getModel("data");
            var sPath = this.getView().getBindingContext("data").sPath + "/idIngredientImage";
            var oResponse = oEvent.getParameter("response");
            var oParsedJsonResponse = JSON.parse(oResponse.substring(oResponse.indexOf("{"), oResponse.indexOf("}") + 1));
            oDataModel.setProperty(sPath, oParsedJsonResponse.id);

            oDataModel.setProperty("/selectedImage", oParsedJsonResponse);

            Util.toggleShowFooter.call(this);
        }

    });
});
