import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.scss";
import Monitor from "@/components/Monitor/Monitor";
import AddTask from "@/components/AddTask/AddTask";
import TasksList from "@/components/TasksList/TasksList";
import FinishedTasksList from "@/components/FinishedTasksList/FinishedTasksList";
import Navbar from "@/components/Navbar/Navbar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Delta Teste To-do List</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <Navbar />
        <div className={styles.wrapper}>
          <div className={styles.container}>
            <Monitor />
            <AddTask />
            <TasksList />
            <FinishedTasksList />
          </div>
        </div>
      </main>
    </>
  );
}
