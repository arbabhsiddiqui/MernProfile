import React, { useEffect } from "react";
import ProjectItem from "../../components/ProjectItem/ProjectItem.components";
import "./HomePage.scss";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { listWorks } from "../../redux/work/workActions";

const HomePage = () => {
  const dispatch = useDispatch();
  const workList = useSelector((state) => state.workList);
  const { loading, error, works } = workList;

  useEffect(() => {
    dispatch(listWorks());
  }, [dispatch]);
  return (
    <>
      <section id="home" className="site-banner">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6 col-md-12 banner-image">
              <img
                src="./img/banner/launda.svg"
                alt="banner-img"
                className="img-fluid"
              />
            </div>
            <div className="col-lg-6 col-md-12 site-title">
              <h3 className="title-text">Hey !</h3>
              <h1 className="title-text text-uppercase text-light">I am </h1>
              <h1 className="title-text text-uppercase text-light text-green">
                {" "}
                Arbab Hussain
              </h1>
              <h4 className="title-text text-uppercase text-light">
                Full Stack Developer
              </h4>
              <div className="site-buttons">
                <div className="d-flex flex-row flex-wrap">
                  <a
                    href="#portfolio"
                    className="btn button primary-button mr-4 text-uppercase text-light"
                  >
                    View Portfolio
                  </a>
                  <a
                    href="./arbabCv.pdf"
                    className="btn button secondary-button text-uppercase"
                  >
                    Download cv
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* About Section */}
      <section id="about" className="about-area">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6 col-md-12 about-title text-light">
              <h2 className="text-uppercase text-light pt-5 text-light">
                <span>Let me</span>
                <span>introduce</span>
                <span>myself</span>
              </h2>
              <div className="paragraph py-4 w-75">
                <p className="para text-light">
                  I am a Full Stack Web Developer learning & working to build a
                  successful life. I like coding and simultaneously learning
                  about new technologies to keep myself updated in this big tech
                  world. Not taking too much of your time, here's my work
                  portfolio.
                </p>
              </div>
              <a
                href="./arbabCv.pdf"
                className="btn button primary-button text-uppercase text-light"
              >
                Download cv
              </a>
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="about-image mt-1">
                <img
                  src="./img/laptop.svg"
                  className="img-fluid"
                  alt="banner-img"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Projects Sections */}
      <section className="project-area" id="portfolio">
        <div className="container text-light">
          <div className="project-title pb-5">
            <h1 className="text-uppercase text-light title-h1 text-light">
              Portfolio
            </h1>
          </div>

          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <div className="row grid">
              {works.map((item) => (
                <ProjectItem key={item._id} item={item} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default HomePage;
