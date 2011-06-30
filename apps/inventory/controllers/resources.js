// ==========================================================================
// Project:   Inventory.resourcesController
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Inventory */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Inventory.resourcesController = SC.ArrayController.create(
/** @scope Inventory.resourcesController.prototype */ {

  contentBinding: "Inventory.personController.resources",
  
  resourceSelect: function(sender) {
    var view = Inventory.mainPage.get("resourceView");
    Inventory.mainPage.getPath("mainPane.navView").push(view);
  }

}) ;
