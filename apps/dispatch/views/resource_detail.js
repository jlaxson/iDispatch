// ==========================================================================
// Project:   Dispatch.ResourceDetailView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Dispatch */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Dispatch.ResourceDetailView = SC.View.extend(
/** @scope Dispatch.ResourceDetailView.prototype */ {

  childViews: "tabView".w(),
  layout: { left: 0, right: 0, top: 0, bottom: 0 },
  
  tabView: Iweb.ITabView.design({
    layout: { left: 0, right: 0, top: 0, bottom: 0},
    tabViews: "info map incidents log".w(),
    nowShowing: "info",
    info: SC.WorkspaceView.design({
      tabBarItem: Iweb.ITabBarItem.create({
				title: "Info",
				image: "icons info-tb-30"
			}),
			topToolbar: SC.ToolbarView.design({
			  childViews: "titleView saveButton resourcesButton".w(),
			  titleView: SC.View.design({
			    childViews: "label icon".w(),
			    layout: {height: 30, width: 150, centerX:0, centerY:0},
			    label: SC.LabelView.design({
			      layout: {left: 35, centerY: 0, height:24},
			      controlSize: SC.LARGE_CONTROL_SIZE,
			      valueBinding: "Dispatch.resourceController.name"
			    }),
			    icon: SC.ImageView.design({
			      layout: {height: 30, width: 30, left: 0, top: 0},
			      valueBinding: "Dispatch.resourceController.icon"
			    })
			  }),
		    saveButton: SC.ButtonView.design({
		      layout: {centerY: 0, height: 30, width: 80, right: 10},
		      title: "Save",
		      controlSize: SC.HUGE_CONTROL_SIZE,
		      action: "saveRecords",
		      isEnabledBinding: "Dispatch.resourceController.needsSave"
		    }),
		    resourcesButton: SC.ButtonView.design({
		      title: "Resources",
		      action: "toggleMasterPicker",
		      //target: "Dispatch.mainPage.mainPane.masterDetail",
		      isVisibleBinding: "Dispatch.mainPage.mainPane.masterDetail.masterIsHidden",
		      layout: {centerY: 0, height: 30, width: 100, left: 10},
		      controlSize: SC.HUGE_CONTROL_SIZE,
		    })
			}),
      
      
      contentView: SC.FormView.design({
        contentBinding: "Dispatch.resourceController",
        //layout: {width: 300},
        
        childViews: "name assignedNet trackTreatmentCount treatmentCount treatmentCountUpdated fixedMobile category status aprsCall notes".w(),
        name: SC.FormView.row(SC.TextFieldView.design({
			    controlSize: SC.LARGE_CONTROL_SIZE,
			    valueBinding: "Dispatch.resourceController.name",
			    isEnabledBinding: "Dispatch.resourceController.canEdit",
			    layout: {height: 24, width: 300}
			  })),
        
        icon: SC.FormView.row(SC.WellView.design({
			    layout: {width: 40, height: 40},
			  })),
			  
			  assignedNet: SC.FormView.row(SC.SegmentedView.design({
			    layout: {height: 30, width: 300},
			    controlSize: SC.LARGE_CONTROL_SIZE,
			    itemsBinding: 'Dispatch.config.nets',
			    valueBinding: 'Dispatch.resourceController.assignedNet',
			    isEnabledBinding: "Dispatch.resourceController.canEdit",
			  })),
        
        fixedMobile: SC.FormView.row("Station Type: ", SC.SegmentedView.design({
			    controlSize: SC.LARGE_CONTROL_SIZE,
			    anchorLocation: SC.ANCHOR_LEFT,
			    items: [{title:"Fixed",value:Dispatch.FIXED}, {title:"Mobile",value:Dispatch.MOBILE}],
			    layout: {width: 300, height: 30},
			    valueBinding: "Dispatch.resourceController.mobility",
			    isEnabledBinding: "Dispatch.resourceController.canEdit",
			    itemTitleKey: 'title',
			    itemValueKey: 'value',
          label: 'Type',
			  })),
        
        category: SC.FormView.row(SC.SelectView.design({
			    controlSize: SC.HUGE_CONTROL_SIZE,
			    isEnabledBinding: "Dispatch.resourceController.canEdit",
			    itemsBinding: 'Dispatch.resourceController.categoryMenuChoices',
			    itemTitleKey: 'value',
			    itemSeparatorKey: 'separator',
			    itemValueKey: 'value',
			    valueBinding: 'Dispatch.resourceController.category',
			    layout: {width: 300, height: 29},
			  })),
			  
			  trackTreatmentCount: SC.FormView.row("Track Treatment Count:", SC.CheckboxView.design({
			    layout: {height: 24, width: 16},
			    valueBinding: "Dispatch.resourceController.needsTreatmentCount",
			    isEnabledBinding: "Dispatch.resourceController.canEdit",
			  })),
			  
			  treatmentCount: SC.FormView.row("Treatment Count", SC.TextFieldView.design({
			    layout: {height: 24, width: 100},
			    valueBinding: "Dispatch.resourceController.treatmentCount",
			    isEnabledBinding: "Dispatch.resourceController.canEdit",
			  })),
		    
		    treatmentCountUpdated: SC.FormView.row("Treatment Count Updated:", SC.LabelView.design({
		      valueBinding: 'Dispatch.resourceController.timeSinceTreatmentCountUpdate',
		      layout: {height: 24, width: 300},
		    })),
        
        location: SC.FormView.row(SC.LabelView.design({
			    controlSize: SC.LARGE_CONTROL_SIZE,
			    layout: {height: 24, width: 300},
			    valueBinding: 'Dispatch.resourceController*position.summary'
			  })),
        
        status: SC.FormView.row(SC.SelectView.design({
			    controlSize: SC.HUGE_CONTROL_SIZE,
          
			    valueBinding: 'Dispatch.resourceController.currentStatus',
			    isEnabledBinding: "Dispatch.resourceController.canEdit",
			    itemsBinding: 'Dispatch.resourceController.statusMenuChoices',
          
			    itemTitleKey: 'value',
			    itemSeparatorKey: 'separator',
			    itemValueKey: 'value',
          
			    layout: {width: 300, height: 30},
			  })),
			  
			  aprsCall: SC.FormView.row("APRS Callsign", SC.TextFieldView.design({
			    layout: {height: 24, width: 150},
			    valueBinding: "Dispatch.resourceController.aprsCall",
			    isEnabledBinding: "Dispatch.resourceController.canEdit",
			  })),
        
        notes: SC.FormView.row(SC.TextFieldView.design({
			    isTextArea: YES,
			    controlSize: SC.LARGE_CONTROL_SIZE,
			    layout: {width: 300, height: 300},
			    valueBinding: "Dispatch.resourceController.notes",
			    isEnabledBinding: "Dispatch.resourceController.canEdit",
			  }))
        
      }),

    }),
    incidents: SC.WorkspaceView.design({
      tabBarItem: Iweb.ITabBarItem.create({
				title: "Assignments",
				image: "icons runner-tb-30"
			}),
			contentView: SC.ScrollView.design({
			  contentView: SC.ListView.design({
  		    contentBinding: 'Dispatch.assignmentArrayController.arrangedObjects',
  		    exampleView: Dispatch.AssignmentListItemView.design(),
  		    rowHeight: 36,
  		    isSelectable: NO,
  		    
  		    contentTitleKey: 'incident.description',
  		    contentSummaryKey: 'summaryText',
  		    contentStatusKey: 'disposition'
  	    }),
			})
    }),
    map: SC.WorkspaceView.design({
      tabBarItem: Iweb.ITabBarItem.create({
				title: "Map",
				image: 'icons radar-tb-30'
			})
    }),
    log: SC.WorkspaceView.design({
      tabBarItem: Iweb.ITabBarItem.create({
				title: "Log",
				image: 'icons book-tb-30'
			})
    })
  })

});
