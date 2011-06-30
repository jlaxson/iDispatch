// ==========================================================================
// Project:   Inventory.Component
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Inventory */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Inventory.Component = SC.Record.extend(
/** @scope Inventory.Component.prototype */ {

  primaryKey: 'id',

  name: SC.Record.attr(String),
  resource: SC.Record.toOne("Inventory.Resource", {inverse: 'components'}),
  checkedOut: SC.Record.attr(Boolean),

}) ;
