import Messages from "./Messages.js";
class Template {
  constructor() {}
  welcome = (data) => {
    console.log(data);
    return `
		<body style="background-color: #e9ecef;">
		  <!-- start preheader -->
		  <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
			A preheader is the short summary text that follows the subject line when an email is viewed in the inbox.
		  </div>
		  <!-- end preheader -->
		
		  <!-- start body -->
		  <table border="0" cellpadding="0" cellspacing="0" width="100%">
		
			<!-- start logo -->
			<tr>
			  <td align="center" bgcolor="#e9ecef">
				<!--[if (gte mso 9)|(IE)]>
				<table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
				<tr>
				<td align="center" valign="top" width="600">
				<![endif]-->  
				<!--[if (gte mso 9)|(IE)]>
				</td>
				</tr>
				</table>
				<![endif]-->
			  </td>
			</tr>
			<!-- end logo -->
		
			<!-- start hero -->
			<tr>
			  <td align="center" bgcolor="#e9ecef">
				<!--[if (gte mso 9)|(IE)]>
				<table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
				<tr>
				<td align="center" valign="top" width="600">
				<![endif]-->
				<table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
				  <tr>
					  <h1>Thank you ${data.user.username},for registering with us !</h1>
					<td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
					  <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Confirm Your Email Address</h1>
					</td>
				  </tr>
				</table>
				<!--[if (gte mso 9)|(IE)]>
				</td>
				</tr>
				</table>
				<![endif]-->
			  </td>
			</tr>
			<!-- end hero -->
		
			<!-- start copy block -->
			<tr>
			  <td align="center" bgcolor="#e9ecef">
				<!--[if (gte mso 9)|(IE)]>
				<table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
				<tr>
				<td align="center" valign="top" width="600">
				<![endif]-->
				<table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
		
				  <!-- start copy -->
				  <tr>
					<td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
					  <p style="margin: 0;">Tap the button below to confirm your email address. If you didn't create an account with <a href="">Paste</a>, you can safely delete this email.</p>
            <p>Your Verification otp is ${data.user.authOtp}</p>
            </td>
				  </tr>
				  <!-- end copy -->
		
				  <!-- start button -->
				  <tr>
					<td align="left" bgcolor="#ffffff">
					  <table border="0" cellpadding="0" cellspacing="0" width="100%">
						<tr>
						  <td align="center" bgcolor="#ffffff" style="padding: 12px;">
							<table border="0" cellpadding="0" cellspacing="0">
							  <tr>
								<td align="center" bgcolor="#1a82e2" style="border-radius: 6px;">
                
								</td>
							  </tr>
							</table>
						  </td>
						</tr>
					  </table>
					</td>
				  </tr>
				  <tr>
					<td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
					  <p style="margin: 0;">Cheers,<br> With love, ${Messages.Company_NAME} TEAM</p>
					</td>
				  </tr>
				  <!-- end copy -->
		
				</table>
				<!--[if (gte mso 9)|(IE)]>
				</td>
				</tr>
				</table>
				<![endif]-->
			  </td>
			</tr>
			<!-- end copy block -->
		
			<!-- start footer -->
			<tr>
			  <td align="center" bgcolor="#e9ecef" style="padding: 24px;">
				<!--[if (gte mso 9)|(IE)]>
				<table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
				<tr>
				<td align="center" valign="top" width="600">
				<![endif]-->
				<table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
		
				  <!-- start permission -->
				  <tr>
					<td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
					  <p style="margin: 0;">You received this email because we received a Signup request for for your account. If you didn't request, you can safely delete this email.</p>
					</td>
				  </tr>
				  <!-- end permission -->
	  
				</table>
				<!--[if (gte mso 9)|(IE)]>
				</td>
				</tr>
				</table>
				<![endif]-->
			  </td>
			</tr>
		  `;
  };

  // 	forgetPassword = (data) => {
  // 		return `
  // 		<body style="background-color: #e9ecef;">
  // 		  <!-- start preheader -->
  // 		  <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
  // 			A preheader is the short summary text that follows the subject line when an email is viewed in the inbox.
  // 		  </div>
  // 		  <!-- end preheader -->

  // 		  <!-- start body -->
  // 		  <table border="0" cellpadding="0" cellspacing="0" width="100%">

  // 			<!-- start logo -->
  // 			<tr>
  // 			  <td align="center" bgcolor="#e9ecef">
  // 				<!--[if (gte mso 9)|(IE)]>
  // 				<table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
  // 				<tr>
  // 				<td align="center" valign="top" width="600">
  // 				<![endif]-->
  // 				<!--[if (gte mso 9)|(IE)]>
  // 				</td>
  // 				</tr>
  // 				</table>
  // 				<![endif]-->
  // 			  </td>
  // 			</tr>
  // 			<!-- end logo -->

  // 			<!-- start hero -->
  // 			<tr>
  // 			  <td align="center" bgcolor="#e9ecef">
  // 				<!--[if (gte mso 9)|(IE)]>
  // 				<table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
  // 				<tr>
  // 				<td align="center" valign="top" width="600">
  // 				<![endif]-->
  // 				<table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
  // 				  <tr>
  // 					  <h1>Thank you ${data.data.firstName},for registering with us !</h1>
  // 					<td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
  // 					  <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Reset Your Password</h1>
  // 					</td>
  // 				  </tr>
  // 				</table>
  // 				<!--[if (gte mso 9)|(IE)]>
  // 				</td>
  // 				</tr>
  // 				</table>
  // 				<![endif]-->
  // 			  </td>
  // 			</tr>
  // 			<!-- end hero -->

  // 			<!-- start copy block -->
  // 			<tr>
  // 			  <td align="center" bgcolor="#e9ecef">
  // 				<!--[if (gte mso 9)|(IE)]>
  // 				<table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
  // 				<tr>
  // 				<td align="center" valign="top" width="600">
  // 				<![endif]-->
  // 				<table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

  // 				  <!-- start copy -->
  // 				  <tr>
  // 					<td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
  // 					  <p style="margin: 0;">Tap the button below to reset your email address. If you didn't want to reset account, you can safely delete this email.</p>
  // 					</td>
  // 				  </tr>
  // 				  <!-- end copy -->

  // 				  <!-- start button -->
  // 				  <tr>
  // 					<td align="left" bgcolor="#ffffff">
  // 					  <table border="0" cellpadding="0" cellspacing="0" width="100%">
  // 						<tr>
  // 						  <td align="center" bgcolor="#ffffff" style="padding: 12px;">
  // 							<table border="0" cellpadding="0" cellspacing="0">
  // 							  <tr>
  // 								<td align="center" bgcolor="#1a82e2" style="border-radius: 6px;">
  // 								  <a href="${Messages.BACKEND_BASEURL}/api/v1/auth/reset-password?token=${data.token}" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">Verify Email</a>
  // 								</td>
  // 							  </tr>
  // 							</table>
  // 						  </td>
  // 						</tr>
  // 					  </table>
  // 					</td>
  // 				  </tr>
  // 				  <!-- end button -->

  // 				  <!-- start copy -->
  // 				  <tr>
  // 					<td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
  // 					  <p style="margin: 0;">If that doesn't work, copy and paste the following link in your browser:</p>
  // 					  <p style="margin: 0;"><a href="http:///users/verify_email?token" target="_blank" style="color:blue">Click Here</a></p>
  // 					</td>
  // 				  </tr>
  // 				  <!-- end copy -->

  // 				  <!-- start copy -->
  // 				  <tr>
  // 					<td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
  // 					  <p style="margin: 0;">Cheers,<br> With love, ${Messages.Company_NAME} TEAM</p>
  // 					</td>
  // 				  </tr>
  // 				  <!-- end copy -->

  // 				</table>
  // 				<!--[if (gte mso 9)|(IE)]>
  // 				</td>
  // 				</tr>
  // 				</table>
  // 				<![endif]-->
  // 			  </td>
  // 			</tr>
  // 			<!-- end copy block -->

  // 			<!-- start footer -->
  // 			<tr>
  // 			  <td align="center" bgcolor="#e9ecef" style="padding: 24px;">
  // 				<!--[if (gte mso 9)|(IE)]>
  // 				<table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
  // 				<tr>
  // 				<td align="center" valign="top" width="600">
  // 				<![endif]-->
  // 				<table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

  // 				  <!-- start permission -->
  // 				  <tr>
  // 					<td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
  // 					  <p style="margin: 0;">You received this email because we received a Signup request for for your account. If you didn't request, you can safely delete this email.</p>
  // 					</td>
  // 				  </tr>
  // 				  <!-- end permission -->

  // 				</table>
  // 				<!--[if (gte mso 9)|(IE)]>
  // 				</td>
  // 				</tr>
  // 				</table>
  // 				<![endif]-->
  // 			  </td>
  // 			</tr>
  // 		  `
  // 	};
  // }

  forgetPassword = (data) => {
    console.log(data);
    return ` <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
    <!--100% body table-->
    <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
        style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
        <tr>
            <td>
                <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                    align="center" cellpadding="0" cellspacing="0">
                    <tr>
                        <td style="height:80px;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td style="text-align:center;">
                        </td>
                    </tr>
                    <tr>
                        <td style="height:20px;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td>
                            <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                <tr>
                                    <td style="height:40px;">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td style="padding:0 35px;">
                                        <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">You have
                                            requested to reset your password</h1>
                                        <span
                                            style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                        <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                            We cannot simply send you your old password. A unique link to reset your
                                            password has been generated for you. To reset your password, click the
                                            following link and follow the instructions.
                                        </p>
                                        <a href="${Messages.FRONTEND_BASEURL}/reset-password?token=${data.token}"
                                            style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Reset
                                            Password</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="height:40px;">&nbsp;</td>
                                </tr>
                            </table>
                        </td>
                    <tr>
                        <td style="height:20px;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td style="height:80px;">&nbsp;</td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    <!--/100% body table-->
</body>

</html>`;
  };
}

export default new Template();
