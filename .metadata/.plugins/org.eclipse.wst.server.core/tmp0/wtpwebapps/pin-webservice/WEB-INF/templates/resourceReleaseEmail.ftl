<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    </head>
    <body>
        <table align="center" width="80%">
            <tr><td style="font-size: 0; line-height: 0;" height="10">&nbsp;</td></tr>
            <tr align="left">
                <td><span style="font: 30px Helvetica; font-weight: bold; margin-bottom: 40px; margin-top: 40px;">Dear ${pmName},</span></td>
            </tr>
            <tr><td style="font-size: 0; line-height: 0;" height="50">&nbsp;</td></tr>
            <tr align="left">
              <td><span style="font: 22px Helvetica;">The seperation date of resource ${resourceName} is ${resourceSepDate}. You are the reporting manager. For substitution please create change request(CR) through PIN System as applicable and coordinate with respective project managers for the same.</span></td>
            </tr>
           <tr><td style="font-size: 0; line-height: 0;" height="20">&nbsp;</td></tr>
           <tr><td><span style="font: 20px Helvetica;">Following are the active allocations for ${resourceName}:</span></td></tr>
            <tr>
                <td><span style="font: 20px Helvetica;"><table align="left" border='1' style='border-collapse:collapse'>
            
                    <#if (projects?size > 0)>
                         <tr style="font: 18px Helvetica;"> 
                            <th style="font: 18px Helvetica;">Pin No</th>
                            <th style="font: 18px Helvetica;">Project Name</th>
                            <th style="font: 18px Helvetica;">Project Manager</th>
                            <th style="font: 18px Helvetica;">Allocation End Date</th>
                            <th style="font: 18px Helvetica;">Allocation %</th>
                         </tr>
                      <#list projects as project>
                         <tr style="font: 17px Helvetica;"> <td style="padding: 10px">${project['pinNo']}</td> <td style="padding: 10px">${project['projectName']}</td><td style="padding: 10px">${project['Manager']}</td><td style="padding: 10px">${project['allocationEndDate']}</td><td style="padding: 10px">${project['allocation']}</td></tr>
                      </#list>
                    <#else>
                      <tr><span style="font: 17px Helvetica;">NONE</span></tr>
                    </#if>
                </table>
            </span></td>
            </tr>
            <tr></tr>
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