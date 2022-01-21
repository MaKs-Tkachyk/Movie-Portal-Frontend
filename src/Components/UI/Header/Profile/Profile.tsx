import { CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { userAvatar } from "../../../../Redux/profile-reducer";
import { AppStateType } from "../../../../Redux/store";
import { ButtonSquare } from "../../../Elements/Button/ButtonSquare";
import style from "./Profile.module.scss";
import avatar from "../../../../img/ProfileImg/1icon.jpg";
import {  API_URL_IMG } from "../../../../http/api";
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import { useNavigate } from "react-router";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { FC } from "react";
import { logout } from "../../../../Redux/auth-reducer";









const Profile:FC = () => {
  const dispatch = useDispatch();
  const  router = useNavigate()
  const {admin,userName} = useSelector((state: AppStateType) => state.auth.user);
  const {errorRegistration} = useTypedSelector(state=>state.auth)
  const profile = useSelector((state: AppStateType) => state.profile);

  function fileUploadHandler(event: any) {
    const files = [...event.target.files];
    files.forEach((file) => dispatch(userAvatar(file)));
  }

  if (errorRegistration) {
    return (
      <div>
        <CircularProgress color="secondary" />
      </div>
    );
  }

  return (
    <div className={style.profile}>
     { admin && <AddToPhotosIcon onClick={()=>router('/Changes-Films')}  style={{ marginRight:"20px",cursor:"pointer" }}  />}
      <div className={style.profile__userName}>{userName}</div>
      <div className={style.profile__avatar}>
        <div className={style.avatar}>
          <input accept="image/*"
            onChange={(e) => {
              fileUploadHandler(e);
            }}
            className={style.download}
            type="file"
          />
          <img src={profile.userAvatar ? `${API_URL_IMG}/${profile.userAvatar}`: avatar}
            alt="avatar"
          />
        </div>
      </div>
      <div onClick={() => {dispatch(logout()) }}>
        <ButtonSquare  text="logout" />
      </div>
    </div>
  );
};

export default Profile;
