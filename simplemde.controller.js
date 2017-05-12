app.controller("squp.simplemdecontroller", function ($scope, $log, $timeout, assetsService, dialogService, mediaResource, mediaHelper) {
	
	assetsService.loadCss("~/app_plugins/simplemde-markdown-editor/lib/simplemde.min.css");
	
    /**
		Load & initialise SimpleMDE
	**/
    assetsService.load(["/app_plugins/simplemde-markdown-editor/lib/simplemde.min.js"]).then(function () {
        var input = $("#editor_" + $scope.model.alias + " textarea");

        var editor = new SimpleMDE({
            element: input[0],
            initialValue: $scope.model.value,
            toolbar: [
			{
				name: "bold",
				action: SimpleMDE.toggleBold,
				className: "fa fa-bold",
				title: "Bold",
				default: true
			},
			{
				name: "italic",
				action: SimpleMDE.toggleItalic,
				className: "fa fa-italic",
				title: "Italic",
				default: true
			},
			{
				name: "strikethrough",
				action: SimpleMDE.toggleStrikethrough,
				className: "fa fa-strikethrough",
				title: "Strikethrough"
			},
			{
				name: "heading",
				action: SimpleMDE.toggleHeadingSmaller,
				className: "fa fa-header",
				title: "Heading",
				default: true
			},
			{
				name: "heading-smaller",
				action: SimpleMDE.toggleHeadingSmaller,
				className: "fa fa-header fa-header-x fa-header-smaller",
				title: "Smaller Heading"
			},
			{
				name: "heading-bigger",
				action: SimpleMDE.toggleHeadingBigger,
				className: "fa fa-header fa-header-x fa-header-bigger",
				title: "Bigger Heading"
			},
			"|",
			{
				name: "code",
				action: SimpleMDE.toggleCodeBlock,
				className: "fa fa-code",
				title: "Code"
			},
			{
				name: "quote",
				action: SimpleMDE.toggleBlockquote,
				className: "fa fa-quote-left",
				title: "Quote",
				default: true
			},
			{
				name: "unordered-list",
				action: SimpleMDE.toggleUnorderedList,
				className: "fa fa-list-ul",
				title: "Generic List",
				default: true
			},
			{
				name: "ordered-list",
				action: SimpleMDE.toggleOrderedList,
				className: "fa fa-list-ol",
				title: "Numbered List",
				default: true
			},
			{
				name: "clean-block",
				action: SimpleMDE.cleanBlock,
				className: "fa fa-eraser fa-clean-block",
				title: "Clean block"
			},
			"|",
			{
				name: "link",
				action: SimpleMDE.drawLink,
				className: "fa fa-link",
				title: "Create Link",
				default: true
			},
			{
				name: "image",
				action: $scope.insertImage, //use Umbraco's media picker for image selection
				className: "fa fa-picture-o",
				title: "Insert Image",
				default: true
			},
			{
				name: "table",
				action: SimpleMDE.drawTable,
				className: "fa fa-table",
				title: "Insert Table"
			},
			{
				name: "horizontal-rule",
				action: SimpleMDE.drawHorizontalRule,
				className: "fa fa-minus",
				title: "Insert Horizontal Line"
			},			
			"|",
			{
				name: "undo",
				action: SimpleMDE.undo,
				className: "fa fa-undo no-disable",
				title: "Undo"
			},
			{
				name: "redo",
				action: SimpleMDE.redo,
				className: "fa fa-repeat no-disable",
				title: "Redo"
			},
			"|",
			{
				name: "guide",
				action: "https://simplemde.com/markdown-guide",
				className: "fa fa-question-circle",
				title: "Markdown Guide",
				default: true
			},
			{
				name: "preview",
				action: SimpleMDE.togglePreview,
				className: "fa fa-eye no-disable",
				title: "Toggle Preview",
				default: true
			}

		]});
		
        $('a[data-toggle="tab"]').on('shown', function (e) {
			editor.codemirror.refresh();           
        });

        editor.codemirror.on("change", function () {
            $scope.model.value = editor.value();
		});

    });

    /**
		Use Umraco's media picker to choose an image
	**/
    $scope.insertImage = function (editor) {
        dialogService.mediaPicker({ callback: function (data) {				
			editor.codemirror.replaceSelection('![]('+data.image+')');
			$scope.model.value = editor.value();
			return true;
        }
        });
    }
   
});