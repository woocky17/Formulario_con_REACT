/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { ReactNode } from "react";

export function TextoAnimado(texto: string, indice: any) {
  return (
    <h1>
      {texto.split("").map((letra, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.05 + indice * 0.05 }}
        >
          {letra}
        </motion.span>
      ))}
    </h1>
  );
}

export function InputAnimado(input: ReactNode, indice: any) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: indice * 0.05 }}
    >
      {input}
    </motion.span>
  );
}
