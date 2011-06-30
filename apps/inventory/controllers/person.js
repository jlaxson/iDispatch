// ==========================================================================
// Project:   Inventory.personController
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Inventory */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Inventory.personController = SC.ObjectController.create(
/** @scope Inventory.personController.prototype */ {

  contentBinding: SC.Binding.single("Inventory.peopleController.selection"),

}) ;
