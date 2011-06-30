// ==========================================================================
// Project:   Inventory.Event
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Inventory */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Inventory.Event = SC.Record.extend(
/** @scope Inventory.Event.prototype */ {
  primaryKey: 'id',

  // TODO: Add your own code here.
  name: SC.Record.attr(String),
  
  assignedPeople: SC.Record.toMany('Inventory.Person', {inverse: 'events'}),
  assignedResources: SC.Record.toMany('Inventory.Resource', {inverse: 'assignedEvent'}),

  trueKey: function() { return YES; }.property(),
}) ;
