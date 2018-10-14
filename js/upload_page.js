$(function() {
  var $upload = $("#upload");

  function addFile(file) {
    var files = window.filesToUpload || (window.filesToUpload = []);
    files.push(file);
    $("#emptyUploadTitle").hide();
    $("#selectedUploadTitle").show();
    $("#selectedUploadTitle").text(files.length + " File(s) Selected");

    var $uploadList = $("#uploadList").show();
    $('#uploadContinueButton').show().click(function() {
        page('/share');
    });

    /*
    <div class="item">
        <i class="large github middle aligned icon"></i>
        <div class="content">
            <a class="header">Semantic-Org/Semantic-UI</a>
            <div class="description">Updated 10 mins ago</div>
        </div>
    </div>
    */

    var $icon;

    if (/^image\/.*/.test(file.type)) {
      var rdr = new FileReader();
      $icon = $('<img class="ui mini image"/>');
      rdr.onloadend = function() {
          $icon.attr('src', rdr.result);
      };
      rdr.onerror = function() {
        alert(
          "An error occurred while adding this image. Please try again shortly."
        );
      };
      rdr.readAsDataURL(file);
    } else {
      $icon = $('<i class="large file middle aligned icon"></i>');
    }

    var $item = $('<div class="item"></div>')
      .append($icon)
      .append(
        $('<div class="content"></div>')
          .append($('<a class="header">' + file.name + "</a>"))
          .append(
            $('<div class="description">' + file.size / 1000 + " KiB</div>")
          )
      );

    $uploadList.append($item);
  }

  function addFiles(files) {
    if (files.length) {
      for (var i = 0; i < files.length; i++) {
        addFile(files[i]);
      }
    }
  }

  $("#uploadButton").click(function() {
    $("#uploadInput").click();
  });

  $("#uploadInput").on("change", function(e) {
    addFiles(e.target.files);
  });

  $upload
    .on("dragleave dragend drop", function onDrop(e) {
      e.preventDefault();
      $("body").removeClass("dragover");
      e.dataTransfer = e.originalEvent.dataTransfer;
      if (e.dataTransfer && e.dataTransfer.files.length) {
        addFiles(e.dataTransfer.files);
      }
    })
    .on("dragover dragenter", function(e) {
      e.preventDefault();
      $("body").addClass("dragover");
    });
});
