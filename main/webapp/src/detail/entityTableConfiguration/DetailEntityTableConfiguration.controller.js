sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/mvc/Controller",
    "com/sap/sct/idtm_ui/src/util/util",
    "com/sap/sct/idtm_ui/src/dialog/entityTableConfiguration/deleteEntityTable",
    "com/sap/sct/idtm_ui/src/api/Request",
    "sap/m/MessageToast",
    "com/sap/sct/idtm_ui/src/dialog/confirmDialog",
    "com/sap/sct/idtm_ui/src/model/formatter"
], function (JSONModel, Controller, Util, DeleteEntityTableDialog, Request, MessageToast, ConfirmDialog, Formatter) {
    "use strict";

    return Controller.extend("com.sap.sct.idtm_ui.src.detail.entityTableConfiguration.DetailEntityTableConfiguration", {

        formatter: Formatter,

        onInit: function () {
            Util.getRouter.call(this).getRoute("MasterEntityTableConfiguration").attachPatternMatched(this._onIngredientMatched, this);
            Util.getRouter.call(this).getRoute("DetailEntityTableConfiguration").attachPatternMatched(this._onIngredientMatched, this);
        },

        _onIngredientMatched: function (oEvent) {
            var sIngredientIndex = oEvent.getParameter("arguments").ingredient;
            Util.getModel.call(this, "ui").setProperty("/selectedObjectIndex", sIngredientIndex);
            this.getView().bindElement({
                path: "/entityTableConfiguration/" + sIngredientIndex,
                model: "data"
            });
        },

        onEditPress: function (oEvent) {
            this._storePreviousIngredient();
            Util.toggleShowFooter.call(this);
        },

        _storePreviousIngredient: function (oEvent) {
            var oIngredientClone = Util.getObjectClone(Util.getBindingObject.call(this, "data"));
            Util.getModel.call(this, "ui").setProperty("/ingredient/previousIngredient", oIngredientClone);
        },

        onExit: function () {
            Util.getRouter.call(this).getRoute("MasterIngredients").detachPatternMatched(this._onIngredientMatched, this);
            Util.getRouter.call(this).getRoute("DetailIngredients").detachPatternMatched(this._onIngredientMatched, this);
        },

        handleFullScreen: function () {
            var sNextLayout = Util.getModel.call(this).getProperty("/actionButtonsInfo/midColumn/fullScreen");
            var sIngredientIndex = Util.getModel.call(this, "ui").getProperty("/selectedObjectIndex");

            Util.getRouter.call(this).navTo("DetailIngredients", {layout: sNextLayout, ingredient: sIngredientIndex});
        },

        handleExitFullScreen: function () {
            var sNextLayout = Util.getModel.call(this).getProperty("/actionButtonsInfo/midColumn/exitFullScreen");
            var sIngredientIndex = Util.getModel.call(this, "ui").getProperty("/selectedObjectIndex");

            Util.getRouter.call(this).navTo("DetailEntityTableConfiguration", {layout: sNextLayout, ingredient: sIngredientIndex});
        },

        handleClose: function () {
            var bIsInEditMode = Util.getModel.call(this, "ui").getProperty("/editMode");

            if(bIsInEditMode) {
                ConfirmDialog.getLeaveAndDiscard.call(this, this._onClose);
            } else {
                this._closeDetailPage();
            }
        },

        _onClose: function () {
            var oPreviousIngredient = Util.getModel.call(this, "ui").getProperty("/ingredient/previousIngredient");
            Util.getModel.call(this, "data").setProperty(Util.getBindingPath.call(this, "data"), oPreviousIngredient);
            this._closeDetailPage();
        },

        onDeletePress: function (oEvent) {
            DeleteIngredientDialog.getDialog.call(this, this._deleteIngredient);
        },

        _deleteIngredient: function () {
            var oIngredient = Util.getBindingObject.call(this, "data");
            Request.Ingredient.delete.call(this, oIngredient.id, Util.getModel.call(this, "data"), "/entityTableConfiguration", true)
                .then(() => {
                    var sNextLayout = Util.getModel.call(this).getProperty("/actionButtonsInfo/midColumn/closeColumn");
                    Util.getRouter.call(this).navTo("MasterEntityTableConfiguration", {layout: sNextLayout});
                });
        },



        _closeDetailPage: function () {
            var sNextLayout = Util.getModel.call(this).getProperty("/actionButtonsInfo/midColumn/closeColumn");
            Util.getRouter.call(this).navTo("MasterEntityTableConfiguration", {layout: sNextLayout});
        },

        onFooterSavePress: function (oEvent) {
            var oActualIngredient = Util.getBindingObject.call(this, "data");
            var oPreviousIngredient = Util.getModel.call(this, "ui").getProperty("/ingredient/previousIngredient");

            var oImageUploader = sap.ui.getCore().byId("__xmlview5--imageUploader");

            if (Util.isFlatObjectEqual(oActualIngredient, oPreviousIngredient) && !oImageUploader.getValue()) {
                MessageToast.show(Util.getResourceBundle.call(this).getText("NoChangeMessage"));
                Util.toggleShowFooter.call(this);
            } else {
                ConfirmDialog.getSaveChanges.call(this, () => {
                    Request.Ingredient.update.call(this, oActualIngredient, Util.getModel.call(this, "data"),
                        Util.getBindingPath.call(this, "data"), true);

                    if (oImageUploader.getValue()) {
                        oImageUploader.upload();
                    } else {
                        Util.toggleShowFooter.call(this);
                    }
                });
            }

        },

        onFooterCancelPress: function (oEvent) {
            var oActualIngredient = Util.getBindingObject.call(this, "data");
            var oPreviousIngredient = Util.getModel.call(this, "ui").getProperty("/ingredient/previousIngredient");

            if (!Util.isFlatObjectEqual(oActualIngredient, oPreviousIngredient)) {
                ConfirmDialog.getDiscardChanges.call(this, () => {
                    Util.getModel.call(this, "data")
                        .setProperty(Util.getBindingPath.call(this, "data"), oPreviousIngredient);

                    Util.toggleShowFooter.call(this);
                });
            } else {
                Util.toggleShowFooter.call(this);
            }

        },
    });
});
