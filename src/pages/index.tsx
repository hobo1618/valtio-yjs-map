import Image from "next/image";
import { Inter } from "next/font/google";
import * as Y from "yjs";
import { proxy, useSnapshot } from "valtio";
import { proxyMap } from "valtio/utils";
import { bind } from "valtio-yjs";

const inter = Inter({ subsets: ["latin"] });
const ydoc = new Y.Doc();

// create a Y map
const ymap = ydoc.getMap("myMap");

const myMap: Map<string, string> = proxyMap();

// bind them --> this results in a warning `unsupported p type` error
const unbindMap = bind(myMap, ymap);

export default function Home() {
  const snap = useSnapshot(myMap);
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <button
        onClick={() => {
          myMap.set(Math.random().toString(), Math.random().toString());
        }}
      >
        add item
      </button>
      {[...snap.entries()].map(([key, value]) => (
        <div key={key}>
          {key} - {value}
        </div>
      ))}
    </main>
  );
}
