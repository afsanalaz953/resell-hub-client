
"use client";

// import { Card, CardBody, Divider, Spacer } from "@heroui/react";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

 function AnimatedCounter({ target, suffix, duration = 2000, delay = 0 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!isInView) return;
    const startTime = performance.now() + delay;
    const endTime = startTime + duration;

    const update = (now) => {
      if (now < startTime) { requestAnimationFrame(update); return; }
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(update);
      else setCount(target);
    };
    requestAnimationFrame(update);
  }, [isInView, target, duration, delay]);

  return <span ref={ref} className="tabular-nums">{count.toLocaleString()}{suffix}</span>;
}


export default AnimatedCounter;
