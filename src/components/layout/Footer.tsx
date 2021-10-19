export default function Footer(props)
{
    return (
        <footer className="row footer">
          <div className="col-md-12">
            <h6 className="text-center" style={{ color: "white" }}>
              This is a prototype version of the site!
            </h6>
            <p className="text-center" style={{ color: "gray", fontWeight: 300 }}>
              Everything here is subject to change. Project created by{" "}
              <a href="https://github.com/thiagoausechi">Thiago Ausechi</a>.<br />©
              2021 - Vendors Tracker (v1.0) - All Rights Reserved. <br />
              Destiny 2 & all related media © Bungie
            </p>
          </div>
        </footer>
      );
}