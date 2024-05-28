"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

interface PortfolioProps {
  gridClass: string;
}

// function useImgState() {
  

//   return { imgURLS, setImgURLS, showPopUp, setShowPopUp };
// }

// const imgURLS: string[] = [];
const cols_one: string[] = [];
const cols_two: string[] = [];
const cols_three: string[] = [];
const cols_four: string[] = [];
const cols_five: string[] = [];
const cols_more: string[] = [];

const Portfolio: React.FC<PortfolioProps> = ({ gridClass}) => {
  // const { imgURLS, setImgURLS } = useImgState();
  const [imgURLS, setImgURLS] = useState<string[]>([]);
  const [showPopUp, setShowPopUp] = useState("");
  const [count, setCount] = useState(3);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);  // เริ่มการโหลด
    Swal.fire({
      title: 'Loading image...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    axios.post("/api/portfolio")
      .then((res: any) => {

        setImgURLS(res.data.img_url);

        if (res.data.img_url.length === 0) {
          Swal.fire({
            icon: "error",
            title: "You don't have any images in your Store yet.",
          });
        } else {
          Swal.close();  // ปิดการแจ้งเตือนเมื่อโหลดเสร็จและมีรูปภาพ
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        Swal.fire({
          icon: "error",
          title: "An error occurred fetching data.",
          text: error.message,
        });
      })
      .finally(() => {
        setLoading(false);  // จบการโหลดไม่ว่าจะสำเร็จหรือล้มเหลว
      });
  }, [setImgURLS]);

  for (let i = 0; i < imgURLS.length; i++) {

    if (cols_one.length <= count) {
      
      cols_one.push(imgURLS[i]);
    } else if (cols_two.length <= count) {

      cols_two.push(imgURLS[i]);
    } else if (cols_three.length <= count) {

      cols_three.push(imgURLS[i]);
    } else if (cols_four.length <= count) {
      
      cols_four.push(imgURLS[i]);
    } else if (cols_five.length <= count) {
      
      cols_five.push(imgURLS[i]);
    } else {
      cols_more.push(imgURLS[i]);
    }
  }

  const notimg = () => {
    Swal.fire({
      icon: "error",
      title: "You don't have any images in your Store yet.",
    });
    return null; // Return null instead of void
  }

  const handleClick = (url: string) => {
    Swal.fire({
      imageUrl: url,
      text: "Do you want to delete this photo??",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post("/api/deleteimg", { url }).then((res) => {
          if (res.data.istrue) {
            Swal.fire("Successfully deleted images", "", "success").then(() => {
              window.location.reload();
            });
          }
        });
      }
    });
  };       

  
  // if(imgURLS.length > 0){
  //   console.log('imgURLS count --------------------------- ', imgURLS.length);
  // } else {
  //   console.log('not imgURLS count --------------------------- ', imgURLS.length);
  // }

  // for (let i = 0; i < cols_one.length; i++) {
  //   console.log('cols_one  --------------------------- ', cols_one[i]);
  // }

  
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      <div className={gridClass}>
        {cols_one.map((url, index) => (
          <div key={index} className="w-full h-full flex ">
            <img
              className="h-auto max-w-full rounded-lg object-cover cursor-pointer"
              src={url}
              alt=""
              onClick={() => handleClick(url)}
            />
          </div>
        ))}
      </div>

      <div className={gridClass}>
        {cols_two.map((url, index) => (
          // console.log('col 1', url),
          <div key={index} className="w-full h-full flex">
            <img
              className="h-auto max-w-full rounded-lg object-cover cursor-pointer"
              src={url}
              alt=""
              onClick={() => handleClick(url)}
            />
          </div>
        ))}
      </div>

      <div className={gridClass}>
        {cols_three.map((url, index) => (
          // console.log('col 2', url),
          <div key={index} className="w-full h-full flex">
            <img
              className="h-auto max-w-full rounded-lg object-cover cursor-pointer"
              src={url}
              alt=""
              onClick={() => handleClick(url)}
            />
          </div>
        ))}
      </div>

      <div className={gridClass}>
        {cols_four.map((url, index) => (
          // console.log('col 3', url),
          <div key={index} className="w-full h-full flex">
            <img
              className="h-auto max-w-full rounded-lg object-cover cursor-pointer"
              src={url}
              alt=""
              onClick={() => handleClick(url)}
            />
          </div>
        ))}
      </div>

      <div className={gridClass}>
        {cols_five.map((url, index) => (
          // console.log('col 4', url),
          <div key={index} className="w-full h-full flex">
            <img
              className="h-auto max-w-full rounded-lg object-cover cursor-pointer"
              src={url}
              alt=""
              onClick={() => handleClick(url)}
            />
          </div>
        ))}
      </div>
      {/* {imgURLS.length === 0 && notimg()} */}
    </div>
    
  );
};

export default Portfolio;
