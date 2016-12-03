(function ($) {
    var currentAspect = {},
        selectedItem,
        suppressResize;

    $.extend({
        mediaPicker: {
            uploadMedia: uploadMedia,
            scalePreview: scalePreview
        }
    });

    var systemType = "none";
    var fileSrc = "";
    var fileType = "";

    $("#img-cancel, #lib-cancel").live("click", function () { window.close(); });
    // when url changes, set the preview and loader src
    $("#img-src").live("change", function () {
        urlGridFunction(this);
    });
    $(".media-item").live("click", function () {
        if (selectedItem) {
            selectedItem.removeClass("selected");
        }
        selectedItem = $(this);
        selectedItem.addClass("selected");
        selectPropVisibility(selectedItem.attr("data-filetype"));
        var prefix = "#lib-";

        $(prefix + "fid").val(selectedItem.attr("data-fid"));
        var srcImg = selectedItem.attr("data-imgsrc");
        systemType = selectedItem.attr("data-filetype");
        if (systemType != "pictures")
            srcImg = selectedItem.attr("data-src");

        fileSrc = selectedItem.attr("data-imgsrc");
        selectImage(prefix, srcImg);
    });


    // maintain aspect ratio when width or height is changed
    $("#img-width, #lib-width").live("change", fixAspectHeight);
    $("#img-height, #lib-height").live("change", fixAspectWidth);

    $("#img-insert, #lib-insert").live("click", function () {
        if ($(this).hasClass("disabled")) return;
        publishInsertEvent(this);
    });

    $(".media-filename").live("click", function (ev) {
        // when clicking on a filename in the gallery view,
        // we interrupt the normal operation and write a <img>
        // tag into a new window to ensure the image displays in
        // a new window instead of being 'downloaded' like in Chrome
        ev.preventDefault();
        var self = $(this),
            src = attributeEncode(self.attr("href")),
            w = window.open("", self.attr("target"));
        w.document.write("<!DOCTYPE html><html><head><title>" + src + "</title></head><body><img src=\"" + src + "\" alt=\"\" /></body></html>");
    });

    $("#createFolder").live("click", function () {
        if ($(this).hasClass("disabled")) return;
        $.post("FileManager/CreateFolder", { gid: $("#parentGroupId").val(), folderName: $("#folderName").val(), __RequestVerificationToken: $("#__requesttoken").val() },
            function (response) {
                if (response.Success) {
                    location.reload(true);
                } else if (response.Success === false) {
                    alert(response.Message);
                } else if (response.indexOf($.mediaPicker.logonUrl) !== -1) {
                    // A redirection due to expired authorization
                    alert($.mediaPicker.accessDeniedMsg);
                } else alert($.mediaPicker.cannotPerformMsg);
            });
    });

    $("#folderName").live("propertychange keyup input paste", function () {
        var empty = ($("#folderName").val() == "");
        $("#createFolder").attr("disabled", empty).toggleClass("disabled", empty);
    });

    $(function () {
        $("#tabs").tabs({
            selected: parseInt(query("tab", location.hash)) || 0,
            select: function (event, ui) {
                // sync the active tab with the hash value
                location.hash = "tab=" + ui.index;
            }
        });

        // populate width and height when image loads
        // note: load event does not bubble so cannot be used with .live
        $("#img-loader, #lib-loader, #div-loader").bind("load", syncImage);

        $("#lib-uploadform").bind("uploadComplete", function (ev, url) {
            // from the libary view, uploading should cause a reload
            var href = location.href,
                hashindex = location.href.indexOf("#");
            if (hashindex !== -1) {
                href = href.substr(0, hashindex);
            }
            location.href = href + "&rl=" + (new Date() - 0) + "#tab=1&select=" + url.substr(url.lastIndexOf("/") + 1);
        });

        var preselect = query("select", location.hash);
        if (preselect) {
            $("tr[data-filename='" + preselect + "']").closest(".media-item").trigger("click");
        }

        // edit mode has slightly different wording
        // elements advertise this with data-edittext attributes,
        // the edit text is the element's new val() unless -content is specified.
        if (query("editmode") === "true") {
            $("[data-edittext]").each(function () {
                var self = $(this),
                    isContent = self.attr("data-edittext-content") === "true",
                    editText = self.attr("data-edittext");
                if (isContent) {
                    self.text(editText);
                }
                else {
                    self.attr("value", editText);
                }
            });
        }

        try {
            var data = window.opener.jQuery[query("callback")].data,
            img = data ? data.img : null;
        }
        catch (ex) {
            alert($.mediaPicker.cannotPerformMsg);
            window.close();
        }

        if (img) {
            for (var name in img) {
                $("#img-" + name).val(img[name]);
            }
            suppressResize = true;
            $("#img-src").trigger("change");
        }
    });

    function getFileType(path) {
        var type = "none";
        if (pictureExt.indexOf(path.substring(path.lastIndexOf(".") + 1)) >= 0) {
            type = "pictures";
        }
        else if (docExt.indexOf(path.substring(path.lastIndexOf(".") + 1)) >= 0) {
            type = "documents";
        }
        else if (videoExt.indexOf(path.substring(path.lastIndexOf(".") + 1)) >= 0) {
            type = "video";
        }
        return type;
    }

    function setVisibilityImgProps(type) {
        $(".img-image-items").hide();
        $(".img-video-items").hide();
        $(".img-documents-items").hide();

        $(".img-image-items-ext").hide();
        $(".img-video-items-ext").hide();
        $(".img-documents-items-ext").hide();
        $("#img-resize").hide();

        $(".img-pe-none-display-style").hide();

        switch (type) {
            case "none": $(".img-type-none-display-style").show(); break;
            case "pictures": $(".img-image-items").show(); mediaClass = "img-image-items-ext"; break;
            case "documents": $(".img-documents-items").show(); mediaClass = "img-documents-items-ext"; break;
            case "video": $(".img-video-items").show(); mediaClass = "img-video-items-ext"; break;
        }

        if ($("#img-display").val() == "element" && type != "none") {
            $("." + mediaClass).show();
            $("#img-resize").show();
        }
    }


    function urlGridFunction(obj) {
        var type = getFileType(obj.value);
        systemType = type;
        fileSrc = obj.value;
        setVisibilityImgProps(type);
        $("#img-docpreview").hide()
        $("#img-preview").show();
        if (type == "documents") {
            $("#img-docpreview").show();
            var docUrl = docIframeUrl;
            docUrl = docUrl.replace("{0}", pageRoot + fileSrc);
            $("#img-docpreview").attr("src", docUrl);
            $("#img-preview").hide();
        }
        var src = obj.value;
        if (type == "video") {
            src = videoPreviewImg;
        }
        else if (type == "none" || type == "documents") {
            src = unknownpreview;
        }
        if (type == "documents") {
            
            $("#img-loader").attr("src", src);
            $("#img-insert").attr("disabled", !src).toggleClass("disabled", !src);
            $("#img-src").val(fileSrc);
        }
        else {
            selectImage(getIdPrefix(obj), src);
        }
    }

    function selectPropVisibility(type) {
        $(".image-items").hide();
        $(".video-items").hide();
        $(".documents-items").hide();

        $(".image-items-ext").hide();
        $(".video-items-ext").hide();
        $(".documents-items-ext").hide();
        $("#lib-resize").hide();

        $(".type-none-display-style").hide();

        switch (type) {
            case "none": $(".type-none-display-style").show(); break;
            case "pictures": $(".image-items").show(); mediaClass = "image-items-ext"; break;
            case "documents": $(".documents-items").show(); mediaClass = "documents-items-ext"; break;
            case "video": $(".video-items").show(); mediaClass = "video-items-ext"; break;
        }

        if ($("#lib-display").val() == "element" && type != "none") {
            $("." + mediaClass).show();
            $("#lib-resize").show();
        }
    }


    function selectImage(prefix, src) {
        $(prefix + "preview")
            .css({
                display: "none",
                width: "",
                height: ""
            })
            .attr("src", src);
        $(prefix + "loader").attr("src", src);
        if (fileSrc == null || fileSrc == "")
            $(prefix + "src").val(src);
        else
            $(prefix + "src").val(fileSrc);
        $(prefix + "insert").attr("disabled", !src).toggleClass("disabled", !src);
    }

    function getIdPrefix(e) {
        return "#" + e.id.substr(0, 4);
    }
    function publishInsertEvent(button) {
        var prefix = getIdPrefix(button);
        var img = {
            src: $(prefix + "src").val(),
            alt: $(prefix + "alt").val(),
            "class": $(prefix + "class").val(),
            style: $(prefix + "style").val(),
            align: $(prefix + "align").val(),
            width: $(prefix + "width").val(),
            height: $(prefix + "height").val(),
            displaystyle: $(prefix + "display").val()
        };
        //img.html = getImageHtml(img);

        //        var d = $.post("FileManager/GetTempHtml", { __RequestVerificationToken: $("#__requesttoken").val() }, function (data) {
        //            alert("ahoj ondro");
        //        });
        //        alert(d);

        var postData = $.post("FileManager/GetFileHtml",
                { fid: $(prefix + "fid").val(), src: $(prefix + "src").val(), alt: $(prefix + "alt").val(), cssclass: $(prefix + "class").val(),
                    style: $(prefix + "style").val(), align: $(prefix + "align").val(), width: $(prefix + "width").val(), height: $(prefix + "height").val(),
                    displaystyle: $(prefix + "display").val(), __RequestVerificationToken: $("#__requesttoken").val()
                },
              function (response) {
                  if (response.Success) {
                      img.html = response.Message;
                      window.opener.jQuery[query("callback")]({ img: img });
                  } else { alert($.mediaPicker.cannotPerformMsg); }

                  window.close();
              });

    }

    function parseUnits(value) {
        if (/\s*[0-9]+\s*(px)?\s*/i.test(value)) {
            return parseInt(value);
        }
        return NaN;
    }

    function fixAspectWidth() {
        var prefix = getIdPrefix(this);
        if (!$(prefix + "lock:checked").val()) return;
        var height = parseUnits(this.value);
        if (!isNaN(height)) {
            $(prefix + "width").val(Math.round(height * currentAspect[prefix]));
        }
    }

    function fixAspectHeight() {
        var prefix = getIdPrefix(this);
        if (!$(prefix + "lock:checked").val()) return;
        var width = parseUnits(this.value);
        if (!isNaN(width)) {
            $(prefix + "height").val(Math.round(width / currentAspect[prefix]));
        }
    }

    function scalePreview(img) {
        // ensures the loaded image preview fits within the preview area
        // by scaling it down if not.
        var self = $(img),
            width = self.width(),
            height = self.height(),
            aspect = width / height,
            maxWidth = self.parent().width(),
            maxHeight = self.parent().height();
        if (width > maxWidth) {
            width = maxWidth;
            height = Math.round(width / aspect);
        }
        if (height > maxHeight) {
            height = maxHeight;
            width = Math.round(width * aspect);
        }

        self.css({
            width: width,
            height: height,
            display: "inline"
        });
    }

    function syncImage() {
        // when the image loader loads, we use it to calculate the current image
        // aspect ratio, and update the width and height fields.
        var prefix = getIdPrefix(this),
            self = $(this),
            width = self.width(),
            height = self.height();

        switch (systemType) {
            case "none": break;
            case "pictures": break;
            case "documents": width = 640; height = 600; break;
            case "video": width = 640; height = 480; break;
        }

        currentAspect[prefix] = width / height;
        // because we just loaded an edited image, leave the width/height 
        // at their configured values, not the natural size.
        if (!suppressResize) {
            $(prefix + "width").val(width);
            $(prefix + "height").val(height);
        }
        suppressResize = false;
    }

    function attributeEncode(value) {
        return !value ? "" : value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\//g, "&#47;");
    }

    function getAttr(name, value) {
        // get an attribute value, escaping any necessary characters to html entities.
        // not an exhastive list, but should cover all the necessary characters for this UI (e.g. you can't really put in newlines).
        if (!value && name !== "alt") return "";
        return ' ' + name + '="' + attributeEncode(value) + '"';
    }

    function getImageHtml(data) {
        return html = '<div class="ondro">ahoj</div>';
        return html = '<img src="' + encodeURI(data.src) + '"' + getAttr("alt", data.alt || "")
            + getAttr("class", data["class"])
            + getAttr("style", data.style)
            + getAttr("align", data.align)
            + getAttr("width", data.width)
            + getAttr("height", data.height)
            + "/>";
    }

    function uploadMedia(form) {
        var name = "addmedia__" + (new Date()).getTime(),
            prefix = getIdPrefix(form);
        $("<iframe name='" + name + "' src='about:blank' style='display:none'/>")
            .attr("id", prefix.substr(1) + "iframe")
            .bind("load", iframeLoadHandler)
            .appendTo(form);
        form.target = name;
        $(prefix + "indicator").show();
    }

    // get a querystring value
    function query(name, querystring) {
        name = name.toLowerCase();
        var search = querystring || location.search;
        var parts = search.replace("?", "").replace("#", "").split("&");
        for (var i = 0, l = parts.length; i < l; i++) {
            var part = parts[i];
            var eqIndex = part.indexOf("=");
            if (eqIndex !== -1 && part.substr(0, eqIndex).toLowerCase() === name) {
                return part.substr(eqIndex + 1);
            }
        }
        return null;
    }

    function iframeLoadHandler() {
        try {
            var self = $(this),
                form = self.closest("form"),
                frame = this.contentWindow || window.frames[this.name];
            if (!frame.document || frame.document.URL == "about:blank") {
                return true;
            }
            var result = frame.result;
            if (result && result.url) {
                fileSrc = result.url;
                fileType = result.fileType;
                var obj = { value: fileSrc, id: this.id };
                urlGridFunction(obj);
                //selectImage(getIdPrefix(this), result.iconUrl);
                form.trigger("uploadComplete", [result.url]);
            }
            else if (result && result.error) {
                alert(result.error);
            }
            else if (frame.location.pathname.match("AccessDenied")) {
                alert($.mediaPicker.accessDeniedMsg);
            }
            else {
                var somethingPotentiallyHorrible = "";
                try {
                    somethingPotentiallyHorrible = $("body", frame.document).html();
                }
                catch (ex) { // some browsers flip out trying to access anything in the iframe when there's an error.
                }
                if (somethingPotentiallyHorrible) {
                    alert(somethingPotentiallyHorrible);
                }
            }
            $(getIdPrefix(form.get(0)) + "indicator").hide();
            //cleanup
            window.setTimeout(function () {
                self.remove();
            }, 123);

        }
        catch (ex) {
            alert(ex.message);
        }
    }

})(jQuery);


