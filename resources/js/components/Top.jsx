import React, { useEffect, useState } from "react";
import { Typography } from "@material-ui/core";
import { decode } from "js-base64";
import MakeTree from "./MakeTree";
//import base64url from "base64url";
// import axios from "axios";

function Top() {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [mails, setMails] = useState([]);
    const [progress, setPrgoress] = useState(0);
    const API_KEY = "AIzaSyDZ0OCR9BgwRo5ycq0HFMaMlZLSpngUeXU";
    const CLIENT_ID = "423210707146-0241ghoh3jao8v3t69ovp4c8dvnhgpmb.apps.googleusercontent.com";
    const SCOPE = "https://www.googleapis.com/auth/gmail.readonly";
    const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"];

    const max_result = 30;
    useEffect(() => {
        window.gapi.load("client:auth2", () => {
            window.gapi.client
                .init({
                    apiKey: API_KEY,
                    clientId: CLIENT_ID,
                    scope: SCOPE,
                    discoveryDocs: DISCOVERY_DOCS,
                })
                .then(() => {
                    const auth = window.gapi.auth2.getAuthInstance();
                    setIsSignedIn(auth.isSignedIn.get());
                });
        });
    }, [isSignedIn]);

    const loginWithGoogle = () => {
        window.gapi.auth2.getAuthInstance().signIn();
    };

    const logoutFromGoogle = () => {
        window.gapi.auth2.getAuthInstance().signOut();
    };

    const getMessage = async (message_id) => {
        const message = await window.gapi.client.gmail.users.messages.get({
            userId: "me",
            id: message_id,
        });

        const payload = message.result.payload;
        const headers = payload.headers;
        const from = headers.find((header) => header.name === "From");
        const subject = headers.find((header) => header.name === "Subject");
        const date = headers.find((header) => header.name === "Date");
        const date_object = date !== undefined ? new Date(date.value) : "";
        const body = payload.parts ? payload.parts[0].body.data : payload.body.data;

        return {
            from: from !== undefined ? from.value : "",
            year: date !== "" ? date_object.getFullYear() : "",
            month: date !== "" ? date_object.getMonth() : "",
            day: date !== "" ? date_object.getDate() : "",
            Subject: [subject !== undefined ? subject.value : ""],
            Body: [body !== undefined ? decode(body) : "メールの本文を読み込めませんでした。"],
        };
    };

    const getMails = async () => {
        const response = await window.gapi.client.gmail.users.messages.list({
            userId: "me",
            maxResults: max_result,
        });
        const message_ids = response.result.messages.map((message) => message.id);

        let messages = [];
        let count = 0;
        for (const message_id of message_ids) {
            messages.push(await getMessage(message_id));
            count++;
            setPrgoress(Math.floor((count / max_result) * 100));
        }

        messages.sort((a, b) => {
            return a.from > b.from ? 1 : -1;
        });

        let organized_messages = [messages[0]];
        messages.slice(1).forEach((message) => {
            const last_index = organized_messages.length - 1;
            if (message.from === organized_messages[last_index].from) {
                organized_messages[last_index].Subject.push(message.Subject[0]);
                organized_messages[last_index].Body.push(message.Body[0]);
            } else {
                organized_messages.push(message);
            }
        });

        setMails(organized_messages);
    };

    // データーベースに保存する
    // const saveMails = (payload) => {
    //     axios
    //         .post("/api/add", {
    //             emailId: payload.emailId,
    //             subject: payload.Subject[0],
    //             from: payload.from,
    //             to: payload.to,
    //             date: payload.date,
    //         })
    //         .then(() => {
    //             console.log("success!");
    //         })
    //         .catch((error) => {
    //             console.log(error.message);
    //         });
    // };

    return (
        <div>
            <button onClick={getMails}>get mails</button>
            <button onClick={loginWithGoogle}>login with google</button>
            <button onClick={logoutFromGoogle}>logout from google</button>
            <Typography>{progress}%完了</Typography>
            <MakeTree mails={mails} />
        </div>
    );

    //     return (
    //         <div>
    //             <button onClick={mailIds}>get mails</button>
    //             <button onClick={showEmailInfo}>Show email info List</button>
    //             {renderAuth()}
    //             <button onClick={loginWithGoogle}>login with google</button>
    //             <button onClick={logoutFromGoogle}>logout from google</button>
    //             <MakeTree mails={mails} />
    //         </div>
    //     );
}

export default Top;
