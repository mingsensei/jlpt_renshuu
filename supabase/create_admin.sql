-- ====================================================================
-- Script Tạo Tài Khoản Admin trong Supabase Auth (PostgreSQL)
-- Chạy script này trong Supabase Dashboard -> SQL Editor
-- ====================================================================

-- 1. Bật extension pgcrypto (cung cấp thuật toán mã hóa mật khẩu bcrypt)
CREATE EXTENSION IF NOT EXISTS pgcrypto;

DO $$
DECLARE
  -- CẤU HÌNH THÔNG TIN TÀI KHOẢN ADMIN TẠI ĐÂY:
  admin_email TEXT := 'admin@jlpt.vn';
  admin_password TEXT := 'Admin@123456'; -- Đổi mật khẩu này theo ý bạn
  
  new_user_id UUID := gen_random_uuid();
  encrypted_pw TEXT;
BEGIN
  -- Mã hóa mật khẩu bằng thuật toán Bcrypt (Blowfish - 'bf')
  encrypted_pw := crypt(admin_password, gen_salt('bf', 10));

  -- Kiểm tra nếu tài khoản đã tồn tại thì cập nhật lại mật khẩu và kích hoạt
  IF EXISTS (SELECT 1 FROM auth.users WHERE email = admin_email) THEN
    UPDATE auth.users
    SET 
      encrypted_password = encrypted_pw,
      email_confirmed_at = COALESCE(email_confirmed_at, NOW()),
      updated_at = NOW(),
      raw_user_meta_data = '{"role": "admin"}'::jsonb
    WHERE email = admin_email;
    
    RAISE NOTICE 'Tài khoản % đã tồn tại. Đã cập nhật mật khẩu mới thành công!', admin_email;
  ELSE
    -- Thêm tài khoản mới vào bảng auth.users
    INSERT INTO auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      invited_at,
      confirmation_token,
      confirmation_sent_at,
      recovery_token,
      recovery_sent_at,
      email_change_token_new,
      email_change,
      email_change_sent_at,
      last_sign_in_at,
      raw_app_meta_data,
      raw_user_meta_data,
      is_super_admin,
      created_at,
      updated_at,
      phone,
      phone_confirmed_at,
      phone_change,
      phone_change_token,
      phone_change_sent_at,
      email_change_token_current,
      email_change_confirm_status,
      banned_until,
      reauthentication_token,
      reauthentication_sent_at,
      is_sso_user,
      deleted_at
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      new_user_id,
      'authenticated',
      'authenticated',
      admin_email,
      encrypted_pw,
      NOW(), -- Tự động xác nhận email ngay lập tức, không cần đợi kích hoạt qua mail
      NULL,
      '',
      NULL,
      '',
      NULL,
      '',
      '',
      NULL,
      NOW(),
      '{"provider": "email", "providers": ["email"]}'::jsonb,
      '{"role": "admin"}'::jsonb,
      FALSE,
      NOW(),
      NOW(),
      NULL,
      NULL,
      '',
      '',
      NULL,
      '',
      0,
      NULL,
      '',
      NULL,
      FALSE,
      NULL
    );

    -- Liên kết identity email để Supabase GoTrue Auth nhận diện
    INSERT INTO auth.identities (
      id,
      user_id,
      identity_data,
      provider,
      provider_id,
      last_sign_in_at,
      created_at,
      updated_at
    ) VALUES (
      new_user_id,
      new_user_id,
      format('{"sub":"%s","email":"%s"}', new_user_id::text, admin_email)::jsonb,
      'email',
      new_user_id::text,
      NOW(),
      NOW(),
      NOW()
    )
    ON CONFLICT (provider, provider_id) DO NOTHING;

    RAISE NOTICE 'Đã tạo thành công tài khoản Admin: %', admin_email;
  END IF;
END $$;
