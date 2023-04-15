import type { NextPage } from "next"
import Link from "next/link"
import styles from "../styles/Home.module.css"

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          <span className={styles.white_colored}>Test</span>
        </h1>
        <p className={styles.description}>
          Visit<Link href="/courses"> link</Link>{" "}
        </p>
        <div className={styles.longerDescription}>
          <p>test</p>
          <p>test</p>
        </div>
      </main>

      <footer className={styles.footer}>
        <a href="http://example.com" target="_blank" rel="noopener noreferrer">
          Created by test
        </a>
      </footer>
    </div>
  )
}

export default Home
