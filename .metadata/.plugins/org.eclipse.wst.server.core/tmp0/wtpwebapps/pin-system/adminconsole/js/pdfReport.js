var apiContxtPin = "/pin-webservice";

var FAILURE_MSG = "<p style='text-align: left; margin-top: -5%;'><img src='images/error.png' style='height: 26px; width: 26px;' />&nbsp;<b>PIN</b></p><hr style='margin-top: -2%;' /><p style='text-align: center;'>An error has occurred!<br />Please contact support team!!</p>";
var FAILURE_STRUCTURE = "<p style='text-align: left; margin-top: -5%;'><img src='images/error.png' style='height: 26px; width: 26px;' />&nbsp;<b>PIN</b></p><hr style='margin-top: -2%;' /><p style='text-align: center;'>";

$(document).ready(function () {
	var pinNoPdfViewer = $("#pinNoPdfViewer").val();
	var crNoPdfViewer = $("#crNoPdfViewer").val();
	var typePdfViewer = $("#typePdfViewer").val();
	openPdfInHtml(pinNoPdfViewer, crNoPdfViewer, typePdfViewer);
});


function openPdfInHtml(pinNo, changeRequestNo, type) {
	var data = {pinNo: pinNo, changeRequestNo: changeRequestNo, type: type};
	var url = apiContxtPin+"/resource/common/getPdfContent";
	ajaxPostJSONData(url, JSON.stringify(data) ,
			errorCallbackForPdf,
			function (data) {
				if(!data.error) {
				
				data.responseText
					var pdfData = atob(data.responseText);
					// Loaded via <script> tag, create shortcut to access PDF.js exports.
					var pdfjsLib = window['pdfjs-dist/build/pdf'];
					
					// The workerSrc property shall be specified.
					//pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://mozilla.github.io/pdf.js/build/pdf.worker.js';
					pdfjsLib.GlobalWorkerOptions.workerSrc = './js/pdf.worker.js';
					
					// Using DocumentInitParameters object to load binary data.
					
					var totalPagesCount = 0;
					
					
					var loadingTask = pdfjsLib.getDocument({data: pdfData});
					loadingTask.promise.then(function(pdf) {
					  console.log('PDF loaded');
					  
					  totalPagesCount = pdf.numPages;
					  for (var i = 1; i <= totalPagesCount; i++) {
						// Fetch the first page
					  var pageNumber = i;
					  pdf.getPage(pageNumber).then(function(page) {
					    console.log('Page loaded');
					    
					    var scale = 2;
					    var viewport = page.getViewport({scale: scale});
					
					    // Prepare canvas using PDF page dimensions
					    //var canvas = document.getElementById('the-canvas');
						var canvas = document.createElement('canvas');
						
					    var context = canvas.getContext('2d');
					    canvas.height = viewport.height;
					    canvas.width = viewport.width;
					
						document.body.appendChild(canvas);
					
					    // Render PDF page into canvas context
					    var renderContext = {
					      canvasContext: context,
					      viewport: viewport
					    };
					    var renderTask = page.render(renderContext);
					    renderTask.promise.then(function () {
					      console.log('Page rendered');
					    });
					  });
					  }
					  
					}, function (reason) {
					  // PDF loading error
					  console.error(reason);
					});					
				} else {
					var errorDiv = document.createElement('div');
					errorDiv.append(data.error[0].errorMessages[0].errorMsg);
					document.body.appendChild(errorDiv);
											
				}					
			}, null);
}

const errorCallbackForPdf = function (data){
	console.log(data);
}
