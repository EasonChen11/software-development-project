function validateLogin() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
  
    // 在實際應用中，你應該將這些數據發送到後端進行驗證
  
    if (username === 'your_username' && password === 'your_password') {
      alert('Login successful!');
      // 在這裡可以導航到其他頁面或執行其他操作
    } else {
      alert('Invalid username or password');
    }
  }
  