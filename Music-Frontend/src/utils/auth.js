export const logout = () => {
  localStorage.removeItem('token'); // Remove the token from local storage
  window.location.href = '/'; // Redirect to the entry page
}; 