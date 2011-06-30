// ==========================================================================
// Project:   Inventory.PersonView
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Inventory */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Inventory.PersonView = SC.View.extend(
/** @scope Inventory.PersonView.prototype */ {

  topToolbar: SC.NavigationBarView.design({
    childViews: "titleView addButton".w(),
    
    titleView: SC.LabelView.design({
      layout: {width: 100, height: 30, centerX: 0, centerY: 0},
      valueBinding: "Inventory.personController.name",
      controlSize: SC.HUGE_CONTROL_SIZE
    }),
    
    addButton: SC.ButtonView.design({
      layout: {width: 50, right: 10, centerY: 0, height: 30},
      title: "Add",
      controlSize: SC.HUGE_CONTROL_SIZE
    })
  }),
  
  childViews: "scrollView".w(),
  
  scrollView: SC.ScrollView.design({
    contentView: SC.FormView.design({
      controlSize: SC.LARGE_CONTROL_SIZE,
      childViews: "name phone email resources".w(),
      
      formFlowSpacing: {left: 0, right: 0, top: 5, bottom: 5},

      name: SC.FormView.row("Name", SC.TextFieldView.design({
        label: "Name",
        layout: {width: 200, height: 20},
      })),
      
      phone: SC.FormView.row("Phone", SC.TextFieldView.design({
        layout: {width: 200, height: 20},
      })),
      
      email: SC.FormView.row("E-mail", SC.TextFieldView.design({
        layout: {width: 200, height: 20},
      })),
      
      resources: SC.ListView.design({
        contentBinding: "Inventory.resourcesController.arrangedObjects",
        selectionBinding: "Inventory.resourcesController.selection",
        
        layout: {width: 320},
        backgroundColor: 'white',
        rowHeight: 41,
        
        contentValueKey: 'description',
        
        actOnSelect: YES,
        target: "Inventory.resourcesController",
        action: "resourceSelect",
      })
    }),
  }),

});
