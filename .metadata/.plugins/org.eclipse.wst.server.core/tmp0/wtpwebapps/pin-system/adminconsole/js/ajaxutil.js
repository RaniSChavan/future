function showLoading() {
	var loadingImage = document.getElementById("jquery-loading-img");
	if (loadingImage != null) {
		loadingImage.style.display = 'block';
	}
}

function hideLoading() {
	var loadingImage = document.getElementById("jquery-loading-img");
	if (loadingImage != null) {
		loadingImage.style.display = 'none';
	}
}

function __ajaxGetData(url, httpMethod, payloadJSON, returnDataType,
		successCallback, errorCallback, postRenderCallback) {
	console.log("ajaxGetData calling ", url, " HTTP METHOD: ", httpMethod,
			" returnDataType: ", returnDataType);
	$.ajax({
		url : url,
		headers: { "APIKey": $("#apiKeySession").val() },
		beforeSend : function(xhr) {
			showLoading();
			if (xhr.overrideMimeType) {
				xhr.overrideMimeType("application/json");
			}
		},
		method : httpMethod,
		data : payloadJSON,
		dataType : returnDataType,
		processData : false, // To avoid making query String instead of JSON
		contentType : "application/json; charset=utf-8",
		success : function(result) {
			console.log('ajaxCall success', result);
			if(result.error) {
				return errorCallback(result);
			}
			return successCallback(result, postRenderCallback);
		},
		error : function(err) {
			console.log('ajaxCall error', err);
			return errorCallback(err);
		},
		complete : function(xhr) {
			hideLoading();
			if (xhr.overrideMimeType) {
				xhr.overrideMimeType("application/json");
			}
		}
	});
}

function ajaxGetJSONData(url, payloadJSON, successCallback, errorCallback,
		postRenderCallback) {

	const httpMethod = "GET";
	const returnDataType = "json";

	__ajaxGetData(url, httpMethod, payloadJSON, returnDataType,
			successCallback, errorCallback, postRenderCallback);

}

function ajaxPostJSONData(url, payloadJSON, successCallback, errorCallback,
		postRenderCallback) {
	const httpMethod = "POST";
	const returnDataType = "json";

	__ajaxGetData(url, httpMethod, payloadJSON, returnDataType,
			successCallback, errorCallback, postRenderCallback);
}

function ajaxGetTextData(url, payloadJSON, successCallback, errorCallback,
		postRenderCallback) {
	const httpMethod = "GET";
	const returnDataType = "text";

	__ajaxGetData(url, httpMethod, payloadJSON, returnDataType,
			successCallback, errorCallback, postRenderCallback);
}

function ajaxPostMultipartFormData(url, data, successCallback, errorCallback,
		postRenderCallback) {
	$.ajax({
		type : 'POST',
		url : url,
		beforeSend : function(xhr) {
			showLoading();

		},
		data : data,
		processData : false,
		contentType : false,
		success : function(result) {
			console.log('ajaxCall success', result);
			// $.LoadingOverlay("hide");
			// result = '<div><h3>Hello</h3></div>'
			return successCallback(result, postRenderCallback);
		},
		error : function(err) {
			console.log('ajaxCall error', err);
			return errorCallback(err);
		},
		complete : function(xhr) {
			hideLoading();
			if (xhr.overrideMimeType) {
				xhr.overrideMimeType("application/json");
			}
		}
	});
};
