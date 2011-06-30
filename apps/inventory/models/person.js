// ==========================================================================
// Project:   Inventory.Person
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Inventory */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Inventory.Person = SC.Record.extend(
/** @scope Inventory.Person.prototype */ {
  primaryKey: 'id',

  // TODO: Add your own code here.
  name: SC.Record.attr(String),
  phone: SC.Record.attr(String),
  email: SC.Record.attr(String),
  
  events: SC.Record.toMany('Inventory.Event', {inverse: 'assignedPeople'}),
  resources: SC.Record.toMany('Inventory.Resource', {inverse: 'assignedTo'}),
  
  resourceCount: function() {
    return this.getPath('resources.length');
  }.property("resources.length").cacheable(),

}) ;
