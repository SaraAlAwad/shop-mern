import { Link } from "react-router-dom"
import avatar from "../avatar.png"
import { FaHome } from "react-icons/fa"
import { FaBoxOpen } from "react-icons/fa"
import { FaUsers } from "react-icons/fa"
import { FaWhmcs } from "react-icons/fa"
import { BiNotepad } from "react-icons/bi"
import { BiLogOut } from "react-icons/bi"
import '../App.css';
const Navigation = (props) => {
    return (

        <nav className="flex-v">
            <div className="container-avatar">
                <img src={avatar} alt="admin-avatar" className="avatar" />
            </div>
            <ul className="flex-v">
                <li>
                    <Link to={"/"}> <FaHome className="icons" /> Dashboard</Link>
                </li>
                <li><Link to={"/AllProducts"}> <FaBoxOpen className="icons" /> Products</Link></li>
                <li><Link to={"/"}> <BiNotepad /> Orders</Link></li>
                <li><Link to={"/"}> <FaUsers /> Users</Link></li>
                <li><Link to={"/"}> <FaWhmcs /> Settings</Link></li>
            </ul>
            <div className="container-logout">
                <Link to={"/"}> <BiLogOut /> Log out</Link>
            </div>
        </nav>

    )
}

export default Navigation