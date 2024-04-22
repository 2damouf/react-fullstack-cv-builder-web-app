import React, { useEffect, useState } from 'react'
import { FaTrash, FaUpload } from 'react-icons/fa6';
import { PuffLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { deleteObject, ref } from 'firebase/storage';
import { db, storage } from '../config/firebase.config';
import { getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { adminUser, roleTags } from '../utils/helpers';
import { deleteDoc, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import useTemplates from '../hooks/useTemplates';
import useUser from '../hooks/useUser';
import { useNavigate } from 'react-router-dom';


const TemplateCreation = () => {

  const [formData, setFormData] = useState({
    title: "",
    imageUrl: null,
  });

  const [imageAsset, setimageAsset] = useState({
    isImageLoading: false,
    uri: null,
    progress: 0,
  });

  const [tags, setTags] = useState([])

  const {data: templates, isError: templatesIsError, isLoading: templateIsLoading, refetch: templatesRefetch} = useTemplates()

  const {data: user, isLoading} = useUser();

  const navigate = useNavigate();
  // tasarım başlığı isim alma
  const inputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevRec) => ({ ...prevRec, [name]: value }));
  };

  //   izin verilen dosya türlerini belirleme
  const fileType = (file) => {
    const allowedFileType = ["image/jpeg", "image/jpg", "image/png"];
    return allowedFileType.includes(file.type);
  };

  // dosya yükleme
  const fileUpload = async (e) => {
    const file = e.target.files[0];
    setimageAsset((prevAsset) => ({ ...prevAsset, isImageLoading: true }));
    if (file && fileType(file)) {
      const storageRef = ref(storage, `Templates/${Date.now()}-${file.name}`);

      const upload = uploadBytesResumable(storageRef, file);
      upload.on(
        "state_changed",
        (snapshot) => {
          setimageAsset((prevAsset) => ({
            ...prevAsset,
            progress: (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
          }));
        },
        (error) => {
          if (error.message.includes("storage/unauthorized")) {
            toast.error(`Error: Yetkilendirme hatası`);
          } else {
            toast.error(`Error: ${error.message}`);
          }
        },
        () => {
          getDownloadURL(upload.snapshot.ref).then((downloadUrl) => {
            setimageAsset((prevAsset) => ({
              ...prevAsset,
              uri: downloadUrl,
            }));
          });
        }
      );

      toast.success("Dosya yüklendi");
      setInterval(() => {
        setimageAsset((prevAsset) => ({ ...prevAsset, isImageLoading: false }));
      }, 2000);
    } else {
      toast.info("Sadece (.jpg, jpeg, .png) dosya türlerini yükleyebilirsin");
      setimageAsset((prevAsset) => ({ ...prevAsset, isImageLoading: false }));
    }
  };

  // dosya silme
  const deleteFile = async () => {
    setInterval(() => {
      setimageAsset((prevAsset) => ({
        ...prevAsset,
        progress: 0,
        uri: null,
      }));
    }, 2000);

    const deleteRef = ref(storage, imageAsset.uri);
    deleteObject(deleteRef).then(() => {
      toast.success("Dosya başarıyla silindi");
    });
  };

  // etiket seçme
  const selectedTags = (tag) => {
    // seçilen tekrar seçilmesin ve seçilenlerden kaldırılsın
    if (tags.includes(tag)) {
      setTags(tags.filter((selected) => selected !== tag));
    } else{
        setTags([...tags, tag])
    }
  };

  // form verilerini yollama
  const sendData = async() => {
    const time = serverTimestamp();
    const id = `${Date.now()}`;
    const _doc = {
        _id: id,
        title: formData.title,
        imageUrl: imageAsset.uri,
        tags: tags,
        name: templates && templates.length > 0 ? `Template${templates.length + 1}` : "Şablon1",
        timestamp: time
    };
    // verileri yollama ve data temizleme
    await setDoc(doc(db, "templates", id), _doc).then(() => {
        setFormData((prevData) => ({...prevData, title: "", imageUrl: ""}));
        setimageAsset((prevAsset) => ({...prevAsset, uri: null}));
        setTags([]);
        templatesRefetch();
        toast.success("Şablon başarıyla karşıya gönderildi.")
    }).catch(err => {
         toast.error(`Hata: ${err.message}`)
    });
  };

 // db'den veri silme
  const deleteTemplate = async(template) => {
    const deleteRef = ref(storage, template?.imageUrl);
    await deleteObject(deleteRef).then(async() => {
        await deleteDoc(doc(db, "templates", template?._id)).then(() => {
            toast.success("Şablon silindi");
            templatesRefetch();
        }).catch(err => {
            toast.error(`Hata: ${err.message}`);
        });

    })


  };

  useEffect(() => {
    if(!isLoading && !adminUser.includes(user?.uid))
    navigate("/", {replace: true});
  }, [user, isLoading])

  return (
    <div className="w-full px-4 lg:px-10 2xl:px-32 py-4 grid grid-cols-1 lg:grid-cols-12">
      {/* sol container */}
      <div className="col-span-12 lg:col-span-4 2xl:col-span-3 w-full flex-1 flex items-center justify-start flex-col gap-4 px-2">
        <div className="w-full flex justify-start">
          <p className="text-lg text-txtPrimary">Yeni Tasarım Oluştur</p>
        </div>
        <div className="w-full flex items-center justify-end">
          <p className="text-base text-txtLight uppercase font-semibold">
            Tasarım No :{" "}
          </p>
          <p className="text-sm text-txtDark capitalize font-bold ">
            {templates && templates.length > 0
              ? `Template${templates.length + 1}`
              : "Şablon1"}
          </p>
        </div>

        {/* tasarım başlığı input */}
        <input
          className="w-full px-4 py-3 rounded-md bg-transparent border border-gray-300 text-lg text-txtPrimary focus:text-txtDark focus:shadow-md outline-none"
          type="text"
          name="title"
          placeholder="Tasarım Başlığı"
          value={formData.title}
          onChange={inputChange}
        />

        {/* dosya yükleme alanı */}
        <div className="w-full bg-gray-100 backdrop-blur-md h-[420px] lg:h-[520px] 2xl:h-[740px] rounded-md border-2 border-dotted border-gray-300 cursor-pointer flex items-center justify-center">
          {imageAsset.isImageLoading ? (
            <>
              <div className="flex flex-col items-center justify-center gap-4">
                <PuffLoader color="#498FCD" size={40} />
                <p>{imageAsset?.progress.toFixed(1)}%</p>
              </div>
            </>
          ) : (
            <>
              {!imageAsset.uri ? (
                <>
                  <label className="w-full cursor-pointer h-full">
                    <div className="flex flex-col items-center justify-center h-full w-full">
                      <div className="flex items-center justify-center cursor-pointer flex-col">
                        <FaUpload></FaUpload>
                        <p className="">Dosya yüklemek için tıklayın</p>
                      </div>
                    </div>

                    <input
                      type="file"
                      className="w-0 h-0"
                      accept=".jpeg, .jpg, .png"
                      onChange={fileUpload}
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="relative w-full h-full overflow-hidden rounded-md">
                    <img
                      src={imageAsset?.uri}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      alt=""
                    />

                    {/* dosya silme alanı */}

                    <div
                      className="absolute top-4 right-4 w-8 h-8 rounded-md flex items-center justify-center bg-red-500 cursor-pointer"
                      onClick={deleteFile}
                    >
                      <FaTrash className="text-sm text-white"></FaTrash>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>

        {/* etiketler */}
        <div className="w-full flex items-center flex-wrap gap-2">
          {roleTags.map((tag, i) => (
            <div
              key={i}
              className={`border border-gray-300 px-2 py-1 rounded-md cursor-pointer ${
                tags.includes(tag) ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => selectedTags(tag)}
            >
              <p>{tag}</p>
            </div>
          ))}
        </div>

        {/* butonlar */}
        <button
          type="button"
          className="w-full bg-blue-700 text-white rounded-md py-3"
          onClick={sendData}
        >
          Kaydet
        </button>
      </div>

      {/* sağ container */}
      <div className="col-span-12 lg:col-span-8 2xl:col-span-9 px-2 w-full flex-1 py-4 flex justify-start">
        {templateIsLoading ? (
          <>
            <div className="w-full h-full items-center justify-center">
              <PuffLoader color="#498FCD" size={40} />
            </div>
          </>
        ) : (
          <>
            {templates && templates.length > 0 ? (
              <>
                <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
                  {templates?.map((template) => (
                    <div
                      key={template._id}
                      className="w-full h-[500px] rounded-md overflow-hidden relative"
                    >
                      <img
                        src={template?.imageUrl}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                      {/* silme */}
                      <div
                        className="absolute top-4 right-4 w-8 h-8 rounded-md flex items-center justify-center bg-red-500 cursor-pointer"
                        onClick={() => deleteTemplate(template)}
                      >
                        <FaTrash className="text-sm text-white"></FaTrash>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="w-full h-full items-center justify-center">
                  <PuffLoader color="#498FCD" size={40} />
                  <p className="text-xl tracking-wider capitalize text-txtPrimary">
                    Şuan hiçbir şablon mevcut değil. Yeni bir şablon
                    ekleyebilirsiniz!
                  </p>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TemplateCreation