import { useState, useEffect } from 'react';

export type TAuthResponseModel = {
    status: Number;
    statusText: String;
    msg: String;
    vault: String;
    error: any;
    loading: Boolean;
}

export const useApiAuth = (): TAuthResponseModel => {
    const [status, setStatus] = useState<Number>(0);
    const [statusText, setStatusText] = useState<String>('');
    const [error, setError] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const [msg, setMsg] = useState<String>('');
    const [vault, setVault] = useState<String>('');

    const getAPIData = async () => {
        setLoading(true);
        try {
            const apiResponse = await fetch("http://192.168.2.198:8000/auth", {
                method: 'POST',
                headers: {
                  "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify({
                  "username": "tester",
                  "password": "hashedpassw"
                })
              });
            await apiResponse.json().then((res) => {
                setMsg(res.msg);
                setVault(res.vault);
            });
            setStatus(apiResponse.status);
            setStatusText(apiResponse.statusText);
        } catch (error){
            setError(error);
        }
        setLoading(false);
    }

    useEffect(() => {
        getAPIData();
    }, [])

    return { status, statusText, msg, vault, error, loading};
}

