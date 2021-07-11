sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/mvc/Controller",
    "com/sap/sct/idtm_ui/src/model/section/editEntityTable",
    "com/sap/sct/idtm_ui/src/util/util",
    "com/sap/sct/idtm_ui/src/model/formatter",
    "sap/ui/core/ValueState"
], function (JSONModel, Controller, EditEntityTable, Util, Formatter, ValueState) {
    "use strict";

    return Controller.extend("com.sap.sct.idtm_ui.src.detail.entityTableConfiguration.components.body.sections.information.GeneralInformation", {

        formatter: Formatter,

        onInit: function () {
            this.getView().setModel(EditEntityTable.getInitial(), "generalInformartionSection");
        },

        getStateAndValidate: function (sValue, sId) {
            var aFieldValidationGroup = this.getView().getModel("generalInformartionSection").getProperty("/fieldValidationGroup");

            if(sValue) {
                aFieldValidationGroup[sId] = true;
                var bIsValid = Util.isFieldGroupValid(aFieldValidationGroup);
                Util.getModel.call(this, "ui").setProperty("/footerSaveButtonEnabled", bIsValid);
                return ValueState.None;
            } else {
                aFieldValidationGroup[sId] = false;
                var bIsValid = Util.isFieldGroupValid(aFieldValidationGroup);
                Util.getModel.call(this, "ui").setProperty("/footerSaveButtonEnabled", bIsValid);
                return ValueState.Error;
            }
        }
    });
});
