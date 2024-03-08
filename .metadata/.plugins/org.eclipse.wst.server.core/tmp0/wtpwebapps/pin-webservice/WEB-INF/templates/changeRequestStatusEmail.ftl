<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    </head>
    <body>
        <table align="left" width="100%">
            <tr><td style="font-size: 0; line-height: 0;" height="10">&nbsp;</td></tr>
            <tr align="left">
                <td><span style="font: 26px Helvetica; font-weight: bold; margin-bottom: 40px; margin-top: 40px;">Dear ${recipient},</span></td>
            </tr>
            <tr><td style="font-size: 0; line-height: 0;" height="50">&nbsp;</td></tr>
            <#if action != "pinReject">
	            <tr align="left">
	                <td><span style="font: 18px Helvetica;">Change Request has been ${statusText} for the project ${projectName}.</span></td>
	            </tr>
				<tr align="left">
					<td><span style="font: 18px Helvetica;">Please find the below information for the Change Request.</span></td>
	
	            </tr>
				<tr><td style="font-size: 0; line-height: 0;" height="50">&nbsp;</td></tr>
				<tr align="left">
	                <td><span style="font: 18px Helvetica;">Change Request Number : ${crNumber}</span></td>				
	            </tr>
				<tr align="left">
	                <td><span style="font: 18px Helvetica;">Project Manage Name : ${manageName}</span></td>				
	            </tr>
				<tr align="left">
	                <td><span style="font: 18px Helvetica;">Change Request Start Date : ${startDate}</span></td>				
	            </tr>
				<tr align="left">
	                <td><span style="font: 18px Helvetica;">Change Request End Date : ${endDate}</span></td>				
	            </tr>
				<tr align="left">
	                <td><span style="font: 18px Helvetica;">Change Request Status: ${crStatus}</span></td>				
	            </tr>
            </#if>
            
            <#if action == "pinReject">
            	<tr align="left">
	                <td><span style="font: 18px Helvetica;">Change Request ${crNumber} has been rejected for the project ${projectName}. 
	                Rejection reason is available in Pin System.</span></td>
	            </tr>
            </#if>
            
			<tr><td style="font-size: 0; line-height: 0;" height="50">&nbsp;</td></tr>
			<tr align="left">
                <td><span style="font: 18px Helvetica;">Please do the needful in your end.</span></td>
            </tr>
            <tr><td style="font-size: 0; line-height: 0;" height="50">&nbsp;</td></tr>
           
            <tr align="left">
                <td><span style="font: 18px Helvetica;">Kind Regards,</span></td>
            </tr>
            <tr align="left">
                <td><span style="font: 18px Helvetica;">${pinTeam}</span></td>
            </tr>
            <tr align="left">
                <td><span style="font: 14px Helvetica;">INST- ${instanceName}</span></td>
            </tr>
            <#if instanceName != "PROD">
            	<tr align="left">
	                <td><span style="font: 14px Helvetica;">This is a notification only to be used for test purposes.</span></td>
	            </tr>
            </#if>
            <tr><td style="font-size: 0; line-height: 0;" height="50">&nbsp;</td></tr>
           
        </table>
    </body>
</html>