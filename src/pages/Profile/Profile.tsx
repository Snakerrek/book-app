import React, { useEffect, useState } from "react";
import { getUserData } from "../../helpers";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const fetchUserData = async () => {
    const userDataToken = getUserData();
    const userDataJson = await fetch(`/api/user/get/${userDataToken?.id}`);
    const userData = await userDataJson.json();
    setUserData(userData);
  };

  useEffect(() => {
    fetchUserData();
  }, []);
  useEffect(() => {
    console.log(userData);
  }, [userData]);

  return <div>Profile</div>;
};

export default Profile;
