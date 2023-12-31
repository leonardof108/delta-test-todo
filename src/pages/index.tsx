import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.scss";
import Monitor from "@/components/Monitor/Monitor";
import AddTask from "@/components/AddTask/AddTask";
import TaskList from "@/components/TaskList/TaskList";
import Navbar from "@/components/Navbar/Navbar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <meta name="description" content="Novo teste Delta Global" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Delta Teste To-do List</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${inter.className} ${styles.container}`}>
        <Navbar />
        <div className={styles.wrapper}>
          <div className={styles.row_padding}>
            <Monitor />
            <AddTask />
            <TaskList />
          </div>
        </div>
      </main>
    </>
  );
}
