"use client"

import {Sun, Moon} from "@gravity-ui/icons";
import {Switch} from "@heroui/react";
import { useTheme } from "next-themes";

const ThemeToggle = () => {
      const { theme, setTheme } = useTheme();
    return (
    //  <Switch onChange={() => setTheme(theme==="dark" ? "light" : "dark")}> 
    //   {({isSelected}) => (
    //     <>
    //       <Switch.Control
    //         className={`h-6 w-8 bg-blue-500 ${isSelected ? "bg-cyan-500 shadow-[0_0_12px_rgba(6,182,212,0.5)]" : ""}`}
    //       >
    //         <Switch.Thumb
    //           className={`size-[27 px] bg-white shadow-sm ${isSelected ? "ms-[22 px] shadow-lg" : ""}`}
    //         >
    //           <Switch.Icon>
    //             {isSelected ? (
    //               <Sun className="size-4 text-cyan-600" />
    //             ) : (
    //               <Moon className="size-4 text-blue-600" />
    //             )}
    //           </Switch.Icon>
    //         </Switch.Thumb>
    //       </Switch.Control>
    //     </>
    //   )}
    // </Switch>
    
    <Switch aria-label="Enable notifications"
    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {/* {theme === "dark" ? "Light" : "Dark"} */}
      <Switch.Content>
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
      </Switch.Content>
    </Switch>
    
        //      <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
    //   Toggle {theme === "dark" ? "Light" : "Dark"} Mode
    // </button>
    );
};

export default ThemeToggle;