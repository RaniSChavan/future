<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="UTF-8"%>
<%
String pinNo = request.getParameter("pinNo");
String crNo = request.getParameter("crNo");
String type = request.getParameter("type");
String apiKey = System.getenv("API_KEY");
%>
<head>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<link rel="stylesheet" type="text/css" href="./css/common.css"/>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="./js/ajaxutil.js" type="text/javascript"></script>

<!-- <script src="https://mozilla.github.io/pdf.js/build/pdf.js"></script> -->
<script src="./js/pdf.js" type="text/javascript"></script>


</head>
<style>
	body {
	    text-align: center;
	}
  	canvas {
        border: 2px inset black;
	}

</style>

<div>
	<input type="hidden" id="pinNoPdfViewer" value="<%=pinNo%>">
	<input type="hidden" id="crNoPdfViewer" value="<%=crNo%>">
	<input type="hidden" id="typePdfViewer" value="<%=type%>">
	<input type="hidden" id="apiKeySession"  value="<%=apiKey%>"/>
</div>

<div id="loader" class="loading-holder">
  <img id="loading-image" class="loading-image" src="images/modal-loader.gif" alt="Loading..." />
</div>

<script src="js/pdfReport.js" type='text/javascript'></script>