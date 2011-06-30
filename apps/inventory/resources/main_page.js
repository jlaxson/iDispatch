// ==========================================================================
// Project:   Inventory - mainPage
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Inventory */

// This page describes the main user interface for your application.  
Inventory.mainPage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page 
  // load.
  mainPane: SC.MainPane.design({
    childViews: 'navView'.w(),
    
    navView: Iweb.INavigationView.design({
      rootView: SC.ScrollView.design({
        hasHorizontalScroller: NO,
        delaysContentTouches: NO,
        
        topToolbar: SC.NavigationBarView.design({
          childViews: 'addButton'.w(),
          
          addButton: SC.ButtonView.design({
            layout: {width: 50, right: 10, centerY: 0, height: 30},
            title: "Add",
            controlSize: SC.HUGE_CONTROL_SIZE
          })
        }),
        contentView: SC.ListView.design({
          contentBinding: "Inventory.eventsController.arrangedObjects",
          selectionBinding: "Inventory.eventsController.selection",
          
          contentValueKey: 'name',
          
          hasContentBranch: YES,
          contentIsBranchKey: 'trueKey',
          
          rowHeight: 41,
          target: 'Inventory.eventsController',
          action: 'eventSelected',
          actOnSelect:YES,
        })
      })
    })
  }),
  
  personSelectView: Inventory.PersonSelectView.design({
    
  }),
  
  personView: Inventory.PersonView.design({
    
  }),
  
  resourceView: Inventory.ResourceView.design({
    
  }),

});
