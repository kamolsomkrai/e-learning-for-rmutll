import React, { useState, useEffect } from "react";
import "./Mainpage.css";
import { db } from "../../firebase";
// import { Link } from "react-router-dom";
// import youtube from '../youtube/youtube.js'

// db.collection("knowledgeStore").doc('94GD2QEWhgJR5ZIjWcyY').update({
//   name: "การเพาะพันธุ์ข้าว การปลูกข้าวบนแปลงข้าวไร้นา",
//   subtopic:[
//     {name:"ปลูกข้าวในบ่อซีเมนต์",data:[
//       {p_name:"การเตรียมต้นกล้าเพื่อปลูก",
//       p_detail:"โดยการแช่เมล็ดพันธุ์ในน้ำ 1 คืน แล้วนำไปบ่มในกระสอบ 1 คืน แล้วนำเมล็ดข้าวที่บ่มแล้วประมาณ 2 กำมือ ไปหว่านในบ่อซีเมนต์ 1 วง ที่เตรียมดินและแช่น้ำมาอย่างน้อย 2 วัน หลังหว่านไปประมาณ 4 วัน เมล็ดข้าวจะเริ่มแตกใบ ให้ดูแลอย่าให้ขาดน้ำ จนต้นกล้าอายุได้ 20-25 วัน จึงถอนไปปักดำได้",
//       image:[{ref:""}],
//       video:[{link:"https://www.youtube.com/watch?v=Yq_77LWjJdE"}]
//     }
//     ]},
//     {name:"ปลูกข้าวในถุงพลาสติกดำ",data:[
//       {p_name:"การเตรียมต้นกล้าเพื่อปลูก",
//       p_detail:"โดยการแช่เมล็ดพันธุ์ในน้ำ 1 คืน แล้วนำไปบ่มในกระสอบ 1 คืน แล้วนำเมล็ดข้าวที่บ่มแล้วประมาณ 2 กำมือ ไปหว่านในบ่อซีเมนต์ 1 วง ที่เตรียมดินและแช่น้ำมาอย่างน้อย 2 วัน หลังหว่านไปประมาณ 4 วัน เมล็ดข้าวจะเริ่มแตกใบ ให้ดูแลอย่าให้ขาดน้ำ จนต้นกล้าอายุได้ 20-25 วัน จึงถอนไปปักดำได้",
//       image:[{ref:""}],
//       video:[{link:"https://www.youtube.com/watch?v=Yq_77LWjJdE"}]
//     }
//     ]},
//     {name:"ปลูกข้าวในยางรถยนต์",data:[
//       {p_name:"การเตรียมต้นกล้าเพื่อปลูก",
//       p_detail:"โดยการแช่เมล็ดพันธุ์ในน้ำ 1 คืน แล้วนำไปบ่มในกระสอบ 1 คืน แล้วนำเมล็ดข้าวที่บ่มแล้วประมาณ 2 กำมือ ไปหว่านในบ่อซีเมนต์ 1 วง ที่เตรียมดินและแช่น้ำมาอย่างน้อย 2 วัน หลังหว่านไปประมาณ 4 วัน เมล็ดข้าวจะเริ่มแตกใบ ให้ดูแลอย่าให้ขาดน้ำ จนต้นกล้าอายุได้ 20-25 วัน จึงถอนไปปักดำได้",
//       image:[{ref:""}],
//       video:[{link:"https://www.youtube.com/watch?v=Yq_77LWjJdE"}]
//     }
//     ]}
//   ]
// })

function useKnowledges() {
  const [knows, setKnows] = useState([]);
  let subtopicdb = db;
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

function toggle(id){
  var e = document.getElementById(id);
      if ( e.style.display == 'block' )
          e.style.display = 'none';
      else
          e.style.display = 'block';
 }
 const Showyoutube = ({ value }) => {
    if (value !== "") {
      return (
        <iframe
          width="720"
          height="480"
          src={"https://www.youtube.com/embed/" + value}
        ></iframe>
      );
    }
    return null;
  };


function Mainpage() {
  const knows = useKnowledges();
  function addcontent(subdata){
    
      var text = <Showyoutube value='Yq_77LWjJdE' />
      var node = document.createElement("div")
      var node1 = document.createElement("h2")
      var node2 = document.createElement("h3")
      var node3 = document.createElement("p")
      var video = document.createElement("div")
      var ifrm = document.createElement("iframe")
      ifrm.setAttribute("src", "https://www.youtube.com/embed/"+'Yq_77LWjJdE');
        ifrm.style.width = "720px";
        ifrm.style.height = "480px";
      if ( document.getElementsByClassName("content").item(0).childElementCount != 0) {
        document.getElementsByClassName("content").item(0).removeChild(document.getElementsByClassName("content").item(0).childNodes[0])
      }
      // document.getElementsByClassName("content").item(0).childElementCount
      node.appendChild(node1);
      node.appendChild(document.createElement("div"));
      node.appendChild(node2);
      node.appendChild(node3);
      video.className = 'videoframe'
      node.appendChild(video)
      var textnode = document.createTextNode(subdata.name);         // Create a text node
       node1.appendChild(document.createTextNode(subdata.name));
       subdata.data.map((d)=>node2.appendChild(document.createTextNode(d.p_name))
       +node3.appendChild(document.createTextNode(d.p_detail))
       +video.appendChild(ifrm)
       )
      //  node2.appendChild(subdata.name);                              // Append the text to <li>
      document.getElementsByClassName("content").item(0).appendChild(node);

   }

  return (
    <div className="Mainpage-container">
      <section className="content">

      </section>

      <section className="sidemenu">
        <div className="box-container">
          <div className="headsidemenu">
            <p>หัวข้อ</p>
          </div>
          <ul className="ckeck-list">
            {knows.map((know) => (
              <li key={know.id} >
                <a onClick={()=>toggle(know.id)}>{know.name}</a>
                <div id={know.id} className="subtopic-container">
                  <ul>
                    {know.subtopic.map((sub, index) => (
                      
                      <li key={index}><a onClick={()=> addcontent(sub)}>{sub.name}</a></li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
            {/* {sidemenulist.map((item) =>
              item.topic.map((item, index1) => (
                <li id={index1} onClick={() => showlist(index1.toString())}>
                  <a>{item.name}</a>
                  <div>
                    <ul>
                      {item.subtopic.map((item, index) => (
                        <li
                          className="hide"
                          id={index1 + "-" + index}
                          key={index}
                          onClick={() => setricedata({ dataarray: index })}
                        >
                          <a>{item.name}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))
            )} */}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default Mainpage;
//  };

// const Headline = ({ value }) => <h1>{value}</h1>;
