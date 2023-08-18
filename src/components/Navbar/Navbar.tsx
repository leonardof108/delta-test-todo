import styles from "./styles.module.scss";
import { Avatar, Logo, MoonIcon, SunIcon } from "../../../public/assets/icons";
import { useTheme } from "next-themes";

export default function Navbar() {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
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
              <input type="checkbox" />
              <span
                className={`${styles.dark_mode_slider} ${styles.dark_mode_round}`}
              ></span>
            </label>
            {/* <div className={styles.dark_mode_switch}> */}
            {/* <Switch
                onClick={() =>
                  theme == "dark" ? setTheme("light") : setTheme("dark")
                }
                startContent={<SunIcon />}
                endContent={<MoonIcon />}
                classNames={{
                  base: styles.dark_mode_switch_base,
                  wrapper: styles.dark_mode_switch_wrapper,
                  thumb: styles.dark_mode_switch_thumb,
                  label: styles.dark_mode_switch_label,
                  startContent: styles.dark_mode_switch_startContent,
                  endContent: styles.dark_mode_switch_endContent,
                  thumbIcon: styles.dark_mode_switch_ThumbIcon,
                }}
              /> */}
            {/* </div> */}
            {/* <button type="button" className={styles.dark_mode_switch}>
              <Image src={sun} alt="" className={styles.dark_mode_sun} />
              <Image src={moon} alt="" className={styles.dark_mode_moon} />
              <div className={styles.dark_mode_ellipse_container}>
                <Image
                  src={ellipse}
                  alt=""
                  className={styles.dark_mode_ellipse}
                />
              </div>
            </button> */}
            <a href="#" className={styles.avatar}>
              <Avatar />
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
