// ==========================================================================
// Project:   Dispatch.resourceController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Dispatch */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Dispatch.resourceArrayController = SC.ArrayController.create(
/** @scope Dispatch.resourceController.prototype */ {

  // TODO: Add your own code here.

}) ;

Dispatch.ResourceController = SC.ObjectController.extend({
  
  needsSave: function() {
    if (!this.get('hasContent')) return false;
    
    var status = this.get('status');
    return !!(status & SC.Record.DIRTY);
  }.property('hasContent', 'status').cacheable(),
  needsSaveBindingDefault: SC.Binding.bool(),
  
  canEdit: function() {
    if (!this.get('hasContent')) return false;
    
    var status = this.get('status');
    return !!(status & SC.Record.READY);
  }.property('hasContent', 'status').cacheable(),
  
  categoryMenuChoices: function() {
    var content = this.get('content');
    if (SC.none(content)) return [{value: ''}];
    
    var current = content.get('category');
    
    var array = [];
    var presets = ['Mobile Aid Team', 'Fixed Aid Station', 'Logistics'];
    
    if (!SC.none(current) && presets.indexOf(current) == -1) {
      array.push({value: current});
      array.push({separator: YES, value: ''});
    }
    // later, get these from a configured list
    presets.forEach(function(str) {
      array.push({value: str});
    });
    array.push({separator: YES, value: ''});
    array.push({value: 'Other...'});
    
    return array;
    
  }.property('content', 'category').cacheable(),
  
  _editingCategory: false,
  categoryOtherObserver: function() {
    var category = this.get('category');
    
    if (category === 'Other...' && !this._editingCategory) {
      this.set('category', '');
      var pane = Dispatch.TextPromptPane.create({
        valueBinding: 'Dispatch.resourceController.category',
        title: 'Edit Category:'
      });
      pane.append();
      //pane.contentView.categoryText.focus();
    }
  }.observes('category'),
  
  statusMenuChoices: function() {
    var content = this.get('content');
    if (SC.none(content)) return [{value: ''}];
    
    var current = content.get('currentStatus');
    
    var array = [];
    var presets = ['Off Duty', 'Active', 'Relieved'];
    
    if (!SC.none(current) && presets.indexOf(current) == -1) {
      array.push({value: current});
      array.push({separator: YES, value: ''});
    }
    // later, get these from a configured list
    presets.forEach(function(str) {
      array.push({value: str});
    });
    array.push({separator: YES, value: ''});
    array.push({value: 'Other...'});
    
    return array;
    
  }.property('content', 'currentStatus').cacheable(),
  
  _editingStatus: false,
  statusOtherObserver: function() {
    var category = this.get('currentStatus');
    
    if (category === 'Other...' && !this._editingCategory) {
      this.set('currentStatus', '');
      var pane = Dispatch.TextPromptPane.create({
        valueBinding: 'Dispatch.resourceController.currentStatus',
        title: 'Edit Status:'
      });
      pane.append();
      //pane.contentView.categoryText.focus();
    }
  }.observes('currentStatus'),

});

Dispatch.resourceController = Dispatch.ResourceController.create({
  contentBinding: SC.Binding.single("Dispatch.resourceArrayController.selection"),
})