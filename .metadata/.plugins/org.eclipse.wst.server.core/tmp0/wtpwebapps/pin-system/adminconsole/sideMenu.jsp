<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="UTF-8"%>
<style>

</style>
<%
String role = session.getAttribute("role").toString();
%>
<link rel="stylesheet" type="text/css" href="./css/common.css"/>
<link rel="stylesheet" type="text/css" href="./css/sideMenu.css"/>

    <!-- Navigation -->
    <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <!-- Brand and toggle get grouped for better mobile display -->
     
        <div class="">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse" style="height: 10px">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand">
                <!-- <img src="images/Logo-for-Screen.png" style="position:relative;max-height: 33px;"> -->
            </a>
		</div>	
			
		<div class="navbar-details">
			<a class="logout-button header-btnLogout" href="../logout.jsp">Logout</a>
			
	    </div>				
	</div>
     
        <!-- Sidebar Menu Items - These collapse to the responsive navigation menu on small screens -->
        <div class="collapse navbar-collapse navbar-ex1-collapse">
        	<%
			if(role !=null && !role.equalsIgnoreCase("DH")) {
			%> 
            <ul class="nav navbar-nav side-nav" id="sideMenuId">
				<li>
					<a href="?target="><img src="images/customer-master.png" class="menu-img">&nbsp;Customer Master</a>
				</li>	
				<li>
					<a href="?target=sourceMaster"><img src="images/service-master.png" class="menu-img">&nbsp;Source Master</a>
				</li>
				<li>
					<a href="?target=resourceMaster"><img src="images/contract-master.png" class="menu-img">&nbsp;Resource Master</a>
				</li>	
				<li>
					<a href="?target=pinAllocation"><img src="images/contract-master.png" class="menu-img">&nbsp;Pin Management</a>
				</li>
				<li>
					<a href="?target=changeRequest"><img src="images/contract-master.png" class="menu-img">&nbsp;Change Request</a>
				</li>		
            </ul>
           <%
			}
			%>
			<%	
			if(role !=null && role.equalsIgnoreCase("DH")) {
			%>
			 <ul class="nav navbar-nav side-nav" id="sideMenuId">
				<li>
					<a href="?target="><img src="images/customer-master.png" class="menu-img">&nbsp;Customer Master</a>
				</li>	
				<li>
					<a href="?target=sourceMaster"><img src="images/service-master.png" class="menu-img">&nbsp;Source Master</a>
				</li>
				<li>
					<a href="?target=resourceMaster"><img src="images/contract-master.png" class="menu-img">&nbsp;Resource Master</a>
				</li>	
				<li>
					<a href="?target=pinAllocation"><img src="images/contract-master.png" class="menu-img">&nbsp;Pin Management</a>
				</li>
				<li>
					<a href="?target=changeRequest"><img src="images/contract-master.png" class="menu-img">&nbsp;Change Request</a>
				</li>
				<li>
					<a href="?target=resourceAllocationReport"><img src="images/contract-master.png" class="menu-img">&nbsp;Resource Allocation Report</a>
				</li>		
            </ul>
			<%
			}
			%>
        </div>
        <!-- /.navbar-collapse -->
    </nav>


<script src="./js/sideMenu.js"></script>	