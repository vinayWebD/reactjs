export function adminLogin(userName, password) {
  if (userName == 'admin' && password == 'admin123') {
    return true;
  } else {
    return false;
  }
}
