// ==========================================================================
// Project:   Dispatch.IncidentDetailView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Dispatch */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
sc_require('views/incident_assignment');
sc_require('views/map')

Dispatch.IncidentDetailView = SC.View.extend(
/** @scope Dispatch.IncidentDetailView.prototype */ {

  showAssignmentPicker: function(sender) {
    var pane = SC.PickerPane.create({
      layout: {width: 250, height: 400},
      contentView: Dispatch.IncidentAssignmentView.design({
        incident: Dispatch.incidentController.get('content')
      }),
      theme: "popover",
    });
    pane.popup(sender, SC.PICKER_POINTER);
  },
  
  showClosePicker: function(sender) {
    var pane = SC.PickerPane.create({
      layout: {width: 250, height: 200},
      theme: 'popover',
      contentView: SC.WorkspaceView.design({
        backgroundColor: 'white',
        contentView: SC.View.design({
          childViews: "label button".w(),
          label: SC.LabelView.design({
            value: "Close this incident and all assignments?",
            layout: {left: 10, right: 10, top: 10, height: 48}
          }),
          button: SC.ButtonView.design({
            title: "Close",
            controlSize: SC.HUGE_CONTROL_SIZE,
            layout: {right: 10, left: 10, bottom: 10, height: 30},
            //target: "Dispatch.incidentController",
            action: function() {
              this.get('pane').remove();
              Dispatch.incidentController.closeIncident();
            }
          })
        })
      })
    });
    
    pane.popup(sender, SC.PICKER_POINTER);
  },

  childViews: "workspaceView".w(),
  layout: { left: 0, right: 0, top: 0, bottom: 0 },
  
  workspaceView: SC.WorkspaceView.design({
    topToolbar: SC.ToolbarView.design({
      childViews: "titleView saveButton incidentsButton assignButton closeButton".w(),
  	  titleView: SC.View.design({
  	    childViews: "label icon".w(),
  	    layout: {height: 30, width: 150, centerX:0, centerY:0},
  	    label: SC.LabelView.design({
  	      layout: {left: 35, centerY: 0, height:24},
  	      controlSize: SC.LARGE_CONTROL_SIZE,
  	      valueBinding: "Dispatch.incidentController.description"
  	    }),
  	    icon: SC.ImageView.design({
  	      layout: {height: 30, width: 30, left: 0, top: 0},
  	      valueBinding: "Dispatch.incidentController.icon"
  	    })
  	  }),
      saveButton: SC.ButtonView.design({
        layout: {centerY: 0, height: 30, width: 65, right: 10},
        title: "Save",
        controlSize: SC.HUGE_CONTROL_SIZE,
        action: "saveRecords",
        isEnabledBinding: "Dispatch.incidentController.needsSave"
      }),
      incidentsButton: SC.ButtonView.design({
        title: "Incidents",
        action: "toggleMasterPicker",
        //target: "Dispatch.mainPage.mainPane.masterDetail",
        isVisibleBinding: "Dispatch.mainPage.mainPane.masterDetail.masterIsHidden",
        layout: {centerY: 0, height: 30, width: 100, left: 10},
        controlSize: SC.HUGE_CONTROL_SIZE,
      }),
      assignButton: SC.ButtonView.design({
        title: "Assign",
        isEnabledBinding: "Dispatch.incidentController.canEdit",
        layout: {centerY: 0, height: 30, width: 75, right: 85},
        controlSize: SC.HUGE_CONTROL_SIZE,
        action: "showAssignmentPicker"
      }),
      closeButton: SC.ButtonView.design({
        title: "Close",
        isEnabledBinding: "Dispatch.incidentController.canEdit",
        layout: {centerY: 0, height: 30, width: 65, right: 170},
        controlSize: SC.HUGE_CONTROL_SIZE,
        action: "showClosePicker"
      })
    }),
    
    contentView: Iweb.ITabView.design({
      layout: { left: 0, right: 0, top: 0, bottom: 0},
      tabViews: "info map assignments log".w(),
      nowShowing: "info",
      
			assignments: SC.ScrollView.design({
        tabBarItem: Iweb.ITabBarItem.create({
  				title: "Assignments",
  				image: 'icons runner-tb-30'
  			}),
  		  contentView: SC.ListView.design({
  		    contentBinding: 'Dispatch.assignmentArrayController.arrangedObjects',
  		    exampleView: Dispatch.AssignmentListItemView.design(),
  		    rowHeight: 36,
  		    isSelectable: NO,
  		    contentTitleKey: 'resource.name',
  		    contentSummaryKey: 'summaryText',
  		    contentStatusKey: 'disposition'
  	    }),
      }),
      map: SC.View.design({
        tabBarItem: Iweb.ITabBarItem.create({
  				title: "Map",
  				image: 'icons radar-tb-30'
  			}),
        childViews: ['map'],
        map: Dispatch.MapView.extend({
            contentBinding: 'Dispatch.incidentController.location',
            itemsBinding: 'Dispatch.resourceArrayController.content',
        }),
      }),
      log: SC.View.design({
        tabBarItem: Iweb.ITabBarItem.create({
  				title: "Log",
  				image: 'icons book-tb-30'
  			})
      }),
      info: SC.ScrollView.design({
        tabBarItem: Iweb.ITabBarItem.create({
      		title: "Info",
      		image: 'icons info-tb-30'
      	}),
        layout: {top: 0, bottom: 0, left: 0, right: 0},

        contentView: SC.View.design(SC.FlowedLayout, {
          layoutDirection: SC.LAYOUT_VERTICAL,
          canWrap: NO,
      	  layout: {top: 0, bottom: 0, width: 700, height: 1000},
      	  flowPadding: {top: 10, left: 10, right: 10, bottom: 10},
      	  childViews: "form container".w(),

      	  form: SC.FormView.design({
      	    layout: {top: 10, left: 10, right: 0, bottom: 0},
      	    childViews: "name type priority disposition location".w(),

      	    name: SC.FormView.row(SC.TextFieldView.design({
      		    controlSize: SC.LARGE_CONTROL_SIZE,
      		    valueBinding: "Dispatch.incidentController.description",
      		    isEnabledBinding: "Dispatch.incidentController.canEdit",
      		    layout: {height: 24, width: 280},
      		    label: 'Name:'
      		  })),

      		  type: SC.FormView.row(SC.SegmentedView.design({
      		    controlSize: SC.LARGE_CONTROL_SIZE,
      		    anchorLocation: SC.ANCHOR_LEFT,
      		    items: [
      		      {title:'Medical', value:'medical'}, 
      		      {title:'Comms', value:'comms'}, 
      		      {title:'Logistics', value:'logistics'},
      		      {title:'Note', value:'note'}],
      		    layout: {width: 280, height: 24},
      		    valueBinding: "Dispatch.incidentController.type",
      		    isEnabledBinding: "Dispatch.incidentController.canEdit",
      		    itemTitleKey: 'title',
      		    itemValueKey: 'value'
      		  })),

      		  disposition: SC.FormView.row(SC.SelectView.design({
      		    controlSize: SC.HUGE_CONTROL_SIZE,
      		    anchorLocation: SC.ANCHOR_LEFT,
      		    itemsBinding: "Dispatch.incidentController.statusesForType",
      		    layout: {width: 280, height: 34},
      		    valueBinding: "Dispatch.incidentController.disposition",
      		    isEnabledBinding: "Dispatch.incidentController.canEdit",
      		    //itemTitleKey: 'title',
      		    //itemValueKey: 'value'
      		  })),

      		  priority: SC.FormView.row(SC.SegmentedView.design({
      		    controlSize: SC.LARGE_CONTROL_SIZE,
      		    anchorLocation: SC.ANCHOR_LEFT,
      		    items: ['Emergency', 'Urgent', 'Normal', 'Low'],
      		    layout: {width: 280, height: 24},
      		    valueBinding: "Dispatch.incidentController.priority",
      		    isEnabledBinding: "Dispatch.incidentController.canEdit",
      		    //itemTitleKey: 'title',
      		    //itemValueKey: 'value'
      		  })),

      		  status: SC.FormView.row(SC.SegmentedView.design({
      		    controlSize: SC.LARGE_CONTROL_SIZE,
      		    anchorLocation: SC.ANCHOR_LEFT,
      		    items: ['New', 'Active', 'Closed'],
      		    layout: {width: 280, height: 24},
      		    valueBinding: "Dispatch.incidentController.currentStatus",
      		    isEnabledBinding: "Dispatch.incidentController.canEdit",
      		    //itemTitleKey: 'title',
      		    //itemValueKey: 'value'
      		  })),

      		  location: SC.FormView.row(SC.LabelView.design({layout: {height: 24, width: 280}})) 

      	  }),

          container: SC.WellView.design(SC.FlowedLayout, {
            layoutDirection: SC.LAYOUT_VERTICAL,
            canWrap: NO,
            layout: {top: 240, left: 10, width: 500, height: 100},
            nowShowingBinding: 'Dispatch.incidentController.detailViewForType',

            contentViewChanged: function() {
              this.get('contentView').invokeOnce('_scfl_tile');
              this.invokeOnce("_scfl_tile");
            }.observes('contentView')
          }),
      	}),
      }),
		})
  }),
});

Dispatch.IncidentDetailView.MedicalView = SC.View.design(SC.FlowedLayout, {
  layoutDirection: SC.LAYOUT_VERTICAL,
  canWrap: NO,
  
  flowPadding: {left: 10, right: 10, top: 10, bottom: 10},
  layout: {width: 500, height: 10},

  childViews: 'form'.w(),
  
  form: SC.FormView.design({
    layout: {top: 10, left: 10, width: 500, height: 400},
    childViews: "ptId ageSex complaint transport notes".w(),
    ptId: SC.FormView.row(SC.TextFieldView.design({
	    controlSize: SC.LARGE_CONTROL_SIZE,
	    //valueBinding: "Dispatch.incidentController.description",
	    isEnabledBinding: "Dispatch.incidentController.canEdit",
	    layout: {height: 24, width: 280},
	  })),
	  
	  ageSex: SC.FormView.row("Age/Sex:", SC.View.design({
	    layout: {height: 24, width: 200},
	    childViews: "age sex".w(),
	    age: SC.TextFieldView.design({
  	    controlSize: SC.LARGE_CONTROL_SIZE,
  	    //valueBinding: "Dispatch.incidentController.description",
  	    isEnabledBinding: "Dispatch.incidentController.canEdit",
  	    layout: {left: 0, top: 0, height: 24, width: 40},
  	  }),
  	  sex: SC.RadioView.design({
  	    layout: {left: 50, top: 3, right: 0, bottom: 0},
  	    items: ['Male', 'Female'],
  	    layoutDirection: SC.LAYOUT_HORIZONTAL
  	  })
	  })),
	  
	  complaint: SC.FormView.row("Complaint:", SC.TextFieldView.design({
	    controlSize: SC.LARGE_CONTROL_SIZE,
	    //valueBinding: "Dispatch.incidentController.description",
	    isEnabledBinding: "Dispatch.incidentController.canEdit",
	    layout: {height: 24, width: 280},
	  })),
	  
	  transport: SC.FormView.row("Transport to:", SC.TextFieldView.design({
	    controlSize: SC.LARGE_CONTROL_SIZE,
	    //valueBinding: "Dispatch.incidentController.description",
	    isEnabledBinding: "Dispatch.incidentController.canEdit",
	    layout: {height: 24, width: 280},
	  })),
	  
	  notes: SC.FormView.row(SC.TextFieldView.design({
	    controlSize: SC.LARGE_CONTROL_SIZE,
	    //valueBinding: "Dispatch.incidentController.description",
	    isEnabledBinding: "Dispatch.incidentController.canEdit",
	    layout: {height: 240, width: 280},
	    isTextArea: YES,
	  })),
  }),
  
  notes: SC.TextFieldView.design({
    layout: {top: 10, left: 10, right: 10, bottom: 10},
    isTextArea:YES,
    valueBinding: 'Dispatch.incidentController.details',
    isEnabledBinding: "Dispatch.incidentController.canEdit",
  })
})

Dispatch.IncidentDetailView.LogisticsView = SC.View.design({
  childViews: 'notes'.w(),
  
  notes: SC.TextFieldView.design({
    layout: {top: 10, left: 10, right: 10, bottom: 10},
    isTextArea:YES,
    valueBinding: 'Dispatch.incidentController.details',
    isEnabledBinding: "Dispatch.incidentController.canEdit",
  })
})

Dispatch.IncidentDetailView.CommsView = SC.View.design(SC.FlowedLayout, {
  layoutDirection: SC.LAYOUT_VERTICAL,
  canWrap: NO,
  
  flowPadding: {left: 10, right: 10, top: 10, bottom: 10},
  layout: {width: 500, height: 10},
  
  childViews: 'form'.w(),
  form: SC.FormView.design({
    layout: {top: 10, left: 10, right: 10},
    childViews: "from to respReq notes".w(),
    from: SC.FormView.row(SC.TextFieldView.design({
	    controlSize: SC.LARGE_CONTROL_SIZE,
	    //valueBinding: "Dispatch.incidentController.description",
	    isEnabledBinding: "Dispatch.incidentController.canEdit",
	    layout: {height: 24, width: 280},
	  })),
	  to: SC.FormView.row(SC.TextFieldView.design({
	    controlSize: SC.LARGE_CONTROL_SIZE,
	    //valueBinding: "Dispatch.incidentController.description",
	    isEnabledBinding: "Dispatch.incidentController.canEdit",
	    layout: {height: 24, width: 280},
	    label: 'Name:'
	  })),
	  respReq: SC.FormView.row("Resp. Req:", SC.CheckboxView.design({
	    //controlSize: SC.HUGE_CONTROL_SIZE,
	    //valueBinding: "Dispatch.incidentController.description",
	    isEnabledBinding: "Dispatch.incidentController.canEdit",
	    layout: {height: 24, width: 24, top: 3},
	  })),
	  notes: SC.FormView.row("Notes:", SC.TextFieldView.design({
      layout: {width: 280, height: 280},
      isTextArea:YES,
      valueBinding: 'Dispatch.incidentController.details',
      isEnabledBinding: "Dispatch.incidentController.canEdit",
    }))
  }),
})

Dispatch.IncidentDetailView.NoteView = SC.View.design({
  childViews: 'notes'.w(),
  
  notes: SC.TextFieldView.design({
    layout: {top: 10, left: 10, right: 10, bottom: 10},
    isTextArea:YES,
    valueBinding: 'Dispatch.incidentController.details',
    isEnabledBinding: "Dispatch.incidentController.canEdit",
  })
})

/*


SC.WorkspaceView.design({
  
	topToolbar: SC.ToolbarView.design({
	  childViews: "titleView saveButton incidentsButton assignButton".w(),
	  titleView: SC.View.design({
	    childViews: "label icon".w(),
	    layout: {height: 30, width: 150, centerX:0, centerY:0},
	    label: SC.LabelView.design({
	      layout: {left: 35, centerY: 0, height:24},
	      controlSize: SC.LARGE_CONTROL_SIZE,
	      valueBinding: "Dispatch.incidentController.description"
	    }),
	    icon: SC.ImageView.design({
	      layout: {height: 30, width: 30, left: 0, top: 0},
	      valueBinding: "Dispatch.incidentController.icon"
	    })
	  }),
    saveButton: SC.ButtonView.design({
      layout: {centerY: 0, height: 30, width: 80, right: 10},
      title: "Save",
      controlSize: SC.HUGE_CONTROL_SIZE,
    }),
    incidentsButton: SC.ButtonView.design({
      title: "Incidents",
      action: "toggleMasterPicker",
      //target: "Dispatch.mainPage.mainPane.masterDetail",
      isVisibleBinding: "Dispatch.mainPage.mainPane.masterDetail.masterIsHidden",
      layout: {centerY: 0, height: 30, width: 100, left: 10},
      controlSize: SC.HUGE_CONTROL_SIZE,
    }),
    assignButton: SC.ButtonView.design({
      title: "Assign",
      isEnabledBinding: "Dispatch.incidentController.hasContent",
      layout: {centerY: 0, height: 30, width: 100, right: 100},
      controlSize: SC.HUGE_CONTROL_SIZE,
      action: "showAssignmentPicker"
    }),
	}),
	contentView:
	
*/