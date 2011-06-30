// ==========================================================================
// Project:   Inventory.peopleController
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Inventory */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Inventory.peopleController = SC.ArrayController.create(
/** @scope Inventory.peopleController.prototype */ {

  contentBinding: 'Inventory.eventController.assignedPeople',
  //contentBinding: '.event.assignedPeople',
  
  personSelect: function(sender) {
    var view = Inventory.mainPage.get("personView");
    
    Inventory.mainPage.mainPane.navView.push(view);
  }

}) ;
