<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    </head>
    <body>
        <table align="left" width="100%">
            <tr><td style="font-size: 0; line-height: 0;" height="10">&nbsp;</td></tr>
            <tr align="left">
                <td><span style="font: 30px Helvetica; font-weight: bold; margin-bottom: 40px; margin-top: 40px;">Dear ${userName},</span></td>
            </tr>
            <tr><td style="font-size: 0; line-height: 0;" height="50">&nbsp;</td></tr>
            <tr align="center">
                <td><span style="font: 22px Helvetica;">To reset your password, please click on the button below</span></td>
            </tr>
            <tr><td style="font-size: 0; line-height: 0;" height="50">&nbsp;</td></tr>
            <tr align="center"> 
                <td>
                	<a href="${pwdResetLink}" target="_blank">
                        <button style=" border: none; 
                                        outline: none; 
                                        color: white; 
                                        background-color: #4267B3; 
                                        font: 20px Helvetica; 
                                        padding: 10px 30px; 
                                        border-radius: 
                                        15px;margin: auto; 
                                        margin-top: 20px; 
                                        margin-bottom: 20px; 
                                        width: 300px;">Change Password</button>        
                    </a>
                    <div style="display: none">${pwdResetLink}</div>
                </td>
            </tr>
            <tr align="left">
                <td><span style="font: 22px Helvetica;">With warm regards,</span></td>
            </tr>
            <tr align="left">
                <td><span style="font: 22px Helvetica;">PIN Team</span></td>
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