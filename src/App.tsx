import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useApiAuth, TAuthResponseModel } from "./hooks/useApiHook";
import {
  useAPIVaultGet,
  TVaultGetResponseModel,
} from "./hooks/useAPIVaultHook";
import { Buffer } from "buffer";
import NavBar from "./components/navbar";
import Item from "./components/listitem";
import SearchBar from "./components/searchbar";

function App() {
  const jsonToBase64 = (object: Object): string => {
    const json = JSON.stringify(object);
    return Buffer.from(json).toString("base64");
  };

  const base64ToJson = (base64String: string): { [index: string]: any } => {
    const json = Buffer.from(base64String, "base64").toString();
    return JSON.parse(json);
  };

  const [vault, setVault] = useState<string>(
    jsonToBase64({
      vault: [],
    })
  );

  const loadVault = async () => {
    try {
      const apiResponse = await fetch("http://192.168.2.198:8000/auth", {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          username: "testing",
          password: "hashedpassw",
        }),
      });
      await apiResponse.json().then((res) => {
        setVault(res.vault);
      });
    } catch (error) {}
  };

  useEffect(() => {
    loadVault();
  }, []);

  const updateVault = async (vault: string) => {
    const res = await fetch("http://192.168.2.198:8000/vault", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        username: "testing",
        password: "hashedpassw",
        vault: vault,
      }),
    });
  };
  /* const updateVault = async (vault: string) => {
    const apiResponse = await fetch("http://192.168.2.198:8000/vault", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        username: "testing",
        password: "hashedpassw",
        vault: JSON.parse(vault),
      }),
    });
    await apiResponse.json().then((res) => {
      return res.msg;
    });
  }; 

  const SendVault = () => {
    const updatedvault: string = jsonToBase64({
      vault: [
        {
          url: "https://google.com",
          favicon: "base_64_favicon",
          username: "admin",
          password: "password",
        },
      ],
    });
    setVault(JSON.stringify(base64ToJson(updatedvault)));
    updateVault(updatedvault);
  };
  */
  const load = () => {
    /*const res = Object.keys(base64ToJson(vault)).forEach((k, i) => {
      console.log(k, i);
    }); */
    base64ToJson(vault)["vault"].map((obj: any) => {
      console.log(obj);
    });
  };
  return (
    <div className="font-mono">
      <div className="h-[600px] w-[375px]">
        <SearchBar />

        <main className="h-[78%] overflow-y-scroll">
          <ul className="pl-3">
            {base64ToJson(vault)["vault"].map((obj: any) => {
              return (
                <Item
                  email={obj.username}
                  password={obj.password}
                  url={obj.url}
                />
              );
            })}
          </ul>
        </main>
        <button
          className="btn"
          onClick={() => {
            updateVault(
              jsonToBase64({
                vault: [
                  {
                    url: "https://google.com",
                    username: "admin",
                    password: "password",
                  },
                  {
                    url: "https://stackoverflow.com",
                    username: "stackoverflowusername",
                    password: "password",
                  },
                  {
                    url: "https://gnu.org",
                    username: "gnuadmin",
                    password: "password",
                  },
                ],
              })
            );
            console.log(vault);
            load();
          }}
        >
          Update Vault
        </button>
        <NavBar />
      </div>
    </div>
  );
}

export default App;
