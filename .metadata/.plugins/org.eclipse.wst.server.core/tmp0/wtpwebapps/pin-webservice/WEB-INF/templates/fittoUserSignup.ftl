<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    </head>
    <body>
        <table align="center" width="80%">
            <tr><td style="font-size: 0; line-height: 0;" height="10">&nbsp;</td></tr>
            <tr align="left">
                <td><span style="font: 30px Helvetica; font-weight: bold; margin-bottom: 40px; margin-top: 40px;">Dear ${patientName},</span></td>
            </tr>
            <tr><td style="font-size: 0; line-height: 0;" height="50">&nbsp;</td></tr>
            <tr align="center">
                <td><span style="font: 22px Helvetica;">To signup in FITTO application, please click on the button below.</span></td>
            </tr>
            <tr><td style="font-size: 0; line-height: 0;" height="50">&nbsp;</td></tr>
            <tr align="center"> 
                <td>
                	<a href="${signupResetLink}" target="_blank">
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
                                        width: 300px;">Signup</button>        
                    </a>
                    <div style="display: none">${signupResetLink}</div>
                </td>
            </tr>
            <tr align="left">
                <td><span style="font: 22px Helvetica;">With warm regards,</span></td>
            </tr>
            <tr align="left">
                <td><span style="font: 22px Helvetica;">${fittoTeam}</span></td>
            </tr>
            <tr align="center" style="border: 1px solid #4267B343;">
                <table align="center" style="background-color: #4267B343; border: 1px solid #4267B343;" width="100%">
                    <tr><td style="font-size: 0; line-height: 0;" height="10">&nbsp;</td></tr>
                    <tr style="padding-top: 10px;">
                        <td align="center"><span style="font: 16px Helvetica;">Any questions? Get in touch with our customer care team at: ${supportPhone}</span>
                        </td>
                    </tr>
                    <tr>
                        <td align="center"><span style="font: 16px Helvetica;">Mail us at: support@fitto-at.com Visit us on: FITTO-AT.com</span></td>
                    </tr>
                    <tr>
                        <td align="center"> <span style="font: 5px Helvetica;">Please check your SPAM Folder</span></td>
                    </tr>
                    <tr>
                        <td align="center"> <span style="font: 16px Helvetica;">Powered by FITTO</span></td>
                    </tr>
                    <tr>
                        <td align="center"> 
                            <img style="width: 150px;
                                        height: 30px;
                                        margin: auto;
                                        box-sizing: border-box;
                                        padding-top: 1px;"
                                        src="${logoUrl}"
                                        alt="fitto"
                                        >
                            </img>
                        </td>
                    </tr>
                    <tr>
                        <td align="center"> <span style="font: 5px Helvetica;">This is a system generated email, please do not reply to this email.</span></td>
                    </tr>
                </table>
            </tr>
        </table>
    </body>
</html>