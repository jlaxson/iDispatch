function(doc) {
  if (doc.aprsCall)
    emit(doc.aprsCall, doc._id);
}
