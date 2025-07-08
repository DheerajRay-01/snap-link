import React from 'react'
import { useNavigate } from 'react-router';

function ProfileIcon({user}) {

const avatar = user?.avatar || "https://avatar.iran.liara.run/public";

console.log("Avatar:", avatar);

const navigate = useNavigate();

const handleLogout = () => {
  navigate("/logout");
};

  return (
    <div>
      <div className="dropdown">
  <div tabIndex={0} role="button" className="btn m-1 btn-circle">
     <div className="w-9 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-100">
          <img
            src={avatar}
            alt="User Avatar"
            loading="lazy"
            className="w-9 h-9 rounded-full object-cover"
          />
        </div>
  </div>
  <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm right-1">
    <li className="text-center">
        <p className="font-medium">{user?.fullName || "Guest User"}</p>
        {user?.email && <p className="font-medium">{user?.email}</p>}
    </li>
    <li>
      <li className="mt-1">
        {user ? (
          <button
            className="btn btn-error w-full"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <button
            className="btn btn-success w-full"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        )}
      </li>
    </li>
  </ul>
</div>
    </div>
  )
}

export default ProfileIcon