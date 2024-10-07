'use client';
import "../globals.css";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {ApiAuthFetcher} from "../utils/apiFetcher";

type RequestBody = {
  userName: string;
  password: string;
};
type ResponseBody = {
  code: number;
  msg: string;
  data: string;
};
type ShowHideModal = {
  showModal: boolean,
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

function generateTypeLog<T>() {
  const objKeys: { [key in keyof T]: any } = {} as any;

  for (const key in objKeys) {
    console.log(`${key}(string)`); // Assuming all properties are strings
  }
};


function Login() {
  const [showModal, setShowModal] = useState(false);
  const button = <LoginButton showModal={showModal} setShowModal={setShowModal} />;
  const modal = <LoginModal showModal={showModal} setShowModal={setShowModal} />;

  if (showModal) {
    return <div>
      {button}
      {modal}
    </div>;
  }
  return <div>
    {button}
  </div>;
}

function LoginButton(props: ShowHideModal) {
  const onClickShowModal = () => props.setShowModal(true);
  return <button onClick={onClickShowModal}>Login</button >;
}

function LoginModal(props: ShowHideModal) {
  const [text, setText] = useState("Some text in the Modal..");
  const onClickCloseModal = () => props.setShowModal(false);

  const reqBody: RequestBody = {
    "userName": "张三",
    "password": "698D51A19D8A121CE581499D7B701668"
  };
  useEffect(() => {
    const apiFetcher = new ApiAuthFetcher(reqBody);

    apiFetcher.fetchApi().then(res => res.body)
      .then(async (body) => {
        if (!body) return;
        const reader = body.getReader();
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const uint8ArrayToJson = (data: Uint8Array) => {
              // Assuming the data is encoded in UTF-8
              const decoder = new TextDecoder('utf-8');
              const text = decoder.decode(data);
              return apiFetcher.safeJsonParse<ResponseBody>(text);
            };
            // Do something with each 'chunk', which is a Uint8Array
            const json = uint8ArrayToJson(value);
            if (json !== undefined) {
              console.log(json);
              setText(json.msg);
            }
          }
        } finally {
          reader.releaseLock();
        }
      })
      .catch((err) => alert(err));
  }, []);

  return (<div id="myModal" className="modal">
    <div className="modal-content">
      <span className="close" onClick={onClickCloseModal}>&times;</span>
      <p>{text}</p>
    </div>
  </div>);
}


export default Login;