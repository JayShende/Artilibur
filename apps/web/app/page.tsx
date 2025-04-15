"use client";
import { useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";


export default function Home() {

  const[slug,setSlug]=useState("");
  const router=useRouter();
  return (
    <div className={styles.page}>
      <div>
        <input type="text" onChange={(e)=>{
          setSlug(e.target.value)
        }}  />
      </div>
      <button onClick={()=>{
        router.push(`/room/${slug}`);
      }} >Go to Room</button>
    </div>
  );
}
