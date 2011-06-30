// ==========================================================================
// Project:   Inventory.Resource
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Inventory */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Inventory.Resource = SC.Record.extend(
/** @scope Inventory.Resource.prototype */ {
  primaryKey: 'id',

  // TODO: Add your own code here.
  name: SC.Record.attr(String),
  type: SC.Record.attr(String),
  assetTag: SC.Record.attr(String),
  serialNumber: SC.Record.attr(String),
  boxNumber: SC.Record.attr(String),
  phoneNumber: SC.Record.attr(String),
  
  components: SC.Record.toMany('Inventory.Component', {isNested: YES}),
  
  assignedTo: SC.Record.toOne('Inventory.Person'),
  assignedEvent: SC.Record.toOne('Inventory.Event'),
  
  description: function() {
    return this.get('name');
  }.property('name', 'type', 'assetTag', 'serialNumber').cacheable(),
  
  isAssigned: function() {
    return !SC.none(this.get('assignedTo'));
  }.property('assignedTo').cacheable(),

}) ;
