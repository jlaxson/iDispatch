// ==========================================================================
// Project:   Dispatch - mainPage
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Dispatch */

// This page describes the main user interface for your application.  
Dispatch.mainPage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page 
  // load.
  mainPane: SC.MainPane.design({
    theme: 'ace',
    
    childViews: 'masterDetail'.w(),
    
    currentObject: null,
    
    masterDetail: SC.MasterDetailView.design({
      layout: { left: 0, right: 0, top: 0, bottom: 0 },
      autoHideMaster: YES,
      masterView: Iweb.ITabView.design({
        tabViews: "general resources incidents".w(),
        nowShowing: "general",

        general: Dispatch.GeneralMasterView.design({
          tabBarItem: Iweb.ITabBarItem.create({
  					title: "General",
  					image:'icons gear-tb-30'
  				})
        }),

        resources: Dispatch.ResourceMasterView.design(),

        incidents: Dispatch.IncidentMasterView.design(),
      }),
      
      detailView: SC.ContainerView.design({
        layout: { left: 0, right: 0, top: 0, bottom: 0 },
        //nowShowing: 'resourceDetail'
      }),
    }),
    
    saveRecords: function(sender) {
      Dispatch.save();
    }
  }),
  
  resourceDetail: Dispatch.ResourceDetailView,
  incidentDetail: Dispatch.IncidentDetailView,
  
  showResourceDetail: function() {
    
  }

});
