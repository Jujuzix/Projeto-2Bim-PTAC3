import Link from 'next/link';
import Image from 'next/image';
import styles from "../styles/cabecalho.module.css";

export default function Cabecalho() {
  return (
    <header className={styles.menu}>
      <Image
        width={100}
        height={100}
        src={"https://th.bing.com/th/id/R.623076c9a1e463717401349af6270d1b?rik=8upkX5Sb8z55yw&pid=ImgRaw&r=0"}
      />
      <nav>
        <h1 className={styles.titulo}>Juloca store</h1>
        <ul className={styles.lista}>
          <Link className={styles.link} href="/carrinho">
            <li className={styles.li}>
            <Image
                width={45}
                height={45}
                src={"https://cdn-icons-png.freepik.com/512/8249/8249306.png"}
              />
            </li>
          </Link>
          <Link className={styles.link} href="/contato">
            <li className={styles.li}>
            <Image
                width={45}
                height={45}
                src={"https://cdn-icons-png.freepik.com/512/12643/12643485.png"}
              />
            </li>
          </Link>
        </ul>
      
      </nav>
    </header>

  )
}