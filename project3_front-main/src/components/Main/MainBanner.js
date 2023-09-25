import React, { useEffect, useState, useParams } from "react";
import { Link } from "react-router-dom";
import { localurl } from "../../utils/localUrl.js";
import { Carousel, message } from "antd";
//import axios from "axios";
import "../../Style/Main.css";

function Banner() {
  const { id } = useParams();
  const [restaurant, setRestaurants] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get(`${localurl}/store/${id}`)
  //     .then((result) => {
  //       const banners = result.data.banners;
  //       setRestaurants(banners);
  //     })
  //     .catch((error) => {
  //       console.error("에러발생 : ", error);
  //     });
  // }, []);

  useEffect(() => {
    fetch(`${localurl}/store/${id}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log(`${localurl}/store/${id}`);
        setRestaurants(data);
      })
      .catch((error) => {
        console.error("Error uploading data: ", error);
        message.error(
          `베너 이미지 불러오는 중 오류가 발생했습니다. 자세한 정보: ${error.message}`
        );
      });
  }, [id]);

  if (!restaurant) return <div>Loading....</div>;

  return (
    <div>
      <Carousel autoplay autoplaySpeed={3000}>
        {restaurant.map((restaurant, index) => {
          return (
            //서버에서 베너 이미지를 가져오겠다.
            <Link to={restaurant.href}>
              <div id="banner">
                {/* API_URL을 사용하여 서버로부터 베너 이미지의 경로를 설정합니다. */}
                {/* <img src={`${localurl}/${banner.imageUrl}`} alt="" />
                <img src={restaurant.image} alt={restaurant.name} /> */}
                {/* <img
                  key={index}
                  src={`${localurl}/store/${id}/image/${restaurantImageId}`}
                  alt={`${restaurant.name}-${index}`}
                /> */}
              </div>
            </Link>
          );
        })}
      </Carousel>
    </div>
  );
}

export default Banner;
