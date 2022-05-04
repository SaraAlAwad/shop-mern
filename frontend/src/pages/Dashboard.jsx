import { Link } from "react-router-dom"
import Navigation from "../components/Navigation"

const Dashboard = () => {
    return (
        <main>
            <Navigation />
            <section className="container-dashboard">
                <header>
                    <h1>Dashboard: Welcome back, adminName!</h1>
                    <p className="data">{`${new Date().toLocaleString()}`}</p>
                </header>
                {/* stats shouldnt be hardcoded or static data */}
                <section className="container-stats">
                    <article className="stats flex-v">
                        <h3>2,564</h3>
                        <p>Products</p>
                    </article>
                    <article className="stats flex-v">
                        <h3>3,617</h3>
                        <p>Orders</p>
                    </article>
                    <article className="stats flex-v">
                        <h3>1,815</h3>
                        <p>Customers</p>
                    </article>
                </section>
                <section className="container-orders">
                    <div className="flex-r">
                        <h2> Latest Orders</h2>
                        {/* link to orders */}
                        <Link to={"/"}>See All </Link>
                    </div>
                    <ul className="orders-list">
                        <li>
                            <p>order date</p>
                            <p> order number</p>
                            <p>order status</p>
                            <Link to={"/"}>➡</Link>
                        </li>
                        <li>
                            <p>order date</p>
                            <p> order number</p>
                            <p>order status</p>
                            {/* link to order details */}
                            <Link to={"/"}>➡</Link>
                        </li>
                        <li>
                            <p>order date</p>
                            <p> order number</p>
                            <p>order status</p>
                            <Link to={"/"}>➡</Link>
                        </li>
                    </ul>

                </section>
            </section>

        </main>
    )
}

export default Dashboard