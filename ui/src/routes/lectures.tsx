import { Outlet, Link } from "react-router-dom";
import { getLectures } from "../data";
import "../App.css";
import { Layout, Card } from "antd";
import "antd/dist/antd.css";
import AT_HEADER from "../components/AT_HEADER";
import CERN_FOOTER from "../components/CERN_FOOTER";
import CERN_TOOLBAR from "../components/CERN_TOOLBAR";

const { Content } = Layout;

function Lectures() {
  const lectures = getLectures();

  return (
    <Layout className="layout">
      <CERN_TOOLBAR />

      <AT_HEADER />

      <Content id="atc-content">
        <div className="lecture">
          {lectures.map((lecture) => {
            return (
              <nav>
                <Link to={`/lectures/${lecture.key}`} key={lecture.key}>
                  <Card
                    hoverable
                    className="video-card"
                    cover={<img alt="thumbnail" src={lecture.thumbnail} />}
                  >
                    <div className="video-content">
                      <h1>{lecture.title}</h1>
                      <p>{lecture.speaker}</p>
                    </div>
                  </Card>
                </Link>
              </nav>
            );
          })}
          <Outlet />
        </div>
      </Content>

      <CERN_FOOTER />
    </Layout>
  );
}

export default Lectures;
