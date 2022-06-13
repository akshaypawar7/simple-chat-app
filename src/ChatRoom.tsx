import { useState, useRef, useEffect } from "react";

import { fireApp, auth } from "./SignUp";

import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  DocumentData,
} from "firebase/firestore";

const firestore = getFirestore(fireApp);

function ChatRoom() {
  const dummy = useRef<HTMLDivElement>(null);
  const inputeElement = useRef<HTMLInputElement>(null);

  const scrollToBottom = () =>
    dummy.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(scrollToBottom);

  const [message, setMessageValue] = useState<
    string | number | readonly string[] | undefined
  >("");

  const [messages, setMessages] = useState<Array<DocumentData>>([]);

  useEffect(() => {
    const q = query(
      collection(firestore, "messages"),
      orderBy("createdAt"),
      limit(25)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const mArray: DocumentData[] = [];
      snapshot.forEach((doc) => mArray.push(doc.data()));
      setMessages(mArray);
    });

    return () => unsubscribe();
  }, []);

  const handleSendButton = () => {
    if (message !== "") {
      const { uid, photoURL } = auth.currentUser!;

      try {
        addDoc(collection(firestore, "messages"), {
          createdAt: serverTimestamp(),
          text: inputeElement.current!.value,
          uid,
          photoURL,
        }).then(() => {
          setMessageValue("");
          scrollToBottom();
        });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  return (
    <>
      <section>
        {messages &&
          messages.map((doc) => <ChatMassage key={doc.id} message={doc} />)}
        <span ref={dummy}></span>
      </section>
      <input
        type="text"
        value={message}
        placeholder="whats Happening...!"
        ref={inputeElement}
        onChange={(e) => setMessageValue(e.target.value)}
      />
      <button
        style={{
          backgroundColor: "forestgreen",
          color: "white",
          width: "100%",
        }}
        onClick={handleSendButton}
      >
        Send 🚀
      </button>
    </>
  );
}

function ChatMassage(props: {
  key: String;
  message: DocumentData;
}): JSX.Element {
  const { text, uid, photoURL } = props.message;

  return (
    <div
      className={`message ${
        uid === auth.currentUser!.uid ? "rightM" : "leftM"
      }`}
    >
      <img alt="avatar" src={photoURL} />
      <p> {text}</p>
    </div>
  );
}

export default ChatRoom;
