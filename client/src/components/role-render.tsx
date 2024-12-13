const RoleRender = ({ children, allowedRoles }) => {
  const role = localStorage.getItem('role');
  if (allowedRoles.includes(role)) {
    return children;
  }
  return;
};

export default RoleRender;
