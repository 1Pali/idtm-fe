sap.ui.define([
    "sap/ui/model/json/JSONModel"
], function(
    JSONModel
) {
    "use strict";

    return {
        getInitial: function () {
            return new JSONModel({
                data: {

                },
                fieldValidationGroup: {

                },
                enableConfirmButton: false
            });
        }
    };
});
