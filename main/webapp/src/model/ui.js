sap.ui.define([
    "sap/ui/model/json/JSONModel"
], function(
    JSONModel
) {
    "use strict";

    return {
        getInitial: new JSONModel({
            entityTable: {
              previousEntityTable: undefined,
            },
            selectedObjectIndex: undefined,
            footerVisibility: false,
            editMode: false,
            footerSaveButtonEnabled: false
        })
    };
});
