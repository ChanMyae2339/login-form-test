import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";


const useAuth = () => {
    const [status, setStatus] = useState("loading");
    const [data, setData] = useState(null);

    const cookie = new Cookies();
    const accessToken = cookie.get("accessToken");
  

    const getAuth = () => {
        if (!accessToken ) {
            setStatus("unauthenticated");
            return false;
        } else  {
            setStatus("authenticated");

            const decodedToken= jwtDecode(accessToken);
          
            const decodedData = {
               
                name: decodedToken?.name,
                email: decodedToken?.email,
                
            };
            setData(decodedData);

            return true;
        }
    };

    useEffect(() => {
        getAuth();
    }, [accessToken]);

    return { status, data };
};

export default useAuth;
