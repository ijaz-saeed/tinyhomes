var mediaPlugins = "";

if (mediaPickerEnabled) {
    mediaPlugins += " mediapicker";
}

if (mediaLibraryEnabled) {
    mediaPlugins += " medialibrary";
}

tinyMCE.init({
    selector: "textarea.tinymce",
    theme: "modern",
    schema: "html5",
    plugins: [
        "advlist autolink lists link image charmap print preview hr anchor pagebreak",
        "searchreplace wordcount visualblocks visualchars code fullscreen",
        "insertdatetime media nonbreaking table contextmenu directionality",
        "emoticons template paste textcolor colorpicker textpattern",
        "fullscreen autoresize" + mediaPlugins
    ],
    toolbar: "undo redo cut copy paste | bold italic | bullist numlist outdent indent formatselect | alignleft aligncenter alignright alignjustify ltr rtl | " + mediaPlugins + " link unlink charmap | code fullscreen",
    convert_urls: false,
    valid_elements: "*[*]",
    // Shouldn't be needed due to the valid_elements setting, but TinyMCE would strip script.src without it.
    extended_valid_elements: "script[type|defer|src|language]",
    //menubar: false,
    //statusbar: false,
    skin: "orchardlightgray",
    language: language,
    auto_focus: autofocus,
    directionality: directionality,
    style_formats: [
        {
            title: 'Typography', items: [
                {
                    title: 'Body Copy', items: [
                        { title: 'Lead Body Para', block: 'p', classes: 'lead' }
                    ]
                },
                {
                    title: 'Inline Text', items: [
                        { title: 'Small', inline: 'small' },
                        { title: 'Highlight', inline: 'mark' },
                        { title: 'Deleted', inline: 'del' },
                        { title: 'Strikethrough', inline: 's' },
                        { title: 'Insert', inline: 'ins' }
                    ]
                },
                {
                    title: 'Alignment Para', items: [
                        { title: 'Left aligned text', selector: 'p', classes: 'text-left' },
                        { title: 'Center aligned text', selector: 'p', classes: 'text-center' },
                        { title: 'Right aligned text', selector: 'p', classes: 'text-right' },
                        { title: 'Justified text', selector: 'p', classes: 'text-justify' },
                        { title: 'No wrap text', selector: 'p', classes: 'text-nowrap' }
                    ]
                },
                {
                    title: 'Text Transformations', items: [
                        { title: 'lowercased text', selector: 'p', classes: 'text-lowercase' },
                        { title: 'UPPERCASED TEXT', selector: 'p', classes: 'text-uppercase' },
                        { title: 'Capitalized Text', selector: 'p', classes: 'text-capitalize' }
                    ]
                },
                {
                    title: 'Abbreviations', items: [
                        { title: 'Abbreviation', inline: 'abbr' },
                        { title: 'Initialism', inline: 'abbr', classes: 'initialism' }
                    ]
                },
                { title: 'Address', format: 'address', wrapper: true },
                { title: 'Blockquote Reverse', selector: 'blockquote', classes: 'blockquote-reverse' },
                {
                    title: 'Lists', items: [
                        { title: 'Unstyled', selector: 'ul', classes: 'list-unstyled' },
                        { title: 'Inline', selector: 'ul', classes: 'list-inline' }
                    ]
                },
            ]
        },
        {
            title: 'Code', items: [
                { title: 'Code Block', format: 'pre', wrapper: true },
                { title: 'Code', inline: 'code' },
                { title: 'Sample', inline: 'samp' },
                { title: 'Keyboard', inline: 'kbd' },
                { title: 'Variable', inline: 'var' }
            ]
        },
        {
            title: 'Tables', items: [
                { title: 'Table', selector: 'table', classes: 'table' },
                { title: 'Striped', selector: 'table', classes: 'table-striped' },
                { title: 'Bordered', selector: 'table', classes: 'table-bordered' },
                { title: 'Hover', selector: 'table', classes: 'table-hover' },
                { title: 'Condensed', selector: 'table', classes: 'table-condensed' },
                { title: 'Active Row', selector: 'tr', classes: 'active' },
                { title: 'Success Row', selector: 'tr', classes: 'success' },
                { title: 'Info Row', selector: 'tr', classes: 'info' },
                { title: 'Warning Row', selector: 'tr', classes: 'warning' },
                { title: 'Danger Row', selector: 'tr', classes: 'danger' },
                { title: 'Responsive Table', selector: 'div', classes: 'table-responsive' }
            ]
        },
        {
            title: 'Buttons', items: [
                { title: 'Default', selector: 'a', classes: 'btn btn-default' },
                { title: 'Primary', selector: 'a', classes: 'btn btn-primary' },
                { title: 'Success', selector: 'a', classes: 'btn btn-success' },
                { title: 'Info', selector: 'a', classes: 'btn btn-info' },
                { title: 'Warning', selector: 'a', classes: 'btn btn-warning' },
                { title: 'Danger', selector: 'a', classes: 'btn btn-danger' },
                { title: 'Link', selector: 'a', classes: 'btn btn-link' }
            ]
        },
        {
            title: 'Images', items: [
                { title: 'Responsive', selector: 'img', classes: 'img-responsive' },
                { title: 'Rouded', selector: 'img', classes: 'img-rounded' },
                { title: 'Circle', selector: 'img', classes: 'img-circle' },
                { title: 'Thumbnail', selector: 'img', classes: 'img-thumbnail' }
            ]
        },
        {
            title: 'Utilites', items: [
                { title: 'Muted Text', inline: 'span', classes: 'text-muted' },
                { title: 'Primary Text', inline: 'span', classes: 'text-primary' },
                { title: 'Success Text', inline: 'span', classes: 'text-success' },
                { title: 'Info Text', inline: 'span', classes: 'text-info' },
                { title: 'Warning Text', inline: 'span', classes: 'text-warning' },
                { title: 'Danger Text', inline: 'span', classes: 'text-danger' },
                { title: 'Background Primary', block: 'div', classes: 'bg-primary', wrapper: true },
                { title: 'Background Success', block: 'div', classes: 'bg-success', wrapper: true },
                { title: 'Background Info', block: 'div', classes: 'bg-info', wrapper: true },
                { title: 'Background Warning', block: 'div', classes: 'bg-warning', wrapper: true },
                { title: 'Background Danger', block: 'div', classes: 'bg-danger', wrapper: true },
                { title: 'Pull Left', block: 'div', classes: 'pull-left' },
                { title: 'Pull Right', block: 'div', classes: 'pull-right' },
                { title: 'Center Block', block: 'div', classes: 'center-block' },
                { title: 'Clearfix', block: 'div', classes: 'clearfix' },

            ]
        },
        {
            title: 'Nav Tabs/Pills', items: [
                { title: 'Tabs (ul)', selector: 'ul', classes: 'nav nav-tabs' },
                { title: 'Pills (ul)', selector: 'ul', classes: 'nav nav-pills' },
                { title: 'Pills Stacked', selector: 'ul', classes: 'nav nav-pills nav-stacked' }
            ]
        },
        {
            title: 'Labels', items: [
                { title: 'Default', inline: 'span', classes: 'label label-default' },
                { title: 'Primary', inline: 'span', classes: 'label label-primary' },
                { title: 'Success', inline: 'span', classes: 'label label-success' },
                { title: 'Info', inline: 'span', classes: 'label label-info' },
                { title: 'Warning', inline: 'span', classes: 'label label-warning' },
                { title: 'Danger', inline: 'span', classes: 'label label-danger' }
            ]
        },
        {
            title: 'Page Header', block: 'div', classes: 'page-header', wrapper: true
        },
        {
            title: 'Alerts', items: [
                { title: 'Success', block: 'div', classes: 'alert alert-success', wrapper: true },
                { title: 'Info', block: 'div', classes: 'alert alert-info', wrapper: true },
                { title: 'Warning', block: 'div', classes: 'alert alert-warning', wrapper: true },
                { title: 'Danger', block: 'div', classes: 'alert alert-danger', wrapper: true }
            ]
        },
        {
            title: 'Wells', items: [
                { title: 'Well', block: 'div', classes: 'well', wrapper: true },
                { title: 'Large Well', block: 'div', classes: 'well well-lg', wrapper: true },
                { title: 'Small Well', block: 'div', classes: 'well well-sm', wrapper: true }
            ]
        }
    ],
    setup: function (editor) {
        $(document).bind("localization.ui.directionalitychanged", function(event, directionality) {
            editor.getBody().dir = directionality;
        });
    }
});