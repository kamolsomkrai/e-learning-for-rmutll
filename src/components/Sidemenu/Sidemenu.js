import React from "react";

export default function Menu() {
  const sidemenulist = [
    {
      topic: [
        { name: "การวิเคราะห์หาแร่ธาตุข้อมูลดิน", subtopic: [] },
        {
          name: "การเพาะพันธุ์ข้าว ปลูกบนแปลงข้าวไร้นา",
          subtopic: [
            { name: "ปลูกข้าวในบ่อซีเมนต์" },
            { name: "ปลูกข้าวในถุงพลาสติกดำ" },
            { name: "ปลูกข้าวในยางรถยนต์" },
          ],
        },
        { name: "การจัดการกลุ่ม", subtopic: [] },
        {
          name: "การจัดการหลังการเก็บเกี่ยว การวางแผนการปลูกข้าวนอกฤดู",
          subtopic: [],
        },
      ],
    },
  ];
  const [ricedata, setricedata] = React.useState({ dataarray: 0 });
  React.useEffect(() => {
    // return () => {
    //     cleanup
    // }
  }, [ricedata]);
  return (
    <div>
      <section className="sidemenu">
        <div>
          <ul className="ckeck-list">
            {sidemenulist.map((item) =>
              item.topic.map((item) => (
                <li>
                  <a>{item.name}</a>
                  <div>
                    <ul>
                      {item.subtopic.map((item, index) => (
                        <li
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
            )}
          </ul>
        </div>
      </section>
    </div>
  );
}
