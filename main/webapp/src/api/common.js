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
        AJAXRequest: function(sType, sUrl, oData, fnOnSuccess, sErrorMessage, bAsync) {
            BusyDialog._getDialog.call(this).open();
            return jQuery.ajax({
                type: sType,
                contentType: "application/json",
                url: sUrl,
                dataType: "json",
                data: JSON.stringify(oData),
                async: bAsync,
                success: fnOnSuccess.bind(this),
                error: function (oResponse) {
                    return false;
                    MessageToast.show(sErrorMessage);
                },
                complete: function () {
                    BusyDialog._getDialog.call(this).close();
                }.bind(this)
            });
        }
    };
});
