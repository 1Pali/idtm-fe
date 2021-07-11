sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/mvc/Controller",
    "com/sap/sct/idtm_ui/src/util/util",
    "com/sap/sct/idtm_ui/src/dialog/entityTable/deleteEntityTable",
    "com/sap/sct/idtm_ui/src/api/Request",
    "sap/m/MessageToast",
    "com/sap/sct/idtm_ui/src/dialog/confirmDialog",
    "com/sap/sct/idtm_ui/src/model/formatter"
], function (JSONModel, Controller, Util, DeleteEntityTableDialog, Request, MessageToast, ConfirmDialog, Formatter) {
    "use strict";

    return Controller.extend("com.sap.sct.idtm_ui.src.detail.entityTableConfiguration.DetailEntityTableConfiguration", {

        formatter: Formatter,

        onInit: function () {
            Util.getRouter.call(this).getRoute("MasterEntityTableConfiguration").attachPatternMatched(this.onEntityTableMatched, this);
            Util.getRouter.call(this).getRoute("DetailEntityTableConfiguration").attachPatternMatched(this.onEntityTableMatched, this);
        },

        onEntityTableMatched: function (oEvent) {
            var sEntityTableIndex = oEvent.getParameter("arguments").entityTable;
            Util.getModel.call(this, "ui").setProperty("/selectedObjectIndex", sEntityTableIndex);
            this.getView().bindElement({
                path: "/entityTables/" + sEntityTableIndex,
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
            Util.getRouter.call(this).getRoute("MasterEntityTableConfiguration").detachPatternMatched(this.onEntityTableMatched, this);
            Util.getRouter.call(this).getRoute("DetailEntityTableConfiguration").detachPatternMatched(this.onEntityTableMatched, this);
        },

        handleFullScreen: function () {
            var sNextLayout = Util.getModel.call(this).getProperty("/actionButtonsInfo/midColumn/fullScreen");
            var sEntityTableIndex = Util.getModel.call(this, "ui").getProperty("/selectedObjectIndex");

            Util.getRouter.call(this).navTo("DetailEntityTableConfiguration", {layout: sNextLayout, entityTable: sEntityTableIndex});
        },

        handleExitFullScreen: function () {
            var sNextLayout = Util.getModel.call(this).getProperty("/actionButtonsInfo/midColumn/exitFullScreen");
            var sEntityTableIndex = Util.getModel.call(this, "ui").getProperty("/selectedObjectIndex");

            Util.getRouter.call(this).navTo("DetailEntityTableConfiguration", {layout: sNextLayout, entityTable: sEntityTableIndex});
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
            var oPreviousIngredient = Util.getModel.call(this, "ui").getProperty("/entityTable/previousEntityTable");
            Util.getModel.call(this, "data").setProperty(Util.getBindingPath.call(this, "data"), oPreviousIngredient);
            this._closeDetailPage();
        },

        onDeletePress: function (oEvent) {
            DeleteEntityTableDialog.getDialog.call(this, this._deleteEntityTable);
        },

        _deleteEntityTable: function () {
            var oEntityTable = Util.getBindingObject.call(this, "data");
//            Request.Ingredient.delete.call(this, oIngredient.id, Util.getModel.call(this, "data"), "/entityTableConfiguration", true)
//                .then(() => {
//                    var sNextLayout = Util.getModel.call(this).getProperty("/actionButtonsInfo/midColumn/closeColumn");
//                    Util.getRouter.call(this).navTo("MasterEntityTableConfiguration", {layout: sNextLayout});
//                });
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
//                    Request.Ingredient.update.call(this, oActualIngredient, Util.getModel.call(this, "data"),
//                        Util.getBindingPath.call(this, "data"), true);

                    if (oImageUploader.getValue()) {
                        oImageUploader.upload();
                    } else {
                        Util.toggleShowFooter.call(this);
                    }
                });
            }

        },

        onFooterCancelPress: function (oEvent) {
//            var oActualIngredient = Util.getBindingObject.call(this, "data");
//            var oPreviousIngredient = Util.getModel.call(this, "ui").getProperty("/ingredient/previousIngredient");
//
//            if (!Util.isFlatObjectEqual(oActualIngredient, oPreviousIngredient)) {
//                ConfirmDialog.getDiscardChanges.call(this, () => {
//                    Util.getModel.call(this, "data")
//                        .setProperty(Util.getBindingPath.call(this, "data"), oPreviousIngredient);
//
//                    Util.toggleShowFooter.call(this);
//                });
//            } else {
                Util.toggleShowFooter.call(this);
//            }

        },
    });
});
