
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.List"%>
<%@page import="com.fitto.gui.utils.RESTClient"%>
<%@page import="com.fitto.realm.FittoGenericPrinciple"%>
<%@page import="java.util.Map"%>
<%@page import="com.fitto.gui.utils.SessionManagementUtils"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="UTF-8"%>
<% HttpSession httpSession =request.getSession(false);
    System.out.println(" From JSP"+httpSession.isNew());
%>

<!DOCTYPE html>

<html>
<head>
 <meta charset="utf-8">  
 <!--  <meta name="viewport" content="width=device-width, initial-scale=1"> -->
 <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
 <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  
	<link rel="shortcut icon" type="image/png" href="images/favicon.ico" />
	<!-- <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"> -->
	
 	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
 
	<link href="./css/jquery.multiselect.css" rel="stylesheet" type="text/css">
	<link rel="stylesheet" href="./css/alertify.core.css" />
	<link rel="stylesheet" href="./css/alertify.default.css" id="toggleCSS" />	
  
  
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
	<!--  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script> --> 
	
 <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>


	<script src="./js/ajaxutil.js" type="text/javascript"></script>
	<script src="./js/multiSelect.js"></script>
	<script src = "./js/alertify.js"></script>  
	<script src="./js/alertify.min.js"></script>
	
<script type="text/javascript" language="javascript">
	 if (window.performance && window.performance.navigation.type == window.performance.navigation.TYPE_BACK_FORWARD) {
		/* url = document.URL
		alert(url);
		u = document.URL.lastIndexOf('/pin-system')
		s = document.URL.substring(0, u)
		if(s.indexOf('/pin-system') >-1)
			s += '/logout.jsp';
		else
		s += '/pin-system/logout.jsp';
		window.location = s */
		s = '../logout.jsp';
		window.location = s
	}
</script>

<title>PIN-System</title>

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
		session.setAttribute("createdRoleId",   respMap.get("createdRoleId"));
		session.setAttribute("userId",   respMap.get("userId"));

	}
} 

SessionManagementUtils ssUtil=new SessionManagementUtils();
ssUtil.registerUserSession(session.getAttribute("username").toString(), request.getSession(false));

String apiKey = System.getenv("API_KEY");
//String restApiUrl = System.getenv("REST_API_CORP_ADMIN_URL");
//String restApiUrlAdmin = System.getenv("REST_API_ADMIN_URL");
%>
<body>

<div id="wrapper1">
	   
		<%-- <input type="hidden" id="restApiUrl" name="uname" value="<%=restApiUrl%>">
	    <input type="hidden" id="restApiUrlAdmin" name="restApiUrlAdmin" value="<%=restApiUrlAdmin%>"> --%>
	    
	    <input type="hidden" id="sessionUserRole" value="<%=session.getAttribute("role")%>"/>
	    <input type="hidden" id="sessionUsername" value="<%=session.getAttribute("username")%>"/>
	    <input type="hidden" id="sessionUserRoleId" value="<%=session.getAttribute("createdRoleId")%>"/>
	    <input type="hidden" id="sessionUserId" value="<%=session.getAttribute("userId")%>"/>
	    <input type="hidden" id="apiKeySession"  value="<%=apiKey%>"/>
	
	    <jsp:include page="headerMenu.jsp" />
	    <%-- <jsp:include page="sideMenu.jsp" /> --%>
	    <div> 
	  	<!-- VAPT Issue Fix  -->  
			<%	if (roles == null) { %>
				<jsp:include page="error.jsp" />
			<% } else if (request.getParameter("target") != null && request.getParameter("target").trim().length() > 0) {
					System.out.println(request.getParameter("target"));
					if(!request.getParameter("target").equals("customerMaster")
							&& !request.getParameter("target").equals("sourceMaster")
							&& !request.getParameter("target").equals("resourceMaster")
							&& !request.getParameter("target").equals("vendorMaster")
							&& !request.getParameter("target").equals("designationMaster")
							&& !request.getParameter("target").equals("pinAllocation")
							&& !request.getParameter("target").equals("closePin")
							&& !request.getParameter("target").equals("changeRequest")
							&& !request.getParameter("target").equals("resourceListReport")
							&& !request.getParameter("target").equals("resourceAllocationReport")
							&& !request.getParameter("target").equals("billableReport")) {%>
						<jsp:include page="error.jsp" />
					<% } else if(request.getParameter("target").equals("resourceListReport") 
							&& (!roles[0].equalsIgnoreCase("DH") && !roles[0].equalsIgnoreCase("HR") 
									&& !roles[0].equalsIgnoreCase("PMO") && !roles[0].equalsIgnoreCase("Finance"))) {%>
						<jsp:include page="error.jsp" />
					<% } else if(request.getParameter("target").equals("resourceAllocationReport") 
							&& (!roles[0].equalsIgnoreCase("DH") && !roles[0].equalsIgnoreCase("HR") 
									&& !roles[0].equalsIgnoreCase("PMO") && !roles[0].equalsIgnoreCase("Finance"))) {%>
						<jsp:include page="error.jsp" />
					<% } else if(request.getParameter("target").equals("billableReport") 
							&& (!roles[0].equalsIgnoreCase("DH"))) {%>
						<jsp:include page="error.jsp" />
					<% } else {%>
						<jsp:include page="<%=request.getParameter(\"target\") + \".jsp\"%>" />
					<% }
			
				} else {
					this.getServletContext().getRequestDispatcher("/adminconsole/index.jsp?target=resourceMaster").forward(request, response);
			%>
			<%
				}
			%>
		</div>
</div>
</body>
</html>