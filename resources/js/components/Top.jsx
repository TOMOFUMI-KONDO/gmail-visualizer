import React, { useEffect, useState } from "react";
import gmailApi from "react-gmail";
import MakeTree from "./MakeTree";

function Top() {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [mails, setMails] = useState([]);

    useEffect(() => {
        window.gapi.load("client:auth2", () => {
            window.gapi.client
                .init({
                    clientId: "423210707146-0241ghoh3jao8v3t69ovp4c8dvnhgpmb.apps.googleusercontent.com",
                    scope: "https://www.googleapis.com/auth/gmail.readonly",
                })
                .then(() => {
                    const auth = window.gapi.auth2.getAuthInstance();
                    setIsSignedIn(auth.isSignedIn.get());
                });
        });
    }, []);

    const renderAuth = () => {
        if (isSignedIn) {
            return <div>login with google!!</div>;
        } else {
            return <div>I can not see your google account!!</div>;
        }
    };

    const loginWithGoogle = () => {
        window.gapi.auth2.getAuthInstance().signIn();
    };

    const logoutFromGoogle = () => {
        window.gapi.auth2.getAuthInstance().signOut();
    };

    const getMails = async () => {
        const response = await gmailApi.getMessages(false, 30, "me");

        let mails = gmailApi.normalizeData(response).map((mail) => {
            const date = new Date(mail.date);
            return {
                from: mail.from,
                year: date.getFullYear(),
                month: date.getMonth(),
                day: date.getDate(),
                Subject: [mail.subject],
                Body: [mail.body.text],
            };
        });

        mails.sort((a, b) => {
            return a.from > b.from ? 1 : -1;
        });

        let organized_mails = [mails[0]];
        mails.slice(1).forEach((mail) => {
            const last_index = organized_mails.length - 1;
            if (mail.from === organized_mails[last_index].from) {
                organized_mails[last_index].Subject.push(mail.Subject[0]);
                organized_mails[last_index].Body.push(mail.Body[0]);
            } else {
                organized_mails.push(mail);
            }
        });

        setMails(organized_mails);
    };

    return (
        <div>
            <button onClick={getMails}>get mails</button>
            {renderAuth()}
            <button onClick={loginWithGoogle}>login with google</button>
            <button onClick={logoutFromGoogle}>logout from google</button>
            <MakeTree mails={mails} />
        </div>
    );
}

export default Top;
