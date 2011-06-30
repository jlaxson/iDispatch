// ==========================================================================
// Project:   Dispatch.CouchDbDataSource
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Dispatch */

/** @class

(Document Your Data Source Here)

@extends SC.DataSource
*/
sc_require('data_sources/queries.js');

Dispatch.CouchDBDataSource = SC.DataSource.extend(
/** @scope Dispatch.CouchDbDataSource.prototype */ {

  _dbpath: 'dispatch',

  getServerPath: function(resourceName) {
    var path = '/' + this._dbpath + "//" + resourceName;
    return path;
  },

  getServerView: function(viewName) {
    var path = '/' + this._dbpath + "/_design/app/_view/" + viewName;
    return path;
  },
  
  getUuid: function() {
      // http://www.ietf.org/rfc/rfc4122.txt
      var s = [];
      var hexDigits = "0123456789abcdef";
      for (var i = 0; i < 32; i++) {
          s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
      }
      s[12] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
      s[16] = hexDigits.substr((s[16] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01

      var uuid = s.join("");
      return uuid;
  },

  // ..........................................................
  // QUERY SUPPORT
  // 
  
  recordClassForType: function(type) {
    switch (type) {
      case 'incident':
        return Dispatch.Incident;
      case 'assignment':
        return Dispatch.Assignment;
      case 'resource':
        return Dispatch.Resource;
    }
    return null;
  },

  fetch: function(store, query) {

    var url = null;
    
    if (query === Dispatch.INCIDENTS_ALL || query === Dispatch.INCIDENTS_ACTIVE) {
      url = this.getServerView('allIncidents');
    } else if (query === Dispatch.RESOURCES_ALL) {
      url = this.getServerView('allResources');
    } else if (query === Dispatch.ASSIGNMENTS_ALL) {
      url = this.getServerView('allAssignments');
    }
      
    if (url !== null) {
      SC.Request.getUrl(url).json()
      .header('Accept', 'application/json')
      .notify(this, 'didFetchRecords', store, query)
      .send();

      return YES;
    }

    return NO ; // return YES if you handled the query
  },

  didFetchRecords: function(response, store, query) {
    if(SC.ok(response)) {
      var body = response.get('encodedBody');
      var couchResponse = SC.json.decode(body);
      var records = couchResponse.rows.getEach('value');
      if (records.length > 0) {
        var typeStr = records[0].recordType;
        var klass = this.recordClassForType(typeStr);
        
        store.loadRecords(klass, records);
      }
      store.dataSourceDidFetchQuery(query);
    } else {
      store.dataSourceDidErrorQuery(query, response);
    }
  },

  // ..........................................................
  // RECORD SUPPORT
  // 

  retrieveRecord: function(store, storeKey) {
    //if (SC.kindOf(store.recordTypeFor(storeKey), Dispatch.Incident)) {
      var id = store.idFor(storeKey);
      SC.Request.getUrl(this.getServerPath(id))
      .header('Accept', 'application/json').json()
      .notify(this, 'didRetrieveIncident', store, storeKey)
      .send();

      return YES;
    //}

    //return NO ; // return YES if you handled the storeKey
  },

  didRetrieveIncident: function(response, store, storeKey) {
    if (SC.ok(response)) {
      var dataHash = response.get('body').content;
      
      var status = store.readStatus(storeKey);
      if (!(status & SC.Record.BUSY)) return;
      
      store.dataSourceDidComplete(storeKey, dataHash);

    } else store.dataSourceDidError(storeKey, response);
  },

  processResponse: function(response) {
    if (SC.ok(response)) {
      var body = response.get('encodedBody'); 
      var couchResponse = SC.json.decode(body);
      var ok = couchResponse.ok;
      if (ok != YES) return {"error":true, "response":couchResponse};

      var id = couchResponse.id;
      var rev = couchResponse.rev;
      return {"ok":true, "id": id, "rev": rev};
    } else {
      return {"error":true, "response":response};
    }
  },

  /**
  Get the latest revision of the document.
  For docs which were fetch from the server we use _rev field,
  and for docs that were modified we use the local _docsRev dictionary.
  */
  getDocRev: function(doc) {
    return doc._rev;
  },
  
  handlesRecord: function(store, storeKey) {
    var kind = store.recordTypeFor(storeKey);
    if (SC.kindOf(kind, Dispatch.Incident) || 
        SC.kindOf(kind, Dispatch.Resource) ||
        SC.kindOf(kind, Dispatch.Assignment)) {
      return true;
    }
    return false
  },

  createRecord: function(store, storeKey) {
    var rt = null;
    var kind = store.recordTypeFor(storeKey);
    if (SC.kindOf(kind, Dispatch.Incident)) {
      rt = 'incident';
    } else if (SC.kindOf(kind, Dispatch.Resource)) {
      rt = 'resource';
    } else if (SC.kindOf(kind, Dispatch.Assignment)) {
      rt = 'assignment';
    }
    
    if (rt !== null) {
      var hash = store.readDataHash(storeKey);
      hash.recordType = rt;
      SC.Request.postUrl(this.getServerPath('/')).json()
      .header('Accept', 'application/json')
      .notify(this, this.didCreateRecord, store, storeKey)
      .send(hash);
      return YES;
    }
    return NO ; // return YES if you handled the storeKey
  },

  didCreateRecord: function(response, store, storeKey) {
    var couchRes = this.processResponse(response);
    if (couchRes.ok) {
      // Add _id and _rev to the local document for further server interaction.
      var localDoc = store.readDataHash(storeKey);
      localDoc._id = couchRes.id;
      localDoc._rev = couchRes.rev;
      store.dataSourceDidComplete(storeKey, localDoc, couchRes.id);
    } else {
      store.dataSourceDidError(storeKey, response);
    }
  },

  updateRecord: function(store, storeKey) {
    if (this.handlesRecord(store, storeKey)) {
      var id = store.idFor(storeKey);
      var dataHash = store.readDataHash(storeKey);
      SC.Request.putUrl(this.getServerPath(id)).json()
      .header('Accept', 'application/json')
      .notify(this, this.didUpdateRecord, store, storeKey)
      .send(dataHash);
      return YES;
    }
    return NO;
  },

  didUpdateRecord: function(response, store, storeKey) {
    var couchRes = this.processResponse(response);
    if (couchRes.ok) {
      // Update the local _rev of this document.
      var localDoc = store.readDataHash(storeKey);
      localDoc._rev = couchRes.rev;
      store.dataSourceDidComplete(storeKey, localDoc) ;
    } else if (response.status == 409) {
      console.log('resolving conflict');
      SC.Request.getUrl(this.getServerPath(store.idFor(storeKey))).json()
          .header('Accept', 'application/json')
          .notify(this, this.gotRefreshedRecordForConflict, store, storeKey)
          .send();
    } else {
      store.dataSourceDidError(storeKey);
    }
  },
  
  gotRefreshedRecordForConflict: function(response, store, storeKey) {
    if (SC.ok(response)) {
      var resp = SC.json.decode(response.encodedBody());
      var localDoc = store.readDataHash(storeKey);
      
      // for now, just update the revision number
      // this will overwrite the server from our copy
      localDoc._rev = resp._rev;
      
      // fire the update process again
      this.updateRecord(store, storeKey);
    } else {
      console.warn('error getting updated record');
      store.dataSourceDidError(storeKey);
    }
  },

  destroyRecord: function(store, storeKey) {

    if (this.handlesRecord(store, storeKey)) {
      var id = store.idFor(storeKey);
      //var rev = this._docsRev[id];	
      var dataHash = store.readDataHash(storeKey);
      var rev = this.getDocRev(dataHash);
      SC.Request.deleteUrl(this.getServerPath(id + "?rev=" + rev)).json()
      .header('Accept', 'application/json')
      .notify(this, this.didDeleteRecord, store, storeKey)
      .send();
      return YES;
    }	

    return NO ; // return YES if you handled the storeKey
  },

  didDeleteIncident: function(response, store, storeKey) {
    var couchRes = this.processResponse(response);  
    if (couchRes.ok) {
      store.dataSourceDidDestroy(storeKey);
    } else {
      store.dataSourceDidError(response);	
    }
  }

}) ;
