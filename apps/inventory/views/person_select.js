// ==========================================================================
// Project:   Inventory.PersonSelectView
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Inventory */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Inventory.PersonSelectView = SC.View.extend(
/** @scope Inventory.PersonSelectView.prototype */ {

  childViews: 'scrollView'.w(),
  
  classNames: ['personSelect'],
  
  topToolbar: SC.NavigationBarView.design({
    childViews: "titleView addButton".w(),
    
    titleView: SC.LabelView.design({
      layout: {width: 100, height: 30, centerX: 0, centerY: 0},
      valueBinding: "Inventory.eventController.name",
      controlSize: SC.HUGE_CONTROL_SIZE
    }),
    
    addButton: SC.ButtonView.design({
      layout: {width: 50, right: 10, centerY: 0, height: 30},
      title: "Add",
      controlSize: SC.HUGE_CONTROL_SIZE
    })
  }),
  
  scrollView: SC.ScrollView.design({

    contentView: SC.ListView.design({
      contentBinding: "Inventory.peopleController.arrangedObjects",
      selectionBinding: "Inventory.peopleController.selection",
      
      contentValueKey: 'name',
      contentUnreadCountKey: 'resourceCount',
      
      actOnSelect:YES,
      rowHeight: 41,
      target: "Inventory.peopleController",
      action: "personSelect",
    })
  })

});
