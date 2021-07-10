sap.ui.define([
    "sap/ui/base/Object",
    "sap/ui/core/Fragment",
    "com/sap/sct/idtm_ui/src/util/util",
    "com/sap/sct/idtm_ui/src/api/Request",
    "com/sap/sct/idtm_ui/src/model/dialog/createEntityTable",
    "com/sap/sct/idtm_ui/src/model/entity/entity",
    "com/sap/sct/idtm_ui/src/model/formatter",
    "sap/ui/core/ValueState"
], function(Parent, Fragment, Util, Request, CreateIngredient, Entity, Formatter, ValueState) {
    "use strict";

    var CREATE_ENTITY_TABLE_DIALOG_FRAGMENT = "com.sap.sct.idtm_ui.src.dialog.entityTable.createEntityTable.CreateEntityTable";
    var CREATE_ENTITY_TABLE_DIALOG_CONTROLLER = "com.sap.sct.idtm_ui.src.dialog.entityTable.createEntityTable.CreateEntityTable";

    return Parent.extend(CREATE_ENTITY_TABLE_DIALOG_CONTROLLER, {

        formatter: Formatter,

        constructor: function(oCaller) {
            this._oCaller = oCaller;

            Fragment.load({
                name: CREATE_ENTITY_TABLE_DIALOG_FRAGMENT,
                controller: this
            }).then(function(oDialog) {
                this._oDialog = oDialog;
                this._oDialog.setModel(CreateIngredient.getInitial(), "dialog");
                this._oCaller.getView().addDependent(this._oDialog);
                this._oDialog.open();
            }.bind(this));
        },

        onComboBoxChange: function (oEvent) {
            var sId = oEvent.getParameter("id");
            if(oEvent.getSource().getRequired()) {
                if (oEvent.getParameter("selectedItem")) {
                    oEvent.getSource().setValueState(ValueState.None);
                    this._getDialogModel().getProperty("/fieldValidationGroup")[sId] =  true;
                } else {
                    oEvent.getSource().setValueState(ValueState.Error);
                    this._getDialogModel().getProperty("/fieldValidationGroup")[sId] = false;
                }

                this.validateFields();
            }
        },

        onFieldChange: function (oEvent) {
            var sId = oEvent.getParameter("id");
            if(oEvent.getSource().getRequired()) {
                this._getDialogModel().getProperty("/fieldValidationGroup")[sId] = oEvent.getParameter("value") !== "" ? true : false;
                this.validateFields();
            }
        },

        validateFields: function () {
            var oActionModel = this._getDialogModel();
            var oFieldValidationGroup = oActionModel.getProperty("/fieldValidationGroup");

            var bState = true;

            for(var sElement in oFieldValidationGroup) {
                if(oFieldValidationGroup[sElement] === false) {
                    bState = false;
                }
            }

            oActionModel.setProperty("/enableConfirmButton", bState);
        },

        onCreatePress: function() {
            var oDialogModel = this._getDialogModel();
            var sName = oDialogModel.getProperty("/data/name");
            var nEnergy = Number(oDialogModel.getProperty("/data/energy"));
            var nProtein = Number(oDialogModel.getProperty("/data/protein"));
            var nCarbohydrate = Number(oDialogModel.getProperty("/data/carbohydrate"));
            var nFat = Number(oDialogModel.getProperty("/data/fat"));
            var nFiber = Number(oDialogModel.getProperty("/data/fiber"));
            var nPrice = Number(oDialogModel.getProperty("/data/price"));
            var nIngredientTypeId = Number(oDialogModel.getProperty("/data/ingredientTypeSelectedKey"));

            var oIngredient = Entity.Ingredient.newObject(sName, nEnergy, nProtein, nCarbohydrate, nFat, nFiber, nPrice, null, nIngredientTypeId);

            Request.Ingredient.create.call(this._oCaller, oIngredient, Util.getModel.call(this._oCaller, "data"), "/ingredients", true);
            this._oDialog.close();
        },

        onCancelPress: function() {
            this._oDialog.close();
        },

        onAfterClose: function() {
            this._oDialog.destroy();
        },

        _getDialogModel: function() {
            return this._oDialog.getModel("dialog");
        }
    });
});
