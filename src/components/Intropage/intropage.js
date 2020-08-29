import React from "react";
import "./intropage.css";
export default function intropage() {
  return (
    <div className="intro-container">
      <section className="background"></section>
      <div className="intro-text">
        <h3>โครงการ ยกระดับคุณภาพชีวิต</h3>
        <h4>หมู่บ้าน ชุมชนแบบมีส่วนร่วม</h4>
        <div className="ban">บ้านห้วยหลวงพัฒนา</div>
        <div className="addr">ตำบลบ้านเสด็จ อำเภอเมือง จังหวัดลำปาง</div>
      </div>
    </div>
  );
}
