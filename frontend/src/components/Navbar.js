import {Link} from "react-router-dom";

function Navbar() {
    return (
        <nav>
            <div>
                <Link to="/">
                    Home
                    {"  "}
                </Link>
                <Link to="/highest">
                    Highest Review
                    {"  "}
                </Link>
                <Link to="/lowest">Lowest Review {"  "}</Link>
                <Link to="/about">About {"  "}</Link>
            </div>
        </nav>
     );
}

export default Navbar;