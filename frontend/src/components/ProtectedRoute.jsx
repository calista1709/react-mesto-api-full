import { Navigate } from "react-router-dom";

function ProtectedRoute({ loggedIn, components }) {
    return loggedIn ? components : <Navigate to="/sign-in" />
}

export default ProtectedRoute;
