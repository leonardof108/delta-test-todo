import styles from "./styles.module.scss";
import { Avatar, Logo, MoonIcon, SunIcon } from "../../../public/assets/icons";
import { useTheme } from "next-themes";
import { useEffect } from "react";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const handleThemeChange = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };
  return (
    <>
      <div className={styles.navbar_container}>
        <nav className={styles.navbar}>
          <a href="#" className={styles.logo_container}>
            <Logo />
          </a>
          <div className={styles.navbar_right}>
            <label className={styles.dark_mode_switch}>
              <input
                type="checkbox"
                checked={theme === "light"}
                onChange={handleThemeChange}
              />
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
