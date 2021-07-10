sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"com/sap/sct/idtm_ui/src/api/Request",
	"com/sap/sct/idtm_ui/src/util/util"
], function(
	Controller,
	Request,
	Util
) {
    "use strict";

    return Controller.extend("com.sap.sct.idtm_ui.src.master.entityTableConfiguration.MasterEntityTableConfiguration", {
		onInit: function () {
			Request.IngredientType.getList.call(this, Util.getModel.call(this, "data"), "/ingredientTypes", true);
		},

		_onObjectMatched : function() {
			//preselect 'All' by default
			var allBtn = this.getView().byId("AllButton");
			allBtn.setSelected(true);
		},

		goToTransportLandscape: function() {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("TransportLandscape", {});
		}

    });

});
