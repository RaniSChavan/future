
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.List"%>
<%@page import="com.fitto.gui.utils.RESTClient"%>
<%@page import="com.fitto.realm.FittoGenericPrinciple"%>
<%@page import="java.util.Map"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="UTF-8"%>

<!DOCTYPE html>

<html>

<head>

	
  <meta charset="utf-8">  
 <!--  <meta name="viewport" content="width=device-width, initial-scale=1"> -->
 <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
 <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  
	<link rel="shortcut icon" type="image/png" href="images/favicon.ico" />
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
	<link href="./css/jquery.multiselect.css" rel="stylesheet" type="text/css">
	<link rel="stylesheet" href="./css/alertify.core.css" />
	<link rel="stylesheet" href="./css/alertify.default.css" id="toggleCSS" />	
  
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
	<script src="./js/ajaxutil.js" type="text/javascript"></script>
	<script src="./js/multiSelect.js"></script>
	<script src = "./js/alertify.js"></script>  
	<script src="./js/alertify.min.js"></script>
	
<script type="text/javascript" language="javascript">
	/* if (window.performance && window.performance.navigation.type == window.performance.navigation.TYPE_BACK_FORWARD) {
		url = document.URL
		u = document.URL.lastIndexOf('/fitto-corporate-admin')
		s = document.URL.substring(0, u)
		if(s.indexOf('/fitto-corporate-admin') >-1)
			s += '/logout.jsp';
		else
		s += '/fitto-corporate-admin/logout.jsp';
		window.location = s
	} */
</script>

<title>FITTO</title>

</head>
<%
FittoGenericPrinciple principal = (FittoGenericPrinciple)request.getUserPrincipal();
String[] roles = null;
String orgId = null;
if(principal != null) {
	Map<String, String> respMap = principal.getApplicationData();
	roles = principal.getRoles();
	if(roles != null && roles.length > 0)
		session.setAttribute("role", roles[0]);
	if(respMap != null) {
		session.setAttribute("username", respMap.get("username"));
		session.setAttribute("userId",   respMap.get("userId"));
		orgId=respMap.get("userId");
		if(respMap.get("customerId") != null) {
			session.setAttribute("sessionCustomerId", respMap.get("customerId"));
		}
	}
} 
String restApiUrl = System.getenv("REST_API_CORP_ADMIN_URL");
String restApiUrlAdmin = System.getenv("REST_API_ADMIN_URL");
%>
<body>

<div id="wrapper">
		
		 <input type="hidden" id="globalOrgId" name="uname" value="<%=orgId%>">
	    <input type="hidden" id="restApiUrl" name="uname" value="<%=restApiUrl%>">
	    <input type="hidden" id="restApiUrlAdmin" name="restApiUrlAdmin" value="<%=restApiUrlAdmin%>">
	    <input type="hidden" id="sessionUserRole" value="<%=session.getAttribute("role")%>"/>
	     <input type="hidden" id="sessionCustomerId" value="<%=session.getAttribute("sessionCustomerId")%>"/>
	     
	    <jsp:include page="sideMenu.jsp" />
	    <div> 
			<%
				if (request.getParameter("target") != null && request.getParameter("target").trim().length() > 0) {
			%>			
				<jsp:include page="<%=request.getParameter(\"target\") + \".jsp\"%>" />
			<%
				} else {
					if(roles != null && roles[0].equalsIgnoreCase("finance")) {
						this.getServletContext().getRequestDispatcher("/adminconsole/index.jsp?target=contractMaster").forward(request, response);
					} else if(roles != null && roles[0].equalsIgnoreCase("corporate")) {
						this.getServletContext().getRequestDispatcher("/adminconsole/index.jsp?target=employeeDependent").forward(request, response);
					} else {
						this.getServletContext().getRequestDispatcher("/adminconsole/index.jsp?target=customerMaster").forward(request, response);
					}
			%>
			<%
				}
			%>
		</div>
</div>
</body>
</html>

