import React, { useState, useEffect } from "react";
import "./Cursor.css"; // Assuming you have a CSS file for styling

const Cursor = () => {
  const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosX(e.clientX);
      setPosY(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const cursorOutline = document.querySelector("[data-cursor-outline]");

    cursorOutline.animate(
      {
        left: `${posX}px`,
        top: `${posY}px`,
      },
      {
        duration: 500,
        fill: "forwards",
      }
    );
  }, [posX, posY]);

  return (
    <>
      <div
        data-cursor-dot
        className="cursor-dot"
        style={{ left: `${posX}px`, top: `${posY}px` }}
      ></div>
      <div data-cursor-outline className="cursor-outline"></div>
    </>
  );
};

export default Cursor;
