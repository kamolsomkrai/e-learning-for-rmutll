import React from "react";
import "./intropage.css";
export default function intropage() {
  return (
    <div className="intro-container">
      <div className="intro-web">
        <section className="background"></section>
        <div className="intro-text">
          <h3>โครงการ ยกระดับคุณภาพชีวิต</h3>
          <h4>หมู่บ้าน ชุมชนแบบมีส่วนร่วม</h4>
          <div className="ban">บ้านห้วยหลวงพัฒนา</div>
          <div className="addr">ตำบลบ้านเสด็จ อำเภอเมือง จังหวัดลำปาง</div>
        </div>
      </div>
      <div className="intro-webmoblie">
        <div className="button-nav">
          <div className="button-next">
            <span>แหล่งความรู้</span>
            <span className="fa fa-arrow-right"></span>
          </div>
          <div className="button-next">
            <span>ภาพกิจกรรม</span>
            <span className="fa fa-arrow-right"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
