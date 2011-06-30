function(doc) {
  if (doc.recordType == 'resource')
    emit(doc.id, doc);
}
