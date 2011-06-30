// ==========================================================================
// Project:   Dispatch.assignment
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Dispatch */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/

Dispatch.assignmentArrayController = SC.ArrayController.create(
/** @scope Dispatch.assignment.prototype */ {

  // TODO: Add your own code here.
  //contentBinding: 'Dispatch.mainPage.mainPane*currentObject.assignments'
  
  _contentPath: null,
  setContentPath: function(path) {
    if (this._contentBinding != null) {
      this._contentBinding.disconnect();
    }
    
    this._contentBinding = this.bind('content', path);
  }
}) ;
