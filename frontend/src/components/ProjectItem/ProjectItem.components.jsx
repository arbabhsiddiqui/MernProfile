import React from "react";

const ProjectItem = ({ item }) => {
  return (
    <div className="col-lg-4 col-md-6 col-sm-12 element-item ">
      <div className="our-project">
        <div className="img">
          <a
            target="blank"
            className="test-popup-link"
            href={`${item.siteUrl}`}
          >
            <img
              src={`${item.image}`}
              alt={`${item.image}`}
              className="img-fluid"
            />
          </a>
        </div>
        <div className="title py-4">
          <h4 className="text-uppercase text-light text-light">{item.name}</h4>
          <span className="text-secondary">
            <a
              target="blank"
              className="text-secondary"
              href={`${item.gitUrl === "none" ? "#" : item.gitUrl}`}
            >
              Git Url{" "}
            </a>
            ,
            <a
              target="blank"
              className="text-secondary"
              href={`${item.siteUrl}`}
            >
              Site Url
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProjectItem;
