import React, { useState, useEffect } from "react";
import {
  useFormik,
  Formik,
  Form,
  Field,
  FieldArray,
  ErrorMessage,
} from "formik";
import { db, store } from "../../firebase";

const initialValue = {
  name: "",
  credit: "",
  subtopic: [
    {
      name: "",
      data: [
        {
          p_name: "",
          p_detail: "",
          image: [
            {
              ref: "",
            },
          ],
          video: [
            {
              link: "",
            },
          ],
        },
      ],
    },
  ],
};
let pic = [];
const onsubmit = (values) => {
  console.log("Form data", values);
  db.collection("knowledgeStore").add(values)
    .then(
      () =>{document.getElementById("textalert").innerText = "เพิ่มข้อมูลสำเร็จ";
      alert("เพิ่มข้อมูลสำเร็จ")
      window.location.reload()
    }
        
    )
    .catch((error) => alert("เกิดข้อผิดพลาด", error));
};


function Admin() {
  const [dataValues, setdataValues] = useState([{ id: "", name: "" }]);
  const [imagesRef, setImagesRef] = useState([{name:'',ref:'',image: null}]);
  const [formVlaues, setformVlaues] = useState(null);
  const [deleteRef, setdeleteRef] = useState(null)

  useEffect(() => {
    loaddata();
  }, []);

  const handleChange = (e) => {
    // console.log(e.target)
    if (e.target.files[0] != null) {
      pic.push({name:e.target.files[0].name,ref:e.target.name,image:e.target.files[0]})
      setImagesRef(pic)
      console.log(imagesRef)
    }
  };

  const deleted=(docRef)=>{
    db.collection("knowledgeStore").doc(docRef).delete().then(function() {
      alert("ลบข้อมูลเรียบร้อยแล้ว");window.location.reload()
  }).catch(function(error) {
    alert("เกิดข้อผิดพลาดในการลบข้อมูล")
  });
  }

  const upload = (setFieldValue,name,index) => {
    var d = new Date();
    var imagename = imagesRef[index].name
    var res = imagename.split('.')
    var imagenamewithtimestamp = res[0]+Math.floor(d.getTime() / 1000)+'.'+res[1]
    var progressbar = document.createElement("progress")
    progressbar.setAttribute('value','0')
    progressbar.setAttribute('max','100')
    const Uploadtask = store.ref('knowledgeImage/'+imagenamewithtimestamp).put(imagesRef[index].image)
    document.getElementById('progressbar-'+String(index)).appendChild(progressbar)
    
    Uploadtask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) *100
        )
        progressbar.setAttribute('value',String(progress))        
      },
      (error) => {
        console.log(error);
      },
      () => {
        store
          .ref("knowledgeImage")
          .child(imagenamewithtimestamp)
          .getDownloadURL()
          .then((url) => {
            setFieldValue(name,url)
          });
      }
    );
  };
  const loaddata = () => {
    let val = [{ id: "", name: "เลือกหัวข้อ" }];
    db.collection("knowledgeStore")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          val.push({ id: doc.id, name: doc.data().name });
          // console.log(doc.id, " => ", doc.data().name);
        });
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setdataValues(val);
        console.log(dataValues);
      });
  };

  return (
    <div>
      <select
        id="DDD"
        onChange={(e) => setdeleteRef(dataValues[e.target.value].id)}
      >
        {dataValues.map((data, index) => {
          return (
            <option key={index} value={index}>
              {data.name}
            </option>
          );
        })}
      </select>
      <button
        type="button"
        onClick={() =>deleted(deleteRef)}
      >ลบ</button>
      <Formik
        initialValues={formVlaues || initialValue}
        onSubmit={onsubmit}
        enableReinitialize
        render={({ setFieldValue }) => {
          return (
            <Form>
              <div className="form-control">
                <label htmlFor="name">หัวข้อหลัก</label>
                <Field type="text" name="name" id="name" />
              </div>
              <div className="form-control">
                <label htmlFor="credit">credit</label>
                <Field type="text" name="credit" id="credit" />
              </div>
              <div className="form-control">
                {/* หัวข้อรอง */}
                <FieldArray name="subtopic">
                  {(fieldArrayProps) => {
                    // console.log("fieldArrayProps", fieldArrayProps);
                    const { push, remove, form } = fieldArrayProps;
                    const { values } = form;
                    const { subtopic } = values;
                    return (
                      <div>
                        {subtopic.map((subtopic, i) => (
                          <div key={i}>
                            <label>หัวข้อรอง</label>
                            <Field name={`subtopic[${i}].name`}></Field>
                            {i > 0 && (
                              <button type="button" onClick={() => remove(i)}>
                                {" "}
                                -{" "}
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => push(subtopic)}
                            >
                              {" "}
                              +{" "}
                            </button>
                            {/* หัวข้อย่อย */}
                            <FieldArray name={`subtopic[${i}].data`}>
                              {(fieldArrayProps) => {
                                // console.log("data array", fieldArrayProps);
                                const { push, remove, form } = fieldArrayProps;
                                const { values } = form;
                                const { subtopic } = values;
                                return (
                                  <div>
                                    {subtopic[i].data.map((data, j) => (
                                      <div key={j}>
                                        <p>
                                          <label>หัวข้อย่อย</label>
                                          <Field
                                            name={`subtopic[${i}].data[${j}].p_name`}
                                          ></Field>
                                          {i > 0 && (
                                            <button
                                              type="button"
                                              onClick={() => remove(j)}
                                            >
                                              {" "}
                                              --{" "}
                                            </button>
                                          )}
                                          <button
                                            type="button"
                                            onClick={() => push(data)}
                                          >
                                            {" "}
                                            ++{" "}
                                          </button>
                                        </p>
                                        <p>
                                          <label>เนื้อหา</label>
                                          <Field
                                            as="textarea"
                                            name={`subtopic[${i}].data[${j}].p_detail`}
                                          ></Field>
                                        </p>

                                        {/* รูปภาพ */}
                                        <FieldArray
                                          name={`subtopic[${i}].data[${j}].image`}
                                        >
                                          {(fieldArrayProps) => {
                                            // console.log(
                                            //   "image array",
                                            //   fieldArrayProps
                                            // );
                                            const {
                                              push,
                                              remove,
                                              form,
                                            } = fieldArrayProps;
                                            const { values } = form;
                                            const { subtopic } = values;
                                            return (
                                              <div>
                                                {subtopic[i].data[j].image.map(
                                                  (image, k) => (
                                                    <div key={k}>
                                                      <div>
                                                        <p>
                                                          <label>รูปภาพ</label>
                                                          <input
                                                            type="file"
                                                            onChange={handleChange}
                                                            // e=>{setImagesRef({name:e.target.files[0].name,ref:`subtopic[${i}].data[${j}].image[${k}].ref`});pic.push(e.target.files[0])}
                                                            name={`subtopic[${i}].data[${j}].image[${k}].ref`}
                                                            // (e) =>setImages(e)
                                                              // setFieldValue(
                                                                // `subtopic[${i}].data[${j}].image[${k}].ref`,
                                                                // e.target
                                                                //   .files[0].name
                                                              // )
                                                          ></input>
                                                          <button
                                                          type='button'
                                                            onClick={()=>{upload(setFieldValue,`subtopic[${i}].data[${j}].image[${k}].ref`,k)}}
                                                            // ...
                                                          >
                                                            upload
                                                          </button>
                                                          {i > 0 && (
                                                            <button
                                                              type="button"
                                                              onClick={() =>
                                                                remove(k)
                                                              }
                                                            >
                                                              {" "}
                                                              -{" "}
                                                            </button>
                                                          )}
                                                          <button
                                                            type="button"
                                                            onClick={() =>{push(image)}
                                                              
                                                            }
                                                          >
                                                            {" "}
                                                            +{" "}
                                                          </button>
                                                          <p id={`progressbar-${k}`}>
                                                          
                                                          </p>
                                                        </p>
                                                      </div>
                                                    </div>
                                                  )
                                                )}
                                              </div>
                                            );
                                          }}
                                        </FieldArray>
                                        {/* วีดีโอ */}
                                        <FieldArray
                                          name={`subtopic[${i}].data[${j}].video`}
                                        >
                                          {(fieldArrayProps) => {
                                            // console.log(
                                            //   "data array",
                                            //   fieldArrayProps
                                            // );
                                            const {
                                              push,
                                              remove,
                                              form,
                                            } = fieldArrayProps;
                                            const { values } = form;
                                            const { subtopic } = values;
                                            return (
                                              <div>
                                                {subtopic[i].data[j].video.map(
                                                  (video, l) => (
                                                    <div key={j}>
                                                      <label>วิดีโอ</label>
                                                      <Field
                                                        name={`subtopic[${i}].data[${j}].video[${l}].link`}
                                                      ></Field>
                                                      {i > 0 && (
                                                        <button
                                                          type="button"
                                                          onClick={() =>
                                                            remove(l)
                                                          }
                                                        >
                                                          {" "}
                                                          --{" "}
                                                        </button>
                                                      )}
                                                      <button
                                                        type="button"
                                                        onClick={() =>
                                                          push(video)
                                                        }
                                                      >
                                                        {" "}
                                                        ++{" "}
                                                      </button>
                                                    </div>
                                                  )
                                                )}
                                              </div>
                                            );
                                          }}
                                        </FieldArray>
                                      </div>
                                    ))}
                                  </div>
                                );
                              }}
                            </FieldArray>
                          </div>
                        ))}
                      </div>
                    );
                  }}
                </FieldArray>
              </div>
              <button type="button" onClick={() => loaddata()}>
                Load
              </button>
              <button type="submit">Submit</button>
            </Form>
          );
        }}
      />

      <div id="textalert"></div>
    </div>
  );
}

export default Admin;
