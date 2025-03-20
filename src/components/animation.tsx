/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { ReactNode } from "react";


/**
 * 📌 Componente `TextoAnimado`
 * Renderiza un texto animado letra por letra usando Framer Motion.
 * - Separa el texto en caracteres individuales.
 * - Aplica una animación de aparición progresiva con un pequeño retraso entre cada letra.
 * 
 * @param texto - Texto a animar, que se desglosará en caracteres.
 * @param indice - Índice usado para calcular el retraso de la animación.
 * @returns Un encabezado `<h1>` con cada letra envuelta en un `<motion.span>`.
 */
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


/**
 * 📌 Componente `InputAnimado`
 * Aplica una animación de aparición progresiva a un elemento pasado como input.
 * - Útil para animar cualquier componente o contenido dentro de un `<motion.span>`.
 * 
 * @param input - Elemento React que se animará.
 * @param indice - Índice que determina el retraso en la animación.
 * @returns Un `<motion.span>` animado que envuelve el contenido proporcionado.
 */
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
