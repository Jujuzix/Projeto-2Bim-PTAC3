"use client";
import Link from "next/link";
import Image from "next/image";
import styles from "./styles/main.module.css";
import { useEffect, useState } from "react";
import Spinner from "./Spinner.js";
import ErrorFetch from "./ErrorFetch";

export default function Main() {
  const [listProduct, setListProduct] = useState([]);
  const [listComplete, setListComplet] = useState([]);
  const [textSearch, setTextSearch] = useState("");
  const [isError, setIsError] = useState(false);
  useEffect(() => { 
    const getProduct = async () => {
      
      try {
      
        const response = await fetch("http://localhost:3000/api");
  
        const data = await response.json();
        
        setListProduct(data);
        setListComplet(data);
      } catch {
        
        setIsError(true);
      }
    };
    getProduct();
  }, []);
  const orderAz = () => {
    const listAux = [...listProduct].sort((a, b) =>
      a.titulo.localeCompare(b.titulo)
    );

    setListProduct(listAux);
  };

  const orderZa = () => {
    const listAux = [...listProduct].reverse((a, b) =>


      b.titulo.localeCompare(a.titulo)

    );
    setListProduct(listAux);
  };

  const orderPrecoMenor = () => {
    const listPre = [...listProduct].sort((a, b) => a.preco - b.preco);
    setListProduct(listPre);
  };

  const orderPrecoMaior = () => {
    const listPre = [...listProduct].reverse((a, b) => b.preco - a.preco);


    setListProduct(listPre);
  };

  const search = (text) => {
    setTextSearch(text);
    if (text.trim() == "") {
      setListProduct(listComplete);
      return;
    }
    const newList = listProduct.filter((product) =>
      product.title
        .toUpperCase()
        .trim()
        .includes(textSearch.toUpperCase().trim())
    );
    setListProduct(newList);
  };
  if (isError == true) {
    return <ErrorFetch />;
  }
  if (listComplete[0] == null) {
    return <Spinner />;
  }
  console.log(listProduct);
  return (
    <>
      <div className={styles.filters}>
        <div>
          <input 
          className={styles.buscar}
            type="text"
            value={textSearch}
            placeholder="Faça uma Pesquisa de Algum Produto"
            onChange={(event) => search(event.target.value)}
          />
          <button onClick={orderAz} className={styles.btn}>
            A - Z
          </button>
          <button onClick={orderZa} className={styles.btn}>
            Z - A
          </button>
          <button onClick={orderPrecoMaior} className={styles.btn}>
            {" "}
            Preço Maior
          </button>
          <button onClick={orderPrecoMenor} className={styles.btn}>
            {" "}
            Preço Menor
          </button>
        </div>
      </div>

      <main className={styles.main}>
        {listProduct.map((products) => (
          <div className={styles.alinhamento}>
            <div className={styles.card} key={products.id}>
              <h1>{products.titulo.slice(0, 25) + "..."}</h1>
              <Image width={300} height={300} src={products.image} />
              <h3>{products.preco}</h3>
              <p>{products.descr.slice(0, 25) + "..."}</p>
              <Link href={"/product/" + products.id}>
              <button className={styles.btn}>Ver mais sobre</button>
                </Link>
            </div>
          </div>
        ))}
      </main>
    </>
  );

}
