// ==========================================================================
// Project:   Inventory.events
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Inventory */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Inventory.eventsController = SC.ArrayController.create(
/** @scope Inventory.events.prototype */ {

  // TODO: Add your own code here.
  
  eventSelected: function(sender) {
    //var assignedPeople = this.get('selection').firstObject().get('assignedPeople');
    //Inventory.peopleController.set('content', assignedPeople);
    
    var view = SC.getPath('Inventory.mainPage.personSelectView');
    Inventory.mainPage.mainPane.navView.push(view);
  }

}) ;
