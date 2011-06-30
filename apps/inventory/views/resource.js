// ==========================================================================
// Project:   Inventory.ResourceView
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Inventory */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Inventory.ResourceView = SC.View.extend(
/** @scope Inventory.ResourceView.prototype */ {

  topToolbar: SC.NavigationBarView.design({
    childViews: "titleView assignButton returnButton".w(),
    
    titleView: SC.LabelView.design({
      layout: {width: 100, height: 20, centerX: 0, centerY: 0},
      valueBinding: "Inventory.resourceController.description",
      textAlign: SC.ALIGN_CENTER
    }),
    
    assignButton: SC.ButtonView.design({
      title: "Assign",
      isVisibleBinding: SC.Binding.isNull("Inventory.resourceController.assignedTo"),
      layout: {right: 10, height: 31, width: 70, centerY: 0},
      controlSize: SC.HUGE_CONTROL_SIZE,
      target: "Inventory.resourceController",
      action: "assignResource",
    }),
    
    returnButton: SC.ButtonView.design({
      title: "Return",
      isVisibleBinding: SC.Binding.notNull("Inventory.resourceController.assignedTo"),
      layout: {right: 10, height: 31, width: 70, centerY: 0},
      controlSize: SC.HUGE_CONTROL_SIZE,
      target: "Inventory.resourceController",
      action: "returnResource",
    })
  }),
  
  childViews: "contentView".w(),
  
  contentView: SC.ScrollView.design({
    
    contentView: SC.FormView.design({
      //contentBinding: "Inventory.resourceController",
      childViews: "name type asset serial box phone components".w(),
      
      formFlowSpacing: {left: 0, right: 0, top: 5, bottom: 5},
      
      controlSize: SC.HUGE_CONTROL_SIZE,
      
      exampleRow: SC.FormRowView.extend({
        labelView: SC.FormRowView.LabelView.extend({ textAlign: SC.ALIGN_RIGHT }),
        canWrap: NO,
      }),
      
      name: SC.FormView.row("Name: ", SC.TextFieldView.design({
        contentValueKey: "name",
        layout: {width: 193, height:20},
        controlSize: SC.HUGE_CONTROL_SIZE,
      })),
      type: SC.FormView.row("Type: ", SC.TextFieldView.design({
        contentValueKey: "type",
        layout: {width: 193, height:20},
      })),
      asset: SC.FormView.row("Asset Tag: ", SC.TextFieldView.design({
        contentValueKey: "asset",
        layout: {width: 193, height:20},
      })),
      serial: SC.FormView.row("Serial Number: ", SC.TextFieldView.design({
        contentValueKey: "serialNumber",
        layout: {width: 193, height:20},
      })),
      box: SC.FormView.row("Box Number: ", SC.TextFieldView.design({
        contentValueKey: "boxNumber",
        layout: {width: 193, height:20},
      })),
      phone: SC.FormView.row("Phone Number: ", SC.TextFieldView.design({
        contentValueKey: "phoneNumber",
        layout: {width: 193, height:20},
      })),
      
      components: SC.FormView.row("Components: ", SC.ListView.design({
        layout: {width: 193, height: 2}, // the height fixes some weird iOS glitch where the whole row didn't show up
        contentBinding: "Inventory.componentsController.arrangedObjects",
        contentValueKey: 'name',
        contentCheckboxKey: 'checkedOut',
        isSelectable: NO,
        isEditable: NO,
        rowHeight: 30,
      })),
    })
  })

});
