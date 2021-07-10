sap.ui.define([
    "com/sap/sct/idtm_ui/src/dialog/confirmDialog"
], function (
    ConfirmDialog
) {
    "use strict";

    return {

        getDialog: function (fOnSubmit) {
            ConfirmDialog.commonDialog.call(
                this,
                fOnSubmit,
                "cdDeleteEntityTableTitle",
                "cdDeleteEntityTableQuestion",
                "cdDeleteEntityTableButton"
            );
        }
    };
});
