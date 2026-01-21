import { gsap } from "gsap";

gsap.from(".box", {
  x: -200,
  opacity: 0,
  duration: 1,
  ease: "power2.out"
});
