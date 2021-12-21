import "./App.css";
import { Link } from "react-router-dom";
import { Layout, Row, Col, Card, Input, Carousel } from "antd";
import "antd/dist/antd.css";
import { getLectures } from "./data";
import { getPhotos } from "./photos";
import AT_HEADER from "./components/AT_HEADER";
import CERN_FOOTER from "./components/CERN_FOOTER";
import CERN_TOOLBAR from "./components/CERN_TOOLBAR";

const { Content } = Layout;
const { TextArea } = Input;

const handleKeyPress = (ev: React.KeyboardEvent<HTMLTextAreaElement>) => {
  console.log("handleKeyPress", ev);
};

function App() {
  const lectures = getLectures();
  const photos = getPhotos();

  return (
    <Layout className="layout">
      <CERN_TOOLBAR />

      <AT_HEADER />

      <Content id="atc-content">
        <div className="background" data-preload>
          <Carousel autoplay className="photo-carousel" dots={false}>
            {photos.map((photo) => {
              return (
                <div className="container-fluid">
                  <div className="content">
                    <img alt={photo.alt} src={photo.src} />
                  </div>
                </div>
              );
            })}
          </Carousel>
        </div>

        <div className="responsive">
          <div className="frame">
            <div id="atc-logo">
              <img src="white-atc-logo.png" alt="Academic Training Logo" />
            </div>
            <h1>ACADEMIC TRAINING</h1>
          </div>

          <div className="videolists">
            <Row justify="center" gutter={[16, 16]}>
              {lectures.map((lecture) => {
                return (
                  <Col span={6} key={lecture.key}>
                    <nav>
                      <Link
                        style={{ display: "block", margin: "1rem 0" }}
                        to={`/lectures/${lecture.key}`}
                        key={lecture.key}
                      >
                        <Card
                          hoverable
                          className="video-card"
                          cover={
                            <img alt="thumbnail" src={lecture.thumbnail} />
                          }
                        >
                          <Card.Grid className="grid-style">
                            <div className="video-content">
                              <h2>{lecture.title}</h2>
                              <p>{lecture.speaker}</p>
                            </div>
                          </Card.Grid>
                        </Card>
                      </Link>
                    </nav>
                  </Col>
                );
              })}
            </Row>
            {/* {Array.apply(0, Array(10)).map(function (x, i) {
          return <ObjectRow key={i} />;
          })}  */}
          </div>

          <div className="suggestion-box">
            <h1>Submit a suggestion for future topics</h1>
            <div className="suggestion-box-window">
              <TextArea
                placeholder="What else would you see here?"
                className="custom"
                style={{
                  height: 150,
                  maxHeight: 150,
                  background: "transparent",
                  border: "none",
                  color: "white",
                }}
                onKeyPress={handleKeyPress}
              />
            </div>
            <h2>Send</h2>
          </div>
        </div>
      </Content>

      <CERN_FOOTER />
    </Layout>
  );
}

export default App;
