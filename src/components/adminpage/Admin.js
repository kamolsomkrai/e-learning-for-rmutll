import React, { useState, useEffect } from "react";
import {
  useFormik,
  Formik,
  Form,
  Field,
  FieldArray,
  ErrorMessage,
} from "formik";
import { db,store } from "../../firebase";
// import  'firebase/storage'


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

const saveinitialValue = {
  name: "kamol",
  credit: "kiravkot@gmail.com",
  subtopic: [
    {
      name: "ประวัติ",
      data: [
        {
          p_name: "ความเป็นมา",
          p_detail: "111111111111111111111111111111111111111111",
          image: [
            {
              ref: "",
            },
          ],
          video: [
            {
              link: "awCY7qnbkIA",
            },
            {
              link: "awCY7qnbkIA",
            },
          ],
        },
      ],
    },
  ],
};

const loadsave = () => {};

const onsubmit = (values) => {
  console.log("Form data", values);
  // db.collection("knowledgeStore").add(values)
  //   .then(
  //     () =>
  //       (document.getElementById("textalert").innerText = "เพิ่มข้อมูลสำเร็จ")
  //   )
  //   .catch((error) => alert("เกิดข้อผิดพลาด", error));
};

// loaddata()

function Admin() {
  const [dataValues, setdataValues] = useState([{ id: "", name: "" }]);
  const [images, setImages] = useState(null);
  const [formVlaues, setformVlaues] = useState(null);
  let pic = []
  const ss = store.ref()
  useEffect(() => {
    loaddata();
  }, []);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      pic.push(e.target.files[0])
      // console.log(e.target.files[0])
      // setImages(e.target.files[0])
    }
  };

  const upload = () => {
    // ss.child('knowledgeImage').put(images)
    setImages(pic)
    console.log(images)
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
  //
  return (
    <div>
      <select
        id="DDD"
        onChange={(e) => console.log(dataValues[e.target.value].id)}
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
        onClick={() => console.log(document.getElementById("DDD"))}
      ></button>
      <Formik
        initialValues={formVlaues || initialValue}
        onSubmit={onsubmit}
        enableReinitialize
      >
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
                        <button type="button" onClick={() => push(subtopic)}>
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
                                                      <Field
                                                        type="file"
                                                        onChange={handleChange}
                                                        name={`subtopic[${i}].data[${j}].image[${k}].ref`}
                                                      ></Field>
                                                      <button
                                                        onClick={upload}
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
                                                        onClick={() =>
                                                          push(image)
                                                        }
                                                      >
                                                        {" "}
                                                        +{" "}
                                                      </button>
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
                                                      onClick={() => remove(l)}
                                                    >
                                                      {" "}
                                                      --{" "}
                                                    </button>
                                                  )}
                                                  <button
                                                    type="button"
                                                    onClick={() => push(video)}
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
      </Formik>
      <div id="textalert"></div>
    </div>
  );
}

export default Admin;
