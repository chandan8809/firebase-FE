import { useEffect, useState } from "react";
import {app, db, storage} from "../firebaseConfig"
import { ref, uploadBytesResumable,getDownloadURL } from "firebase/storage";
import { collection, addDoc ,getDocs,doc, updateDoc,deleteDoc} from "firebase/firestore";

export default function Home() {
  const [name,setName]=useState("")
  const [age,setAge]=useState("")
  const [arrData,setArrData]=useState([])
  const [update,setUpdate]=useState(false)
  const [userId,setUserId]=useState("")
  const [imgData,setImgData]=useState("")
  useEffect(()=>{
     getData()
  },[])

  const handleSubmit=async()=>{

      //img uplaod and get url
    console.log("file ", imgData);
    const storageRef = ref(storage, imgData.name);
    const uploadTask = uploadBytesResumable(storageRef, imgData);

    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      }, 
      (error) => {
        console.log("Imge uplaod error",error)
      }, 
      async() => {
        try{
          const downloadURL=await getDownloadURL(uploadTask.snapshot.ref)
          console.log("download url",downloadURL)

          const docRef = await addDoc(collection(db, "users"), {
            name,
            age:Number(age),
            imgUrl:downloadURL
            });
            setAge("")
            setName("")
            getData()
            console.log("Document written with ID: ", docRef.id);

        }catch (e) {
          console.error("Error adding document: ", e);
        }
      }
    );
  }


  const getData=async()=>{
    const response = await getDocs(collection(db, "users"));
    setArrData(response.docs.map(each=>({...each.data(),id:each.id}))) 
  }

  const updateDataSetter=(data)=>{
    setName(data.name)
    setAge(data.age)
    setUserId(data.id)
    setUpdate(true)

  }

  const handleUpdateUser=async()=>{
    const docRef=doc(db, "users", userId)
    try{
      const response= await updateDoc(docRef,{
        name,
        age
      })
      setAge("")
      setName("")
      setUpdate(false)
      setImgData("")
      getData()
    }catch(error){
      console.log("error")
    }
  }

  const handleDelete=async(data)=>{
    const docRef=doc(db, "users", data.id)
    try{
      const response= await deleteDoc(docRef)
      getData()
    }catch(error){
      console.log("error")
    }
  }


  return (
    <>

    <main className="flex-col px-6">

      <div className=' mx-auto mt-10 '>
      <div className='text-3xl py-5'>Home page</div>
      <div className='flex flex-col w-96 gap-2'>
          <input onChange={(e)=>setName(e.target.value)} value={name} placeholder='Name' className='textarea textarea-bordered'/>
          <input type="number" onChange={(e)=>setAge(e.target.value)} value={age} placeholder='Age' className='textarea textarea-bordered'/>
      </div>
     
      
      <p className="mt-4 mb-2">Upload profile Image</p>
      <input type="file" onChange={(e)=>setImgData(e.target.files[0])} className="file-input file-input-bordered file-input-secondary w-full max-w-xs " />
      <br/>
      {update ? 
      <button onClick={handleUpdateUser} class="btn btn-info btn-wide mt-4">Update</button>
      :
      <button onClick={handleSubmit} class="btn btn-info btn-wide mt-4">Add</button>
      }
      </div>

 

     <div className=' mx-auto mt-10 '>
      <div className='text-3xl py-5'>User Data</div>
     
      {arrData.map(data=>(
         <div key={data.id} className="flex gap-4 mb-4 border-b px-2 items-center">
            <div class="avatar">
            <div class="w-20 rounded-full">
              <img src={data.imgUrl} />
            </div>
          </div>
          <div className='flex flex-col w-48 gap-2 justify-center'>
            <p>Name : {data.name ? data.name: "---"}</p>
            <p>Age : {data.age}</p>
          </div>
          <button onClick={()=>updateDataSetter(data)} class="btn btn-success">Update</button>
          <button onClick={()=>handleDelete(data)} class="btn btn-error">Delete</button>
        </div>
      ))}

    
      </div>
    </main>

    </>
  )
}
