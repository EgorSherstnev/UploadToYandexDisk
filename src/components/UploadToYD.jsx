import React, { useState } from "react";

const UploadToYandexDisk = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files.length > 100) {
      alert("Выберите не более 100 файлов!");
      return;
    }
    setSelectedFiles(Array.from(files));
  };

  const handleUpload = () => {
    // Инициализация виджета мгновенной авторизации
    console.log('handleUpload')
    window.YaAuthSuggest.init(
      {
        client_id: "de739e3710404450924b77f2da8eb659", // client_id
        response_type: "token",
        redirect_uri: "http://localhost:3000/", // redirect_uri
      },
      //"http://localhost:3000/" // origin
    )
      .then(function (result) {
        return result.handler();
      })
      .then(function (data) {
        console.log("Сообщение с токеном: ", data);
      })
      .catch(function (error) {
        console.log("Что-то пошло не так: ", error);
      });
  };

  return (
    <div>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleUpload}>Загрузить на Яндекс.Диск</button>
      <div>
        {selectedFiles.length > 0 && (
          <ul>
            {selectedFiles.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UploadToYandexDisk;
