sap.ui.define([
    "sap/m/MessageToast",
    "com/sap/sct/idtm_ui/src/dialog/BusyDialog"
], function(
    MessageToast,
    BusyDialog
) {
    "use strict";

    var oRequestTypes = {
        GET: "GET",
        POST: "POST",
        PUT: "PUT",
        DELETE: "DELETE"
    };

    return {
        RequestTypes: oRequestTypes,
        AJAXRequest: function(oParent, sType, sUrl, oData, sErrorMessage, bAsync) {
            BusyDialog._getDialog.call(oParent).open();
            return jQuery.ajax({
                type: sType,
                contentType: "application/json",
                url: sUrl,
                dataType: "json",
                data: JSON.stringify(oData),
                async: bAsync,
                error: function (oResponse) {
                    return false;
                    MessageToast.show(sErrorMessage);
                },
                complete: function () {
                    BusyDialog._getDialog.call(oParent).close();
                }.bind(oParent)
            });
        }
    };
});
