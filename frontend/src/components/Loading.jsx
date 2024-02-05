import React, { useEffect } from "react";
import ReactLoading from "react-loading";

function LoadingIcon() {

  useEffect(() => {
    setTimeout(() => {
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          //setData(json);
          //setDone(true);
        });
    }, 2000);
  }, []);

  return (
    <div className="text-center">
        <div className="d-flex justify-content-center">
            <ReactLoading
                type={"bars"}
                color={"#3333ff"}
                height={100}
                width={100}
            />
        </div>
        <h1>Generating Slides Preview...</h1>
    </div>
    
  );
}

export default LoadingIcon;