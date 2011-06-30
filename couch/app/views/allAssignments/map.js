function(doc) {
  if (doc.recordType == 'assignment')
    emit(doc.id, doc);
}
}