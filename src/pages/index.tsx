import type { NextPage } from "next"
import Link from "next/link"
import styles from "../styles/Home.module.css"

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          <span className={styles.white_colored}>educAIt</span>
        </h1>
        <div className={styles.longerDescription}>
          <p>A smarter way to learn</p>
        </div>
        <p className={styles.description}>
          Visit <Link href="/courses">your courses</Link>{" "}
        </p>
      </main>

      <footer className={styles.footer}>
        <a href="http://example.com" target="_blank" rel="noopener noreferrer">
          Created by the Sobercups team
        </a>
      </footer>
    </div>
  )
}

export default Home
