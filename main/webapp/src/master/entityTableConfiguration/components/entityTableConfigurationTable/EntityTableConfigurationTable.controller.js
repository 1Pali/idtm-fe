sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/f/library",
	"com/sap/sct/idtm_ui/src/api/Request",
	"com/sap/sct/idtm_ui/src/dialog/factory",
	"com/sap/sct/idtm_ui/src/dialog/entityTable/deleteEntityTable",
	"com/sap/sct/idtm_ui/src/util/util"
], function(
	Controller,
	JSONModel,
	FioriLibrary,
	Request,
	DialogFactory,
	DeleteEntityTableDialog,
	Util
	) {
    "use strict";

    return Controller.extend("com.sap.sct.idtm_ui.src.master.entityTableConfiguration.components.entityTableConfigurationTable.entityTableConfigurationTable", {
		onInit: function () {
			Request.Ingredient.getList.call(this, this.getOwnerComponent().getModel("data"), "/ingredients", false);
		},

		onTableListItemPress: function (oEvent) {
			var sIngredientPath = oEvent.getSource().getBindingContext("data").getPath();
			var sPathParts = sIngredientPath.split("/");
			var nIngredientModelIndex = sPathParts[sPathParts.length - 1];

			this.getOwnerComponent().getRouter().navTo("DetailEntityTableConfiguration",
				{
					layout: FioriLibrary.LayoutType.TwoColumnsMidExpanded,
					ingredient: nIngredientModelIndex
				});
		},

		onCreatePress: function (oEvent) {
			DialogFactory.getCreateEntityTableDialog(this);
		},

		onDeletePress: function (oEvent) {
			DeleteEntityTableDialog.getDialog.call(this, this._deleteIngredients);
		},

		_deleteIngredients: function () {
//			var aDeletedIngredients = this.getView().byId("identityTableConfigurationTable").getSelectedItems()
//				.map(row => row.getBindingContext("data").getObject().id);
//
//			//TODO need to implement some dialog which will display error logs in case that some of ingredients will not be deleted
//			Request.Ingredient.deleteList.call(this, aDeletedIngredients, Util.getModel.call(this, "data"), "/ingredients", true);
		}
    });

});
