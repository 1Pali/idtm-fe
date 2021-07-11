sap.ui.define([
    "sap/ui/model/json/JSONModel"
], function(
    JSONModel
) {
    "use strict";

    return {
        getInitial: new JSONModel({
            entityTables: undefined
        })
    };
});
