import React, { useContext, useState } from "react";
import { collection, query, where, getDocs, setDoc, getDoc,doc, serverTimestamp,updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const SidebarSearch = () => {
  const [userName, setuserName] = useState();
  const [user, setuser]=useState();
  const {currentUser} = useContext(AuthContext);
  const handelSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", userName)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setuser(doc.data());
    });
  };

  const handelSelect =async ()=>{

      console.log("clicked")
       const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid +currentUser.uid;

       try {
        const res= await getDoc(doc(db,"chats",combinedId));

        if(!res.exists()){
          await setDoc(doc(db,"chats",combinedId),{
             messages:[]
          });

          await updateDoc(doc(db,"userChats",currentUser.uid), {
             [combinedId+".userInfo"]:{
                 uid:user.uid,
                 displayName:user.displayName,
                 photoURL:user.photoURL
             },
             [combinedId+".date"]:serverTimestamp()
        });

        await updateDoc(doc(db,"userChats",user.uid), {
          [combinedId+".userInfo"]:{
              uid:currentUser.uid,
              displayName:currentUser.displayName,
              photoURL:currentUser.photoURL
          },
          [combinedId+".date"]:serverTimestamp()
     });

     setuser(null);
     setuserName("");
        }
       } catch (error) {
        console.log(error)
       }
  }

  const handelEnter = (e) => {
    e.code === "Enter" && handelSearch();
  };

  return (
    <div className="sidebar-search">
      <input
        type="serach"
        width={"100%"}
        name="search"
        value={userName}
        onKeyDown={handelEnter}
        onChange={(e) => {
          setuserName(e.target.value);
          if(e.target.value ==="")setuser(null);
        }}
        placeholder="Find a User"
      />
      <div >
        {user && <div className="search-user"  onClick={handelSelect} >
          <img className='avatar' src={user.photoURL && user.photoURL} alt=''  />
          <span>{user.displayName}</span>
          <i className="addUserIcon fa-solid fa-user-plus"></i>
        </div> }
      </div>
    </div>
  );
};

export default SidebarSearch;
