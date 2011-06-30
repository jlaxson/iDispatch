Dispatch.CouchNotificationClient = SC.Object.extend({
  _sequence: null,
  dbName: null,
  useLongPoll: NO,
  
  changesUrl: function() {
    return '/dispatch/_changes';
  },
  
  init: function() {
    sc_super();
    
    // first, do a short poll to get current revision number
    SC.Request.getUrl(this.changesUrl()).json()
      .notify(this, 'didGetInitialResponse')
      .header('Accept', 'application/json')
      .async()
      .send();
  },
  
  didGetInitialResponse: function(response) {
    if (SC.ok(response)) {
      var body = SC.json.decode(response.encodedBody());
      var seq = body.last_seq;
      
      this._sequence = seq;
      
      this.sendPoll();
    } else {
      console.warn('error getting initial response');
    }
  },
  
  sendPoll: function() {
    var lp = this.get('useLongPoll');
    if (lp) this.sendLongPoll();
    else this.sendTimedPoll();
  },
  
  sendLongPoll: function() {
    SC.Request.getUrl(this.changesUrl() + "?include_docs=true&feed=longpoll&since=" + this._sequence).json()
      .notify(this, 'didGetPollResponse')
      .header('Accept', 'application/json')
      .async()
      .send();
  },
  
  sendTimedPoll: function() {
    SC.Timer.schedule({
      interval: 2000,
      repeats: NO,
      target: this,
      action: function() {
        SC.Request.getUrl(this.changesUrl() + "?include_docs=true&since=" + this._sequence).json()
          .notify(this, 'didGetPollResponse')
          .header('Accept', 'application/json')
          .async()
          .send();
      }
    });
  },
  
  didGetPollResponse: function(response) {
    if (!SC.ok(response)) {
      console.warn("didn't complete ok, resending");
      this.sendPoll();
      return;
    }
    var body = SC.json.decode(response.encodedBody());
    var seq = body.last_seq;
    
    body.results.forEach(function(res) {
      var doc = res.doc;
      var rt = doc.recordType;
      if (rt !== undefined) {
        var klass = Dispatch.store.dataSource.recordClassForType(rt);
        if (!SC.none(klass)) {
          //console.log(rt);
          
          Dispatch.store.pushRetrieve(klass, doc._id, doc);
          // don't really need to handle deletions right now, 'cause, well, we don't do them.
        }
      }
    });

    
    this._sequence = seq;
    
    this.sendPoll();
  }
});