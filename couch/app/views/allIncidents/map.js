
  function(doc) {
  if (doc.recordType == 'incident')
    emit(doc.id, doc);
}
