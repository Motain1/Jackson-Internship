import React, { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "../UI/Skeleton";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";

const TopSellers = () => {
  const [loading, setLoading] = useState(undefined);
  const [data, setData] = useState([]);

  async function getData() {
    setLoading(true);
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
    );
    setData(data);
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <section
      id="section-popular"
      className="pb-5"
      data-aos="fade-in"
      data-aos-duration="1000"
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {loading === true
                ? new Array(12).fill(0).map((_, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        <Skeleton width={50} height={50} borderRadius={999} />
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="author_list_info">
                        <Skeleton width={115} height={20} borderRadius={0} />
                        <span>
                          <Skeleton width={40} height={20} borderRadius={0} />
                        </span>
                      </div>
                    </li>
                  ))
                : data.map((item) => (
                    <li key={item.id}>
                      <div className="author_list_pp">
                        <Link
                          to={`/author/${item.authorId}`}
                          state={{ authorId: item.authorId }}
                        >
                          <img
                            className="lazy pp-author"
                            src={item.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link
                          to={`/author/${item.authorId}`}
                          state={{ authorId: item.authorId }}
                        >
                          {item.authorName}
                        </Link>
                        <span>{item.price} ETH</span>
                      </div>
                    </li>
                  ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
