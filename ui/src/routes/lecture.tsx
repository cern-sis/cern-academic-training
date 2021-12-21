import { useParams, Outlet } from "react-router-dom";
import { getLecture } from "../data";
import "../App.css";
import { Layout, Carousel } from "antd";
import { getPhotos } from "../photos";
import "antd/dist/antd.css";
import AT_HEADER from "../components/AT_HEADER";
import CERN_FOOTER from "../components/CERN_FOOTER";
import CERN_TOOLBAR from "../components/CERN_TOOLBAR";

const { Content } = Layout;

function Lecture() {
  let params = useParams();
  let lecture = getLecture(parseInt(params.lectureId!, 10));
  const photos = getPhotos();

  return (
    <Layout className="layout">
      <CERN_TOOLBAR />

      <AT_HEADER />

      <Content id="atc-content">
        <div className="video-box">
          <div className="video-window">
            <iframe
              title={lecture?.title}
              src={lecture?.video}
              allow-fullscreen
            ></iframe>
          </div>

          <div className="lecture-details">
            <h2 style={{ lineHeight: 1.5 }}>{lecture?.title}</h2>
            <h3>{lecture?.speaker}</h3>
            <h4>{lecture?.date}</h4>
            <a href={lecture?.event_details}>Event details (Indico)</a>
            <p>{lecture?.abstract}</p>
            <Outlet />
          </div>
        </div>
      </Content>

      <CERN_FOOTER />
    </Layout>
  );
}

export default Lecture;
