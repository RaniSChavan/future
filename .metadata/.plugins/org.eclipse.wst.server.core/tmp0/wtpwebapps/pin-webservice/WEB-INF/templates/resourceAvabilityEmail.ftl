<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    </head>
    <body>
        <table align="center" width="80%">
            <tr><td style="font-size: 0; line-height: 0;" height="10">&nbsp;</td></tr>
            <tr align="left">
                <td><span style="font: 30px Helvetica; font-weight: bold; margin-bottom: 40px; margin-top: 40px;">Dear Sir,</span></td>
            </tr>
            <tr><td style="font-size: 0; line-height: 0;" height="50">&nbsp;</td></tr>
            <tr align="center">
                <td><span style="font: 22px Helvetica;">PIN or Change Request created by  ${pmName}. Below resources are either already over allocated or will become over allocated after PIN or Change Request approval.</span></td>
            </tr>
            <tr>
                <td>
                <#list resourceList as email>
			 		<p style="font: 18px Helvetica;">Resource Name: ${email}</p>
				</#list>
				</td>
            </tr>
            <tr><td style="font-size: 0; line-height: 0;" height="50">&nbsp;</td></tr>
           
            <tr align="left">
                <td><span style="font: 22px Helvetica;">With warm regards,</span></td>
            </tr>
            <tr align="left">
                <td><span style="font: 22px Helvetica;">${pinTeam}</span></td>
            </tr>
             <tr align="left">
                <td><span style="font: 14px Helvetica;">INST- ${instanceName}</span></td>
            </tr>
            <#if instanceName != "PROD">
            	<tr align="left">
	                <td><span style="font: 14px Helvetica;">This is a notification only to be used for test purposes.</span></td>
	            </tr>
            </#if>
        </table>
    </body>
</html>