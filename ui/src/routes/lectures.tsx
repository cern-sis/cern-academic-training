import { Card, Layout } from "antd";
import { Link, Outlet } from "react-router-dom";
import "../App.css";
import { AT_HEADER, CERN_FOOTER, CERN_TOOLBAR, LOADING_ICON } from '../features';
import { useGetLecturesQuery } from "../services/lectures.service";

const { Content } = Layout;

function Lectures() {
  const { data, error, isLoading } = useGetLecturesQuery('');

  window.scrollTo(0, 0);

  return (
    <Layout className="layout">
      <CERN_TOOLBAR />

      <AT_HEADER />

      <Content id="atc-content">
        <div className="lecture" style={{marginTop: '15rem'}}>
          {error ? (
            <Card>Oh no, there was an error</Card>
          ) : isLoading ? (
            <LOADING_ICON />
          ) : data ? (
            <>
              {data?.map((lecture: any) => {
                return (
                  <div>
                    <Link to={`/lectures/${lecture.lecture_id}`}>
                      <Card className="video-card" style={{background: 'white', margin: '2rem'}}>
                        <div className="video-content">
                          <img
                            alt="thumbnail"
                            src={lecture.thumbnail_picture}
                          />
                          <h1>{lecture.title}</h1>
                          <p>{lecture.speaker}</p>
                        </div>
                      </Card>
                    </Link>
                  </div>
                );
              })}
            </>
          ) : null}
          <Outlet />
        </div>
      </Content>

      <CERN_FOOTER />
    </Layout>
  );
}

export default Lectures;
