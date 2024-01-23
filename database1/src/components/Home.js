import "../App.css";
import "bootstrap/dist/css/bootstrap.css";

function Home() {
    return (
        <div className="container">
            <div className="row">
                <br />
                <br />
                <br />
                <div className="col-md-3"></div>
                <div className="col-md-6 main">
                    <h1> Chess website </h1>
                    <a href="http://localhost:8081/login"> Prijava </a>
                    <br />
                    <a href="http://localhost:8081/signup"> Registracija </a>
                </div>
                <div className="col-md-3"></div>
            </div>
        </div>
    );
}

export default Home;
