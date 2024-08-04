export const resetPasswordTemplate = (resetPasswordUrl: string) => {
  return `<div style="font-family:Helvetica,sans-serif">
  <div style="width:600px;height:100%;margin:auto">
<div style="margin:40px 0 44px 0">
  <a style="color:#871fff;text-decoration:none" href="#" target="_blank">
    <img src="https://onesend-metadata.s3.ap-southeast-1.amazonaws.com/logo/Cassavas+-+Icon.png" style="vertical-align:middle;width:45%;height:auto;max-width:54px;border-width:0" alt="Onesend" data-image-whitelisted="" class="CToWUd">
  </a>
  <div>
    <div>
      <h1 style="font-family:Verdana,Helvetica,sans-serif;font-weight:bold;font-size:32px;line-height:48px">
        Thay đổi mật khẩu tài khoản
      </h1>
    </div>
</div>
</div>

<div>
  <div style="margin-top:24px;font-size:16px">
    Xin Chào,
  </div>

  <div>
    <p style="font-size:16px;margin-bottom:16px;line-height:24px">
      Bạn đã yêu cầu đặt lại mật khẩu tại Onesend.</p>
    <p style="font-size:16px;margin-bottom:16px;line-height:24px">
      Vui lòng truy cập vào đường link dưới đây để thay đổi mật khẩu của bạn nhé.</p>
    <p style="font-size:16px;margin-bottom:16px;line-height:24px">
      <a href="${resetPasswordUrl}" style="background:#0054de;color:#fff;font-size:14px;border:0;border-radius:4px;display:inline-block;line-height:24px;margin:8px 0;min-height:20px;outline:0;padding:8px 20px;text-align:center;vertical-align:middle;white-space:nowrap;text-decoration:none" target="_blank">Đặt lại mật khẩu</a>
    </p>
    <p>
      Hoặc: 
       <a href="${resetPasswordUrl}">${resetPasswordUrl}</a>
    </p>
 
  </div>
</div>

<p>
    <span style="line-height:24px;font-size:16px">Trân trọng.</span>
  </p>
    <hr style="margin:40px 0 20px 0;display:block;height:1px;border:0;border-top:1px solid #c4cdd5;padding:0">
    <footer style="margin-bottom:40px">
      <span style="color:#919eab;line-height:28px;font-size:12px">Cassavas, 81 Nguyễn Sơn Hà, phường 5, quận 3, TP.HCM, Việt Nam</span><br>
      <span style="color:#919eab;line-height:28px;font-size:12px">
          Bạn đã nhận được điều này bởi vì bạn là người dùng Onesend đã đăng ký. vui lòng không trả lời tin này</span><br>
          <span style="color:#919eab;line-height:28px;font-size:12px">
             mọi thắc mắc vui lòng liên hệ <a style="color:#919eab;line-height:28px;font-size:12px"  href="email:tue.nguyen@casavas.vn">tue.nguyen@casavas.vn</a></span><br>

    </footer><div class="yj6qo"></div><div class="adL">
    </div></div><div class="adL">
   
</div>
`;
};
