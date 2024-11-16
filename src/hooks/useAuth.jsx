import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const navigate = useNavigate();
  const [uid, setUid] = useState(null);
  const [token, setToken] = useState(null);
  const [expiry, setExpiry] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUid = localStorage.getItem("uid");
    const getToken = localStorage.getItem("token");
    const getExpiry = localStorage.getItem("expiry");
    if (getUid && getToken && getExpiry) {
      setUid(getUid);
      setToken(getToken);
      setExpiry(getExpiry);
    }
  }, []);

  const login = async ({ ...data }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, { ...data });
      if (response.data.check === true) {
        saveAuthInfo(response.data);
        window.notyf.success("Đăng nhập thành công!");
        setTimeout(() => {
          setUid(response.data.uid);
          setToken(response.data.token);
          setExpiry(response.data.expiry);
          navigate("/", { replace: true });
        }, 2000);
      } else {
        window.notyf.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const register = async ({ ...data }) => {
    try {
      await axios
        .post(`${import.meta.env.VITE_API_URL}/register`, { ...data })
        .then((response) => {
          if (response.data.check === true) {
            window.notyf.success("Đăng ký thành công!");
            setTimeout(() => navigate("/dang-nhap"), 2000);
          }
        })
        .catch((error) => {
          window.notyf.error(error.response.data.message);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    if (confirm("Bạn có chắc chắn muốn đăng xuất?")) {
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/logout`, {}, { headers: { Authorization: `Bearer ${token}` } });

        if (response.data.check === true) {
          clearAuthInfo();
          window.notyf.success(response.data.message);
          setTimeout(() => {
            setUser(null);
            navigate("/dang-nhap", { replace: true });
          }, 2000);
        } else {
          window.notyf.error(response.data.message);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    const getInfoUser = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_API_URL + "/customers/" + uid, { headers: { Authorization: `Bearer ${token}` } });
        setUser(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    if (uid && token && expiry) {
      getInfoUser();
    }
  }, [uid, token, expiry]);

  useEffect(() => {
    const checkExpiration = () => {
      if (expiry && Number(expiry) < new Date().getTime() / 1000) {
        logout();
      }
    };
    const interval = setInterval(checkExpiration, 60000);
    return () => clearInterval(interval);
  }, [expiry]);

  const saveAuthInfo = ({ uid, token, expiry }) => {
    localStorage.setItem("uid", uid);
    localStorage.setItem("token", token);
    localStorage.setItem("expiry", expiry);
  };

  const clearAuthInfo = () => {
    localStorage.removeItem("uid");
    localStorage.removeItem("token");
    localStorage.removeItem("expiry");
  };

  return { user, token, login, register, logout };
};
