import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AiFillLike } from "react-icons/ai";
import ReactDOMServer from 'react-dom/server';
import { IoClose } from "react-icons/io5";
import { FaShareAlt } from 'react-icons/fa';
import { MdOutlineReportProblem } from "react-icons/md";
import Popreport from "./popupReport";
import ReactDOM from 'react-dom';

function checkCookie(callback: any) {
  fetch("/api/Checkcookies", {
    method: "POST",
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === 200) {

        console.log("cookie is set");
        callback(true);
      } else {
        console.log("cookie is not set", data);
        callback(false);
      }
    })
    .catch((error) => {
      console.error('Error fetching cookie data:', error);
      callback(false);
    });
}

function Share() {
  const img = document.getElementById("popup") as HTMLImageElement;
  const imgUrl = img?.getAttribute("src");
  navigator.clipboard.writeText(
    window.location.origin + "/?share=" + imgUrl || ""
  );
  Swal.fire({
    title: "Link copied successfully",
    icon: "success",
    showConfirmButton: false,
    timer: 1500,
  });
}


function Report(img_id: any) {

  const item = {
    imgID: img_id,
  };

  Swal.fire({
    title: 'Loading...',
    showConfirmButton: false,
    willOpen: () => {
      Swal.showLoading();
    },
  });

  fetch('/api/useReport', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === 200) {
        Swal.fire({
          title: 'Report',
          html: '<div id="report-container"></div>',
          showConfirmButton: false,
          didOpen: () => {
            ReactDOM.render(
              <Popreport item={data.data} />,
              document.getElementById('report-container')
            );
          },
          willClose: () => {
            const reportContainer = document.getElementById('report-container');
            if (reportContainer) {
              ReactDOM.unmountComponentAtNode(reportContainer);
            }
          }
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Failed to load report data',
          icon: 'error',
        });
      }
    })
    .catch((error) => {
      console.error('Error fetching report data:', error);
      Swal.fire({
        title: 'Error',
        text: 'Failed to fetch report data',
        icon: 'error',
      });
    });
}

const PopUp = ({
  imgUrl,
  onclose,
}: {
  imgUrl: string;
  onclose: () => void;
}) => {
  const [like, setLike] = useState(0);
  const [title, setTitle] = useState(
    <div className="max-w-sm w-full">
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-6 py-1">
          <div className="h-[20px] bg-slate-300 rounded col-span-1"></div>
        </div>
      </div>
    </div>
  );
  const [Description, setDescription] = useState(
    <div className="w-full">
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-6 py-1">
          <div className="h-[60px] bg-slate-300 rounded col-span-1"></div>
        </div>
      </div>
    </div>
  );
  const [date, setDate] = useState("");
  const [tag, setTag] = useState([]);
  const [report, setReport] = useState(false);
  const [img_id_, setImg_id] = useState(0);

  const [hasCookie, setHasCookie] = useState(false);

  useEffect(() => {
    checkCookie((cookieValue: any) => {
      setHasCookie(cookieValue);
    });
  }, []);

  function userlike() {
    Swal.fire({
      title: "Loading...",
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      },
    });
    const img = document.getElementById("popup") as HTMLImageElement;
    const imgUrl = img?.getAttribute("src");
    const img_id = imgUrl?.split("?")[1].split("=")[1];
    const IMGID = Number(img_id);

    fetch("/api/like", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: IMGID }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.like) {
          setLike(like + 1);
          Swal.fire({
            title: "Like Success",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            title: "Like Failed",
            text: 'You have already liked this image',
            icon: "error",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  }

  useEffect(() => {
    const img = document.getElementById("popup") as HTMLImageElement;
    const imgUrl = img?.getAttribute("src");
    const img_id = imgUrl?.split("?")[1].split("=")[1];
    setImg_id(Number(img_id));

    fetch("/api/getimgdata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: img_id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setLike(data.data.user_like);
          setTitle(data.data.imgName);
          setDescription(data.data.description);
          setDate(new Date(Number(data.data.timestamp)).toLocaleString());
          setTag(data.data.TagNames.split(","));
        }
      });
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-gray-700 p-8 rounded-lg max-w-[865px]">
        <div className="text-2xl font-bold mb-[10px] flex items-center justify-center text-white">
          {title}
        </div>
        <hr className="mb-[10px]" />
        <img id="popup" src={imgUrl} alt="" className="w-full h-auto rounded" />
        <div className="w-full mt-4">
          <p className="text-white">Description</p>
          <div className="text-white">{Description}</div>
          {tag.length > 0 && (
            <div className="bg-slate-300 px-[10px] py-[10px] mt-[10px] rounded">
              {tag.map((tag, index) => (
                <span
                  key={index}
                  className="bg-white p-[5px] px-[8px] rounded-md border m-[3px] shadow-inner"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
          <div className="flex justify-end mt-[3px]">
            <span className="text-sm text-white">{date}</span>
          </div>
        </div>
        <hr />
        <div className="flex justify-between w-full mt-4">

          <div>
            {hasCookie ? (
              <button className="bg-rose-500 text-white px-4 py-2 rounded-lg hover:bg-rose-800" onClick={userlike}>
                <div className="flex items-center">
                  <AiFillLike className="mr-[4px]" /> Like{""}
                  <span className="ml-2">{like}</span>
                </div>
              </button>
            ) : null}

            <button
              onClick={Share}
              className="bg-rose-500 text-white px-4 py-2 rounded-lg ml-3 hover:bg-rose-800"
            >
              <div className="flex items-center">
                <FaShareAlt className="mr-[4px]" /> CopyLink
              </div>
            </button>
            {hasCookie ? (
              <button
                onClick={() => Report(img_id_)}
                className="bg-rose-500 text-white px-4 py-2 rounded-lg ml-3 hover:bg-rose-800"
              >
                <div className="flex items-center">
                  <MdOutlineReportProblem className="mr-[4px]" /> Report
                </div>
              </button>
            ) : null}
          </div>
          <button
            onClick={onclose}
            className="bg-rose-500 text-white px-4 py-2 rounded-lg hover:bg-rose-800"
          >
            <div className="flex items-center">
              <IoClose className="mr-[4px]" /> Close
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
