import React, { useState, useEffect } from "react";

const Top = () => {
    const [mails, setMails] = useState([]);

    useEffect(() => {
        fetch(process.env.MIX_API_URL + "mails")
            .then((response) => {
                response.json().then((result) => setMails(result));
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <div>
            <h1>Mails</h1>
            <ul>
                {mails.map((mail) => (
                    <li key={mail.body}>
                        from: {mail.from}, received_at: {mail.received_at}, body: {mail.body}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Top;
