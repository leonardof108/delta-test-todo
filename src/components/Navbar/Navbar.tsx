import styles from "./styles.module.scss";
import { Avatar, Logo, MoonIcon, SunIcon } from "../../../public/assets/icons";
import { useTheme } from "next-themes";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  return (
    <>
      <div className={styles.navbar_container}>
        <nav className={styles.navbar}>
          <a href="#" className={styles.logo_container}>
            <Logo />
          </a>
          <div className={styles.navbar_right}>
            <label
              className={styles.dark_mode_switch}
              onChange={() =>
                theme == "dark" ? setTheme("light") : setTheme("dark")
              }
            >
              <input type="checkbox" checked={theme === "light"} />
              <span
                className={`${styles.dark_mode_slider} ${styles.dark_mode_round}`}
              ></span>
              <div className={styles.sun_icon}>
                <SunIcon />
              </div>
              <div className={styles.moon_icon}>
                <MoonIcon />
              </div>
            </label>
            <a href="#" className={styles.avatar}>
              <Avatar />
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
