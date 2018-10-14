page("/share", function() {
  $("#upload").hide();
  $("#share").show();
  document.title = 'Share | Droppit';
  sharePage();
});

page("/upload", function() {
  $("#share").hide();
  $("#upload").show();
  document.title = 'Upload | Droppit';
});

page(function() {
  page.redirect("/share");
});

page({ hashbang: true });
