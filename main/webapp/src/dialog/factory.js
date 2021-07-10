sap.ui.define([
    "com/sap/sct/idtm_ui/src/dialog/entityTable/createEntityTable/CreateEntityTable"
], function(
    CreateEntityTable
) {

    "use strict";
    return {
        getCreateEntityTableDialog: function(oCaller) {
            new CreateEntityTable(oCaller);
        }
    };
});
