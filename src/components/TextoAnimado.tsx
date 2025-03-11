import { motion } from "framer-motion";
import { text } from "framer-motion/client";

export function TextoAnimado(texto: String, indice: any){
    return (
      <h1>
        {texto.split("").map((letra, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.05 +(indice*0.05)}}
          >
            {letra}
          </motion.span>
        ))}
      </h1>
    );
 };

  