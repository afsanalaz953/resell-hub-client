import React from 'react';
import Image from "next/image"
import { motion } from "framer-motion";

const Logo = () => {
    return (
        
               <div className=' rounded bg-orange-300 relative m-0'>
                          <Image
                            src="https://cdn.dribbble.com/userupload/47158898/file/42a4eaced685cc3bb11a986f043c7a68.png?resize=400x0"
                            alt="Learning"
                           width={50}
                           height={50}
                           
                            className="absolute rounded transform transition duration-700 group-hover:scale-105"
                         /> 
            
                    </div>
        
    );
};

export default Logo;