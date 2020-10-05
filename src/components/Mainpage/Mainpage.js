import React, { useState, useEffect } from "react";
import "./Mainpage.css";
import { db } from "../../firebase";

// db.collection("knowledgeStore").add({
//   credit: "ssssss",
//   name: "การวิเคราะห์ดินและหาแร่ธาตุในดิน",
//   subtopic: [
//     {
//       name: "การวิเคราะห์ดินและหาแร่ธาตุในดิน",
//       data: [
//         {
//           p_name: "การทดสอบดิน",
//           p_detail:
//             "ในการปลูกพืชนั้น ธาตุอาหารสำหรับพืชเป็นสิ่งจำเป็นอันดับที่สองรองลงมาจากน้ำ และการที่พืชได้ธาตุอาหารที่เพียงพอตลอดการเจริญเติบโตนั้นก็เป็นปัจจัยสำคัญที่ทำให้ผลผลิตของพืชเป็นไปตามที่เราต้องการซึ่งตัวบ่งชี้ว่าถ้าเราต้องการปลูกพืชชนิดหนึ่งเราควรใส่ธาตุอาหารเข้าไปเท่าไหร่นั้น คือ ดิน (Soil)เพราะดินเป็นแหล่งสะสมและปลดปล่อยธาตุอาหารของพืชดังนั้นก่อนทำการปลูกพืชเราจึงควรนำดินมาวิเคราะห์เพื่อตรวจวัดปริมาณธาตุอาหารที่มีอยู่ในดินนั้นๆว่าเพียงพอ มากหรือน้อยเกินไป และเพื่อการจัดการกับธาตุอาหารตลอดฤดูปลูกของพืชที่เราต้องการปลูกได้อย่างถูกต้องและเหมาะสม (ระยะเวลาในการดำเนินงาน 7 วัน)",
//           image: [{ ref: "" }],
//           video: [{ link: "" }],
//         },
//         {
//           p_name: "ธาตุอาหารที่จำเป็นต่อการเจริญเติบโตของพืช",
//           p_detail:
//             "มี 16 ธาตุ เมื่อแบ่งตามแหล่งที่มาของธาตุอาหารได้ดังนี้ <p>1. จากอากาศและน้ำ 3 ธาตุ ได้แก่ คาร์บอน (C) ไฮโดรเจน (H) และออกซิเจน (O)<p>2. จากดิน 13 ธาตุ ได้แก่ ไนโตรเจน (N) ฟอสฟอรัส (P) โพแทสเซียม (K) แคลเซียม (Ca) แมกนีเซียม (Mg) และกำมะถัน (S) เหล็ก (Fe) แมงกานีส(Mn) โบรอน (B) โมลิบดินัม (Mo) ทองแดง (Cu) สังกะสี (Zn) และคลอรีน (Cl) ในขณะเดียวกันทาง Lab CTA ได้ให้ความสำคัญกับธาตุอาหารอีก 3 ธาตุ ได้แก่ ซิลิกอน (Si) โซเดียม (Na)และอลูมิเนียม (Al) ซึ่ง 3 ธาตุนี้เกี่ยวข้องเกี่ยวกับการเจริญเติบโตด้วยเช่นกัน",
//           image: [{ ref: "" }],
//           video: [{ link: "" }],
//         },
//         {
//           p_name: "การประเมินความอุดมสมบูรณ์ของดิน (Soil Fertility Evaluation)",
//           p_detail:
//             "การประเมินความอุดมสมบูรณ์ของดิน คือ\
//        การประเมินความสามารถที่ดินจะให้ธาตุอาหารแก่พืช\
//        ส่วนหนึ่งเป็นการประเมินระดับธาตุอาหารพืชในดินโดยตรง\
//        และอีกส่วนหนึ่งเป็นการประเมินสถานภาพหรือคุณสมบัติที่ส่งผลหรือเกี่ยวข้องกับความอุดมสมบูรณ์ของดิน",
//           image: [{ ref: "" }],
//           video: [{ link: "" }],
//         },
//         {
//           p_name: "วัตถุประสงค์ของการประเมินธาตุอาหารพืชในดิน",
//           p_detail:
//             "<p>1. เพื่อหาสถานะธาตุอาหารที่เป็นประโยชน์ในดินอย่างเที่ยงตรง\
//                   <p>2.สามารถชี้ให้เกษตรกรเห็นอย่างชัดเจนถึงการขาดแคลนหรือการมีมากเกินพอของธาตุอาหาร ที่เกิดขึ้นในพืชต่าง ๆ ที่สนใจ\
//                   <p>3. ประเมินระดับของธาตุที่อาจจะเป็นพิษต่อพืชได้ เช่น Fe และ Al เป็นต้น\
//                   <p>4. เป็นพื้นฐานในการแนะนำปุ๋ย\
//                   <p>5. สามารถประเมินค่าทางเศรษฐกิจ(รายจ่าย)ที่เกิดจากการใช้ปุ๋ยในปริมาณที่แนะนำ",
//           image: [{ ref: "" }],
//           video: [{ link: "" }],
//         },
//       ],
//     },
//     {
//       name: "วิธีการประเมินความอุดมสมบูรณ์ของดิน",
//       data: [
//         {
//           p_name: "วิธีการประเมินความอุดมสมบูรณ์ของดิน",
//           p_detail:
//             "ในการประเมินความอุดมสมบูรณ์ของดินเราต้องทราบว่ามีปัจจัยทางด้านธาตุอาหารใดที่มีผลต่อผลผลิตของพืช\
//             ซึ่งปัจจัยที่สำคัญที่จะให้ปริมาณธาตุอาหารที่เพียงพอสำหรับพืชหนึ่งๆ\
//             ขึ้นอยู่กับปัจจัยหลายประการ เช่น คุณภาพของดิน พันธุ์พืช\
//             การจัดการและสิ่งแวดล้อม (เช่น สภาพภูมิอากาศ)\
//             อัตราหรือปริมาณของธาตุอาหารที่เราต้องปรับเปลี่ยนนั้นขึ้นอยู่กับปัจจัยพื้นฐาน 2 ประการคือ\
//             ความต้องการธาตุอาหารของพืชและศักยภาพของดินในการให้ธาตุอาหารพืช\
//             เทคนิคและวิธีการวินิจฉัยเพื่อให้ทราบข้อมูลทั้งสองประการดังกล่าว\
//             มีหลายวิธีที่ใช้กันอย่างแพร่หลาย ได้แก่\
//             <p>1. ลักษณะการขาดธาตุอาหารของพืช (Visual analysis fornutrient deficiency symptoms)\
//               <p>2. การวิเคราะห์เนื้อเยื่อพืช (plant tissue analysis)\
//               <p>3. การวิเคราะห์ดิน (soil analysis)\
//               <p>4. การทดสอบทางชีวภาพ (biological test) เช่น การทำการทดลองในกระถาง และในไร่นา เป็นต้น",
//           image: [{ ref: "" }],
//           video: [{ link: "" }],
//         },
//         {
//           p_name: "ลักษณะการขาดธาตุอาหารของพืช (Visual analysis for nutrient-deficiency symptoms)",
//           p_detail:
//             "พืชเป็นองค์ประกอบหนึ่งของระบบนิเวศ การที่ต้นพืชสามารถเจริญเติบโตได้ในระบบนิเวศเนื่องจากองค์ประกอบต่างๆ ของระบบนิเวศ\
//             (ทั้งองค์ประกอบทางชีวภาพและกายภาพ) เอื้อต่อการเจริญเติบโต \
//             หากองค์ประกอบของระบบนิเวศไม่เหมาะสมทั้งด้านธาตุอาหารและองค์\
//             ประกอบทางกายภาพแวดล้อมอื่นๆ พืชก็จะแสดงอาการให้เราเห็น เช่น มีการเจริญเติบโตผิดปกติ และ/หรือ มีสีผิดปกติ เป็นต้น\
//             อาการผิดปกติที่พืชแสดงออกและเราสามารถมองเห็นได้ เรียกว่า\
//             อาการขาดธาตุอาหารที่สังเกตเห็นได้(visual deficiency symptoms)\
//             ลักษณะการขาดธาตุอาหารที่พบในพืชโดยทั่วๆ ไป คือ\
//             ใบเป็นสีเหลือง (yellowing หรือ chlorosis)\
//             และในบางกรณีตามมาด้วยการเหี่ยวของใบ (necrosis)\
//             ในส่วนที่เคยเป็น chlorosis อาการแบบนี้เป็นอาการขาดธาตุอาหารหลายชนิด\
//             แต่บริเวณที่แสดงอาการและความมากน้อยแตกต่างกันไปในแต่ละ\
//             ธาตุที่ขาด ขึ้นนอยู่กับว่าธาตุนั้นเคลื่อนที่ได้ (mobile) เพียงใดในพืช\
//             ถ้าธาตุอาหารเคลื่อนที่ได้ chlorosis จะเกิดที่ใบแก่ (ใบล่าง)\
//             ถ้าธาตุอาหารเคลื่อนที่ไม่ได้ (immobile) อาการจะเกิดที่ใบอ่อน\
//             (ใบบน)\
//             การขาดธาตุอาหารบางตัวทำให้เกิดการสร้างรงควัตถุ\
//             anthocyanin ในใบหรือลำต้น หรือทั้งสองแห่ง ทำให้เกิดอาการสีม่วง\
//             หรือเขียวเข้มของใบ/ลำต้นนั้นๆ\
//             อาการ chlorosis บางกรณีเกิดระหว่างเส้นใบพืช (vein)\
//             จึงเรียกว่า interveinal chlorosis",
//           image: [{ ref: "gs://e-learning-for-rmutl-village.appspot.com/knowledgeImage/chlorosis.png" },{ ref: "gs://e-learning-for-rmutl-village.appspot.com/knowledgeImage/necrosis.png" },{ ref: "gs://e-learning-for-rmutl-village.appspot.com/knowledgeImage/interveinal chlorosis.png" }],
//           video: [{ link: "" }],
//         },
//       ],
//     },
//     {
//       name: "ลักษณะการขาดธาตุจำเพาะของแต่ละธาตุ",
//       data: [
//         {
//           p_name: "ธาตุอาหาร N",
//           p_detail:
//             "เป็นธาตุที่เคลื่อนที่ได้ การขาดธาตุ N ทำให้มีการโยกย้าย N จากใบแก่ไปสู่ใบอ่อน ทำให้ใบแก่เป็นสีเหลือง ในพืชใบเลี้ยงเดี่ยว เช่น ข้าวโพด อาการใบเหลืองจะเกิดที่กลางใบมากกว่าที่ขอบใบ",
//           image: [{ ref: "" }],
//           video: [{ link: "" }],
//         },
//         {
//           p_name: "ธาตุอาหาร P",
//           p_detail:
//             "การขาดธาตุ P ทำให้เกิดการสร้างรงควัตถุแอนโธไซยานิน (anthocyanin) ทำให้เกิดสีม่วง ในข้าวโพดสีม่วงจะเกิดบริเวณขอบใบ และลำต้นส่วนล่าง พืชบางชนิดจะมีสีเขียวเข้มจนเกือบเป็นสีน้ำเงิน",
//           image: [{ ref: "" }],
//           video: [{ link: "" }],
//         },
//         {
//           p_name: "ธาตุอาหาร K",
//           p_detail:
//             "ลักษณะทั่วไป คือ ปลายใบและขอบใบเหี่ยว (necrosis) เกิดที่ใบที่พัฒนามาเต็มที่แล้ว (recently matured leaves) ตอนแรกปลายและขอบใบจะเหลือง (chlorosis) และกลายเป็นสีน้าตาล แล้วจึงเหี่ยว ในที่สุดแห้งตายไป ทำให้ปรากฏเป็นขอบเว้าแหว่ง การที่ส่วนปลายและขอบใบเหลืองก่อนทำให้ต่างจากการขาด N ซึ่งส่วนกลางใบเหลืองก่อน",
//           image: [{ ref: "" }],
//           video: [{ link: "" }],
//         },
//         {
//           p_name: "ธาตุอาหาร Fe",
//           p_detail:
//             "อาการขาดจะเกิดที่ใบอ่อนที่สุดในพืช เพราะ Fe ไม่เคลื่อนที่ในพืช อาการเริ่มต้นด้วยการเกิดสีเหลืองบริเวณระหว่างเส้นใบ (interveinal chlorosis) แต่ถ้ารุนแรงทั้งใบจะเป็นสีเหลือง ถึงเหลืองซีดเกือบขาว",
//           image: [{ ref: "https://firebasestorage.googleapis.com/v0/b/e-learning-for-rmutl-village.appspot.com/o/knowledgeImage%2Fnpk.png?alt=media&token=8884a20e-de62-4127-8381-7809aad32997" }],
//           video: [{ link: "" }],
//         },
//       ],
//     },
//   ],
// });

function useKnowledges() {
  const [knows, setKnows] = useState([]);
  // let subtopicdb = db;
  useEffect(() => {
    db.collection("knowledgeStore").onSnapshot((snapshot) => {
      // debugger
      const newknows = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setKnows(newknows);
      // console.log(newknows)
    });
  }, []);

  return knows;
}

function toggle(id) {
  var e = document.getElementById(id);
  if (e.style.display === "block") e.style.display = "none";
  else e.style.display = "block";
}

//  const Showyoutube = ({ value }) => {
//   if (value !== "") {
//     return (
//       <iframe
//         width="720"
//         height="480"
//         src={"https://www.youtube.com/embed/" + value}
//       ></iframe>
//     );
//   }
//   return null;
// };

function Mainpage() {
  const knows = useKnowledges();

  function ifrm(videoref) {
    var ifrm = document.createElement("iframe");
    if (videoref !== "") {
      ifrm.setAttribute("src", "https://www.youtube.com/embed/" + videoref);
      ifrm.style.width = "720px";
      ifrm.style.height = "480px";
    } else {
      ifrm.style.display = "none";
    }
    return ifrm;
  }

  function imgfrm(ref) {
    var ifrm = document.createElement("img");
    if (ref !== "") {
      ifrm.setAttribute("src", ref);
      ifrm.style.maxWidth = "40%";
      ifrm.style.maxHeight = "360px";
      ifrm.style.marginRight = "auto";
      ifrm.style.marginLeft = "auto";
    } else {
      ifrm.style.display = "none";
    }
    return ifrm;
  }

  function addcontent(subdata) {
    // var text = <Showyoutube value='Yq_77LWjJdE' />
    var node = document.createElement("div");
    var head = document.createElement("h2");

    // var ifrm = document.createElement("iframe")
    // var imagesrc = document.createElement("img")

    if (
      document.getElementsByClassName("content").item(0).childElementCount !== 0
    ) {
      document
        .getElementsByClassName("content")
        .item(0)
        .removeChild(
          document.getElementsByClassName("content").item(0).childNodes[0]
        );
    }
    node.appendChild(head);

    head.appendChild(document.createTextNode(subdata.name));

    subdata.data.map((data, index) => {
      var div = document.createElement("div");
      var subtopic = document.createElement("h3");
      var div1 = document.createElement("div");
      var para = document.createElement("p");
      var video = document.createElement("div");
      var imagecol = document.createElement("div");
      imagecol.className = "imageframe";
      video.className = "videoframe";
      var ullist = document.createElement("ul");
      ullist.style.listStyle = "none";
      subtopic.innerText = data.p_name;
      var s = data.p_detail.split("<p>").map((split) => {
        var lis = document.createElement("li");
        lis.innerText = split;
        ullist.appendChild(lis);
      });
      console.log(s);
      para.appendChild(ullist);
      data.image.map((src) => {
        imagecol.appendChild(imgfrm(src.ref));
        para.appendChild(imagecol);
      });
      data.video.map((ref) => {
        video.appendChild(ifrm(ref.link));
        para.appendChild(video);
      });

      div.appendChild(subtopic);
      div1.appendChild(para);
      div.appendChild(div1);
      node.appendChild(div);
    });

    document.getElementsByClassName("content").item(0).appendChild(node);
  }

  return (
    <div className="Mainpage-container">
      <section className="content"></section>

      <section className="sidemenu">
        <div className="box-container">
          <div className="headsidemenu">
            <p>หัวข้อ</p>
          </div>
          <ul className="ckeck-list">
            {knows.map((know) => (
              <li key={know.id}>
                <a onClick={() => toggle(know.id)} alt="">
                  {know.name}
                </a>
                <div id={know.id} className="subtopic-container">
                  <ul>
                    {know.subtopic.map((sub, index) => (
                      <li key={index}>
                        <a onClick={() => addcontent(sub)}>{sub.name}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default Mainpage;
//  };

// const Headline = ({ value }) => <h1>{value}</h1>;
